# Configuring HTTPDuck As a Receptor

This configuration allows you to record a http request and define the expected response

## Step 1
Go to receptions section in the navigation bar and simply click on "Create Reception" button. 

![Fig1.0](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/reception/Selection_187.png)

## Step 2
Then you will be directed to the reception definition page where you'll be given with a specific HTTP/S URL where you can send HTTP requests which are supposed to be recorded. In this view you can configure any property of the HTTP response you expect.

![Fig1.1](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/reception/Selection_188.png)

Once you are done with defining the HTTP response just click on Update buton to save the definition. Or you can just delete the HTTP reception definition. 

## Step 3
In this view you'll be able to select a particular reception to view associated HTTP requests/responses.

![Fig1.2](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/reception/Selection_189.png)

## Step 4
Provide the URL generated by HTTPDuck as the target endpoint inorder to capture the http request/response. For the sake of simplicity I will use curl in this example.

`curl -get -v https://kanishkapagero.alwaysdata.net/reception/5c29a630cdca734088705112`

Result

![Fig1.3](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/reception/Selection_190.png)

The response body and all the http response parameters are highlighted in the above screenshot. Notice that the value are there as we customized in the HTTP response definition.

## Step 5
Finally it's possible to view the requests captured by the HTTPDuck.

![Fig1.4](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/reception/Selection_191.png)
