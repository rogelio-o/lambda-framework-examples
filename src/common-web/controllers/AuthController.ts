import { IHttpRequest, IHttpResponse } from "lambda-framework";
import Session from "./../components/Session";

export default class AuthController {

  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  public login(req: IHttpRequest, res: IHttpResponse): void {
    const body: { [name: string]: any } = req.body as any;
    const username = body.username;
    const password = body.password;

    if (username === "user" && password === "password") {
      const session: Session = req.context.session;
      session.put("login", true);

      session.save().then(
        () => {
          res.redirect(this.prefix);
        },
        (err) => res.redirect(this.prefix + "?error=1")
      );
    } else {
      res.redirect(this.prefix + "?error=1");
    }
  }

  public logout(req: IHttpRequest, res: IHttpResponse): void {
    const session: Session = req.context.session;
    session.put("login", false);

    session.save().then(
      () => {
        res.redirect(this.prefix);
      },
      (err) => res.redirect(this.prefix + "?error=1")
    );
  }

}
