---
title: Rotação de corpos rígidos
description: Torque, momento de inércia, segunda lei da rotação, rolamento sem deslizamento e conservação do momento angular.
section: conteudo
order: 5
---

Um corpo rígido não é um ponto: pode girar sobre si mesmo enquanto o seu [centro de massa](/cadeiras/f1/centro-massa-momento/) se desloca. Esta página trata da rotação em torno de um eixo fixo, onde cada conceito de translação tem um análogo rotacional: força vira torque, massa vira momento de inércia e momento linear vira momento angular.

## Torque

O **torque** (ou momento de uma força) mede a tendência de uma força para provocar rotação em torno de um ponto. Para uma força $\vec{F}$ aplicada num ponto deslocado de $\vec{r}$ em relação ao eixo,

$$
\vec{\tau} = \vec{r} \times \vec{F}, \qquad \tau = rF\sin\phi,
$$

em $\text{N·m}$, onde $\phi$ é o ângulo entre $\vec{r}$ e $\vec{F}$. O torque é máximo quando a força é perpendicular ao braço ($\sin\phi = 1$) e nulo quando a linha de ação passa pelo eixo. É por isso que a maçaneta fica longe das dobradiças: maior $r$, maior torque para a mesma força.

## Momento de inércia

O **momento de inércia** $I$, em $\text{kg·m}^2$, mede a resistência do corpo à mudança de rotação, tal como a massa mede a resistência à mudança de translação. Depende da massa e de como ela se distribui em torno do eixo: massa longe do eixo conta mais. Três valores a decorar:

- barra fina de massa $M$ e comprimento $L$, eixo pelo centro: $I = ML^2/12$;
- disco sólido de massa $M$ e raio $R$, eixo pelo centro: $I = MR^2/2$;
- anel fino de massa $M$ e raio $R$, eixo pelo centro: $I = MR^2$.

Repara na progressão: para a mesma massa e o mesmo raio, o anel tem o dobro da inércia do disco, porque toda a sua massa está à distância máxima. Quando o eixo não passa pelo centro de massa, o **teorema dos eixos paralelos** soma $Md^2$, onde $d$ é a distância entre os eixos: $I = I_{\text{CM}} + Md^2$.

## Segunda lei da rotação

Para um eixo fixo, a segunda lei de Newton toma a forma rotacional:

$$
\sum \tau = I\alpha,
$$

onde $\alpha = d\omega/dt$ é a aceleração angular em $\text{rad/s}^2$. O ângulo $\theta$, a velocidade angular $\omega$ e a aceleração angular $\alpha$ relacionam-se por derivação e integração exatamente como posição, velocidade e aceleração na [cinemática](/cadeiras/f1/cinematica/).

## Exemplo completo: cilindro a rolar pelo plano

Um cilindro sólido de massa $M = 4{,}0\ \text{kg}$ e raio $R = 0{,}20\ \text{m}$ rola sem deslizar por um plano inclinado de ângulo $\theta = 30^{\circ}$ e comprimento $L = 2{,}0\ \text{m}$, partindo do repouso. Com que velocidade chega ao fundo?

O diagrama de corpo livre tem o peso $M\vec{g}$ no centro, a normal e o atrito estático no ponto de contacto. Pode parecer estranho haver atrito sem deslizamento, mas é o atrito estático que impede o deslizamento e fornece o torque que põe o cilindro a girar. A condição de **rolamento sem deslizamento** liga translação e rotação: $v = \omega R$ e $a = \alpha R$.

Combinando a segunda lei para o centro de massa com a segunda lei da rotação em torno do centro, obtém-se

$$
a = \frac{g\sin\theta}{1 + I/(MR^2)}.
$$

Para o cilindro sólido, $I = MR^2/2$, logo $I/(MR^2) = 1/2$ e $a = g\sin\theta/1{,}5$. Com os números, $a = 9{,}8 \times 0{,}50/1{,}5 = 4{,}90/1{,}5 \approx 3{,}27\ \text{m/s}^2$. Com partida do repouso ao longo de $L = 2{,}0\ \text{m}$, $v^2 = 2aL = 2 \times 3{,}27 \times 2{,}0 = 13{,}08$, logo $v \approx 3{,}6\ \text{m/s}$.

Vale comparar com o bloco a deslizar sem atrito da página das [leis de Newton](/cadeiras/f1/leis-newton/), que desceria com $a = 4{,}9\ \text{m/s}^2$ e chegaria a $v = \sqrt{2 \times 4{,}90 \times 2{,}0} = \sqrt{19{,}6} \approx 4{,}4\ \text{m/s}$. O cilindro chega mais devagar porque parte da energia potencial se converte em energia cinética de rotação, $I\omega^2/2$, em vez de ir toda para a translação. E um anel, com $I/(MR^2) = 1$, seria ainda mais lento: $a = 4{,}90/2 = 2{,}45\ \text{m/s}^2$.

:::tip[Energia como verificação]
Refaz as contas por conservação de energia: $Mgh = Mv^2/2 + I\omega^2/2$ com $h = L\sin\theta = 1{,}0\ \text{m}$ e $\omega = v/R$. Então $4{,}0 \times 9{,}8 \times 1{,}0 = 39{,}2\ \text{J}$ do lado esquerdo, e com $v = 3{,}6\ \text{m/s}$ o lado direito dá $4{,}0 \times 12{,}96/2 + (4{,}0 \times 0{,}04/2) \times (18^2) = 25{,}9 + 13{,}0 = 38{,}9\ \text{J}$, consistente a menos de arredondamentos. Dois caminhos, mesmo resultado.
:::

## Momento angular e a sua conservação

O **momento angular** em torno de um eixo fixo é $L = I\omega$, em $\text{kg·m}^2\text{/s}$. Tal como a força é a taxa de variação do momento linear, o torque é a taxa de variação do momento angular: $\sum \tau = dL/dt$. Sem torque externo, o momento angular conserva-se, mesmo que o corpo mude de forma.

O exemplo clássico é a patinadora: com os braços abertos, $I_1 = 3{,}0\ \text{kg·m}^2$ e $\omega_1 = 3{,}0\ \text{rad/s}$, logo $L = 9{,}0\ \text{kg·m}^2\text{/s}$. Ao fechar os braços, o momento de inércia cai para $I_2 = 1{,}2\ \text{kg·m}^2$ e a velocidade angular sobe para $\omega_2 = L/I_2 = 9{,}0/1{,}2 = 7{,}5\ \text{rad/s}$. A energia cinética de rotação passa de $3{,}0 \times 9{,}0/2 = 13{,}5\ \text{J}$ para $1{,}2 \times 56{,}25/2 = 33{,}75\ \text{J}$. A energia aumentou porque os músculos realizaram trabalho interno, mas o momento angular manteve-se, porque ninguém aplicou torque externo.

## Para onde ir

Falta um tipo de movimento onde a segunda lei aparece em todo o seu esplendor diferencial: as [oscilações](/cadeiras/f1/oscilacoes/).
