import type { AwaitedData } from '@/types/awaited-data.ts';
import type { ViewerStructure } from '@/types/structure.ts';

export default function createStructure(data: AwaitedData[] | null): ViewerStructure {
  const result: ViewerStructure = [];

  if (!data) return result;

  for (let i = 0; i < data.length; i++) {
    result.push(`${i}-open`);

    for (const key in data[i]) {
      result.push(`${i}-${key}`);
    }

    result.push(`${i}-close`);
  }

  return result;
}
