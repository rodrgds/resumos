from manim import Arrow, Circle, FadeIn, Scene, Text, Transform, VGroup
from resumos_manim import palette


class ArestaNegativa(Scene):
    def construct(self):
        def text(value, size=40):
            return Text(value, font="DejaVu Sans", font_size=size, color=palette["text"])

        self.add(text("Uma aresta negativa invalida a escolha", 43).move_to([0, 3.1, 0]))
        positions = {"s": [-4, 0, 0], "a": [2.8, 1.35, 0], "b": [2.8, -1.35, 0]}
        nodes = {}
        for name, position in positions.items():
            nodes[name] = VGroup(Circle(radius=0.5, color=palette["muted"]), text(name, 42)).move_to(position)
            self.add(nodes[name])
        edges = {}
        for u, v, weight, label_pos in [("s", "a", "2", [-0.7, 1.2, 0]), ("s", "b", "5", [-0.7, -1.2, 0]), ("b", "a", "−4", [3.7, 0, 0])]:
            edges[(u, v)] = Arrow(positions[u], positions[v], buff=0.55, color=palette["muted"])
            self.add(edges[(u, v)], text(weight, 38).move_to(label_pos))
        da = text("d[a] = ∞", 32).move_to([5, 1.35, 0])
        db = text("d[b] = ∞", 32).move_to([5, -1.35, 0])
        caption = text("Origem s: distância 0.", 36).move_to([0, -2.7, 0])
        self.add(da, db, caption)
        self.wait(1)
        self.play(edges[("s", "a")].animate.set_color(palette["accent"]), Transform(da, text("d[a] = 2", 32).move_to(da)), edges[("s", "b")].animate.set_color(palette["accent"]), Transform(db, text("d[b] = 5", 32).move_to(db)), Transform(caption, text("Processar s encontra os custos 2 e 5.", 36).move_to(caption)), run_time=1)
        self.wait(1.4)
        fixed = text("fixado", 28).move_to([2.8, 2.25, 0])
        self.play(nodes["a"][0].animate.set_color(palette["accent"]), FadeIn(fixed), Transform(caption, text("Dijkstra fixa a: 2 é a menor distância provisória.", 33).move_to(caption)), run_time=0.7)
        self.wait(2)
        self.play(edges[("b", "a")].animate.set_color(palette["diagram-secondary"]), Transform(caption, text("Mas s → b → a custa 5 − 4 = 1, menos do que 2.", 33).move_to(caption)), run_time=1)
        better = text("custo real: 1", 30).move_to([0, 2.1, 0])
        self.play(FadeIn(better), run_time=0.5)
        self.wait(2)
        self.play(Transform(caption, text("Bellman-Ford pode melhorar a: a distância não é fixada cedo.", 29).move_to(caption)), Transform(da, text("d[a] = 1", 32).move_to(da)), Transform(fixed, text("revisto", 28).move_to(fixed)), run_time=1)
        self.wait(3)
