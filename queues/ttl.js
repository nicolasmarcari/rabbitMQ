import amqp from "amqplib"

async function ttl() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'root',
        password: 'root'
    })

    const channel = await connection.createChannel();

    channel.assertQueue('message_ttl', {
        messageTtl: 30000 //ms 
    })

    channel.publish('', 'message_ttl', Buffer.from("msg teste"))

}

ttl()
