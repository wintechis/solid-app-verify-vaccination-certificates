import {
  buildThing,
  createThing,
  getDate,
  getInteger,
  getIri,
  getStringNoLocale,
  getUrl,
  Thing,
} from "@inrupt/solid-client";

import { RDF } from "@inrupt/vocab-common-rdf";
import {
  getType,
  LazyThing,
  ReferencedThing,
  ThingDeserializer,
  ThingIncompleteError,
  ThingSerializer,
} from "@solid-app-verifiable-credentials/solid";
import { Vaccine, VaccineDeserializer } from "./vaccine.rdf";
import { Person, PersonDeserializer } from "./person.rdf";

export interface Vaccination {
  vaccine: ReferencedThing<Vaccine>;
  numberOfVaccination: number;
  dateOfVaccination: Date;
  vaccinatedPerson: ReferencedThing<Person>;
}

export enum RDF_MODEL_VACCINATION {
  RDF_TYPE = "http://solvercred.org/vaccination",

  DATE_OF_VACCINATION = "http://solvercred.org/vaccination#date-of-vaccination",
  NUMBER_OF_VACCINATION = "http://solvercred.org/vaccination#number-of-vaccination",
  VACCINATED_PERSON = "http://solvercred.org/vaccination#vaccinated-person",
  VACCINE = "http://solvercred.org/vaccination#vaccine",
}

export class VaccinationSerializer implements ThingSerializer<Vaccination> {
  serialize(o: Vaccination, base?: Thing): Thing {
    const builder = base ? buildThing(base) : buildThing();

    builder
      .addIri(RDF.type, RDF_MODEL_VACCINATION.RDF_TYPE)
      .addDate(RDF_MODEL_VACCINATION.DATE_OF_VACCINATION, o.dateOfVaccination)
      .addInteger(
        RDF_MODEL_VACCINATION.NUMBER_OF_VACCINATION,
        o.numberOfVaccination
      )
      .addUrl(RDF_MODEL_VACCINATION.VACCINATED_PERSON, o.vaccinatedPerson.url)
      .addUrl(RDF_MODEL_VACCINATION.VACCINE, o.vaccine.url);

    return builder.build();
  }
}

export class VaccinationDeserializer implements ThingDeserializer<Vaccination> {
  checkType(thing: Thing): boolean {
    const type = getType(thing);
    return type == RDF_MODEL_VACCINATION.RDF_TYPE;
  }

  deserialize(thing: Thing): Vaccination {
    const dateOfVaccination = getDate(
      thing,
      RDF_MODEL_VACCINATION.DATE_OF_VACCINATION
    );
    const numberOfVaccination = getInteger(
      thing,
      RDF_MODEL_VACCINATION.NUMBER_OF_VACCINATION
    );

    if (!dateOfVaccination) {
      throw new ThingIncompleteError(
        "error when creating a vaccination: dateOfVaccination not provided"
      );
    }

    if (!numberOfVaccination) {
      throw new ThingIncompleteError(
        "error when creating a vaccination: numberOfVaccination not provided"
      );
    }

    const vaccinatedPersonUrl = getIri(
      thing,
      RDF_MODEL_VACCINATION.VACCINATED_PERSON
    );
    if (!vaccinatedPersonUrl)
      throw new ThingIncompleteError(
        "error when creating a vaccine: vaccinatedPerson URL not provided"
      );

    const vaccineUrl = getIri(thing, RDF_MODEL_VACCINATION.VACCINE);
    if (!vaccineUrl)
      throw new ThingIncompleteError(
        "error when creating a vaccine: vaccine URL not provided"
      );

    return {
      dateOfVaccination: dateOfVaccination,
      numberOfVaccination: numberOfVaccination,
      vaccine: new LazyThing(vaccineUrl, VaccineDeserializer),
      vaccinatedPerson: new LazyThing(vaccinatedPersonUrl, PersonDeserializer),
    };
  }
}
