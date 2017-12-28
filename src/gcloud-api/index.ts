import { App, IApp, JsonParser } from "lambda-framework";
import { GCloudEventHandler, GCloudHttpHandler } from "lambda-framework-gcloud";
import petsRouter from "./../common-api/routers/petsRouter";
import CloudDatastorePetRepository from "./repositories/CloudDatastorePetRepository";

const app: IApp = new App();

const petsRepository: CloudDatastorePetRepository = new CloudDatastorePetRepository();
const bodyParser: JsonParser = new JsonParser();

app.use(bodyParser.create());
app.mount(petsRouter(petsRepository), "/gcloud-api/pets");

const httpHandler: GCloudHttpHandler = new GCloudHttpHandler(app);
export const httpHandle = httpHandler.handle.bind(httpHandler);

const eventHandler: GCloudEventHandler = new GCloudEventHandler(app);
export const eventHandle = eventHandler.handle.bind(eventHandler);
