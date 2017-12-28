import { IRouter, Router } from "lambda-framework";
import PetsController from "./../controllers/PetsController";
import IPetsRepository from "./../repositories/IPetsRepository";

export default function petsRouter(repository: IPetsRepository): IRouter {
  const router: IRouter = new Router();
  const petsController: PetsController = new PetsController(repository);

  router.route("/:id")
    .get(petsController.viewPet.bind(petsController))
    .put(petsController.updatePet.bind(petsController))
    .delete(petsController.deletePet.bind(petsController));
  router.route("")
    .get(petsController.listPets.bind(petsController))
    .post(petsController.createPet.bind(petsController));

  return router;
}
