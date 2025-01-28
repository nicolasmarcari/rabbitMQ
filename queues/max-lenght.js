import amqp from "amqplib"

async function maxLenght() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root'
    })

    const channel = await connection.createChannel();

    await channel.assertQueue('max_lenght', {
        maxLength: 100
    })

    for(let i = 0; i <103; i++) {
        channel.publish('', 'max_lenght', Buffer.from(`Mensagem numero ${i}`))
    }
}

maxLenght()
