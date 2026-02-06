import type { CompoundKey } from '@/types/structure.ts';

export default function parseKey(key: CompoundKey) {
  return key.split('-');
}
