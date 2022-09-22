import { buildThing, getDate, getIri, Thing } from "@inrupt/solid-client";

import { RDF } from "@inrupt/vocab-common-rdf";
import {
  getType,
  LazyThing,
  ReferencedThing,
  ThingDeserializer,
  ThingIncompleteError,
  ThingSerializer,
} from "@solid-app-verifiable-credentials/solid";
import { Person, PersonDeserializer } from "./person.rdf";

export interface VaccinationProof {
  expiryDate: Date;
  vaccinatedPerson: ReferencedThing<Person>;
  verifiedByAuthority: ReferencedThing<Person>;
}

export enum RDF_MODEL_VACCINATION_PROOF {
  RDF_TYPE = "http://solvercred.org/vaccination_proof",

  EXPIRY_DATE = "http://solvercred.org/vaccination_proof#date-of-vaccination",
  VACCINATED_PERSON = "http://solvercred.org/vaccination_proof#vaccinated-person",
  VERIFIED_BY_AUTHORITY = "http://solvercred.org/vaccination_proof#veryfied-by-authority",
}

export class VaccinationProofSerializer
  implements ThingSerializer<VaccinationProof>
{
  serialize(o: VaccinationProof, base?: Thing): Thing {
    const builder = base ? buildThing(base) : buildThing();

    builder
      .addIri(RDF.type, RDF_MODEL_VACCINATION_PROOF.RDF_TYPE)
      .addDate(RDF_MODEL_VACCINATION_PROOF.EXPIRY_DATE, o.expiryDate)
      .addUrl(
        RDF_MODEL_VACCINATION_PROOF.VACCINATED_PERSON,
        o.vaccinatedPerson.url
      )
      .addUrl(
        RDF_MODEL_VACCINATION_PROOF.VERIFIED_BY_AUTHORITY,
        o.verifiedByAuthority.url
      );

    return builder.build();
  }
}

export class VaccinationProofDeserializer
  implements ThingDeserializer<VaccinationProof>
{
  checkType(thing: Thing): boolean {
    const type = getType(thing);
    return type == RDF_MODEL_VACCINATION_PROOF.RDF_TYPE;
  }

  deserialize(thing: Thing): VaccinationProof {
    const expiryDate = getDate(thing, RDF_MODEL_VACCINATION_PROOF.EXPIRY_DATE);

    if (!expiryDate) {
      throw new ThingIncompleteError(
        "error when creating a vaccination: expiryDate not provided"
      );
    }

    const vaccinatedPersonUrl = getIri(
      thing,
      RDF_MODEL_VACCINATION_PROOF.VACCINATED_PERSON
    );
    if (!vaccinatedPersonUrl)
      throw new ThingIncompleteError(
        "error when creating a vaccine: vaccinatedPerson URL not provided"
      );

    const verifiedByAuthority = getIri(
      thing,
      RDF_MODEL_VACCINATION_PROOF.VERIFIED_BY_AUTHORITY
    );
    if (!verifiedByAuthority)
      throw new ThingIncompleteError(
        "error when creating a vaccine: verifiedByAuthority URL not provided"
      );

    return {
      expiryDate: expiryDate,
      vaccinatedPerson: new LazyThing(vaccinatedPersonUrl, PersonDeserializer),
      verifiedByAuthority: new LazyThing(
        verifiedByAuthority,
        PersonDeserializer
      ),
    };
  }
}
