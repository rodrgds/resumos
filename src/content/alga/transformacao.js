export function initializeTransform(root) {
  const inputs = ['a', 'b', 'c', 'd'].map((id) =>
    root.querySelector('[data-entry=' + id + ']'),
  );
  const plot = root.querySelector('svg');
  function update() {
    const values = inputs.map((input) => input.valueAsNumber);
    if (
      !values.every(Number.isFinite) ||
      !inputs.every((input) => input.validity.valid)
    ) {
      root.querySelector('[data-result]').textContent =
        'Usa quatro entradas inteiras entre −8 e 8.';
      return;
    }
    const [a, b, c, d] = values;
    const extent =
      Math.max(
        2,
        Math.abs(a),
        Math.abs(b),
        Math.abs(c),
        Math.abs(d),
        Math.abs(a + b),
        Math.abs(c + d),
      ) + 1;
    plot.setAttribute(
      'viewBox',
      [-extent, -extent, 2 * extent, 2 * extent].join(' '),
    );
    root
      .querySelector('[data-image]')
      .setAttribute(
        'points',
        '0,0 ' +
          a +
          ',' +
          -c +
          ' ' +
          (a + b) +
          ',' +
          (-c - d) +
          ' ' +
          b +
          ',' +
          -d,
      );
    for (const [id, x, y] of [
      ['first', a, -c],
      ['second', b, -d],
    ]) {
      const line = root.querySelector('[data-line=' + id + ']');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', '0');
      line.setAttribute('x2', x);
      line.setAttribute('y2', y);
    }
    for (const [id, x1, y1, x2, y2] of [
      ['x-axis', -extent, 0, extent, 0],
      ['y-axis', 0, -extent, 0, extent],
    ]) {
      const axis = root.querySelector('[data-line=' + id + ']');
      for (const [attr, value] of Object.entries({ x1, y1, x2, y2 }))
        axis.setAttribute(attr, value);
    }
    const det = a * d - b * c;
    const orientation =
      det === 0
        ? 'A imagem tem área zero.'
        : det > 0
          ? 'A orientação mantém-se.'
          : 'A orientação inverte-se.';
    root.querySelector('[data-result]').textContent =
      'det(A) = ' + det + '; área = ' + Math.abs(det) + '. ' + orientation;
    root.querySelector('[data-columns]').textContent =
      'A e1 = (' +
      a +
      ', ' +
      c +
      '); A e2 = (' +
      b +
      ', ' +
      d +
      '). O quadrado tracejado tem área 1.';
  }
  inputs.forEach((input) => input.addEventListener('input', update));
  root.querySelector('button').addEventListener('click', () => {
    [2, 1, 0, 3].forEach((value, i) => {
      inputs[i].value = value;
    });
    update();
  });
  update();
}
