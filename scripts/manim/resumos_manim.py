"""Shared semantic colours for repository-authored Manim scenes."""
import json
import os

from manim import config

palette = json.loads(os.environ["RESUMOS_MANIM_PALETTE"])
config.background_color = palette["surface"]
