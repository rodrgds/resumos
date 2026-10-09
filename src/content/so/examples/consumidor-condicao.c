pthread_mutex_lock(&mutex);
while (quantidade == 0)
    pthread_cond_wait(&nao_vazio, &mutex);
int valor = buffer[saida];
saida = (saida + 1) % CAPACIDADE;
quantidade--;
pthread_cond_signal(&nao_cheio);
pthread_mutex_unlock(&mutex);
