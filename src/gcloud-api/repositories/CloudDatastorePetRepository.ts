import * as Datastore from "@google-cloud/datastore";
import IPet from "./../../common-api/models/IPet";
import IPetsRepository from "./../../common-api/repositories/IPetsRepository";

export default class CloudDatastorePetRepository implements IPetsRepository {

  private datastore: Datastore;

  constructor() {
    this.datastore = new Datastore({
      apiEndpoint: "localhost:8081"
    });
  }

  public findOne(id: string): Promise<IPet> {
    const key: Datastore.Key = this.datastore.key(["Pet", parseInt(id, 10)]);
    return new Promise<IPet>((resolve, reject) => {
      this.datastore.get(key).then(
        (entity) => {
          entity.id = id;
          resolve(entity);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public findAll(): Promise<IPet[]> {
    const query = this.datastore.createQuery("Pet");
    return new Promise<IPet[]>((resolve, reject) => {
      this.datastore.runQuery(query).then(
        (results) => {
          const pets = results[0];
          pets.forEach((pet) => {
            const key = pet[this.datastore.KEY];
            pet.id = key.id;
          });
          resolve(pets);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public create(model: IPet): Promise<string> {
    const key = this.datastore.key("Pet");
    return new Promise<string>((resolve, reject) => {
      this.save(key, model).then(
        () => {
          resolve(key.id);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public update(id: string, model: IPet): Promise<void> {
    const key: Datastore.Key = this.datastore.key(["Pet", parseInt(id, 10)]);
    return this.save(key, model);
  }

  public delete(id: string): Promise<void> {
    const key: Datastore.Key = this.datastore.key(["Pet", parseInt(id, 10)]);
    return this.datastore.delete(key);
  }

  private save(key: Datastore.Key, model: IPet): Promise<void> {
    const entity: Datastore.Entity = {
      key,
      data: [
        {
          name: "name",
          value: model.name
        },
        {
          name: "type",
          value: model.type
        }
      ]
    };
    if (model.yearsOld) {
      entity.data.push({
        name: "yearsOld",
        value: model.yearsOld,
        excludeFromIndexes: true
      });
    }
    if (model.color) {
      entity.data.push({
        name: "color",
        value: model.color,
        excludeFromIndexes: true
      });
    }
    return this.datastore.save(entity);
  }

}
