import { App, IApp, JsonParser } from "lambda-framework";
import { AWSHandler } from "lambda-framework-aws";
import petsRouter from "./../common-api/routers/petsRouter";
import DynamoPetRepository from "./repositories/DynamoPetRepository";

const app: IApp = new App();

const petsRepository: DynamoPetRepository = new DynamoPetRepository();
const bodyParser: JsonParser = new JsonParser();

app.use(bodyParser.create());
app.mount(petsRouter(petsRepository), "/aws-api/pets");

const handler: AWSHandler = new AWSHandler(app);
export const handle = handler.handle.bind(handler);
