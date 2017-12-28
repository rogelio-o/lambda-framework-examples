import * as AWS from "aws-sdk";
import * as uuid from "uuid";
import IPet from "./../../common-api/models/IPet";
import IPetsRepository from "./../../common-api/repositories/IPetsRepository";

const TABLE_NAME = "test-table";

export default class DynamoPetRepository implements IPetsRepository {

  private documentClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.documentClient = new AWS.DynamoDB.DocumentClient({region: "eu-west-1", endpoint: "http://172.16.123.1:8000"});
  }

  public findOne(id: string): Promise<IPet> {
    return new Promise<IPet>((resolve, reject) => {
      const params = {
        TableName: TABLE_NAME,
        Key: { id }
      };
      this.documentClient.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Item as any);
        }
      });
    });
  }

  public findAll(): Promise<IPet[]> {
    return new Promise<IPet[]>((resolve, reject) => {
      const params = {
        TableName: TABLE_NAME
      };
      this.documentClient.scan(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Items as any);
        }
      });
    });
  }

  public create(model: IPet): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const id = uuid.v4();
      model.id = id;
      const params = {
        TableName: TABLE_NAME,
        Item: model
      };
      this.documentClient.put(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
    });
  }

  public update(id: string, model: IPet): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: "set #petName = :n, #petType=:t, yearsOld=:y, color=:c",
        ExpressionAttributeValues: {
            ":n": model.name,
            ":t": model.type,
            ":y": model.yearsOld,
            ":c": model.color
        },
        ExpressionAttributeNames: {
          "#petName": "name",
          "#petType": "type"
        }
      };
      this.documentClient.update(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public delete(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const params = {
          TableName: TABLE_NAME,
          Key: { id }
        };
        this.documentClient.delete(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

}
