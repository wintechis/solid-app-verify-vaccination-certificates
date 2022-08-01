import {
  getType,
  ThingDeserializer,
  ThingSerializer,
} from "@solid-app-verifiable-credentials/solid";
import { buildThing, getStringNoLocale, Thing } from "@inrupt/solid-client";
import { RDF } from "@inrupt/vocab-common-rdf";

export interface Vaccine {
  name: string;
  type: string;
  manufacturer: string;
}

export enum RDF_MODEL_VACCINE {
  RDF_TYPE = "http://solvercred.org/vaccine",
  VACCINE_NAME = "http://solvercred.org/vaccine#name",
  VACCINE_TYPE = "http://solvercred.org/vaccine#type",
  VACCINE_MANUFACTURER = "http://solvercred.org/vaccine#manufacturer",
}

export class VaccineDeserializer implements ThingDeserializer<Vaccine> {
  checkType(thing: Thing): boolean {
    return getType(thing) == RDF_MODEL_VACCINE.RDF_TYPE;
  }

  deserialize(thing: Thing): Vaccine {
    return {
      name: getStringNoLocale(thing, RDF_MODEL_VACCINE.VACCINE_NAME) ?? "",
      type: getStringNoLocale(thing, RDF_MODEL_VACCINE.VACCINE_TYPE) ?? "",
      manufacturer:
        getStringNoLocale(thing, RDF_MODEL_VACCINE.VACCINE_MANUFACTURER) ?? "",
    };
  }
}

// unused, Vaccines cannot be created within the application
export class VaccineSerializer implements ThingSerializer<Vaccine> {
  serialize(o: Vaccine, base?: Thing): Thing {
    const builder = base ? buildThing(base) : buildThing();

    builder
      .addStringNoLocale(RDF.type, RDF_MODEL_VACCINE.RDF_TYPE)
      .addStringNoLocale(RDF_MODEL_VACCINE.VACCINE_NAME, o.name)
      .addStringNoLocale(RDF_MODEL_VACCINE.VACCINE_TYPE, o.type)
      .addStringNoLocale(
        RDF_MODEL_VACCINE.VACCINE_MANUFACTURER,
        o.manufacturer
      );

    return builder.build();
  }
}
