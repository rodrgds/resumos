import { ctOptions, type CTGroupId } from '../data/ct-options';

export const CT_CHOICE_KEY = 'resumos-ct-choices';

export function readCTChoices(): Map<CTGroupId, string> {
  const choices = new Map<CTGroupId, string>();
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(CT_CHOICE_KEY) || '{}',
    );
    if (!saved || typeof saved !== 'object' || Array.isArray(saved))
      return choices;
    for (const group of ['ct1', 'ct2', 'ct3'] as const) {
      const id = (saved as Record<string, unknown>)[group];
      if (
        ctOptions.some(
          (option) => option.id === id && option.groups.includes(group),
        )
      ) {
        choices.set(group, id as string);
      }
    }
  } catch {
    /* The catalogue remains usable without browser storage. */
  }
  return choices;
}
