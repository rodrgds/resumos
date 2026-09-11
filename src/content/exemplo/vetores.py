from manim import Arrow, Create, DashedLine, FadeIn, Scene, Text, VGroup, UP, DOWN
from resumos_manim import palette


class SomaVetores(Scene):
    def construct(self):
        origin = [-3.8, -1.9, 0]
        end_u = [0.1, -0.6, 0]
        end_v = [-2.5, 0.7, 0]
        end_sum = [1.4, 2, 0]
        text = palette["text"]
        u = Arrow(origin, end_u, buff=0, color=palette["accent"], stroke_width=7)
        v = Arrow(origin, end_v, buff=0, color=palette["diagram-secondary"], stroke_width=7)
        label_u = Text("u = (3, 1)", font="DejaVu Sans", font_size=42, color=palette["accent"]).next_to(u, DOWN)
        label_v = Text("v = (1, 2)", font="DejaVu Sans", font_size=42, color=palette["diagram-secondary"]).next_to(v, UP)
        title = Text("Somar dois deslocamentos", font="DejaVu Sans", font_size=36, color=text).to_edge(UP, buff=0.45)
        self.add(title, u, v, label_u, label_v)
        self.wait(1)
        ghost = DashedLine(origin, end_v, color=palette["muted"])
        self.add(ghost)
        self.play(VGroup(v, label_v).animate.shift([3.9, 1.3, 0]), run_time=2)
        self.wait(0.5)
        result = Arrow(origin, end_sum, buff=0, color=text, stroke_width=6)
        self.play(Create(result), run_time=1.5)
        equation = Text("u + v = (4, 3)", font="DejaVu Sans", font_size=46, color=text).to_edge(DOWN, buff=0.45)
        self.play(FadeIn(equation), run_time=0.5)
        self.wait(2)
