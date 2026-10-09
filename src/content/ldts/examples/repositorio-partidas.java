interface Partidas {
    java.util.Optional<Partida> procurarPorId(long id);
    void guardar(Partida partida);
}
