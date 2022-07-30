import {
  getIri,
  getSolidDataset,
  getThing,
  Thing,
  Url,
} from "@inrupt/solid-client";
import {
  IncorrectRDFTypeError,
  ThingNotFetchableError,
} from "./thingIncompleteError";
import { RDF } from "@inrupt/vocab-common-rdf";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export function getType(thing: Thing): string | null {
  return getIri(thing, RDF.type);
}

export interface ReferencedThing<T> {
  url: string | Url;

  get(): Promise<T | undefined>;
}

export class LazyThing<T, P extends ThingDeserializer<T>>
  implements ReferencedThing<T>
{
  protected t?: T;
  protected thing?: Thing | null;
  protected parser: ThingDeserializer<T>;

  public constructor(
    public url: string,
    parserConstructor: new () => ThingDeserializer<T>
  ) {
    this.parser = new parserConstructor();
  }

  public async get(): Promise<T | undefined> {
    if (!this.t) await this.getThing();
    return this.t;
  }

  protected async getThing() {
    try {
      const parsedUrl = new URL(this.url);
      parsedUrl.hash = "";

      const ds = await getSolidDataset(parsedUrl.href, {
        fetch: getDefaultSession().fetch,
      });
      this.thing = getThing(ds, this.url);
    } catch (e) {
      console.error(e);
    }

    if (!this.thing) throw new ThingNotFetchableError();

    if (!this.parser.checkType(this.thing)) {
      throw new IncorrectRDFTypeError(
        "The type of thing " +
          getType(this.thing) +
          " is incompatible with the provided parser: " +
          typeof this.parser
      );
    }

    this.t = this.parser.deserialize(this.thing);
  }
}

export interface ThingSerializer<T> {
  serialize(o: T, base?: Thing): Thing;
}

export interface ThingDeserializer<T> {
  checkType(thing: Thing): boolean;
  deserialize(thing: Thing): T;
}

export type ThingSerDe<T> = ThingSerializer<T> & ThingDeserializer<T>;
