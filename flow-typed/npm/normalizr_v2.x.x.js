// flow-typed signature: 2b91af966016668a1a125ce549671471
// flow-typed version: 5e1c1576ae/normalizr_v2.x.x/flow_>=v0.23.x

declare class Normalizr$Schema {
  define(nestedSchema: Object): void;
}
type Normalizr$SchemaOrObject = Normalizr$Schema | Object;

declare module 'normalizr' {
  declare class Normalizr {
    normalize(obj: Object, schema: Normalizr$SchemaOrObject): Object;
    Schema(key: string, options?: Object): Normalizr$Schema;
    arrayOf(schema: Normalizr$SchemaOrObject, options?: Object): Normalizr$Schema;
    valuesOf(schema: Normalizr$SchemaOrObject, options?: Object): Normalizr$Schema;
  }
  declare var exports: Normalizr;
}
