
# Redis Pubsub in action

Basic impletmentation of Redis Pubsub




## Run Locally

Clone the project

```bash
  git clone git@github.com:quocthinhle/redis-pubsub.git
```

Go to the project directory

```bash
  cd redis-pubsub
```

Install dependencies

```bash
  npm install
```

Install pm2

```bash
  npm install -g pm2
```

Start the server with 4 instances (pm2 cluster mode)

```bash
  pm2 start ecosystem.config.js
```

Incase you haven't install redis yet
```bash
  docker container run --publish 6379:6379 --detach redis
```

Test the "pubsub"
```bash
  curl -X POST http://localhost:3000/api/publish -H "Content-Type: application/json" -d '{"message": "Your message"}'
```

Result will be shown in
```bash
  pm2 logs
```


## Authors

- [@quocthinhle](https://www.github.com/quocthinhle)


## Roadmap

- Usage: https://cloud.google.com/pubsub/docs/overview

