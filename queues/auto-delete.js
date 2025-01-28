import amqp from "amqplib"

async function autoDelete() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root'
    })

    const channel = await connection.createChannel();

    await channel.assertQueue("auto-delete", {
        autoDelete: true
    })

    channel.publish('', 'auto-delete', Buffer.from("Fila"))

    channel.consume('auto-delete', (data) => {
        console.log(data.content.toString())
    })

}

autoDelete()
