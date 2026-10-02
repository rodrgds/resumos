from manim import Arrow, Rectangle, Scene, Text, Transform, VGroup
from resumos_manim import palette


class AckCumulativo(Scene):
    def construct(self):
        def label(value, position, size=50, colour="text"):
            return Text(
                value,
                font="DejaVu Sans",
                font_size=size,
                color=palette[colour],
            ).move_to(position)

        def state(value, y, colour="text"):
            return label(value, [2.3, y, 0], size=48, colour=colour)

        def pointer(y):
            return Arrow(
                [-5.9, y, 0], [-4.7, y, 0], buff=0.05,
                color=palette["accent"], stroke_width=6,
            )

        title = label("TCP: bytes no recetor", [0, 3.2, 0], size=54)
        convention = label("Intervalos com ambos os extremos", [0, 2.5, 0], size=40)
        ranges = ("1000–1299", "1300–1599", "1600–1899")
        heights = (1.55, 0.35, -0.85)
        boxes, states = [], []
        for byte_range, y in zip(ranges, heights):
            border = Rectangle(
                width=9.0, height=0.95,
                color=palette["text"], stroke_width=3,
                fill_color=palette["surface"], fill_opacity=1,
            ).move_to([0, y, 0])
            boxes.append(VGroup(border, label(byte_range, [-2.1, y, 0], size=54)))
            states.append(state("Por chegar", y))

        next_byte = pointer(heights[0])
        ack = label("ACK 1000: próximo byte", [0, -2.05, 0], size=50, colour="accent")
        phase = label("Ainda falta o primeiro bloco", [0, -3.0, 0], size=44)
        self.add(title, convention, *boxes, *states, next_byte, ack, phase)
        self.wait(2)

        received = state("Recebido", heights[0], "diagram-secondary")
        self.play(Transform(states[0], received), run_time=0.6)
        self.play(
            Transform(states[0], state("Entregue", heights[0])),
            Transform(next_byte, pointer(heights[1])),
            Transform(ack, label("ACK 1300: próximo byte", [0, -2.05, 0], colour="accent")),
            Transform(phase, label("1300 ainda não chegou", [0, -3.0, 0], size=44)),
            run_time=0.8,
        )
        self.wait(1.6)

        arrival = label("Chega 1600–1899", [0, -3.0, 0], size=44)
        self.play(Transform(phase, arrival), run_time=0.5)
        self.play(
            Transform(states[2], state("Guardado", heights[2], "diagram-secondary")),
            Transform(states[1], state("Em falta", heights[1], "accent")),
            run_time=0.7,
        )
        self.play(
            Transform(phase, label("ACK 1300 fica na lacuna", [0, -3.0, 0], size=44)),
            run_time=0.5,
        )
        self.wait(2.3)

        self.play(
            Transform(phase, label("Chega 1300–1599", [0, -3.0, 0], size=44)),
            Transform(states[1], state("Recebido", heights[1], "diagram-secondary")),
            run_time=0.7,
        )
        self.wait(0.8)
        self.play(
            Transform(states[1], state("Entregue", heights[1])),
            Transform(states[2], state("Entregue", heights[2])),
            Transform(next_byte, pointer(-1.5)),
            Transform(ack, label("ACK 1900: próximo byte", [0, -2.05, 0], colour="accent")),
            Transform(phase, label("Contínuo até ao byte 1899", [0, -3.0, 0], size=44)),
            run_time=0.7,
        )
        self.wait(3.8)
