import type { PersonRecord } from '@/types';

export const personRecords: PersonRecord[] = [];

export function getPerson(id: string): PersonRecord | undefined {
  return personRecords.find((p) => p.id === id);
}
