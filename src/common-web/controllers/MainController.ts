import { IHttpRequest, IHttpResponse } from "lambda-framework";
import Session from "./../components/Session";

export default class MainController {

  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  public index(req: IHttpRequest, res: IHttpResponse): void {
    const session: Session = req.context.session;
    const login: boolean = session !== undefined && session.get("login") === true;
    res.render("index", { login, prefix: this.prefix });
  }

}
