## Escrita e alocação

|            | WT/no-allocate         | WB/allocate                               |
| ---------- | ---------------------- | ----------------------------------------- |
| Write hit  | Cache + nível seguinte | Cache; marca dirty                        |
| Write miss | Só nível seguinte      | Descarrega vítima dirty; instala e altera |
| Read miss  | Carrega linha          | Descarrega vítima dirty; carrega limpa    |

- Escrita e alocação são decisões distintas. Escrita parcial lê os restantes bytes; no modelo adotado, linha inteira dispensa essa leitura.
- Dirty é modificado, não inválido. Vítima usa a **etiqueta antiga**.
- Linha WB válida limpa coincide com a memória, sem agentes externos. A linha válida fornece o valor que o CPU lê; dirty assinala modificação desde a carga, sem revelar o valor antigo na RAM.

## Tempo médio e CPI

$$TMAM=t_{\rm acerto}+mp,\qquad CPI=CPI_{\rm base}+m_Ip_I+r\,m_Dp_D.$$

$t_{\rm acerto}$ tempo de acerto; $m$ taxa de faltas; $p$ penalidade em ciclos. $m_I$/$p_I$ faltas e penalidade de instruções; $m_D$/$p_D$ de dados.

Modelo com penalidades adicionais após a falta, sem sobreposição e ainda não contadas no custo base.

- Taxas por acesso; a taxa D precisa da fração $r$ de instruções com acesso a dados (loads/stores). Unificada: $1+r$ acessos por instrução.
- Para inverter: $r=CPI_{\rm espera}/(mp)-1$, com $0\le r\le1$ neste modelo de uma obtenção e no máximo um acesso a dados por instrução, e esperas em ciclos.
- Acertos $k$ vezes as faltas: $m=1/(k+1)$.

## Dois níveis

$$TMAM=t_1+m_1(t_2+m_{2,l}p_{\rm RAM}),\qquad m_{2,g}=m_1m_{2,l}.$$

$t_1$ acerto em L1; $m_1$ faltas locais de L1; $t_2$ acerto em L2; $m_{2,l}$ faltas locais de L2; $p_{\rm RAM}$ penalidade da RAM; $m_{2,g}$ taxa global.

Taxa local divide pelos pedidos que chegam a L2; global, pelos originais. Contar faltas não conta descargas WB: segue carregamentos e descargas de cada nível.

[Traços e misturas](/cadeiras/ac/politicas-cache/).
