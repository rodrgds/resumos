## Visão, âmbito e documentação

- **Visão:** utilizadores, problema e valor pretendido. Exemplo: estudantes encontram e reservam uma sala sem deslocações para confirmar horários.
- **Âmbito e roadmap:** capacidades atuais e futuras, com hipóteses críticas e forma de as validar. Equipamento futuro não é capacidade já entregue.
- **Elevator pitch:** explicação breve que permite à audiência repetir o problema e a proposta. Nome e slogan não chegam.

O relatório deve ligar visão, requisitos e aceitação, modelos, arquitetura e razões das decisões, construção/testes, gestão e aprendizagem. Documenta a solução concreta, mantendo modelos coerentes com código.

As instruções de execução identificam versões, configuração, build, testes e dados de exemplo, sem credenciais ou dados pessoais. A evidência de release identifica **versão, histórias concluídas e resultados dos testes**, evitando confundir capturas antigas com o estado atual.

## Protótipo vertical

Um **protótipo vertical** atravessa partes da solução para estudar uma capacidade de ponta a ponta: ecrã, serviço, armazenamento e resposta. Uma única sala com integração real pode resolver essa dúvida melhor do que todos os ecrãs com dados fictícios.

Escolhe pela incerteza: interação exige tarefas com utilizadores; integração exige componentes relevantes reais; concorrência exige pedidos simultâneos. Uma criação isolada de reserva não demonstra proteção contra corrida.

## Pitch e demonstração

Apresenta utilizador e problema concreto, proposta, alternativas, diferença observável, resultados e próximo objetivo. Adapta o detalhe à audiência; uma afirmação «mais rápido» precisa de comparação definida.

Para demonstrar comportamento, prepara versão, estado inicial, dados e resultados esperados:

1. Mostra uma sala livre e confirma uma reserva.
2. Consulta novamente e mostra o intervalo indisponível.
3. Tenta uma reserva sobreposta e mostra recusa, conferindo dados.
4. Cancela e confirma que o intervalo ficou livre.

Explica partes simuladas e funcionalidades ausentes. Um desenho de notificação não prova envio. Um registo preparado da mesma versão pode apoiar a apresentação perante falha externa, mas deve ser identificado como gravação.

## Reflexão e IA

Liga uma observação a uma mudança verificável: integração tardia revelou incompatibilidade de datas; no Sprint seguinte, integração diária de alterações pequenas. Uma declaração genérica de satisfação não explica aprendizagem.

Ao usar IA, identifica sugestões, decisões da equipa e verificações. Compilar não demonstra correção; a equipa continua responsável pela solução.

[Demonstração com estado e resultados](/cadeiras/es/projeto/#demonstrar-comportamento).
