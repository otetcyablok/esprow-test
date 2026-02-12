import type { AwaitedData } from '@/types/awaited-data.ts';
import type { ViewerStructure } from '@/types/structure.ts';

export default function createStructure(data: AwaitedData[] | null): ViewerStructure {
  // could be improved to not draw commas on the last lines of structures (but I think it's not so necessary)
  const result: ViewerStructure = [];

  if (!data) return result;

  for (let index = 0; index < data.length; index++) {
    result.push({
      structure: true,
      value: '{',
    });

    for (const key in data[index]) {
      result.push({
        structure: false,
        value: { key, index },
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
