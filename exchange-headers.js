import amqp from 'amqplib'

async function exchangeHeaders() {
    const conn = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root',
        vhost: 'headers-example'
    })

    const channel = await conn.createChannel()

    await channel.assertExchange('notify_headers', 'headers')

    await channel.assertQueue('email_notification')
    await channel.assertQueue('sms_notification')
    await channel.assertQueue('push_notifications')

    await channel.bindQueue('email_notification', 'notify_headers', '', {
        'notification_type': 'email'
    })
    await channel.bindQueue('sms_notification', 'notify_headers', '', {
        'notification_type': 'sms'
    })
    await channel.bindQueue('push_notifications', 'notify_headers', '', {
        'notification_type': 'push'
    })


    // await channel.bindQueue('email_notification_logs', 'notify_headers', false, {
    //     'x-match': 'any', // se tiver uma ou outra propriedade ele entra na fila
    //     'notification_type': 'email',
    //     'mode': 'internal'
    // })

    channel.publish('notify_headers', '', Buffer.from('Header'), {
        headers: {
            notification_type: 'sms'
        }
    })

    await channel.close()
    await conn.close()
}

exchangeHeaders()
