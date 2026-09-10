export const brainrotVoices = [
  {
    id: 'piper',
    name: 'Tugão',
    engine: 'piper',
    repository: 'rhasspy/piper-voices',
    revision: 'v1.0.0',
    file: 'pt/pt_PT/tugão/medium/pt_PT-tugão-medium.onnx',
  },
  {
    id: 'dii',
    name: 'Dii',
    engine: 'piper',
    repository: 'OpenVoiceOS/pipertts_pt-PT_dii',
    revision: 'e3e45e9c0790a847d00937f15cfacb26e745a516',
    file: 'dii_pt-PT.onnx',
  },
  {
    id: 'miro',
    name: 'Miro',
    engine: 'piper',
    repository: 'OpenVoiceOS/pipertts_pt-PT_miro',
    revision: '777a1e1587e95be8833fc99e8e035491c70fcd62',
    file: 'miro_pt-PT.onnx',
  },
  {
    id: 'rego',
    name: 'Eduardo Rêgo',
    engine: 'sopro',
    reference: '/brainrot/voz-rego.mp3',
  },
  {
    id: 'mendes',
    name: 'Fernando Mendes',
    engine: 'sopro',
    reference: '/brainrot/voz-mendes.mp3',
  },
  {
    id: 'mourinho',
    name: 'José Mourinho',
    engine: 'sopro',
    reference: '/brainrot/voz-mourinho.mp3',
  },
  {
    id: 'rap',
    name: 'Ricardo Araújo Pereira',
    engine: 'sopro',
    reference: '/brainrot/voz-rap.mp3',
  },
  {
    id: 'herman',
    name: 'Herman José',
    engine: 'sopro',
    reference: '/brainrot/voz-herman.mp3',
  },
  {
    id: 'toy',
    name: 'Toy',
    engine: 'sopro',
    reference: '/brainrot/voz-toy.mp3',
  },
  {
    id: 'sopro',
    name: 'Tugão',
    engine: 'sopro',
    reference: '/brainrot/voz-tugao-cc0.mp3',
  },
  {
    id: 'markl',
    name: 'Nuno Markl',
    engine: 'sopro',
    reference: '/brainrot/voz-markl.mp3',
  },
] as const;

export const soproModel = {
  repository: 'samuel-vitorino/sopro-v2-turbo-onnx',
  revision: '1e6968c19929699386b7ab3d5ff52225be312c33',
};
