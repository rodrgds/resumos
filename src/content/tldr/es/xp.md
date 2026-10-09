## XP e práticas técnicas

**Extreme Programming**, XP, reúne práticas de construção e colaboração para requisitos incertos ou em mudança. Os valores são **comunicação, simplicidade, feedback, coragem e respeito**.

| Práticas                                | Efeito pretendido                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| Planning game e whole team              | Prioridades negociadas com estimativas e acesso a quem esclarece necessidades |
| Small releases e integração contínua    | Feedback cedo sobre produto e compatibilidade entre alterações                |
| TDD e refactoring                       | Clarificar comportamento, depois melhorar estrutura com verificações          |
| Pair programming                        | Rever decisões durante a implementação e partilhar conhecimento               |
| Coding standards e collective ownership | Código consistente e alterável pela equipa, com coordenação                   |
| Simple design e system metaphor         | Estrutura e descrição comuns adequadas às necessidades presentes              |
| Sustainable pace                        | Ritmo que preserve atenção e qualidade                                        |

Scrum organiza responsabilidades, artefactos e eventos; XP explicita práticas técnicas. Podem combinar-se, mas não são sinónimos.

## TDD

1. **Red:** escreve um teste de comportamento ausente e observa a falha pela razão esperada.
2. **Green:** implementa o necessário para passar.
3. **Refactor:** melhora estrutura preservando comportamento e volta a verificar.

Para duração válida de 30 a 120 minutos inclusive, um teste de 29 deve esperar recusa pela regra acordada. Um erro de importação antes de chamar a função não demonstra red. Depois de implementar a fronteira inferior, verifica também 30, 120 e 121.

TDD ajuda a clarificar interfaces e obter feedback. Não descobre todos os requisitos nem substitui integração, revisão e validação com utilizadores.

## Refactoring e desenho simples

- **Refactoring:** altera estrutura interna preservando comportamento observável. Extrair validação duplicada pode sê-lo; mudar o máximo de 120 para 180 altera comportamento.
- Faz passos pequenos, apoiados em testes, mas confere também contratos, dados persistidos e efeitos não cobertos.
- **YAGNI:** não construir para necessidades apenas imaginadas. Não dispensa preservar as regras presentes nem manter uma estrutura compreensível.

## Par, integração e entregas

No par, o **driver** escreve e o **navigator** acompanha decisões e riscos; trocam papéis. A segunda pessoa deve questionar fronteiras e concorrência, não só procurar erros de sintaxe.

Integração contínua exige juntar frequentemente trabalho num estado partilhado com feedback automatizado. Uma ferramenta configurada com branches separados durante semanas não basta.

Uma entrega pequena deve ser útil e verificável. Consultar disponibilidade real de uma sala é um incremento; mostrar todos os ecrãs com dados fictícios pode ser um protótipo de interação. A evidência responde a perguntas diferentes.

[Ciclo TDD com fronteiras](/cadeiras/es/xp/#tdd).
