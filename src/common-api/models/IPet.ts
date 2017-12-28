export enum PetType {
  CAT, DOG
}

export default interface IPet {

  id?: string;

  name: string;

  type: PetType;

  yearsOld?: number;

  color?: string;

}
