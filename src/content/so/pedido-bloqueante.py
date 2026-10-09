from manim import Rectangle, Scene, Text, Transform, VGroup
from resumos_manim import palette


class PedidoBloqueante(Scene):
    def construct(self):
        def text(value, size=40):
            return Text(value, font="DejaVu Sans", font_size=size, color=palette["text"])

        self.add(text("Uma CPU: A espera pelos dados", 46).move_to([0, 3.1, 0]))
        positions = {"pronto": [-4, 0.2, 0], "cpu": [0, 0.2, 0], "bloqueado": [4, 0.2, 0]}
        for key, label in [("pronto", "Pronto"), ("cpu", "A correr"), ("bloqueado", "Bloqueado")]:
            box = Rectangle(width=3.4, height=2.3, color=palette["muted"]).move_to(positions[key])
            self.add(box, text(label, 36).move_to([positions[key][0], 1.9, 0]))

        def process(name, color, position):
            return VGroup(Rectangle(width=1.25, height=0.85, color=palette[color], fill_color=palette[color], fill_opacity=0.15), text(name, 42)).move_to(position)

        a = process("A", "accent", positions["cpu"])
        b = process("B", "diagram-secondary", positions["pronto"])
        caption = text("A usa a CPU; B só espera pela CPU.", 35).move_to([0, -2.2, 0])
        self.add(a, b, caption)
        self.wait(1.7)
        self.play(a.animate.move_to(positions["bloqueado"]), Transform(caption, text("A pede uma leitura e bloqueia à espera de I/O.", 34).move_to(caption)), run_time=1)
        self.wait(0.8)
        self.play(b.animate.move_to(positions["cpu"]), Transform(caption, text("O escalonador escolhe B: a CPU continua ocupada.", 33).move_to(caption)), run_time=1)
        self.wait(1.4)
        self.play(a.animate.move_to(positions["pronto"]), Transform(caption, text("O I/O termina: A fica pronto; B continua a correr.", 33).move_to(caption)), run_time=1)
        self.wait(2.2)
        self.play(b.animate.move_to([-4, -0.4, 0]), Transform(caption, text("Mais tarde, o escalonador retira a CPU a B.", 34).move_to(caption)), run_time=0.8)
        self.play(a.animate.move_to(positions["cpu"]), Transform(caption, text("Só quando é escolhido, A retoma a leitura.", 35).move_to(caption)), run_time=0.8)
        self.wait(2.5)
