# AWS Lambda - Event Example

This is a event handler which listens when a image is added into a specified
bucket and creates the thumbnail into another bucket.

## How to run it locally

You need to install the AWS SAM so you can deploy the app locally:

```
npm install -g aws-sam-local
```

This example uses two remote S3 buckets, so you need to create remotely
and change the code of `event.json` file to use them (bucket > name). The second
bucket name has to be the name of the first bucket with the prefix "thumb-".

Finally, to invoke the handler you have to go to the `lambda-framework-examples`
folder and execute:

```
sam local invoke aws-event
```

__Note:__ as you can see, there is a `template.yaml` in the root folder created
with the needed stuff to run the examples.

## How to run it remotely

There is more information about how to deploy your apps in AWS Lambda [here](https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html).
