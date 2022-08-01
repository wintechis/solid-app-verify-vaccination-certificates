import {
  getType,
  ThingDeserializer,
} from "@solid-app-verifiable-credentials/solid";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { getStringNoLocale, Thing } from "@inrupt/solid-client";

export interface Person {
  name: string;
}

export class PersonDeserializer implements ThingDeserializer<Person> {
  private static readonly RDF_TYPE = FOAF.Person;

  checkType(thing: Thing): boolean {
    return getType(thing) == PersonDeserializer.RDF_TYPE;
  }

  deserialize(thing: Thing): Person {
    return {
      name: getStringNoLocale(thing, FOAF.name) ?? "",
    };
  }
}
