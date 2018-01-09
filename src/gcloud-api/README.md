# Google Cloud Functions - API Example

This example illustrates the use of Lambda Framework to develop a
RESTful API for Google Cloud Functions. It is a simple app to manage the users pets. They can create, update, remove, view and list their pets.

## How to run it locally

You need to install the cloud functions emulator so you can deploy the app locally:

```
npm install -g @google-cloud/functions-emulator
```

Then, you need to start it:

```
functions start
```

The example uses Cloud Datastore to persist the data. You can use it remotely or
install it locally. In any case, you may change the address of Cloud Datastore in
 CloudDatastorePetRepository. You can download the Cloud Datastore emulator [here](https://cloud.google.com/datastore/docs/tools/datastore-emulator).

Finally, to deploy the app you have to go to the `lambda-framework-examples` folder and execute:

```
functions deploy httpHandle --trigger-http --local-path dist/src/gcloud-api
```

## How to run it remotely

There is more information about how to deploy your apps in Google Cloud Functions [here](https://cloud.google.com/functions/docs/deploying/).
