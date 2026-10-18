## Simplificação de CFG

1. **Produções vazias:** calcula as variáveis anuláveis, isto é, as que derivam $\varepsilon$. Por cada produção, cria todas as combinações que omitem ocorrências anuláveis. Depois retira as produções vazias e preserva $\varepsilon$ apenas se a linguagem original a continha, usando um início novo que não aparece em nenhum lado direito.
2. **Produções unitárias:** calcula todos os pares $A\Rightarrow^*B$ alcançados só com regras unitárias $A\to B$. Depois copia para $A$ todas as produções não unitárias de cada $B$ alcançado e retira as regras unitárias.
3. **Símbolos inúteis:** retira primeiro as variáveis não geradoras e as regras que as usam; depois retira as variáveis inacessíveis a partir do início na gramática que ficou.

Em $A\to BCB$ com só $B$ anulável, conserva a produção original $BCB$ e acrescenta $CB$, $BC$ e $C$. Apagar a regra vazia sem acrescentar estas combinações perderia palavras. A ordem segura é: produções vazias, unitárias, variáveis não geradoras e depois inacessíveis.

## Forma normal de Chomsky

Na forma normal de Chomsky, cada produção tem a forma $A\to BC$ ou $A\to a$. A extensão admite $S_0\to\varepsilon$ quando $\varepsilon$ pertence à linguagem, desde que o início $S_0$ não apareça em nenhum lado direito.

1. Simplifica a gramática e usa um início novo quando $\varepsilon$ pertence à linguagem.
2. Substitui cada terminal em corpos com comprimento pelo menos dois por uma variável nova, por exemplo $T_a\to a$; conserva as regras $A\to a$, que já estão na forma certa.
3. Divide os corpos compridos: $A\to BCD$ passa a $A\to BX$ e $X\to CD$, com $X$ novo.
4. A CNF final não conserva regras unitárias como $S_0\to S$.

## CYK

Usa uma CFG em CNF e uma palavra não vazia $w=a_1\cdots a_n$. A célula $T[i,j]$ contém as variáveis que geram a subpalavra $a_i\cdots a_j$.

1. Na diagonal, $T[i,i]=\{A\mid A\to a_i\}$.
2. Preenche por comprimento crescente e tenta todos os cortes $k$ entre $i$ e $j$: quando $A\to BC$ com $B\in T[i,k]$ e $C\in T[k+1,j]$, junta $A$ a $T[i,j]$.
3. Aceita a palavra quando o símbolo inicial pertence a $T[1,n]$.

O preenchimento custa tempo $O(n^3)$ e espaço $O(n^2)$ para gramática fixa. A palavra vazia trata-se à parte, sem tabela. Cada corte respeita o intervalo: numa produção $A\to BC$ aplicada a $[i,j]$ com corte $k$, a variável $B$ tem de gerar o prefixo esquerdo $a_i\cdots a_k$ e $C$ o sufixo direito $a_{k+1}\cdots a_j$.

[Conversão e tabela CYK completas](/cadeiras/tc/propriedades-livres/#cyk-decidir-a-pertença).

## Fecho e decisão

- As CFL são fechadas para união, concatenação, estrela, reverso e **interseção com uma linguagem regular**. O produto entre PDA e DFA conserva a pilha do PDA; uma transição vazia do PDA não altera o estado do DFA.
- As CFL não são fechadas para interseção geral, complemento ou diferença. Por exemplo, $a^nb^nc^m\cap a^mb^nc^n=a^nb^nc^n$, que não é CFL.
- A pertença por CYK e o vazio pelo teste de símbolo inicial gerador são decidíveis. Não há decisor geral para equivalência, universalidade ou ambiguidade de CFG.

## Lema da repetição para CFL

Se $L$ é livre de contexto, existe um inteiro $p\ge1$ tal que toda a palavra $s\in L$ com $|s|\ge p$ admite uma decomposição $s=uvwxy$ com $|vwx|\le p$, $|vx|\ge1$ e $uv^iwx^iy\in L$ para todo o inteiro $i\ge0$. As partes $v$ e $x$ bombeiam com o mesmo expoente e a zona curta pode estar em qualquer posição. Esta condição é necessária, mas não suficiente.

- Com $L=\{a^nb^nc^n\mid n\ge0\}$ e $s=a^pb^pc^p$, a zona $|vwx|\le p$ nunca cobre um $a$ e um $c$ ao mesmo tempo, pois teria de atravessar todo o bloco de $b$. Retirar $v$ e $x$ com $i=0$ deixa um dos extremos intacto e quebra a igualdade das três contagens.
- Um corte feliz não refuta o lema. Em $K=\{a^nb^nz\mid n\ge0,\ z\in\{a,b\}^n\}$, a palavra $a^pb^{2p}$ admite um corte que bombeia sempre dentro de $K$, por isso não serve como testemunha. A testemunha que funciona é $s=a^{2p}b^{2p}a^{2p}$: a zona curta, com no máximo $p$ símbolos, nunca toca nos dois blocos extremos de $a$ ao mesmo tempo. Com o mesmo expoente $i=0$ em todos os cortes válidos, a palavra obtida sai sempre de $K$. A prova completa, com a tabela que cobre todos os cortes, está na lição.

[Cortes e prova completa](/cadeiras/tc/propriedades-livres/#separar-a-zona-curta-dos-extremos).
