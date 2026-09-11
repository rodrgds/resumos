{ pkgs, ... }:
{
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_24;
    npm.enable = true;
  };
  packages = [ pkgs.typst ];
  profiles.manim.module = {
    packages = [ pkgs.manim pkgs.ffmpeg ];
    env.FONTCONFIG_FILE = pkgs.makeFontsConf {
      fontDirectories = [ pkgs.dejavu_fonts ];
    };
  };
}
