module.exports = {
    getHostName  : function() {
        if (typeof (process.env.APP_BASE_URL) != "undefined") {
            return process.env.APP_BASE_URL;
        } else {
            return "localhost:8080";
        }
    }
}