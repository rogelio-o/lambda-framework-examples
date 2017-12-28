import IPet from "./../models/IPet";

export default interface IPetsRepository {

  findOne(id: string): Promise<IPet>;

  findAll(): Promise<IPet[]>;

  create(model: IPet): Promise<string>;

  update(id: string, model: IPet): Promise<void>;

  delete(id: string): Promise<void>;

}
