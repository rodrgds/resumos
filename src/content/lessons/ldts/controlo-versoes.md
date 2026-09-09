---
title: Controlo de versões com Git
description: Repositórios locais e remotos, branches, workflows e gestão de dependências com Gradle.
section: conteudo
order: 1
---

Todo o trabalho de LDTS, dos exercícios ao projeto, vive num repositório Git. O controlo de versões guarda o histórico de cada ficheiro, permite desfazer mudanças e deixa três pessoas editarem o mesmo projeto sem se atropelarem. O Gradle entra como gestor de dependências e de build: declara as bibliotecas uma vez e qualquer máquina compila e testa da mesma forma.

## Repositório local e remoto

Um **repositório** é uma pasta com histórico. Crias um, gravas mudanças em **commits** e publicas num **remoto** (o GitHub, no caso da cadeira):

```bash
git init jogo
cd jogo
git add README.md
git commit -m "Arranque do projeto"
git remote add origin https://github.com/equipa/jogo.git
git push -u origin main
```

Cada commit é uma fotografia com mensagem. Escreve mensagens que digam o que mudou e porquê, como "Adiciona movimento do herói com as setas". O `-u` no primeiro `push` liga o teu branch local ao remoto para os seguintes serem só `git push`.

Antes de commitar, `git status` mostra o que mudou e `git log --oneline` mostra o histórico. Estes dois comandos respondem a quase todas as perguntas de "onde estou" e "o que fiz".

## Branches e merges

Um **branch** é uma linha de trabalho paralela. A regra de ouro: nunca trabalhes diretamente no `main`. Cada funcionalidade nasce num branch próprio:

```bash
git checkout -b heroi-move
# ... editas, testas, commit ...
git checkout main
git merge heroi-move
git push
```

O `merge` junta o branch de volta ao `main`. Se dois branches mexeram nas mesmas linhas, o Git marca um **conflito** no ficheiro e pede-te para escolher. Abres o ficheiro, decides que versão fica, fazes `add` e `commit`. Conflitos assustam na primeira vez, mas são só o Git a dizer que precisa de um humano para decidir.

:::tip[Como evitar conflitos dolorosos]
Faz `pull` antes de começar a trabalhar, mantém os branches curtos (um ou dois dias) e commita com frequência. Um branch com três semanas de trabalho vai conflituar com tudo.
:::

## Workflows em equipa

No projeto de três pessoas, o workflow é simples: `main` está sempre a compilar e a passar os testes. Cada um cria branches a partir de um `main` atualizado, abre um pull request quando termina e outra pessoa revê antes do merge. Ninguém faz merge do próprio trabalho sem revisão, e ninguém commita código que não compila.

## Dependências com Gradle

O `build.gradle` declara o projeto, as dependências e como correr os testes. Um exemplo mínimo para o jogo em Java:

```groovy
plugins {
    id 'java'
    id 'application'
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.3'
    testImplementation 'org.mockito:mockito-core:5.11.0'
}

application {
    mainClass = 'com.equipa.jogo.Jogo'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

Com isto, `gradle test` compila tudo e corre os testes em qualquer máquina, e `gradle run` arranca o jogo. Quando precisares de uma biblioteca nova, acrescentas uma linha a `dependencies` em vez de copiar ficheiros `.jar` para o repositório.

:::warning[Não commites o que o Gradle gera]
A pasta `build/` e os ficheiros `.class` são produto do build, não fonte. Garante que o `.gitignore` os exclui desde o primeiro commit, senão cada build suja o histórico com binários.
:::

## Exemplo completo: funcionalidade num branch

O cenário: adicionar a classe `Posicao` ao jogo sem partir o `main`.

1. `git checkout -b posicao` para criar o branch.
2. Escreve a classe e um teste, corre `gradle test` e vê tudo verde.
3. `git add .` e `git commit -m "Adiciona Posicao com soma de vetores"`.
4. `git push -u origin posicao`, abre pull request, um colega revê.
5. Merge para o `main` e apaga o branch com `git branch -d posicao`.

Se o `gradle test` falhasse no passo 2, o `main` nunca saberia: é exatamente para isso que o branch existe.
