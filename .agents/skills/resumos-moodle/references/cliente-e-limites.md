# Cliente existente e limites de recolha

Os caminhos são relativos à raiz do checkout. Confirma-os na instalação atual; os IDs das cadeiras e os anos pertencem a `docs/fontes-moodle.json`, não a esta skill.

## Ambiente

```sh
git -C _data/references/tools/moodle-dl rev-parse HEAD
devenv shell -- docker info --format '{{.ServerVersion}}'
devenv shell -- docker image inspect resumos-moodle-dl:local --format '{{.Id}}'
```

No Mac, se o daemon estiver parado, abre a aplicação Docker e volta a verificar. Se a imagem faltar, constrói-a a partir do clone existente com o seu Dockerfile, sem atualizar o clone silenciosamente. O entrypoint da imagem é `moodle-dl --path /files`; usa `--entrypoint python` para executar uma recolha delimitada através da biblioteca já instalada.

Para compreender a versão local, começa por:

- `moodle_dl/config.py`: carregamento da configuração e opções de descarga.
- `moodle_dl/moodle/request_helper.py`: autenticação, chamadas REST, erros e logging.
- `moodle_dl/moodle/mods/lesson.py`: recolha de lições e consultas ao estado do utilizador.

Não corras `--init` nem `--config` quando basta reutilizar a configuração existente. Não imprimas `config.json` ou passes o token como argumento de shell.

## Inventário delimitado com RequestHelper

Este exemplo consulta somente os cursos passados como argumentos, as secções e as páginas de ensino. Guarda-o na pasta privada da recolha e adapta o destino. Não descarrega anexos nem constitui, sozinho, uma atualização completa.

```python
import json
import logging
import os
import sys
from pathlib import Path

from moodle_dl.config import ConfigHelper
from moodle_dl.main import get_parser
from moodle_dl.moodle.request_helper import RequestHelper

logging.disable(logging.CRITICAL)
os.umask(0o077)
course_ids = [int(value) for value in sys.argv[1:]]
if not course_ids or any(value <= 0 for value in course_ids):
    raise SystemExit("Indica os IDs positivos das cadeiras selecionadas.")

output = Path("/output/api")
output.mkdir(parents=True, exist_ok=False)

try:
    options = get_parser().parse_args(["--path", "/config"])
    config = ConfigHelper(options)
    config.load()
    client = RequestHelper(
        config, options, config.get_moodle_URL(), config.get_token()
    )
    requests = [("courses", "core_course_get_courses_by_field", {
        "field": "ids", "value": ",".join(map(str, course_ids))
    })]
    for course_id in course_ids:
        requests.extend([
            (f"{course_id}-contents", "core_course_get_contents", {
                "courseid": course_id
            }),
            (f"{course_id}-pages", "mod_page_get_pages_by_courses", {
                "courseids[0]": course_id
            }),
        ])
    for name, function, parameters in requests:
        result = client.post(function, parameters)
        (output / f"{name}.json").write_text(
            json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"Guardado: {name}", flush=True)
except Exception as error:
    # Mensagens de exceção podem conter URLs ou parâmetros autenticados.
    print(f"Recolha interrompida: {type(error).__name__}", file=sys.stderr)
    raise SystemExit(1) from None
```

Exemplo de execução, depois de escolher o ano, a pasta da recolha e os IDs atuais:

```sh
moodle_config=$(realpath _data/references/moodle-dl/2026-27)
moodle_run=$(realpath _data/editorial/recolha-moodle-2026-10-08)
devenv shell -- docker run --rm --entrypoint python \
  --mount "type=bind,src=$moodle_config,dst=/config,readonly" \
  --mount "type=bind,src=$moodle_run,dst=/output" \
  resumos-moodle-dl:local /output/inventory.py 4941
```

O ano, a data e o ID acima são exemplos da recolha de 8 de outubro de 2026. Usa uma pasta nova por execução; não apagues `api/` anterior para fazer o exemplo passar. O script termina na primeira falha, conserva o que obteve e não inclui detalhes autenticados na mensagem. Para prosseguir noutra cadeira, usa uma nova recolha delimitada após identificar o erro.

## Lições, questionários e páginas de ensino

`mod_page` fornece páginas de ensino; `mod_lesson` é uma atividade que pode guardar tentativas. Não os confundas pelo nome apresentado no Moodle.

Na versão do cliente inspecionada em 8 de outubro de 2026, `LessonMod.load_lesson_files` chama `mod_lesson_get_user_attempt` e lê `userstats.gradeinfo`. A inspeção do Moodle upstream 4.5 e 5.0 encontrou também:

| Percurso                                             | Efeito relevante                                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `mod_lesson_get_pages`                               | Valida a tentativa e pode consultar histórico e notas.                                        |
| `mod_lesson_get_page_data`                           | Depende do temporizador e pode devolver pontuação e progresso.                                |
| `mod/lesson/view.php`                                | Pode iniciar ou atualizar o temporizador.                                                     |
| `core_files_get_files` em `mod_lesson/page_contents` | A listagem docente depende de permissões; devolveu vazia na recolha FEUP verificada.          |
| `pluginfile` docente já conhecido                    | Permitiu renovar os ficheiros conhecidos sem iniciar uma tentativa. Não descobre novos nomes. |

Isto é evidência dessas versões, não confirmação da versão exata do servidor FEUP. Antes de usar outra API, inspeciona o contrato e a implementação relevante. A designação `read` no serviço não prova ausência de efeitos sobre tentativas.

Procura conteúdo docente por metadados, links já conhecidos ou uma exportação de ensino disponível. Não adivinhes IDs de páginas ou ficheiros. Uma listagem vazia pode refletir permissões; documenta o resultado sem afirmar que o curso não tem páginas. Se só resta iniciar tentativas ou consultar dados pessoais, conserva a lacuna e indica que falta uma exportação docente ou uma API de conteúdo independente desse estado.

Fontes para rever este limite quando o cliente ou o servidor mudar: [API de lições](https://github.com/moodle/moodle/blob/MOODLE_405_STABLE/mod/lesson/classes/external.php), [estado e validação](https://github.com/moodle/moodle/blob/MOODLE_405_STABLE/mod/lesson/locallib.php), [página da atividade](https://github.com/moodle/moodle/blob/MOODLE_405_STABLE/mod/lesson/view.php) e [acesso aos ficheiros](https://github.com/moodle/moodle/blob/MOODLE_405_STABLE/mod/lesson/lib.php).
