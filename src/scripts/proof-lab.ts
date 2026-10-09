import { mountFormalEditor } from '../lib/formal-editor';
import { checkProof } from '../lib/logic/proof';
interface Preset {
  title: string;
  premises: string[];
  goal: string;
  source: string;
}
for (const root of document.querySelectorAll<HTMLElement>('[data-proof-lab]')) {
  const presets: Preset[] = JSON.parse(root.dataset.presets!);
  const select = root.querySelector<HTMLSelectElement>('[data-proof-preset]')!;
  const reset = root.querySelector<HTMLButtonElement>('[data-proof-reset]')!;
  const result = root.querySelector<HTMLElement>('[data-proof-result]')!;
  const statement = root.querySelector<HTMLElement>('[data-proof-statement]')!;
  let preset = presets[0];
  const check = () => {
    const checked = checkProof(editor.getValue(), preset.premises, preset.goal);
    result.replaceChildren();
    const summary = document.createElement('p');
    summary.textContent = checked.valid
      ? `Prova válida. ${checked.lines} linhas verificadas; a conclusão foi obtida sem hipóteses abertas.`
      : 'A prova precisa de correções.';
    result.append(summary);
    if (!checked.valid) {
      const list = document.createElement('ul');
      for (const diagnostic of checked.diagnostics) {
        const item = document.createElement('li');
        item.textContent = `${diagnostic.line ? `Linha ${diagnostic.line}` : 'Prova'}: ${diagnostic.message}`;
        list.append(item);
      }
      result.append(list);
    }
  };
  const editor = mountFormalEditor(
    root.querySelector<HTMLElement>('[data-formal-source]')!,
    {
      onRun: check,
      onChange: (value) => {
        reset.hidden = value === preset.source;
        result.textContent =
          'Prova alterada. Verifica para atualizar o resultado.';
      },
    },
  );
  const restore = () => {
    editor.setValue(preset.source);
    reset.hidden = true;
    result.textContent =
      'Edita a prova e verifica as regras e o âmbito das caixas.';
  };
  select.addEventListener('change', () => {
    preset = presets[Number(select.value)];
    statement.textContent = `Premissas: ${preset.premises.join(', ')}. Conclusão: ${preset.goal}.`;
    restore();
  });
  reset.addEventListener('click', () => {
    restore();
    editor.focus();
  });
  root.querySelector('[data-proof-check]')!.addEventListener('click', check);
}
