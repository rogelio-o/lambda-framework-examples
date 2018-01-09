# AWS Lambda - API Example

This example illustrates the use of Lambda Framework to develop a
RESTful API for AWS Lambda. It is a simple app to manage the users pets. They can create, update, remove, view and list their pets.

## How to run it locally

You need to install the AWS SAM so you can deploy the app locally:

```
npm install -g aws-sam-local
```

You will need a "bridge" to `localhost` if you decide to use DynamoDB
locally. This is because AWS SAM run the app in a docker. You can create
the "bridge" with:

```
sudo ifconfig lo0 alias 172.16.123.1
```

The example uses DynamoDB to persist the data. You can use it remotely or
install it locally. In any case, you may change the address of DynamoDB in
 DynamoPetRepository. You can download the DynamoDB emulator [here](https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/DynamoDBLocal.html#DynamoDBLocal.DownloadingAndRunning).

You can create the DynamoDB table with the `createTable.js` script. Remember
overwrite the DB address in the script. Then, you can run it:

```
node createTable.js
```

Finally, to deploy the app you have to go to the `lambda-framework-examples` folder and execute:

```
sam local start-api
```

__Note:__ as you can see, there is a `template.yaml` in the root folder created
with the needed stuff to run the examples.

## How to run it remotely

There is more information about how to deploy your apps in AWS Lambda [here](https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html).
