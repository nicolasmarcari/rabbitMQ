import amqp from 'amqplib'

async function exchangeFanout() {
    const conn = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root',
        vhost: 'fanout-example'
    })

    const channel = await conn.createChannel()

    // criando recursos se nao existir
    await channel.assertExchange('notifications', 'fanout')
    await channel.assertQueue('email_notification')
    await channel.assertQueue('sms_notification')
    await channel.assertQueue('push_notifications')

    // Binds
    await channel.bindQueue('email_notification', 'notifications', '')// como é fanout não vem informacao no ultimo parametro
    await channel.bindQueue('sms_notification', 'notifications', '')
    await channel.bindQueue('push_notifications', 'notifications', '')

    // a mesma mensagem entra em todas as filas
    channel.publish('notifications', '', Buffer.from(`Sua conta teve uma atividade suspeita`))

    await channel.close()
    await conn.close()
}

exchangeFanout()