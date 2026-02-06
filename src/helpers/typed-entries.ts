export default function typedEntries<T extends Record<PropertyKey, unknown>>(
  obj: T
): { [K in keyof T]: [K, T[K]] }[keyof T][] {
  return Object.entries(obj) as unknown as {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];
}
