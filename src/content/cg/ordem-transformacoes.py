from manim import (
    Arc,
    Axes,
    Create,
    Dot,
    FadeIn,
    FadeOut,
    MoveAlongPath,
    PI,
    Scene,
    Text,
    Transform,
    VGroup,
)
from resumos_manim import palette


class OrdemTransformacoes(Scene):
    def construct(self):
        unit = 0.9
        for title, color, steps in (
            (
                "T · R · S", palette["accent"],
                (
                    ("1. Escala ×2", (2, 0)),
                    ("2. Rotação +90°", (0, 2)),
                    ("3. Translação +(1, 0)", (1, 2)),
                ),
            ),
            (
                "S · R · T", palette["diagram-secondary"],
                (
                    ("1. Translação +(1, 0)", (2, 0)),
                    ("2. Rotação +90°", (0, 2)),
                    ("3. Escala ×2", (0, 4)),
                ),
            ),
        ):
            axes = Axes(
                x_range=[-0.5, 3.5, 1],
                y_range=[-0.5, 4.5, 1],
                x_length=4 * unit,
                y_length=5 * unit,
                axis_config={"color": palette["muted"], "stroke_width": 3},
                tips=False,
            )
            axes.shift([-3, -2.6, 0] - axes.c2p(0, 0))
            heading = Text(
                title, font="DejaVu Sans", font_size=64, color=color
            ).move_to([0, 3.2, 0])
            operation = Text(
                "Ponto inicial", font="DejaVu Sans", font_size=56,
                color=palette["text"],
            ).move_to([0, 2.35, 0])
            position = Text(
                "P = (1, 0)", font="DejaVu Sans", font_size=64, color=color
            ).move_to([3.2, 0, 0])
            labels = VGroup()
            for x in (0, 1, 2, 3):
                labels.add(Text(
                    str(x), font="DejaVu Sans", font_size=40,
                    color=palette["text"],
                ).move_to(axes.c2p(x, 0) + [0, -0.45, 0]))
            for y in (2, 4):
                labels.add(Text(
                    str(y), font="DejaVu Sans", font_size=40,
                    color=palette["text"],
                ).move_to(axes.c2p(0, y) + [-0.45, 0, 0]))
            labels.add(Text(
                "x", font="DejaVu Sans", font_size=48, color=palette["text"]
            ).move_to(axes.c2p(3.5, 0) + [0.4, 0, 0]))
            labels.add(Text(
                "y", font="DejaVu Sans", font_size=48, color=palette["text"]
            ).move_to(axes.c2p(0, 4.5) + [-0.45, 0, 0]))
            point = Dot(axes.c2p(1, 0), radius=0.15, color=color)
            self.add(axes, labels, heading, operation, position, point)
            self.wait(1)
            for step_index, (label, destination) in enumerate(steps):
                ghost = point.copy().set_fill(opacity=0.2).set_stroke(
                    color=color, width=2, opacity=0.6
                )
                self.add(ghost)
                self.play(Transform(operation, Text(
                    label, font="DejaVu Sans", font_size=56,
                    color=palette["text"],
                ).move_to(operation)), run_time=0.5)
                if step_index == 1:
                    # Both points rotate around the fixed origin, not a chord.
                    path = Arc(
                        radius=2 * unit, start_angle=0, angle=PI / 2,
                        arc_center=axes.c2p(0, 0), color=color, stroke_width=4,
                    )
                    self.play(Create(path), MoveAlongPath(point, path), run_time=2)
                else:
                    self.play(point.animate.move_to(axes.c2p(*destination)), run_time=2)
                self.play(Transform(position, Text(
                    f"P = ({destination[0]}, {destination[1]})",
                    font="DejaVu Sans", font_size=64, color=color,
                ).move_to(position)), run_time=0.4)
                self.wait(0.7)
            self.wait(1.2)
            self.play(*(FadeOut(mob) for mob in self.mobjects), run_time=0.5)

        comparison = VGroup(
            Text(
                "A ordem muda o destino",
                font="DejaVu Sans", font_size=56, color=palette["text"],
            ).move_to([0, 2.2, 0]),
            Text(
                "T · R · S: (1, 2)",
                font="DejaVu Sans", font_size=72, color=palette["accent"],
            ).move_to([0, 0.5, 0]),
            Text(
                "S · R · T: (0, 4)",
                font="DejaVu Sans", font_size=72,
                color=palette["diagram-secondary"],
            ).move_to([0, -1.1, 0]),
        )
        self.play(FadeIn(comparison), run_time=0.5)
        self.wait(3)
