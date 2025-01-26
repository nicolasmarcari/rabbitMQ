import amqp from 'amqplib'

async function exchange() {
    const conn = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root'
    })

    const channel = await conn.createChannel()

    //criando uma exchange
    await channel.assertExchange('exchange_curso', 'direct')

    //criando uma fla
    await channel.assertQueue('curso_notification', {
        durable: true
    })
    await channel.assertQueue('curso_push', {
        durable: true
    })

    // Binding - linkando a fila com o exchange
    await channel.bindQueue('curso_notification', 'exchange_curso', 'novoCurso')
    await channel.bindQueue('curso_push', 'exchange_curso', 'novoCurso')

    // await channel.unbindQueue('curso_notification', 'exchange_curso', 'novoCurso')

    channel.publish('exchange_curso', 'novoCurso', Buffer.from('Mensagem de teste'))

    await channel.close()
    await conn.close()
}

exchange()