# Google Cloud Functions - Web Example

This is an application for login and logout. The purpose of the example is
to show how work with sessions, cookies and template engines in Lambda Framework.

Every time a user ask for an address, a session is fetched according to the ID
saved in a new cookie (if the cookie doesn't exists, a session is created and its
ID stored in a cookie). When a user logs in, an attribute of the session
changes to true. When a user logs out, the attribute comes back to false.

The username and password is `user` and `password`.

## How to run it locally

You need to install the cloud functions emulator so you can deploy the app locally:

```
npm install -g @google-cloud/functions-emulator
```

Then, you need to start it:

```
functions start
```

The example uses Redis to store the sessions, so you need install it locally or
use a remote version of it. In any case, you may change the address of Redis in
 the index file (in the value of the environment variable REDIS_CONN_STR).

Finally, to deploy the app you have to go to the `lambda-framework-examples` folder and execute:

```
functions deploy httpHandle --trigger-http --local-path dist/src/gcloud-api
```

## How to run it remotely

There is more information about how to deploy your apps in Google Cloud Functions [here](https://cloud.google.com/functions/docs/deploying/).
