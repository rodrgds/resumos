from manim import DOWN, FadeIn, FadeOut, Rectangle, Scene, SurroundingRectangle, Text, Transform, VGroup
from resumos_manim import palette


class SondagemRemocao(Scene):
    def construct(self):
        def text(value, size=40):
            return Text(value, font="DejaVu Sans", font_size=size, color=palette["text"])

        title = text("Pesquisar 24 depois de remover 17", 46).move_to([0, 3, 0])
        rule = text("h(x) = x mod 7: começa na posição 3", 36).move_to([0, 2.1, 0])
        cells = VGroup()
        values = VGroup()
        for i, value in enumerate(["livre", "livre", "livre", "10", "17", "24", "livre"]):
            box = Rectangle(width=1.6, height=1.2, color=palette["muted"]).move_to([(i - 3) * 1.7, 0, 0])
            cells.add(box)
            values.add(text(value, 28).move_to(box))
            self.add(text(str(i), 30).next_to(box, DOWN, buff=0.2))
        self.add(title, rule, cells, values)
        caption = text("As três chaves colidem: 10, 17 e 24.", 36).move_to([0, -2.1, 0])
        self.add(caption)
        self.wait(1.5)
        cursor = SurroundingRectangle(cells[3], color=palette["accent"], buff=0.08)
        self.play(Transform(values[4], text("livre", 28).move_to(cells[4])), Transform(caption, text("Erro: apagar 17 como se a célula nunca fosse usada.", 34).move_to(caption)), run_time=0.6)
        self.play(FadeIn(cursor), run_time=0.4)
        self.wait(0.7)
        self.play(cursor.animate.move_to(cells[4]), run_time=0.7)
        self.play(Transform(caption, text("Célula livre: a pesquisa para e não encontra 24.", 34).move_to(caption)), run_time=0.5)
        self.wait(2)
        self.play(FadeOut(cursor), Transform(values[4], text("apagada", 27).move_to(cells[4])), Transform(caption, text("Correção: a marca apagada conserva a cadeia.", 34).move_to(caption)), run_time=0.6)
        cursor.move_to(cells[3])
        self.play(FadeIn(cursor), run_time=0.4)
        self.play(cursor.animate.move_to(cells[4]), run_time=0.7)
        self.wait(0.6)
        self.play(cursor.animate.move_to(cells[5]), Transform(caption, text("Passa pela célula apagada e encontra 24 na posição 5.", 32).move_to(caption)), run_time=0.8)
        self.wait(3)
