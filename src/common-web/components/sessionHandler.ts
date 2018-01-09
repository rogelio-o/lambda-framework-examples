import { Cookie, ICookie, IHttpRequest, IHttpResponse, INext } from "lambda-framework";
import * as redis from "redis";
import * as uuid from "uuid";
import Session from "./Session";

const createSession = (req: IHttpRequest, res: IHttpResponse, next: INext) => {
  const id = uuid.v4();
  const session = new Session(id, {});
  session.save().then(
    () => {
      req.context.session = session;
      const cookie: ICookie = new Cookie("session", id);
      res.addCookie(cookie);
      next();
    },
    (err) => {
      next(err);
    }
  );
};

export default function sessionHandler(req: IHttpRequest, res: IHttpResponse, next: INext): void {
  const sessionCookie: ICookie = req.cookie("session");

  if (sessionCookie && sessionCookie.value) {
    const redisClient: redis.Client = redis.createClient(process.env.REDIS_CONN_STR);
    redisClient.get("SESSION_" + sessionCookie.value, (err, reply) => {
      redisClient.end(true);

      if (err) {
        next(err);
      } else {
        if (reply) {
          req.context.session = new Session(sessionCookie.value as string, JSON.parse(reply));
          next();
        } else {
          createSession(req, res, next);
        }
      }
    });
  } else {
    createSession(req, res, next);
  }
}
