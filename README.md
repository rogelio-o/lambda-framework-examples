# Lambda Framework Examples

In this project you can find examples of the Lambda Framework usage.

## Project structure

- `src`: source files writing in typescript. Each example is in a folder inside this one.
- `dist`: this folder is generated when the compilation is run. It contains the compiled files.
- `template.yaml`: the SAM template file. It's needed to run AWS Lambda functions locally.
- `src/example/README.md`: inside each example folder, there is a README file explaining the intention of it.

## Scripts

- `npm test`: There is no tests, so test script only check the lint rules.
- `npm compile`: It compiles the source files into the folder *dist*.

## How to run it locally?

First of all, you need compile it with the previously referred command. Then,
follow the instructions in the README of each example.

### AWS Examples

- __AWS-API:__ A simple RESTful API to manage the users pets.
- __AWS-EVENT:__ event handler which listens when a image is added in
a S3 bucket and creates a thumbnails of it.
- __AWS-WEB:__ A simple login website. It uses sessions and cookies.

### Cloud Functions Examples

- __GCLOUD-API:__ A simple RESTful API to manage the users pets.
- __GCLOUD-EVENT:__ event handler which listens when a image is added in
a Cloud Storage bucket and creates a thumbnails of it.
- __GCLOUD-WEB:__ A simple login website. It uses sessions and cookies.

## Lambda Framework projects

- [Core](https://github.com/rogelio-o/lambda-framework)
- [AWS Lambda implementation](https://github.com/rogelio-o/lambda-framework-aws)
- [Google Cloud Functions implementation](https://github.com/rogelio-o/lambda-framework-gcloud)
- [DustJS template engine implementation](https://github.com/rogelio-o/lambda-framework-dustjs)
- [Examples](https://github.com/rogelio-o/lambda-framework-examples)

## Contributions

All contributors will be welcome. You can contributing by implementing/fixing/answering one open [issue](issues), by suggesting new features for the framework,... For more info about contributing, you can read [the contributing file of the core project](https://github.com/rogelio-o/lambda-framework/CONTRIBUTING.md).

Make it happen.
