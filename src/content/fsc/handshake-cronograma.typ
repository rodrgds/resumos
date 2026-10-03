#set page(width: auto, height: auto, margin: 8pt)
// Handshake de 4 fases: dados estaveis de valid=1 ate ack=1
#table(columns: 5, [passo],[dados],[valid],[ack],[regra],[1],[D fixo],[0],[0],[estabiliza D antes],[2],[D],[1],[0],[emissor pede],[3],[D],[1],[1],[recetor aceita],[4],[D],[0],[1],[emissor fecha],[5],[livre],[0],[0],[recetor fecha])
