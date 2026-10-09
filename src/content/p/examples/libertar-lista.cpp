while (atual != nullptr) {
    No* seguinte = atual->seguinte;
    delete atual;
    atual = seguinte;
}
