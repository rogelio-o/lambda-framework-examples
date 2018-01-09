# Google Cloud Functions - Event Example

This is a event handler which listens when a image is added into a specified
bucket and creates the thumbnail into another bucket.

## How to run it locally

You need to install the cloud functions emulator so you can deploy the app locally:

```
npm install -g @google-cloud/functions-emulator
```

Then, you need to start it:

```
functions start
```

This example uses two remote Cloud Storage buckets, so you need to create them
and change the code of `event.json` file to use them (bucket). The second
bucket name has to be the name of the first bucket with the prefix "thumb-".

Now, to deploy the handler you have to go to the `lambda-framework-examples`
folder and execute:

```
functions deploy eventHandle --trigger-bucket=bucket-name --local-path=dist/src/gcloud-api
```

Finally, to invoke the function you have to go to the `lambda-framework-examples`
folder and execute:

```
functions call eventHandle --file=dist/src/gcloud-api/event.json
```

## How to run it remotely

There is more information about how to deploy your apps in Google Cloud Functions [here](https://cloud.google.com/functions/docs/deploying/).
