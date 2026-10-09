## Simplificação de CFG

1. **Vazias:** calcula as variáveis anuláveis, que derivam ε. Em cada produção, cria todas as combinações de omissão das ocorrências anuláveis; depois retira as regras vazias, preservando separadamente ε no início.
2. **Unitárias:** calcula as cadeias $A\Rightarrow^*B$ só com regras unitárias. Copia para $A$ as produções não unitárias de $B$ e retira as unitárias.
3. **Inúteis:** retira primeiro variáveis não geradoras de palavras terminais e regras que as usam; depois retira as inacessíveis na gramática resultante.

Em $A\to BCB$, se só $B$ for anulável, conserva $BCB$ e acrescenta $CB$, $BC$ e $C$. As duas ocorrências são escolhas independentes. Apagar regras sem substituir o seu efeito pode perder palavras.

## Forma normal de Chomsky

Na **CNF**, cada regra é $A\to BC$ ou $A\to a$. Admite-se $S_0\to\varepsilon$ se necessário, com $S_0$ ausente de todos os lados direitos.

- Simplifica a CFG, preservando ε com um início novo quando necessário.
- Em lados direitos de comprimento pelo menos dois, substitui terminais por variáveis, como $T_a\to a$. Conserva regras já válidas $A\to a$.
- Divide lados compridos: $A\to BCD$ torna-se $A\to BX$, $X\to CD$.
- Não deixes unitárias como $S_0\to S$ na CNF final.

## CYK

Para uma CFG em CNF e palavra **não vazia** $a_1\cdots a_n$, $T[i,j]$ guarda as variáveis que geram exatamente o intervalo $a_i\cdots a_j$.

1. Na diagonal, põe $T[i,i]=\{A\mid A\to a_i\}$.
2. Preenche intervalos por comprimento crescente. Tenta todos os cortes $k$ e todas as regras $A\to BC$.
3. Se $B\in T[i,k]$ e $C\in T[k+1,j]$, acrescenta $A$ a $T[i,j]$.
4. Aceita se o início pertence a $T[1,n]$.

Com $S\to AB\mid AC$, $C\to SB$, $A\to a$, $B\to b$, o intervalo $ab$ contém $S$. Em $aabb$, o intervalo $abb$ contém $C$ pelo corte $ab\mid b$, e o intervalo completo contém $S$ pelo corte $a\mid abb$.

Para gramática fixa, o tempo é $O(n^3)$ e o espaço $O(n^2)$. Se a gramática varia, conta também as produções. Trata ε diretamente pela capacidade do início de a gerar, sem criar tabela vazia.

[Conversão e tabela CYK completas](/cadeiras/tc/propriedades-livres/#cyk-decidir-a-pertença).

## Fecho e decisão

- CFL são fechadas para união, concatenação, estrela e reverso.
- São fechadas para **interseção com regular**: o produto PDA/DFA atualiza ambos por cada letra, mantendo a pilha; ε só atualiza o PDA.
- Também são fechadas para intercalação com regular: em cada letra, escolhe qual máquina avança, preservando a ordem de cada palavra.
- Não há fecho geral para interseção de duas CFL, complemento ou diferença. A interseção de $a^nb^nc^m$ com $a^mb^nc^n$ é $a^nb^nc^n$, que não é CFL.
- Pertença é decidível por CYK; vazio, verificando se o início é gerador. Equivalência, universalidade e ambiguidade de CFG não têm decisores gerais.

## Lema da repetição para CFL

Se $L$ é CFL, existe $p\ge1$ tal que toda a palavra $s\in L$ com $|s|\ge p$ admite $s=uvwxy$ com:

$$
|vwx|\le p,\qquad |vx|\ge1,\qquad
\forall i\ge0,\ uv^iwx^iy\in L.
$$

Bombeia $v$ e $x$ **com o mesmo expoente**; uma pode ser vazia, mas não ambas. A zona curta pode estar em qualquer posição. O lema é necessário, não suficiente.

Para provar que $a^nb^nc^n$ não é CFL, escolhe $s=a^pb^pc^p$ e considera qualquer corte válido. A zona $vwx$ não pode incluir simultaneamente $a$ e $c$, pois teria de atravessar os $p$ símbolos $b$. Com $i=0$, retiras pelo menos um símbolo e deixas um tipo extremo intacto. As três contagens deixam de ser iguais, contradizendo o lema.
