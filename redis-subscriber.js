import redis from "redis";

const client = redis.createClient(); //localhost port: 6379

client.on("error", (error) => {
  console.error(error);
});

client.on("message", (channel, message) => {
  console.log(`(${channel})  adli kanala (${message}) mesaji geldi...`);
});

client.subscribe("mr.robot");
client.subscribe("mr.farid");
