from manim import (
    Arrow,
    Axes,
    Create,
    DashedLine,
    FadeIn,
    FadeOut,
    Line,
    RIGHT,
    Scene,
    Text,
    Transform,
    VGroup,
)
from resumos_manim import palette


class DirecoesProprias(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-2, 6, 1],
            y_range=[-5, 6, 1],
            x_length=4,
            y_length=5.5,
            axis_config={"color": palette["muted"], "include_ticks": False},
            tips=False,
        )
        axes.shift([-0.9, 0.25, 0] - axes.c2p(0, 0))
        origin = axes.c2p(0, 0)
        self.add(axes)

        cases = (
            ((1, 1), (5, 5), (-2, -2), (5.7, 5.7), "Av = 5v: mesma reta"),
            ((1, -2), (2, -4), (-2, 4), (2.5, -5), "Av = 2v: mesma reta"),
            ((1, 0), (4, 2), (-2, 0), (6, 0), "Av sai da reta: não é próprio"),
        )

        for vector, image, start, end, conclusion in cases:
            support = Line(
                axes.c2p(*start),
                axes.c2p(*end),
                color=palette["diagram-secondary"],
                stroke_width=3,
            )
            original_arrow = Arrow(
                origin, axes.c2p(*vector), buff=0,
                color=palette["text"], stroke_width=6,
            )
            original = VGroup(
                DashedLine(
                    origin, original_arrow.get_tip().base,
                    color=palette["text"], stroke_width=6, dash_length=0.09,
                ),
                original_arrow.get_tip().copy(),
            )
            heading = Text(
                f"Original a tracejado: v = {vector}",
                font="DejaVu Sans", font_size=46, color=palette["text"],
            ).move_to([0, 3.35, 0])
            result = Text(
                conclusion, font="DejaVu Sans", font_size=46,
                color=palette["text"],
            ).move_to([0, -3.35, 0])
            image_arrow = Arrow(
                origin, axes.c2p(*image), buff=0,
                color=palette["accent"], stroke_width=7,
            )
            image_label = Text(
                f"Av = {image}", font="DejaVu Sans", font_size=42,
                color=palette["accent"],
            ).next_to(image_arrow.get_end(), RIGHT, buff=0.25)

            self.play(FadeIn(heading), Create(support), FadeIn(original), run_time=0.5)
            self.wait(0.7)
            # Interpolate one image, not successive applications of the matrix.
            moving = original_arrow.copy().set_color(palette["accent"])
            self.add(moving)
            self.bring_to_front(original)
            self.play(Transform(moving, image_arrow), run_time=1.4)
            self.play(FadeIn(image_label), FadeIn(result), run_time=0.4)
            self.wait(1.8)
            self.play(
                FadeOut(VGroup(heading, support, original, moving, image_label, result)),
                run_time=0.4,
            )
