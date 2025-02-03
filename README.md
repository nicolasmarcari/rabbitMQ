# rabbitMQ

![Status do Curso](https://img.shields.io/badge/Status-Concluido-green)

# RabbitMQ

## Producer

É o responsável por criar a mensagem e publicar na fila.

## Exchange

Uma Exchange fica entre o producer e a fila. É ele quem é o responsavel por mandar os conteudos para as filas.

## Fila

É uma fila (FIFO) que contem o buffer que o produtor produziu.

## Consumer

É quem vai consumir essa fila par fazer algo com esse buffer e fazer o ack (para quando tudo deu certo com a mensagem.)

# Tipos de Exchanges

## Topic

É usado para enviar as mensagens para uma ou mais filas dependnedo da sua routing key que é especificado pelo produtor e pelo consumidor.

O Topic possui algumas particularidades como:

`*`: Corresponde a exatamente uma palavra. Exemplo: `animal.*.brasil` vai combinar com "animal.qualquercoisa.brasil" mas não com animal.qualquercoisa.brasil.outracoisa

`#`: Corresponde a zero ou mais palavras. `animal.#` vai combinar com animal.brasil e animal.brasil.cachorro

O Topic é muito util quando é necessario um roteamento mais dinamico e flexivel, onde as mensagens são distribuidas por padrões de roteamento.

## Fanout

Elas não tem filtro nem chave de roteamento, elas distribuiem para todas as filas. Ideal para cenários de broadcast

## Headers

Usam headers para rotear as mensagens.

Supondo que temos duas filas `finance_reports` e `marketing_reports`. para `finance_reports`podemos criar uma binding com o header `{"department"}: "finance"`, e ele será roteado para a fila `finance_reports`. Da mesma forma fazemos com a fila do marketing.

Ela é muito parecida com a `Topic Exchange`, mas podemos distinguir os seus usos pensando no que cada fila quer receber. Pensando que seja necessário criar uma fila para logs, talvez seja mais eficiente criar uma Exchange do tipo `Topic` e jogar tudo que veir com `logs.#` para ela. E para o exemplo de departamentos, podemos seguir com os cabeçalhos.
