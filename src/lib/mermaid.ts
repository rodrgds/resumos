import { randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { optimize } from 'svgo';
import { themeDiagram } from './diagram-theme';

const require = createRequire(import.meta.url);
const cli = join(require.resolve('@mermaid-js/mermaid-cli'), '..', 'cli.js');
const cache = new Map<string, string>();

function compile(source: string) {
  const cached = cache.get(source);
  if (cached) return cached;
  const directory = mkdtempSync(join(tmpdir(), 'resumos-mermaid-'));
  try {
    const input = join(directory, 'diagram.mmd');
    const output = join(directory, 'diagram.svg');
    const config = join(directory, 'mermaid.json');
    const browser = join(directory, 'browser.json');
    writeFileSync(input, source);
    writeFileSync(
      config,
      JSON.stringify({
        securityLevel: 'strict',
        htmlLabels: false,
        theme: 'base',
        look: 'classic',
        fontFamily: 'Arial, sans-serif',
        themeVariables: {
          useGradient: false,
          fontSize: '16px',
          primaryColor: '#ffffff',
          primaryTextColor: '#292a30',
          primaryBorderColor: '#8c2d3b',
          secondaryColor: '#f3e9e9',
          tertiaryColor: '#ffffff',
          lineColor: '#292a30',
          textColor: '#292a30',
          actorBkg: '#ffffff',
          actorBorder: '#8c2d3b',
          actorTextColor: '#292a30',
          signalColor: '#292a30',
          signalTextColor: '#292a30',
          noteBkgColor: '#f3e9e9',
          noteBorderColor: '#8c2d3b',
          noteTextColor: '#292a30',
        },
        sequence: { mirrorActors: false, useMaxWidth: false },
        flowchart: { htmlLabels: false, useMaxWidth: false },
      }),
    );
    writeFileSync(
      browser,
      JSON.stringify({
        // Linux build workers run trusted repository diagrams as root.
        args: process.platform === 'linux' ? ['--no-sandbox'] : [],
      }),
    );
    execFileSync(
      process.execPath,
      [
        cli,
        '-i',
        input,
        '-o',
        output,
        '-c',
        config,
        '-p',
        browser,
        '-b',
        'transparent',
        '-q',
      ],
      { timeout: 60_000 },
    );
    const svg = readFileSync(output, 'utf8');
    cache.set(source, svg);
    return svg;
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

export function renderMermaid(source: string) {
  // Inline styles stay inside this figure. Give markers unique ids when a page
  // contains several diagrams, then adapt the authored palette to reading.
  const svg = optimize(compile(source), {
    plugins: [
      { name: 'inlineStyles', params: { onlyMatchedOnce: false } },
      'convertStyleToAttrs',
      'removeStyleElement',
      {
        name: 'preserve-readable-size',
        fn: () => ({
          element: {
            enter(node) {
              if (node.name !== 'svg' || !node.attributes.viewBox) return;
              const [, , width, height] = node.attributes.viewBox.split(/\s+/);
              node.attributes.width = width;
              node.attributes.height = height;
              delete node.attributes.style;
            },
          },
        }),
      },
      { name: 'prefixIds', params: { prefix: `mermaid-${randomUUID()}` } },
    ],
  }).data;
  return themeDiagram(svg);
}
