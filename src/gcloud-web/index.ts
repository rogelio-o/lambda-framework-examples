import { App, IApp } from "lambda-framework";
import { GCloudEventHandler, GCloudHttpHandler, GCloudStorageTemplateLoader } from "lambda-framework-gcloud";
import addRoutes from "./../common-web/addRoutes";

const app: IApp = new App();

process.env.REDIS_CONN_STR = "//172.16.123.1:6379";

addRoutes(app, new GCloudStorageTemplateLoader("lambda-framework-examples", "bucket-name", 3000), "/lambda-framework-gcloud/us-central1/httpHandle", "/gcloud-web", "../../../src/common-web/views");

const httpHandler: GCloudHttpHandler = new GCloudHttpHandler(app);
export const httpHandle = httpHandler.handle.bind(httpHandler);

const eventHandler: GCloudEventHandler = new GCloudEventHandler(app);
export const eventHandle = eventHandler.handle.bind(eventHandler);
