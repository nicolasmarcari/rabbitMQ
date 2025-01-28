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

    await channel.assertQueue('priority', {
        maxPriority: 5 
    })

    // for (let i = 0; i <10; i++) {
    //     channel.publish('', 'priority', Buffer.from(`mensagem sem prioridade`))
    // }

    channel.publish('', 'priority', Buffer.from('mensagem com prioridade'), {
        priority: 5 // quanto maior, maior prioridade, vai ficar em primeiro na fila
    })

    await channel.close()
    await connection.close()
}

durable()