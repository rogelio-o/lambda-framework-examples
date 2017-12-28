import { App, IApp } from "lambda-framework";
import { AWSHandler, S3TemplateLoader } from "lambda-framework-aws";
import addRoutes from "./../common-web/addRoutes";

const app: IApp = new App();

process.env.REDIS_CONN_STR = "//172.16.123.1:6379";

addRoutes(app, new S3TemplateLoader("bucket-name", 3000), "", "/aws-web", "src/common-web/views");

const handler: AWSHandler = new AWSHandler(app);
export const handle = handler.handle.bind(handler);
