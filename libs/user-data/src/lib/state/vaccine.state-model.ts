export interface VaccineStateModel {
  vaccines: VaccineModel[];
}

export interface VaccineModel {
  url: string;
  name: string;
  type: string;
  manufacturer: string;
}
