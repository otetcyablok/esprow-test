type PossibleValue = string | number | boolean;

interface AwaitedData {
  _id: string;
  [key: string]: PossibleValue;
}

export type {
  AwaitedData,
  PossibleValue,
};
