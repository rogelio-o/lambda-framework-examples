import * as redis from "redis";

export default class Session {

  private _id: string;

  private _data: { [name: string]: any };

  constructor(id: string, data: { [name: string]: any }) {
    this._id = id;
    this._data = data;
  }

  public get(key: string): any {
    if (key === "id") {
      return this._id;
    } else {
      return this._data[key];
    }
  }

  public put(key: string, value: any): void {
    this._data[key] = value;
  }

  public save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const redisClient: redis.Client = redis.createClient(process.env.REDIS_CONN_STR);
      redisClient.set("SESSION_" + this._id, JSON.stringify(this._data), "EX", 600, (err, reply) => {
        redisClient.end(true);

        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}
