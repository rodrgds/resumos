from math import exp

from manim import (
    Axes,
    DashedVMobject,
    Dot,
    Scene,
    Text,
    ValueTracker,
    always_redraw,
    linear,
)
from resumos_manim import palette


class Transporte(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-3, 7, 1],
            y_range=[0, 1.2, 0.2],
            x_length=10,
            y_length=3.6,
            axis_config={"color": palette["muted"], "include_ticks": True},
            tips=False,
        ).shift([0, -0.1, 0])
        time = ValueTracker(0)
        height = exp(-1)

        def label(value, size=32, color=None):
            return Text(
                value,
                font="DejaVu Sans",
                font_size=size,
                color=color or palette["text"],
            )

        title = label("u(x, t) = exp(−(x − 2t)²)", size=38).move_to([0, 3.1, 0])
        initial_label = label(
            "Tracejado: f(x) = exp(−x²), em t = 0",
            color=palette["diagram-secondary"],
        ).move_to([0, 2.45, 0])
        initial = DashedVMobject(
            axes.plot(
                lambda x: exp(-x * x),
                x_range=[-3, 7],
                color=palette["diagram-secondary"],
                stroke_width=4,
            ),
            num_dashes=65,
        )
        moving = always_redraw(
            lambda: axes.plot(
                lambda x: exp(-(x - 2 * time.get_value()) ** 2),
                x_range=[-3, 7],
                color=palette["accent"],
                stroke_width=5,
            )
        )
        point = always_redraw(
            lambda: Dot(
                axes.c2p(1 + 2 * time.get_value(), height),
                radius=0.1,
                color=palette["text"],
            )
        )
        clock = always_redraw(
            lambda: label(
                f"t = {time.get_value():.2f}     x = {1 + 2 * time.get_value():.2f}"
                .replace(".", ",")
            ).move_to([0, -2.65, 0])
        )
        invariant = label("Ponto: x = 1 + 2t, altura = exp(−1)").move_to([0, -3.3, 0])
        ticks = [
            label(str(x), size=28).move_to(axes.c2p(x, 0) + [0, -0.3, 0])
            for x in [-2, 0, 2, 4, 6]
        ]
        x_label = label("x").move_to(axes.c2p(7, 0) + [0.35, 0, 0])
        y_label = label("u").move_to(axes.c2p(0, 1.2) + [-0.3, 0.15, 0])
        unit = label("1", size=28).move_to(axes.c2p(0, 1) + [-0.3, 0, 0])

        self.add(
            axes, *ticks, x_label, y_label, unit,
            initial, moving, point, title, initial_label, clock, invariant,
        )
        self.wait(1)
        self.play(time.animate.set_value(2), run_time=6, rate_func=linear)
        self.wait(1)
