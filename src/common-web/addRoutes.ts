import { DevTemplateLoader, IApp, ITemplateLoader, ITemplateRenderer, UrlEncodedParser } from "lambda-framework";
import { DustTemplateRenderer } from "lambda-framework-dustjs";
import sessionHandler from "./components/sessionHandler";
import AuthController from "./controllers/AuthController";
import MainController from "./controllers/MainController";

export default function addRoutes(app: IApp, templateLoader: ITemplateLoader, context: string, prefix: string, viewsPath: string): void {
  const authController = new AuthController(context + prefix);
  const mainController = new MainController(context + prefix);
  const bodyParser = new UrlEncodedParser();

  const loader: ITemplateLoader = process.env.PROD ? templateLoader : new DevTemplateLoader(viewsPath);
  const templateRenderer: ITemplateRenderer = new DustTemplateRenderer(loader);
  app.addTemplateEngine(templateRenderer);

  app.use(bodyParser.create());
  app.use(sessionHandler);

  app
    .route(prefix)
    .get(mainController.index.bind(mainController));
  app
    .route(prefix + "/login")
    .post(authController.login.bind(authController));
  app
    .route(prefix + "/logout")
    .post(authController.logout.bind(authController));
}
