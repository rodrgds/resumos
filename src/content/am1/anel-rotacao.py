from math import cos, sin

from manim import (
    AnnularSector,
    Axes,
    Circle,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    PI,
    Polygon,
    Scene,
    TAU,
    Text,
    ValueTracker,
    VGroup,
    always_redraw,
    linear,
)
from resumos_manim import palette


class AnelRotacao(Scene):
    def construct(self):
        def label(value, size=40, color=None):
            return Text(
                value,
                font="DejaVu Sans",
                font_size=size,
                color=color or palette["text"],
            )

        title = label("Rodar em torno de y = 5", size=46).move_to([0, 3.35, 0])
        axes = Axes(
            x_range=[-2.5, 2.5, 1],
            y_range=[0, 5.5, 1],
            x_length=4.5,
            y_length=4.95,
            axis_config={"color": palette["muted"], "include_ticks": False},
            tips=False,
        ).move_to([-1.2, 0, 0])
        region = Polygon(
            *[axes.c2p(-2 + i / 20, (-2 + i / 20) ** 2) for i in range(81)],
            fill_color=palette["accent"],
            fill_opacity=0.18,
            stroke_width=0,
        )
        curve = axes.plot(
            lambda x: x * x,
            x_range=[-2, 2],
            color=palette["accent"],
            stroke_width=4,
        )
        upper = Line(axes.c2p(-2, 4), axes.c2p(2, 4), color=palette["accent"])
        rotation_axis = DashedLine(
            axes.c2p(-2.5, 5), axes.c2p(2.5, 5),
            color=palette["text"], stroke_width=3,
        )
        strip = Line(
            axes.c2p(1, 1), axes.c2p(1, 4),
            color=palette["diagram-secondary"], stroke_width=10,
        )
        outer = Line(
            axes.c2p(1.25, 5), axes.c2p(1.25, 1),
            color=palette["text"], stroke_width=3,
        )
        inner = Line(
            axes.c2p(0.75, 5), axes.c2p(0.75, 4),
            color=palette["text"], stroke_width=3,
        )
        names = VGroup(
            label("y = 5").move_to([3.1, 2.02, 0]),
            label("y = 4").move_to([3.1, 1.12, 0]),
            label("y = x²").move_to([-4.15, -0.5, 0]),
            label("−2", size=36).move_to(axes.c2p(-2, 0) + [0, -0.35, 0]),
            label("2", size=36).move_to(axes.c2p(2, 0) + [0, -0.35, 0]),
            label("x = 1", size=36).move_to(axes.c2p(1, 0) + [0, -0.35, 0]),
        )
        outer_name = label("R = 5 − x²").move_to([3.65, -0.45, 0])
        inner_name = label("r = 5 − 4 = 1").move_to([3.65, -1.25, 0])
        radius_names = VGroup(
            label("R").move_to([0.3, 0.22, 0]),
            label("r").move_to([-0.95, 1.58, 0]),
        )
        note = label("Em x = 1: R = 4, r = 1").move_to([0, -3.3, 0])

        self.add(title, axes, region, curve, upper, rotation_axis, names)
        self.wait(1)
        self.play(Create(strip), run_time=1)
        self.play(Create(outer), Create(inner), FadeIn(outer_name, inner_name, radius_names, note), run_time=1)
        self.wait(2)

        graph = VGroup(
            axes, region, curve, upper, rotation_axis, strip, names,
            outer, inner, outer_name, inner_name, radius_names,
        )
        view_title = label("A faixa roda, vista de frente", size=46).move_to(title)
        center = [0, 0.15, 0]
        angle = ValueTracker(0)
        # A secção perpendicular ao eixo é vista no plano y-z, à escala 1/2.
        ring = always_redraw(
            lambda: AnnularSector(
                inner_radius=0.5,
                outer_radius=2,
                start_angle=-PI / 2,
                angle=max(angle.get_value(), 0.001),
                fill_color=palette["accent"],
                fill_opacity=0.35,
                stroke_width=0,
            ).shift(center)
        )

        def rotating_strip():
            theta = -PI / 2 + angle.get_value()
            return Line(
                [center[0] + 0.5 * cos(theta), center[1] + 0.5 * sin(theta), 0],
                [center[0] + 2 * cos(theta), center[1] + 2 * sin(theta), 0],
                color=palette["diagram-secondary"],
                stroke_width=8,
            )

        moving = always_redraw(rotating_strip)
        axis_point = Dot(center, color=palette["text"])
        axis_name = label("eixo", size=36).move_to([-0.7, 0.18, 0])
        self.play(FadeOut(graph, title), FadeIn(view_title, axis_point, axis_name), run_time=1)
        self.add(ring, moving)
        self.wait(1)
        self.play(angle.animate.set_value(TAU), run_time=4, rate_func=linear)
        ring.clear_updaters()
        moving.clear_updaters()
        self.play(FadeOut(moving, axis_name), run_time=0.5)

        boundaries = VGroup(
            Circle(radius=2, color=palette["text"], stroke_width=3).shift(center),
            Circle(radius=0.5, color=palette["text"], stroke_width=3).shift(center),
        )
        outer_radius = Line(center, [2, center[1], 0], color=palette["text"])
        inner_radius = Line(center, [0, center[1] + 0.5, 0], color=palette["text"])
        outer_label = label("R = 4").move_to([3.25, center[1], 0])
        inner_label = label("r = 1").move_to([-1.35, 1.05, 0])
        area = label("Área = π(R² − r²) = 15π", size=44).move_to([0, -2.65, 0])
        self.play(
            Create(boundaries), Create(outer_radius), Create(inner_radius),
            FadeIn(outer_label, inner_label, area), run_time=1,
        )
        self.wait(2.5)
