export type CompoundKey = {
  key: string;
  index: number;
}
export type StructureSymbol = '{' | '}';

export type StructureElement = {
  structure: true;
  comma?: boolean;
  value: StructureSymbol;
};
export type KeyValueElement = {
  structure: false;
  comma?: boolean;
  value: CompoundKey;
}
export type JsonLine = StructureElement | KeyValueElement;

export type ViewerStructure = JsonLine[];
