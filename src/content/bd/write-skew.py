from manim import FadeIn, FadeOut, Scene, Text, Transform, VGroup
from resumos_manim import palette


class WriteSkew(Scene):
    def construct(self):
        def label(value, y, color="text", size=52):
            return Text(
                value, font="DejaVu Sans", font_size=size, color=palette[color]
            ).move_to([0, y, 0])

        title = label("Isolamento por snapshot", 3.15)
        rule = label("Regra: pelo menos 1 de serviço", 2.25, size=46)
        snapshot = label("T1 e T2 leem o mesmo snapshot", 1.25, size=46)
        initial = label("Ana sim · Rui sim", 0.45)
        first = label("T1 retira Ana", -0.55, "accent")
        second = label("T2 retira Rui", -1.45, "diagram-secondary")
        state = label("Confirmado: Ana sim · Rui sim", -2.55, size=46)
        self.add(title, rule, snapshot, initial, state)
        self.wait(2)
        self.play(FadeIn(first), FadeIn(second), run_time=0.6)
        self.wait(1.5)
        self.play(
            Transform(first, label("T1: Ana não · COMMIT", -0.55, "accent")),
            Transform(state, label("Confirmado: Ana não · Rui sim", -2.55, size=46)),
            run_time=0.7,
        )
        self.wait(1)
        self.play(
            Transform(second, label("T2: Rui não · COMMIT", -1.45, "diagram-secondary")),
            Transform(state, label("0 de serviço: regra violada", -2.55)),
            run_time=0.7,
        )
        self.wait(2.5)

        details = VGroup(snapshot, initial, first, second, state)
        self.play(
            FadeOut(details),
            Transform(title, label("Execução serial: T1, depois T2", 3.15, size=46)),
            run_time=0.6,
        )
        serial_first = label("T1 lê 2 · retira Ana · COMMIT", 0.95, "accent", 46)
        serial_state = label("Ana não · Rui sim", -0.05)
        self.play(FadeIn(serial_first), FadeIn(serial_state), run_time=0.6)
        self.wait(1.5)
        serial_second = label("T2 lê 1 · recusa retirar Rui", -1.15, "diagram-secondary", 46)
        result = label("1 de serviço: regra preservada", -2.55, size=46)
        self.play(FadeIn(serial_second), FadeIn(result), run_time=0.6)
        self.wait(3)
