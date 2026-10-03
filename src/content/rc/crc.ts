export const MAX_MESSAGE_BITS = 32;
export const MAX_GENERATOR_DEGREE = 8;

export class CrcInputError extends Error {
  constructor(
    public readonly field: 'message' | 'generator',
    message: string,
  ) {
    super(message);
  }
}

export interface CrcStep {
  input: string;
  before: string;
  feedback: number;
  after: string;
}

export function crcTrace(bits: string, generator: string): CrcStep[] {
  const degree = generator.length - 1;
  const taps = Number.parseInt(generator.slice(1), 2);
  const mask = (1 << degree) - 1;
  let register = 0;
  return Array.from(bits, (input) => {
    const before = register.toString(2).padStart(degree, '0');
    const feedback = register >> (degree - 1);
    register = ((register << 1) | Number(input)) & mask;
    if (feedback) register ^= taps;
    return {
      input,
      before,
      feedback,
      after: register.toString(2).padStart(degree, '0'),
    };
  });
}

export function calculateCrc(message: string, generator: string) {
  if (!/^[01]+$/.test(message)) {
    throw new CrcInputError('message', 'A mensagem deve conter apenas 0 e 1.');
  }
  if (message.length > MAX_MESSAGE_BITS) {
    throw new CrcInputError(
      'message',
      `Usa até ${MAX_MESSAGE_BITS} bits na mensagem.`,
    );
  }
  if (!/^[01]+$/.test(generator)) {
    throw new CrcInputError('generator', 'O gerador deve conter apenas 0 e 1.');
  }
  if (
    generator.length < 2 ||
    !generator.startsWith('1') ||
    !generator.endsWith('1')
  ) {
    throw new CrcInputError(
      'generator',
      'O gerador deve começar e terminar em 1 e ter pelo menos dois bits.',
    );
  }
  const degree = generator.length - 1;
  if (degree > MAX_GENERATOR_DEGREE) {
    throw new CrcInputError(
      'generator',
      `Usa um gerador de grau 1 a ${MAX_GENERATOR_DEGREE}, até ${MAX_GENERATOR_DEGREE + 1} bits.`,
    );
  }
  const input = message + '0'.repeat(degree);
  const steps = crcTrace(input, generator);
  const crc = steps.at(-1)!.after;
  const polynomial = Array.from(generator, (bit, index) => {
    if (bit === '0') return null;
    const power = degree - index;
    return power === 0 ? '1' : power === 1 ? 'x' : `x^${power}`;
  })
    .filter(Boolean)
    .join(' + ');
  return {
    message,
    generator,
    degree,
    input,
    steps,
    crc,
    frame: message + crc,
    polynomial,
  };
}

// The SVG uses only validated bits, bounded numeric geometry and fixed labels.
export function crcCircuit(
  generator: string,
  registers: string,
  input: string | null,
): string {
  const degree = generator.length - 1;
  const width = degree * 112 + 112;
  const feedback = registers[0];
  const last = 24 + (degree - 1) * 112;
  const arrow = (from: number, to: number) =>
    `<path d="M${from} 60H${to}m5 -4l-5 4 5 4" fill="none" stroke="var(--text)" stroke-width="1.5"/>`;
  const xor = (x: number, value: string) =>
    `<path d="M${x} 118V72" fill="none" stroke="var(--accent)" stroke-width="1.5"/><circle cx="${x}" cy="60" r="11" fill="var(--page)" stroke="var(--text)" stroke-width="1.5"/><path d="M${x - 5} 60h10m-5 -5v10" stroke="var(--text)" stroke-width="1.5"/><text x="${x}" y="38" text-anchor="middle" fill="var(--accent)">${value}</text>`;
  const cells = Array.from({ length: degree }, (_, index) => {
    const power = degree - index - 1;
    const x = 24 + index * 112;
    const tapped = generator[degree - power] === '1';
    const incoming = power === 0 ? input : registers[index + 1];
    const value =
      incoming === null ? '?' : String(Number(incoming) ^ Number(feedback));
    return `<g><rect x="${x}" y="40" width="56" height="40" rx="4" fill="var(--surface)" stroke="var(--text)" stroke-width="1.5"/><text x="${x + 28}" y="27" text-anchor="middle">C<tspan baseline-shift="sub" font-size="12">${power}</tspan></text><text x="${x + 28}" y="66" text-anchor="middle" font-size="20" font-weight="700">${registers[index]}</text>${arrow(x + 73, x + 56)}${tapped ? xor(x + 84, value) : ''}${arrow(x + 112, x + (tapped ? 95 : 74))}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="156" viewBox="0 0 ${width} 156" role="img" aria-label="Circuito CRC. Registos: ${registers}. Próxima entrada: ${input ?? 'fim'}. Retorno: ${feedback}." style="font-family:inherit;font-size:14px;color:var(--text)"><g fill="currentColor"><path d="M24 60H10V118H${last + 84}" fill="none" stroke="var(--accent)" stroke-width="1.5"/><text x="24" y="145" fill="var(--accent)">Retorno: ${feedback}</text>${cells}<text x="${last + 137}" y="26" text-anchor="middle">Entrada</text><text x="${last + 137}" y="66" text-anchor="middle" font-size="20" font-weight="700">${input ?? 'fim'}</text></g></svg>`;
}
