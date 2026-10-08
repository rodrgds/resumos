---
name: resumos-moodle
description: Atualizar materiais e inventários Moodle dos Resumos FEUP com o moodle-dl existente, comparar versões e verificar downloads. Usar para recolher novas referências de uma cadeira ou ano letivo.
---

# Atualizar materiais Moodle

Renova os materiais de ensino pedidos e entrega um inventário verificável das diferenças. Os originais ficam em `_data/`; os documentos públicos registam cobertura, proveniência e lacunas. A recolha não reescreve nem publica lições por si só.

## Preparar a recolha

Lê `docs/fontes-moodle.md`, `docs/fontes-moodle.json` e o inventário privado que estes indicam. Identifica as cadeiras, os domínios e o ano pedidos. Confirma o ano nos metadados atuais dos cursos e a data de autoria dentro dos materiais. Um PDF antigo alojado no Moodle atual conserva o ano antigo.

O cliente local fica em `_data/references/tools/moodle-dl/`; a configuração autenticada, em `_data/references/moodle-dl/<ano>/config.json`. Procura os caminhos existentes antes de criar configuração. Lê o código da versão instalada quando precisares de confirmar chamadas, opções ou efeitos laterais.

Usa o ambiente do projeto e a imagem Docker existente quando disponível. [Cliente e limites](references/cliente-e-limites.md) contém os comandos e um exemplo de inventário com `RequestHelper`. Reutiliza a autenticação em memória, com a configuração montada só para leitura. Mantém tokens, cookies, URLs autenticados e respostas completas fora do chat, dos logs e do Git.

Cria uma pasta privada datada para esta recolha. Conserva os inventários anteriores e os originais. Numa worktree, resolve o destino real de `_data/` antes de o montar no Docker. Inspeciona o estado do Git e limita os commits aos documentos e ferramentas que alteraste.

## Descobrir materiais

Obtém os cursos selecionados, os conteúdos das suas secções e as páginas de ensino. Recolhe ficheiros de recursos e pastas, anexos das páginas e ligações em descrições de módulos e secções. Só percorrer os módulos `resource` perde materiais ligados no HTML.

Guarda a relação entre curso, módulo, título, URL de origem e ficheiro. Regista também módulos excluídos e ligações externas, para distinguir material ainda não recolhido de material inexistente. Recursos conhecidos no inventário anterior podem ser revalidados mesmo quando a API já não permite redescobrir as ligações internas.

O comando geral do downloader pode consultar áreas além dos materiais pedidos. Para uma atualização de referências, usa as chamadas delimitadas da referência técnica. As lições Moodle, `mod_lesson`, têm um tratamento próprio: a implementação inspecionada consulta tentativas e notas, e a página HTML pode iniciar um temporizador. Não uses esses percursos para contornar uma lacuna de conteúdo. Lê a secção sobre lições antes de procurar alternativas.

## Descarregar e comparar

Descarrega apenas origens identificadas no âmbito da recolha. Para `pluginfile.php`, usa o mecanismo autenticado do cliente ou o endpoint de ficheiros do mesmo domínio, acrescentando o token apenas ao pedido em memória. Não envies a autenticação Moodle a serviços externos. Verifica o destino dos redirecionamentos antes de os seguir com credenciais.

Para cada ficheiro:

1. Confirma o resultado HTTP e o tamanho declarado, quando existir. Uma página de login com HTTP 200 não é um PDF.
2. Valida o formato: cabeçalho de PDF, abertura e CRC de ZIP, descodificação quando necessária. Para arquivos, inventaria os membros sem executar o conteúdo.
3. Calcula SHA-256 e compara com os objetos anteriores. Conserva a versão antiga quando os bytes mudam. Usa um destino que distinga módulo e versão para evitar colisões de nomes.
4. Volta a ler o ficheiro persistido e confirma tamanho e hash. Só então marca o download como verificado.

Um nome igual não prova que seja a mesma versão; nomes ou URLs diferentes podem ter bytes iguais. Conserva os aliases e a proveniência mesmo quando guardas um único objeto. Usa a identidade do recurso e o hash para distinguir novo, alterado, duplicado e inalterado. Normaliza uma revisão de URL apenas quando conheces a estrutura desse percurso; nunca retires indiscriminadamente os segmentos numéricos de `pluginfile`.

Regista falhas por ficheiro com estado HTTP e tipo de erro sanitizado. Depois de uma falha de autenticação confirmada, interrompe esse percurso e indica a necessidade de renovar a sessão. Não repitas login nem alteres credenciais para esconder a falha. Continua a validação independente dos materiais já obtidos.

## Fechar a atualização

O inventário privado deve permitir repetir a verificação: curso e módulo, URL sem credenciais, nome, caminho local, bytes, SHA-256, estado, diferença face ao inventário anterior e validações de formato. Guarda as páginas de ensino com a mesma proveniência.

Atualiza `docs/fontes-moodle.md` e `docs/fontes-moodle.json` com a data, cobertura e lacunas reais. Mantém as contagens históricas datadas e distingue ligações, objetos únicos e membros de arquivos. Uma lista vazia ou um recurso não visível não prova ausência de materiais. Serviços externos não visitados ficam como não recolhidos, sem os declarar indisponíveis.

Confere os hashes persistidos, o JSON, as diferenças do Git e a ausência de credenciais nos ficheiros versionados. Formata apenas os caminhos alterados. A entrega indica o que entrou, o que mudou, onde estão os originais e o que ficou por obter. Para usar os materiais nas lições, segue depois a skill `resumos-writing` e conserva a atribuição das adaptações.
