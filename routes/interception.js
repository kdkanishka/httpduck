const express = require('express');
const mongoose = require('mongoose');
const request = require('request').defaults({ rejectUnauthorized: false });

const router = express.Router();

//import models
require('../models/HttpDump');
require('../models/HttpInterception');
require('../models/HttpInterceptionDump');

const HttpDump = mongoose.model('httdump');
const HttpInterception = mongoose.model('httpinterception')
const HttpInterceptionDump = mongoose.model('httpinterceptiondump');

router.get("/:id", (req, res) => {
    handleRequest(req, res, "GET");
});

router.post("/:id", (req, res) => {
    handleRequest(req, res, "POST");
});

router.put("/:id", (req, res) => {
    handleRequest(req, res, "PUT");
});

router.delete("/:id", (req, res) => {
    handleRequest(req, res, "DELETE");
});

function handleRequest(req, res, method) {
    HttpInterception.findById({
        _id: req.params.id
    })
        .then(httpInterception => {
            if (httpInterception != null) {
                processRequest(req, res, method, httpInterception);
            } else {
                res.send("HTTP Interception is not defined or expired!");
            }
        })
        .catch(err => {
            console.log(err);
            res.send("Error Occured!");
        });
}

/**
 * Processing carried out in * steps as below
 * 1) Save http dump for the request
 * 2) Forward http request based on the http interception + saved dump
 * 3) Save http dump for the http response from the forwarded http request
 * 4) Respond to the initial http request(step 1) with the exact details in
 *    the saved dump for forwarded response (step 4)
 * @param {*} req 
 * @param {*} res 
 * @param {*} method 
 * @param {*} httpReception 
 */
function processRequest(req, res, method, httpInterception) {
    const originaRequestHeaders = req.headers
    const originalRequestHeaderMap = [];

    //record original headers
    for (var key in originaRequestHeaders) {
        //headerMap.set(key, headers[key]);
        originalRequestHeaderMap.push({
            key: key,
            value: originaRequestHeaders[key]
        })
    }
    let chunks = [];
    let finalBuffer;

    //record original request body
    req.on('data', chunk => {
        chunks.push(chunk);

    }).on('end', () => { //received all the data from initial request
        finalBuffer = Buffer.concat(chunks);

        //STEP 1) save http dump
        const originalHttpRequestDump = {
            host: req.hostname,
            ip: req.ip,
            protocol: req.protocol,
            method: method,
            body: finalBuffer,
            headers: originalRequestHeaderMap
        };

        new HttpDump(originalHttpRequestDump)
            .save()
            .then(savedOriginalHttpRequestDump => {
                //Time to forward request
                const forwadedRequestHeaderMap = {};
                const forwardedRequestHeaderArr = [];
                var idx = 0;
                for (; idx < originalRequestHeaderMap.length; idx++) {
                    //drop the header 'host'
                    const hdrName = originalRequestHeaderMap[idx].key;
                    const hdrVal = originalRequestHeaderMap[idx].value;
                    if (hdrName.toUpperCase() != "HOST") {
                        forwadedRequestHeaderMap[hdrName] = hdrVal;
                        forwardedRequestHeaderArr.push({
                            key: hdrName,
                            value: hdrVal
                        });
                    }
                }

                let forwardOptions = {
                    method: method,
                    headers: forwadedRequestHeaderMap
                };

                //skip defining body on GET requests
                if (method.toUpperCase() != "GET") {
                    forwardOptions.body = finalBuffer;
                }

                //STEP 2 : forward request to target endpoint
                request(httpInterception.forwardUrl, forwardOptions, (error, response, body) => {
                    //got reply for forwaded http request
                    if (error) {
                        console.log(error);
                        res.send("Unable to complete interception! : " + error);
                    } else {
                        //ready for STEP 3 : Save http response from forwarded server
                        //get response headers from the forwaded request
                        const forwadedResponseHeaders = response.headers;
                        const forwadedResponseHeadersMap = [];

                        //record original headers
                        for (var key in forwadedResponseHeaders) {
                            //headerMap.set(key, headers[key]);
                            forwadedResponseHeadersMap.push({
                                key: key,
                                value: forwadedResponseHeaders[key]
                            })
                        }

                        const forwardedHttpRequestDump = {
                            host: httpInterception.forwardUrl,
                            ip: req.ip, //TODO review
                            protocol: req.protocol, //TODO review
                            method: method,
                            body: finalBuffer,
                            headers: forwardedRequestHeaderArr,
                            responseBody: body,
                            responseHeaders: forwadedResponseHeadersMap //TODO add response headers here
                        }

                        new HttpDump(forwardedHttpRequestDump)
                            .save()
                            .then(savedForwardedHttpRequestDump => {
                                //save http interception dump
                                new HttpInterceptionDump({
                                    fromIp: req.ip,
                                    toHost: httpInterception.forwardUrl,
                                    method: method,
                                    fromProtocol: req.protocol,
                                    toProtocol: httpInterception.forwardUrl.toUpperCase().startsWith("HTTPS") ? "https" : "http",
                                    payloadSize: finalBuffer.length,
                                    httpInterceptionId: httpInterception._id,
                                    originalRequestDumpId: savedOriginalHttpRequestDump._id,
                                    forwardedRequestDumpId: savedForwardedHttpRequestDump._id
                                })
                                    .save()
                                    .then(savedHttpInterceptionDump => {
                                        savedOriginalHttpRequestDump.responseHeaders = forwadedResponseHeadersMap;
                                        savedOriginalHttpRequestDump.responseBody = body;
                                        savedOriginalHttpRequestDump.save()
                                            .then(savedOriginalHttpRequestDump => {
                                                //Time to perform STEP 4 : Responding to the original requester
                                                var idx = 0;
                                                for (; idx < forwadedResponseHeadersMap.length; idx++) {
                                                    const headerKey = forwadedResponseHeadersMap[idx].key;
                                                    const headerVal = forwadedResponseHeadersMap[idx].value;
                                                    res.setHeader(headerKey, headerVal);
                                                }
                                                res.writeHead(response.statusCode, response.statusMessage);
                                                res.end(body);
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                res.send("Unable to save original http request dump" + err);
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.send("Unable to save http interception dump " + err)
                                    })
                            }).catch(err => {
                                console.log(err);
                                res.send("Unable to save http dump for the forwaded request/response" + err)
                            });
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.send("Unable to save original http request dump");
            })
    });
}

module.exports = router;