export const brainrotVoices = [
  {
    id: 'piper',
    name: 'Tugão',
    repository: 'rhasspy/piper-voices',
    revision: 'v1.0.0',
    file: 'pt/pt_PT/tugão/medium/pt_PT-tugão-medium.onnx',
  },
  {
    id: 'miro',
    name: 'Miro',
    repository: 'OpenVoiceOS/pipertts_pt-PT_miro',
    revision: '777a1e1587e95be8833fc99e8e035491c70fcd62',
    file: 'miro_pt-PT.onnx',
  },
  {
    id: 'dii',
    name: 'Dii',
    repository: 'OpenVoiceOS/pipertts_pt-PT_dii',
    revision: 'e3e45e9c0790a847d00937f15cfacb26e745a516',
    file: 'dii_pt-PT.onnx',
  },
] as const;
