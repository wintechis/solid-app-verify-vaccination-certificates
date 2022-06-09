import {
  buildThing,
  createThing,
  getDate,
  getInteger,
  getStringNoLocale,
  Thing,
} from "@inrupt/solid-client";

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface VaccinationDocument {
  vaccine: string;
  type: string;
  manufacturer: string;
  numberOfVaccination: number;
  dateOfVaccination: Date;
}

export class VaccinationDocumentThingFactory {
  private static readonly VACCINE_NAME = "http://my-own.org/vaccine/name";
  private static readonly VACCINE_TYPE = "http://my-own.org/vaccine/type";
  private static readonly VACCINE_DATE_OF_VACCINATION =
    "http://my-own.org/vaccine/date-of-vaccination";
  private static readonly VACCINE_MANUFACTURER =
    "http://my-own.org/vaccine/manufacturer";
  private static readonly VACCINE_NUMBER_OF_VACCINATION =
    "http://my-own.org/vaccine/number-of-vaccination";

  public static fromVaccinationDocument(document: VaccinationDocument): Thing {
    return buildThing(createThing({}))
      .addStringNoLocale(this.VACCINE_NAME, document.vaccine)
      .addStringNoLocale(this.VACCINE_TYPE, document.type)
      .addDate(this.VACCINE_DATE_OF_VACCINATION, document.dateOfVaccination)
      .addStringNoLocale(this.VACCINE_MANUFACTURER, document.manufacturer)
      .addInteger(
        this.VACCINE_NUMBER_OF_VACCINATION,
        document.numberOfVaccination
      )
      .build();
  }
  public static fromThing(thing: Thing): Nullable<VaccinationDocument> {
    return {
      vaccine: getStringNoLocale(thing, this.VACCINE_NAME),
      type: getStringNoLocale(thing, this.VACCINE_TYPE),
      dateOfVaccination: getDate(thing, this.VACCINE_DATE_OF_VACCINATION),
      manufacturer: getStringNoLocale(thing, this.VACCINE_MANUFACTURER),
      numberOfVaccination: getInteger(
        thing,
        this.VACCINE_NUMBER_OF_VACCINATION
      ),
    };
  }
}
