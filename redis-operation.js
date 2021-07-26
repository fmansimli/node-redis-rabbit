import redis from "redis";

const client = redis.createClient(); //localhost port: 6379

client.on("error", (error) => {
  console.error(error);
});

client.set("fullname", "Farid Mansimli");

client.set("test1", "test message 1....", (err, message) => {
  if (err) {
    console.error(err);
  }
  console.log(message);
});

client.del("test1", (err, message) => {
  if (err) {
    console.error(err);
  }
  console.log(message);
});

client.exists("fullname", (err, message) => {
  if (err) {
    console.error(err);
  }
  console.log("exists fullname?? -- ", message);
});

client.exists("test1", (err, message) => {
  if (err) {
    console.error(err);
  }
  console.log("exists test1 ?? -- ", message);
});
