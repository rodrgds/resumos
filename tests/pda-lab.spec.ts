import { expect, test } from '@playwright/test';
import { pdaPresets } from '../src/lib/pda/presets';
import { parsePda, PdaSearch } from '../src/lib/pda/machine';

const source = `estados q f
alfabeto a b
pilha Z A
inicial q Z
finais f
q a Z -> q AZ
q a A -> q AA
q b A -> f ε
f b A -> f ε
f ε Z -> f Z`;

test('PDA replaces only the top, consumes all input, and distinguishes acceptance criteria', () => {
  const machine = parsePda(source, 'final');
  const result = new PdaSearch(machine, 'ab').run();
  expect(result.kind).toBe('accepted');
  expect(
    result.trace.map((row) => [row.state, row.position, row.stack]),
  ).toEqual([
    ['q', 0, 'Z'],
    ['q', 1, 'AZ'],
    ['f', 2, 'Z'],
  ]);
  expect(new PdaSearch(machine, 'aba').run().kind).toBe('rejected');
  expect(new PdaSearch(parsePda(source, 'empty'), 'ab').run().kind).toBe(
    'rejected',
  );
  const pop = parsePda(source.replace('f ε Z -> f Z', 'f ε Z -> f ε'), 'empty');
  expect(new PdaSearch(pop, 'ab').run().kind).toBe('accepted');
});

test('PDA explores all epsilon choices, terminates identity cycles and reports growth as undecided', () => {
  const branches = `estados q bad f\nalfabeto a\npilha Z A\ninicial q Z\nfinais f\nq ε Z -> bad Z\nq ε Z -> q Z\nq a Z -> f AZ`;
  expect(new PdaSearch(parsePda(branches, 'final'), 'a').run().kind).toBe(
    'accepted',
  );
  expect(new PdaSearch(parsePda(branches, 'final'), '').run().kind).toBe(
    'rejected',
  );
  const growing = branches.replace(
    'q ε Z -> q Z',
    'q ε Z -> q AZ\nq ε A -> q AA',
  );
  expect(new PdaSearch(parsePda(growing, 'final'), '').run().kind).toBe(
    'undecided',
  );
  expect(new PdaSearch(parsePda(growing, 'final'), 'a').run().kind).toBe(
    'accepted',
  );
});

test('PDA empty-stack acceptance cannot skip remaining input, and pushed symbols keep left-to-right order', () => {
  const source = `estados p r\nalfabeto a b c\npilha Z X Y\ninicial p Z\nfinais r\np a Z -> r XY\nr b X -> r ε\nr c Y -> r ε`;
  const result = new PdaSearch(parsePda(source, 'empty'), 'abc').run();
  expect(result.kind).toBe('accepted');
  expect(result.trace.map((row) => row.stack)).toEqual(['Z', 'XY', 'Y', '']);
  expect(new PdaSearch(parsePda(source, 'empty'), 'abca').run().kind).toBe(
    'rejected',
  );
  expect(() => parsePda(source.replace('XY', 'XXW'), 'final')).toThrow('pilha');
});

test('PDA editor runs changed transitions, keeps stacks visible, and distinguishes undecided at 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto('/cadeiras/tc/automatos-pilha/');
  const lab = page
    .getByRole('group', {
      name: 'Laboratório de autómatos de pilha',
      exact: true,
    })
    .first();
  await lab.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  await lab.getByRole('button', { name: 'Passo', exact: true }).click();
  await expect(lab.locator('[data-status]')).toContainText('Pesquisa em curso');
  await expect(lab.locator('[data-frontier-summary]')).toContainText(
    '2 configurações',
  );
  await expect(lab.locator('[data-stack]')).toHaveText('AZ');
  await lab.locator('[data-branch]').selectOption({ label: '(qf, aabb, Z)' });
  await expect(lab.locator('[data-current-description]')).toContainText(
    'Por ler: aabb',
  );
  await expect(lab.locator('[data-status]')).toContainText('Pesquisa em curso');
  await lab.locator('[data-branch]').selectOption({ label: '(q0, abb, AZ)' });
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-status]')).toContainText('Palavra aceite');
  await expect(lab.locator('[data-trace] tbody tr').last()).toContainText('qf');
  await lab.getByLabel('Aceitação', { exact: true }).selectOption('empty');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-status]')).toContainText('Palavra rejeitada');
  await lab
    .getByLabel('Máquina', { exact: true })
    .selectOption('even-palindrome');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-status]')).toContainText('Palavra aceite');
  await lab.getByLabel('Entrada, vazia para ε').fill('0101');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-status]')).toContainText('Palavra rejeitada');
  await lab
    .getByRole('button', { name: 'Editar estado empilha', exact: true })
    .focus();
  await page.keyboard.press('Enter');
  const editor = lab.getByRole('textbox', {
    name: 'Descrição do PDA',
    exact: true,
  });
  await expect(editor).toBeFocused();
  await editor.fill(
    'estados q f\nalfabeto a\npilha Z A\ninicial q Z\nfinais f\nq ε Z -> q AZ\nq ε A -> q AA',
  );
  await lab.getByLabel('Entrada, vazia para ε').fill('');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-status]')).toContainText(
    'Resultado por decidir',
  );
  await editor.fill(
    'estados q f\nalfabeto a\npilha Z A\ninicial q Z\nfinais f\nq a Z -> f AZ',
  );
  await lab.getByLabel('Entrada, vazia para ε').fill('a');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-status]')).toContainText('Palavra aceite');
  await expect(lab.locator('[data-stack]')).toHaveText('AZ');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('PDA presets recognize independently defined count and palindrome languages', () => {
  for (const [id, preset] of Object.entries(pdaPresets)) {
    const machine = parsePda(preset.source, preset.acceptance);
    const alphabet = id === 'even-palindrome' ? ['0', '1'] : ['a', 'b'];
    const words = [''];
    for (let length = 1; length <= 5; length++)
      for (const word of words.filter((word) => word.length === length - 1))
        for (const symbol of alphabet) words.push(word + symbol);
    for (const word of words) {
      const accepted =
        id === 'even-palindrome'
          ? word.length % 2 === 0 &&
            word === Array.from(word).reverse().join('')
          : (() => {
              const match = /^(a*)(b*)$/.exec(word);
              return (
                !!match &&
                match[2].length ===
                  match[1].length * (id === 'double-count' ? 2 : 1)
              );
            })();
      expect(
        new PdaSearch(machine, word).run().kind,
        `${id}: ${word || 'ε'}`,
      ).toBe(accepted ? 'accepted' : 'rejected');
    }
  }
});
