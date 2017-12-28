# Lambda Framework Examples

In this project you can find examples of the Lambda Framework usage.

## Project structure

- `src`: source files writing in typescript. Each example is in a folder inside this one.
- `dist`: this folder is generated when the compilation is run. It contains the compiled files.
- `template.yaml`: the SAM template file. It's needed to run AWS Lambda functions locally.
- `src/example/README.md`: inside each example folder, there is a README file explaining the intention of it.

## Scripts

- `npm test`: There is no tests, so test script only check the lint rules.
- `npm compile`: It compiles the source files into the folder *dist*.

## How to run it locally?

First of all, you need compile it with the previously referred command.

### AWS Examples

TODO

```
sudo ifconfig lo0 alias 172.16.123.1
```

```
java -Djava.library.path/DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```



### Cloud Functions Examples

TODO

## Lambda Framework projects

- [Core](https://github.com/rogelio-o/lambda-framework)
- [AWS Lambda implementation](https://github.com/rogelio-o/lambda-framework-aws)
- [Google Cloud Functions implementation](https://github.com/rogelio-o/lambda-framework-gcloud)
- [DustJS template engine implementation](https://github.com/rogelio-o/lambda-framework-dustjs)
- [Website](https://github.com/rogelio-o/lambda-framework-website)
- [Website Resources](https://github.com/rogelio-o/lambda-framework-website-resources)
- [Examples](https://github.com/rogelio-o/lambda-framework-examples)

## Contributions

All contributors will be welcome. You can contributing by implementing/fixing/answering one open [issue](issues), by suggesting new features for the framework,... For more info about contributing, you can read [the contributing file of the core project](https://github.com/rogelio-o/lambda-framework/CONTRIBUTING.md).

Make it happen.
