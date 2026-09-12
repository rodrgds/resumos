export interface BrainrotClip {
  src: string;
  label: string;
  series: string;
  part: number;
}

const sources = [
  {
    prefix: 'minecraft',
    label: 'Minecraft',
    parts: 65,
  },
  {
    prefix: 'minecraft-a66B9nwGmT4',
    label: 'Minecraft',
    parts: 71,
  },
  {
    prefix: 'subway-hJcv2nZ8x84',
    label: 'Subway Surfers',
    parts: 77,
  },
  {
    prefix: 'subway-wOPAA823UWI',
    label: 'Subway Surfers',
    parts: 64,
  },
  {
    prefix: 'gta-8VmCwcGw6SI',
    label: 'GTA V · Mega ramp',
    parts: 10,
  },
  {
    prefix: 'roblox-wQ7WgNBpufo',
    label: 'Roblox · Parkour',
    parts: 67,
  },
];

export const brainrotClips: BrainrotClip[] = sources.flatMap((source) =>
  Array.from({ length: source.parts }, (_, part) => ({
    src: `/brainrot/${source.prefix}-${String(part).padStart(3, '0')}.mp4`,
    label: source.label,
    series: source.prefix,
    part,
  })),
);
