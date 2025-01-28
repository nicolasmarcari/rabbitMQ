import amqp from 'amqplib';

async function durable() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root'
    });

    // criando canal
    const channel = await connection.createChannel();

    await channel.assertQueue('durable', {
        durable: true
    })

    await channel.assertQueue('not_durable', {
        durable: false
    })

    // caso o rabbit morra a fila e a mensagem vai continuar la
    channel.publish('', 'durable', Buffer.from("Mensagem duravel"), {
        persistent: true
    })
    channel.publish('', 'not_durable', Buffer.from("Mensagem nao duravel"))

    await channel.close()
    await connection.close()
}

durable()