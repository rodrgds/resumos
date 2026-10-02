from manim import (
    Circle, Create, FadeOut, Line, Scene, Text, Transform, Triangle,
    VGroup, always_redraw,
)
from resumos_manim import palette


class RotacaoAVL(Scene):
    def construct(self):
        def label(value, size=52, color=None):
            return Text(
                value, font="DejaVu Sans", font_size=size,
                color=color or palette["text"],
            )

        def node(name, position):
            outline = Circle(
                radius=0.48, color=palette["accent"], stroke_width=5,
                fill_color=palette["surface"], fill_opacity=1,
            )
            return VGroup(outline, label(name, 60)).move_to(position)

        def subtree(name, position):
            outline = Triangle(
                color=palette["diagram-secondary"], stroke_width=5,
                fill_color=palette["surface"], fill_opacity=1,
            ).stretch_to_fit_width(1.5).stretch_to_fit_height(1.35)
            text = label(name).move_to(outline.get_center()).shift([0, -0.15, 0])
            return VGroup(outline, text).move_to(position)

        def edge(parent, child, color=None):
            direction = child.get_center() - parent.get_center()
            return Line(
                parent[0].get_boundary_point(direction),
                child[0].get_boundary_point(-direction),
                buff=0,
                color=color or palette["text"], stroke_width=5,
            ).set_z_index(-1)

        z = node("z", [2, 1.8, 0])
        y = node("y", [-2, -0.1, 0])
        a = subtree("A", [-4, -2, 0])
        b = subtree("B", [0, -2, 0])
        c = subtree("C", [4, -0.1, 0])
        title = label("Rotação à direita", 48).move_to([0, 3.3, 0])
        phase = label("z é a raiz local", 44).move_to([0, 2.55, 0])
        inorder = label("Em-ordem: A, y, B, z, C", 52).move_to([0, -3.35, 0])

        # These links keep their endpoints while the local root changes.
        fixed_links = always_redraw(
            lambda: VGroup(edge(y, a), edge(y, z), edge(z, c))
        )
        old_b_link = edge(y, b, palette["diagram-secondary"])
        self.add(fixed_links, old_b_link, z, y, a, b, c, title, phase, inorder)
        self.wait(2)

        transfer = label("B: de y.right para z.left", 44).move_to(phase)
        self.play(Transform(phase, transfer), run_time=0.5)
        self.wait(1)
        self.play(FadeOut(old_b_link), run_time=0.5)
        self.play(
            y.animate.move_to([-2, 1.8, 0]),
            z.animate.move_to([2, -0.1, 0]),
            a.animate.move_to([-4, -0.1, 0]),
            c.animate.move_to([4, -2, 0]),
            run_time=2,
        )
        self.play(Create(edge(z, b, palette["diagram-secondary"])), run_time=0.7)
        result = label("y é a raiz; z é o filho direito", 44).move_to(phase)
        self.play(Transform(phase, result), run_time=0.5)
        self.wait(3)
