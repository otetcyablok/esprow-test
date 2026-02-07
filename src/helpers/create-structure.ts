import type { AwaitedData } from '@/types/awaited-data.ts';
import type { ViewerStructure } from '@/types/structure.ts';

export default function createStructure(data: AwaitedData[] | null): ViewerStructure {
  const result: ViewerStructure = [];

  if (!data) return result;

  for (let i = 0; i < data.length; i++) {
    result.push({
      structure: true,
      value: '{',
    });

    for (const key in data[i]) {
      result.push({
        structure: false,
        value: `${i}-${key}`,
      });
    }

    result.push({
      structure: true,
      comma: true,
      value: '}',
    });
  }

  return result;
}
