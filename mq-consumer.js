import amqp from "amqplib";
import redis from "redis";
import users from "./data.json";

const redisClient = redis.createClient(); //localhost , port:6379

redisClient.on("error", (error) => {
  console.error(error);
});

connect_rabbitMQ();

async function connect_rabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue("users");

    console.log("** waiting message for (users) queue");

    channel.consume("users", (message) => {
      const userId = parseInt(message.content.toString());
      const user = users.find((user) => user.id === userId);
      if (user) {
        redisClient.set(`user_${userId}`, JSON.stringify(user), (err, stt) => {
          if (err) {
            console.error(err);
          }
          console.log(`user (${userId}) wrote to Redis..${stt}`);
          channel.ack(message);
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
}
