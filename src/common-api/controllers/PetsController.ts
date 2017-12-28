import { IHttpRequest, IHttpResponse } from "lambda-framework";
import IPet from "./../models/IPet";
import IPetsRepository from "./../repositories/IPetsRepository";

const checkModel = (model: { [name: string]: any }): boolean => {
  let result: boolean = true;
  if (!model.name) {
    result = false;
  } else if (!model.type) {
    result = false;
  }
  return result;
};

export default class PetsController {

  private repository: IPetsRepository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  public createPet(req: IHttpRequest, res: IHttpResponse): void {
    if (checkModel(req.body as any)) {
      const model: IPet = req.body as IPet;
      this.repository.create(model).then(
        (id: string) => {
          res
            .status(201)
            .json({success: true, id });
        },
        (err) => {
          res
            .status(500)
            .json({success: false, error: err.message});
        }
      );
    } else {
      res
        .status(400)
        .json({success: false, error: "Name or type are missing."});
    }
  }

  public deletePet(req: IHttpRequest, res: IHttpResponse): void {
    const id: string = req.param("id");
    this.repository.delete(id).then(
      () => {
        res.json({success: true});
      },
      (err) => {
        res
          .status(500)
          .json({success: false, error: err.message});
      }
    );
  }

  public updatePet(req: IHttpRequest, res: IHttpResponse): void {
    if (checkModel(req.body as any)) {
      const id: string = req.param("id");
      const model: IPet = req.body as IPet;
      this.repository.update(id, model).then(
        () => {
          res.json({success: true });
        },
        (err) => {
          res
            .status(500)
            .json({success: false, error: err.message});
        }
      );
    } else {
      res
        .status(400)
        .json({success: false, error: "Name or type are missing."});
    }
  }

  public viewPet(req: IHttpRequest, res: IHttpResponse): void {
    const id: string = req.param("id");
    this.repository.findOne(id).then(
      (model: IPet) => {
        if (model) {
          res.json(model);
        } else {
          res
            .status(404)
            .json({error: "Pet not found."});
        }
      },
      (err) => {
        res
          .status(500)
          .json({error: err.message});
      }
    );
  }

  public listPets(req: IHttpRequest, res: IHttpResponse): void {
    this.repository.findAll().then(
      (models: IPet[]) => {
        res.json({result: models});
      },
      (err) => {
        res
          .status(500)
          .json({error: err.message});
      }
    );
  }

}
