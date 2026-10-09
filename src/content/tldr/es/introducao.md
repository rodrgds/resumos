## Engenharia de Software e qualidade

- **Engenharia de Software:** aplicação sistemática de princípios de engenharia ao desenvolvimento, operação e manutenção de software. As decisões devem ter razões e evidência.
- O produto inclui programas, configuração, dados de operação e documentação. Código correto sem instruções de instalação ou recuperação pode ser difícil de manter.
- **Qualidade:** satisfazer as necessidades nas condições de uso previstas, incluindo funcionalidade, desempenho, fiabilidade, segurança, usabilidade e manutenção.
- **Custo do ciclo de vida:** desenvolvimento, operação, correção e evolução. Poupar na implementação pode aumentar o suporte; abstrações sem necessidade também custam manutenção.

Uma confirmação imediata no ecrã não tem qualidade se o servidor recusar depois a reserva. Mede o desempenho do comportamento correto.

## Complexidade e coordenação

- A complexidade **técnica** inclui estados, dependências, concorrência e distribuição. A de **gestão** inclui interesses, pessoas, contratos e incerteza.
- Um **stakeholder** influencia o sistema ou sofre os seus efeitos. Comprador e utilizador podem ser pessoas diferentes.
- **Esforço** mede trabalho, por exemplo em pessoa-dias. **Duração** mede tempo de calendário. Seis pessoa-dias não garantem dois dias com três pessoas: há dependências, aprendizagem e integração.

Com $n$ pessoas, os pares possíveis de comunicação são:

$$P=\frac{n(n-1)}2.$$

Quatro pessoas dão seis pares; sete dão 21. São pares possíveis, não reuniões nem horas. A **lei de Brooks** alerta que acrescentar pessoas a um projeto atrasado pode atrasá-lo mais, conforme a divisibilidade do trabalho e o custo de integração.

## Necessidade, decisão e evidência

Para impedir reservas sobrepostas da mesma sala:

1. Define a regra para todas as reservas confirmadas.
2. Coloca a verificação e a criação numa operação **atómica** no servidor que controla os dados.
3. Testa duas tentativas concorrentes: espera uma confirmação, uma recusa e uma só reserva guardada.
4. Regista a razão da decisão. Uma verificação apenas no ecrã pode ficar desatualizada antes da gravação.

Um teste passado dá evidência para o cenário executado, não uma prova de todos os comportamentos. A crise do software e a conferência NATO de 1968 ajudaram a consolidar a disciplina; modularidade, modelação, métodos ágeis e integração contínua tratam dificuldades diferentes.

[Explicação da concorrência e da evidência](/cadeiras/es/introducao/#do-problema-à-evidência).
