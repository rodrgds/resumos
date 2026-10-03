# Desenvolvimento e publicação

[Documentação](README.md)

## Correr e verificar

```sh
devenv shell
npm ci
npm run build
npm run dev
```

Abre `http://localhost:4321`. Devenv fornece Node 24 e Typst 0.15.1. Fora de Devenv, instala estas dependências no ambiente do projeto. Mermaid usa Chrome headless apenas na construção; os comandos de desenvolvimento, build e testes preparam a versão exigida pelo lockfile. Para chamar `astro` ou `playwright` diretamente, corre antes `npm run build:mermaid`.

```sh
npm run check
npm run format:check
npm test
npm run build
npm run preview
```

O build fica em `dist/`. Os testes compilam o site em `.test-dist/` e verificam-no com Chromium. Para usar um navegador existente, define `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Em CI, o workflow instala o Chromium.

Em produção, `public/sw.js` regista um service worker depois do primeiro carregamento. Guarda as páginas visitadas e os recursos estáticos pequenos para leitura sem ligação, mas não guarda vídeos, áudios ou WebAssembly do Brain rot. A navegação tenta primeiro a rede para receber conteúdo novo; a cópia local só é usada quando a rede falha.

Para renderizar animações, segue [Manim no guia de contribuição](../CONTRIBUTING.md#animações-com-manim). O build normal usa os ficheiros gerados, sem Manim ou FFmpeg.

## Organização e dados

A página inicial reúne as cadeiras de 2026/27 por ano e semestre. As cadeiras com conteúdo publicado dão acesso aos apontamentos. A [cadeira fictícia de exemplo](https://resumos.rgo.pt/exemplo/) mostra os formatos de conteúdo.

- `src/data/courses.ts`: plano de estudos, ECTS, cores e ícones.
- `src/data/ct-options.ts`: opções dos grupos CT I, II e III, com os ids de conteúdo e as fichas oficiais. São escolhas dentro dos grupos, não cadeiras adicionais no plano. Lista de 2026/27 verificada no SIGARRA a 1 de outubro de 2026.

Os dados curriculares vêm do [plano oficial de 2026/27](https://sigarra.up.pt/feup/pt/cur_geral.cur_planos_estudos_view?pv_ano_lectivo=2026&pv_origem=CUR&pv_plano_id=31224&pv_tipo_cur_sigla=), consultado a 9 de setembro de 2026. CT I, II e III são grupos de opções. Projeto UP substitui o nome antigo Projeto FEUP.

O [MEIC](https://resumos.rgo.pt/meic/) inclui as 57 cadeiras com nome no [plano SIGARRA de 2026/27](https://sigarra.up.pt/feup/pt/cur_geral.cur_planos_estudos_view?pv_ano_lectivo=2026&pv_plano_id=31204), incluindo as optativas e as opções de Competências Transversais.

## Publicar

O projeto Cloudflare Pages `resumos-feup` está ligado a este repositório. Pushes para `main` publicam em `https://resumos.rgo.pt`; outros branches têm previews.

A configuração usa `bash scripts/cloudflare-build.sh`, pasta de saída `dist`, Node 24 e imagem de build v3. O script descarrega Typst 0.15.1, confirma o SHA-256 do arquivo oficial, instala as dependências do lockfile, verifica tipos e compila o site com a pesquisa. Não é preciso um token Cloudflare no GitHub.

O workflow GitHub Actions verifica formatação, tipos, testes de navegador e build. Cloudflare compila de forma independente, por isso os checks de GitHub não bloqueiam automaticamente a publicação.

As lições usam os marcadores `email_off` para [impedir a transformação de endereços pelo Cloudflare](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/). Conserva-os: os emails fictícios em exemplos SQL têm de chegar intactos ao editor, à impressão e aos leitores sem JavaScript.

`src/pages/404.astro` gera `dist/404.html`. Mantém este ficheiro: sem uma página 404 na raiz, [Cloudflare Pages serve a página inicial para URLs inexistentes](https://developers.cloudflare.com/pages/configuration/serving-pages/). Confirma na publicação que um URL de rascunho devolve 404.

## Créditos

Oito fontes de leitura alojadas localmente: Manrope, Inter, Atkinson Hyperlegible, Lexend, Source Serif 4, Lora, Literata e IBM Plex Mono. O navegador descarrega a fonte escolhida. Ícones [Heroicons](https://heroicons.com/) nos controlos. As cadeiras usam [Tabler Icons](https://github.com/tabler/tabler-icons) (MIT) e desenhos próprios através de `CourseIcon.astro`. O campo `icon` de cada cadeira escolhe o símbolo. Todos são SVG, sem JavaScript no navegador. [Fontes dos logótipos](../public/logos/README.md). A ilustração dos pontos foi criada para este projeto.

Inspirado nos [Resumos LEIC do Técnico](https://resumos.leic.pt/), com código novo. O site é independente da FEUP e da U.Porto. `data/` e `_data/` são referências locais, ignoradas pelo Git, TypeScript e formatação.

Os projetos em `src/data/student-projects.json` precisam de evidência pública da afiliação FEUP e do conteúdo. Distingue ano letivo de criação do repositório e não reproduzas números de aluno, contactos privados ou credenciais de demonstração.
