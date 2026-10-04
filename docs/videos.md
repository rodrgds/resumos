# Catálogo de aulas para vídeos

[Documentação](README.md)

Os vídeos e a produção de clips vivem no projeto separado `resumos-videos`, em `~/dev/resumos-videos`. O leitor dos Resumos não carrega gameplay nem motores de voz.

`/lesson-catalog.json` exporta as aulas publicadas com o id do conteúdo, título, cadeira e URL público. Não inclui apresentações, folhas de consulta, exercícios, rascunhos nem a cadeira de exemplo. O build usa a mesma seleção de aulas que a navegação.

O projeto de vídeos lê este catálogo e associa cada clip a um ou mais ids. Uma aula pode ter vários clips sobre temas diferentes. A ausência de clips significa que ainda não há um vídeo, não que a aula esteja incompleta. Os clips podem ter um ficheiro local e um URL de publicação em redes sociais.

Depois de alterar as aulas, compila os Resumos e corre `npm run sync:lessons` no projeto de vídeos. O comando lê `../resumos/dist/lesson-catalog.json`; `RESUMOS_CATALOG` permite indicar outro ficheiro ou o URL público. Alterar o id de uma aula exige atualizar as associações no projeto de vídeos.
