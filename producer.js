import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root'
    });

    // criando canal
    const channel = await connection.createChannel();

    // se não existe, cria a fila
    await channel.assertQueue('minha_fila', {
        durable: true // fila vai persistir no rabbit
    })

    // publicando mensagem na fila
    // channel.publish('', 'minha_fila', Buffer.from('Mensagem que vai ao Rabbit'));
    channel.sendToQueue('minha_fila', Buffer.from('Mensagem que vai ao Rabbit'));

    await channel.close()
    await connection.close()
}

main()