import amqp from "amqplib";

import users from "./data.json";

connect_rabbitMQ();

async function connect_rabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue("users");

    users.forEach((user) => {
      channel.sendToQueue("users", Buffer.from(JSON.stringify(user.id)));
      console.log(`sended message ==> ${user.id}  to =>(users)`);
    });
  } catch (err) {
    console.error(err);
  }
}
