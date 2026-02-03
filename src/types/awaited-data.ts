interface AwaitedData {
  name: string;
  children?: AwaitedData[];
  [key: string]: unknown;
}

export type {
  AwaitedData,
};
