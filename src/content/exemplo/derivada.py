from manim import Axes, Dot, Line, Scene, Text, ValueTracker, always_redraw, UP, DOWN, LEFT, linear
from resumos_manim import palette


class SecanteTangente(Scene):
    def construct(self):
        text = palette["text"]
        axes = Axes(x_range=[0, 3, 1], y_range=[0, 9, 3], x_length=7, y_length=4.4,
                    axis_config={"color": palette["muted"], "include_ticks": True}, tips=False).shift([0, -0.2, 0])
        curve = axes.plot(lambda x: x * x, x_range=[0, 2.8], color=palette["accent"])
        h = ValueTracker(1.5)
        point = Dot(axes.c2p(1, 1), color=text)
        moving = always_redraw(lambda: Dot(axes.c2p(1 + h.get_value(), (1 + h.get_value()) ** 2), color=palette["diagram-secondary"]))

        def secant():
            slope = 2 + h.get_value()
            return Line(axes.c2p(0.65, 1 - 0.35 * slope), axes.c2p(2.5, 1 + 1.5 * slope),
                        color=palette["diagram-secondary"], stroke_width=5)

        line = always_redraw(secant)
        title = Text("f(x) = x², no ponto x = 1", font="DejaVu Sans", font_size=36, color=text).to_edge(UP, buff=0.45)
        fixed_label = Text("(1, 1)", font="DejaVu Sans", font_size=38, color=text).next_to(point, UP + LEFT, buff=0.3)
        label = always_redraw(lambda: Text(f"h = {h.get_value():.2f}     declive = {2 + h.get_value():.2f}".replace(".", ","),
                                            font="DejaVu Sans", font_size=40, color=text).to_edge(DOWN, buff=0.45))
        self.add(axes, curve, line, point, moving, title, fixed_label, label)
        self.wait(1)
        self.play(h.animate.set_value(0.05), run_time=5, rate_func=linear)
        self.wait(2)
