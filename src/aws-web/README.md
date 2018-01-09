# AWS Lambda - Web Example

This is an application for login and logout. The purpose of the example is
to show how work with sessions, cookies and template engines in Lambda Framework.

Every time a user ask for an address, a session is fetched according to the ID
saved in a cookie (if the cookie doesn't exists, a session is created and its
ID stored in a new cookie). When a user logs in, an attribute of the session
changes to true. When a user logs out, the attribute comes back to false.

The username and password is `user` and `password`.

## How to run it locally

You need to install the AWS SAM so you can deploy the app locally:

```
npm install -g aws-sam-local
```

You will need a "bridge" to `localhost`. This is because AWS SAM run
 the app in a docker. You can create the "bridge" with:

 ```
 sudo ifconfig lo0 alias 172.16.123.1
 ```

The example uses Redis to store the sessions, so you need install it locally or
use a remote version of it. In any case, you may change the address of Redis in
 the index file (in the value of the environment variable REDIS_CONN_STR).

Finally, to deploy the app you have to go to the `lambda-framework-examples` folder and execute:

```
sam local start-api
```

__Note:__ as you can see, there is a `template.yaml` in the root folder created
with the needed stuff to run the examples.

## How to run it remotely

There is more information about how to deploy your apps in AWS Lambda [here](https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html).
