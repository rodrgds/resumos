---
title: Aplicação web com Laravel
description: Rotas, controladores, modelos e vistas para recursos REST apoiados na base de dados.
section: conteudo
order: 6
---

Com a base de dados a guardar e a proteger os dados, falta a aplicação que os mostra e os altera. O Laravel organiza essa aplicação em peças com papéis fixos: a **rota** recebe o pedido HTTP, o **controlador** executa a lógica, o **modelo** fala com a tabela e a **vista** gera o HTML. Cada pedido atravessa estas quatro peças por esta ordem.

## O recurso Sessões de ponta a ponta

Um **recurso** é uma coisa com endereço próprio que se cria, lê, atualiza e apaga. As sessões da loja são um recurso, e as rotas seguem a convenção REST, com o verbo HTTP a dizer a operação:

```php
Route::get('/sessoes', [SessaoController::class, 'index']);
Route::post('/sessoes', [SessaoController::class, 'store']);
```

O `GET` lista, o `POST` cria. O controlador recebe o pedido já encaminhado e devolve uma resposta, sem gerar HTML à mão:

```php
class SessaoController extends Controller
{
    public function index()
    {
        $sessoes = Sessao::where('data_hora', '>', now())
            ->orderBy('data_hora')
            ->get();
        return view('sessoes.index', ['sessoes' => $sessoes]);
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'evento_id' => 'required|exists:eventos,id',
            'data_hora' => 'required|date|after:now',
            'preco' => 'required|numeric|min:0',
            'lotacao' => 'required|integer|min:1',
        ]);
        $sessao = Sessao::create($dados);
        return redirect('/sessoes/' . $sessao->id);
    }
}
```

O método `validate` é o ponto a fixar: se os dados cumprirem as regras, devolve-os limpos; se falharem, interrompe e devolve o utilizador ao formulário com os erros. A regra `exists:eventos,id` repete na aplicação a chave estrangeira da base de dados, para dar erro amigável antes do erro técnico. A regra `after:now` repete a restrição do modelo de que sessões passadas não se vendem.

## Migração e modelo

A tabela nasce de uma **migração**, código versionado que cria e altera o esquema. É a mesma tabela do [esquema relacional](esquema-relacional/), escrita para o Laravel a aplicar e o grupo a rever:

```php
Schema::create('sessoes', function (Blueprint $table) {
    $table->id();
    $table->foreignId('evento_id')->constrained('eventos');
    $table->dateTime('data_hora');
    $table->decimal('preco', 8, 2);
    $table->integer('lotacao');
    $table->timestamps();
});
```

O modelo liga a classe à tabela e declara o que se pode preencher em massa:

```php
class Sessao extends Model
{
    protected $fillable = ['evento_id', 'data_hora', 'preco', 'lotacao'];

    public function evento()
    {
        return $this->belongsTo(Evento::class);
    }
}
```

O `belongsTo` espelha a associação do UML: cada sessão pertence a um evento. A partir daqui, `$sessao->evento->titulo` navega da sessão ao evento sem SQL escrito à mão.

## Um POST que falha a validação

Preenche o formulário de nova sessão com lotação `0` e carrega em guardar. O pedido `POST /sessoes` chega ao `store`, o `validate` rejeita `lotacao` por violar `min:1`, e o utilizador volta ao formulário com a mensagem de erro junto ao campo e os restantes valores preservados. Nenhuma linha tocou na base de dados: a validação correu antes de qualquer escrita.

Se a validação passasse, o `create` inseria a sessão e o redirecionamento mostrava a página da nova sessão. E se dois administradores criassem a sessão 101 ao mesmo tempo, o [trigger da lotação](triggers-transacoes/) continuava a decidir na base de dados. As camadas somam, nenhuma substitui a outra.

:::details[Onde ver cada erro]
Erro de validação: volta ao formulário com mensagens por campo, sem tocar na base de dados. Erro de chave estrangeira ou de trigger: exceção da base de dados que o controlador deve apanhar e transformar em mensagem. Erro 500 genérico: quase sempre uma peça em falta, como uma vista com nome errado ou um campo fora do `$fillable`. Lê a mensagem de cima para baixo até à primeira linha do teu código.
:::
