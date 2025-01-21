import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root'
    });

    const channel = await connection.createChannel();

    // caso não existe fila, cria uma (usado para caso o consumer suba mas o producer nao)
    await channel.assertQueue('minha_fila', {
        durable: true
    });

    // nesse momento a mensagem vai para o status unacked. Se a aplicacao morre a mensagem volta para o ready
    channel.consume('minha_fila', (data) => {
        console.log(data.content.toString()) // pega a propriedade content dentro do data. Como enviamos um buffer, precisa converter para String

        channel.ack(data) // a mensagem some da fila

        // Se eu produzir diversas mensagens e subir 3 instancias do meu consumer, vou notar que as mensagens em cada fila sempre são diferentes.
    });
}

main();