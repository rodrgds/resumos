const GRAVITY = 9.81;
const RAMP_MASS = 2;
const OSCILLATOR_MASS = 0.25;
const SPRING_CONSTANT = 100;
const INITIAL_POSITION = 0.05;
const number = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 2 });

export function rampState(degrees, friction) {
  const theta = (degrees * Math.PI) / 180;
  const normal = RAMP_MASS * GRAVITY * Math.cos(theta);
  const downhill = RAMP_MASS * GRAVITY * Math.sin(theta);
  const slides = downhill > friction * normal + 1e-9;
  const force = slides ? friction * normal : downhill;
  const acceleration = slides ? (downhill - force) / RAMP_MASS : 0;
  return {
    theta,
    summary: `${degrees}°; μ = ${number.format(friction)}. ${slides ? 'Desliza para baixo' : 'Pode ficar em repouso'}. N = ${number.format(normal)} N; atrito = ${number.format(force)} N; aceleração = ${number.format(acceleration)} m/s².`,
  };
}

export function oscillatorState(damping) {
  const omega = Math.sqrt(SPRING_CONSTANT / OSCILLATOR_MASS);
  const gamma = damping / (2 * OSCILLATOR_MASS);
  const critical = Math.abs(gamma - omega) < 1e-9;
  const under = gamma < omega;
  const position = (t) => {
    if (critical)
      return INITIAL_POSITION * (1 + gamma * t) * Math.exp(-gamma * t);
    if (under) {
      const frequency = Math.sqrt(omega * omega - gamma * gamma);
      return (
        INITIAL_POSITION *
        Math.exp(-gamma * t) *
        (Math.cos(frequency * t) +
          (gamma / frequency) * Math.sin(frequency * t))
      );
    }
    const gap = Math.sqrt(gamma * gamma - omega * omega);
    const fast = -gamma - gap;
    const slow = -gamma + gap;
    return (
      (INITIAL_POSITION *
        (-fast * Math.exp(slow * t) + slow * Math.exp(fast * t))) /
      (slow - fast)
    );
  };
  const regime =
    damping === 0
      ? 'Sem amortecimento'
      : critical
        ? 'Crítico'
        : under
          ? 'Subamortecido'
          : 'Sobreamortecido';
  const period = under
    ? ` Período = ${number.format((2 * Math.PI) / Math.sqrt(omega * omega - gamma * gamma))} s.`
    : ' Sem período de oscilação.';
  const path = Array.from({ length: 401 }, (_, i) => {
    const t = i / 400;
    return `${i ? 'L' : 'M'}${45 + 290 * t},${140 - 2200 * position(t)}`;
  }).join(' ');
  return {
    path,
    summary: `b = ${number.format(damping)} kg/s. ${regime}.${period} x(1 s) = ${number.format(position(1) * 100)} cm.`,
    description: `${regime}: posição entre zero e um segundo, com posição inicial cinco centímetros e velocidade inicial nula.`,
  };
}
