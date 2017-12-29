import { App, IApp } from "lambda-framework";
import { GCloudEventHandler, GCloudHttpHandler } from "lambda-framework-gcloud";
import thumbnailsHandler from "./handlers/thumbnailsHandler";

const app: IApp = new App();

// In the emulator, the event type is not implemented according to the
// event trigger. It should be 'object.change' but it is 'TODO'.
app.event("TODO", thumbnailsHandler);

const httpHandler: GCloudHttpHandler = new GCloudHttpHandler(app);
export const httpHandle = httpHandler.handle.bind(httpHandler);

const eventHandler: GCloudEventHandler = new GCloudEventHandler(app);
export const eventHandle = eventHandler.handle.bind(eventHandler);
