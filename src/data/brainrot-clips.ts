export interface BrainrotClip {
  src: string;
  label: string;
  kind: string;
}

const longVideoStarts = [90, 480, 1050, 1680, 2340, 3000];
const sources = [
  {
    prefix: 'minecraft',
    kind: 'minecraft',
    label: 'Minecraft',
    starts: longVideoStarts,
  },
  {
    prefix: 'minecraft-a66B9nwGmT4',
    kind: 'minecraft',
    label: 'Minecraft',
    starts: longVideoStarts,
  },
  {
    prefix: 'subway-hJcv2nZ8x84',
    kind: 'subway',
    label: 'Subway Surfers',
    starts: longVideoStarts,
  },
  {
    prefix: 'subway-wOPAA823UWI',
    kind: 'subway',
    label: 'Subway Surfers',
    starts: longVideoStarts,
  },
  {
    prefix: 'gta-8VmCwcGw6SI',
    kind: 'gta',
    label: 'GTA V · Mega ramp',
    starts: [30, 120, 210, 300, 390, 480],
  },
  {
    prefix: 'roblox-wQ7WgNBpufo',
    kind: 'roblox',
    label: 'Roblox · Parkour',
    starts: longVideoStarts,
  },
];

export const brainrotClips: BrainrotClip[] = sources.flatMap((source) =>
  source.starts.map((start) => ({
    src: `/brainrot/${source.prefix}-${start}.mp4`,
    label: source.label,
    kind: source.kind,
  })),
);
