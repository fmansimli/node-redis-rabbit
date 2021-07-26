import redis from "redis";

const client = redis.createClient(); //localhost port: 6379

client.on("error", (error) => {
  console.error(error);
});

client.publish("mr.farid", "hello babies!!!", (err, number) => {
  if (err) {
    console.error(err);
  }
  console.log(`message ${number} subscriber'a gonderildi...`);
});

client.publish("mr.robot", "hello robots!!!", (err, number) => {
  if (err) {
    console.error(err);
  }
  console.log(`message ${number} subscriber'a gonderildi...`);
});
