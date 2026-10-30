// Groups the MT2 questions by the Prolog concept each one tests, so the
// exercise headings describe what to study rather than the fictional scenario.
import { questions as socialVideo } from './social-video';
import { questions as specialFilms } from './special-films';
import { questions as booksAndAuthors } from './books-and-authors';
import { questions as databaseQueries } from './database-queries';
import { questions as operatorsAndRelations } from './operators-and-relations';
import { questions as termsAndCuts } from './terms-and-cuts';
import { questions as sldTrees } from './sld-trees';
import { questions as remainingQueries } from './remaining-queries';
import { questions as gamesAndSearch } from './games-and-search';
import { questions as constraintGraphs } from './constraint-graphs';
import { questions as constraintModels } from './constraint-models';
import { questions as matchingModels } from './matching-models';
import { questions as allocationModels } from './allocation-models';

const all = [
  ...socialVideo,
  ...specialFilms,
  ...booksAndAuthors,
  ...databaseQueries,
  ...operatorsAndRelations,
  ...termsAndCuts,
  ...sldTrees,
  ...remainingQueries,
  ...gamesAndSearch,
  ...constraintGraphs,
  ...constraintModels,
  ...matchingModels,
  ...allocationModels,
];

const byId = new Map(all.map((question) => [question.id, question]));

const group = (ids: string[]) =>
  ids.map((id) => {
    const question = byId.get(id);
    if (!question) throw new Error(`Unknown exercise: ${id}`);
    return question;
  });

export const fundamentos = group([
  'mt2-social-video-username',
  'mt2-social-odd-birthyear',
  'mt2-social-friends',
  'mt2-films-twins',
  'mt2-films-change-self',
  'mt2-books-genre',
  'mt2-books-age',
  'mt2-books-retract',
  'mt2-database-autor',
  'mt2-database-ingredientes-contagem',
  'mt2-database-custo-ingrediente',
  'mt2-database-atualizar-custo',
  'mt2-relations-rule',
  'mt2-relations-parents',
  'mt2-relations-single-child',
  'mt2-relations-ancestors',
]);

export const unificacaoTermos = group([
  'mt2-social-unification',
  'mt2-social-follows-operator',
  'mt2-social-who-operator',
  'mt2-social-univ',
  'mt2-books-filter-args',
  'mt2-books-operators',
  'mt2-database-generos-multiplos',
  'mt2-relations-unify-fact',
  'mt2-relations-term',
  'mt2-relations-io',
  'mt2-terms-operador-paginas',
  'mt2-terms-argumento-termo',
  'mt2-terms-operador-some',
  'mt2-terms-operador-and',
  'mt2-predz-aridade',
]);

export const listasRecursao = group([
  'mt2-social-followers',
  'mt2-social-can-see',
  'mt2-social-tail-recursion',
  'mt2-social-select',
  'mt2-films-pretty-print',
  'mt2-books-map',
  'mt2-books-rotate',
  'mt2-books-matches',
  'mt2-books-move',
  'mt2-database-similaridade',
  'mt2-database-lucro',
  'mt2-database-consumir',
  'mt2-database-listar-pratos',
  'mt2-database-lucro-ordenado',
  'mt2-relations-score',
  'mt2-terms-recursao-final',
  'mt2-terms-listas-diferenca',
  'mt2-contar-pratos-ingrediente',
  'mt2-predx-efeito',
  'mt2-games-binario',
  'mt2-games-inicializar',
  'mt2-games-imprimir',
  'mt2-games-regra',
  'mt2-games-geracao-seguinte',
]);

export const corteNegacao = group([
  'mt2-social-print-genre',
  'mt2-social-date-cuts',
  'mt2-films-actor-movies',
  'mt2-books-youngest',
  'mt2-books-print-genres',
  'mt2-books-red-cut',
  'mt2-database-prato-caro',
  'mt2-relations-cut',
  'mt2-relations-cut-query',
  'mt2-terms-corte-consulta',
  'mt2-terms-mover-corte',
  'mt2-predy-corte',
]);

export const recolhaSolucoes = group([
  'mt2-social-average-following',
  'mt2-social-birthdays',
  'mt2-social-group-videos',
  'mt2-films-played-by',
  'mt2-films-most-popular',
  'mt2-books-diverse',
  'mt2-books-countries',
  'mt2-books-popular',
  'mt2-database-generos-comuns',
  'mt2-relations-collect',
  'mt2-colecoes-equivalencia',
]);

export const sldExecucao = group([
  'mt2-relations-sld',
  'mt2-social-append-sld',
  'mt2-arvore-raiz',
  'mt2-unificacoes-consulta',
]);

export const procuraGrafos = group([
  'mt2-films-connection',
  'mt2-books-path',
  'mt2-relations-solve',
  'mt2-arestas-comuns',
  'mt2-subgrafos-comuns',
  'mt2-games-jogar',
  'mt2-games-tamanho-circulo',
  'mt2-games-maior-circulo',
]);

export const clpfdFundamentos = group([
  'mt2-fatores-erro',
  'mt2-fatores-pares',
  'mt2-grafo-consistencia',
  'mt2-grafo-labeling',
  'mt2-clpfd-capacidades',
  'mt2-restricoes-afirmacoes',
  'mt2-constraints-generate-test',
  'mt2-matching-generate-sums',
  'mt2-matching-search-space',
  'mt2-allocation-binary-space',
  'mt2-allocation-index-space',
  'mt2-allocation-parity',
  'mt2-allocation-propagation',
  'mt2-allocation-reification',
]);

export const clpfdModelos = group([
  'mt2-fatores-corrigir',
  'mt2-fatores-simetria',
  'mt2-pratos-quantidades',
  'mt2-autocarros-otimos',
  'mt2-constraints-labeling-order',
  'mt2-constraints-zigzag',
  'mt2-constraints-recipes',
  'mt2-constraints-cutting',
  'mt2-matching-correct-model',
  'mt2-matching-gym',
  'mt2-matching-optimal',
  'mt2-allocation-compartments',
  'mt2-allocation-compartment-model',
  'mt2-allocation-furniture',
  'mt2-allocation-furniture-model',
]);
