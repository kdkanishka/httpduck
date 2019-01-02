# Configuring HTTPDuck As an Interceptor

This configuration allows you to "spy" on a HTTP/S transaction once you define the interception and later inspect the attributes/paylods. HTTPDuck works as a man in the middle in this  case.

## Step 1
Go to Interceptions section in the navigation bar and simply click on "Create an Interception" button. 

![Fig1.0](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/interception/Selection_187.png)

## Step 2
Now you will be redirected to the below view. There you may define to where the received request should be forwaded. This can be done by providing "Forward URL".

![Fig1.0](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/interception/Selection_189.png)

## Step 3
Created interceptions are listed as below.

![Fig1.0](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/interception/Selection_188.png)

## Step 4
Now it's time to send a request. In my example I have used POSTman as my http client.

![Fig1.0](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/interception/Selection_193.png)

## Step 5
You may pick the required interception in order to view/inspect transaction protperties intercepted by it.

![Fig1.0](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/interception/Selection_190.png)

## Step 6
It's possible to inspect both http request and response for inbound and outbound http requests.

![Fig1.0](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/interception/Selection_191.png)

## Step 7
Also, It's possible to download all the HTTP payloads in original format.

![Fig1.0](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/interception/Selection_192.png)