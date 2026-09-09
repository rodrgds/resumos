import tabler from '@iconify-json/tabler/icons.json';

// Subject artwork is independent from the Heroicons used by interface controls.
export const courseIcons = {
  ...tabler.icons,
  automaton: {
    body: '<g fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="14" r="3"/><circle cx="18" cy="14" r="4"/><circle cx="18" cy="14" r="2"/><path d="M1 14h2m6 0h5m-2-2 2 2-2 2M4 11C0 3 12 3 8 11m0-3v3H5"/></g>',
  },
};

export type CourseIconName = keyof typeof courseIcons;
