type PossibleValue = string | number | boolean;

interface AwaitedData {
  [key: string]: PossibleValue;
}

export type {
  AwaitedData,
  PossibleValue,
};
