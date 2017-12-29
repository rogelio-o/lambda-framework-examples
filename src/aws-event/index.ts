import { App, IApp } from "lambda-framework";
import { AWSHandler } from "lambda-framework-aws";
import thumbnailsHandler from "./handlers/thumbnailsHandler";

const app: IApp = new App();

app.event("S3CreateEvent", thumbnailsHandler);

const handler: AWSHandler = new AWSHandler(app);
export const handle = handler.handle.bind(handler);
