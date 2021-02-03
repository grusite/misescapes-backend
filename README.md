## Description

Backend for misescapes app made in [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode (with db included)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the server

There is a docker-compose that starts the db automaticaly in your host. IMP: You need docker installed and mongo image installed.

```bash
# up
$ npm run start:db

# stop
$ npm run stop:db

# down
$ npm run down:db
```

## Init db

I modified the Edu's script to load the data downloaded into the db. The only thing not working is the company/all (it's encoded I think) the rest is working OK.

1 - Unzip data/db/companies.json from sample.tar.gz into bin/recover - Done in the repo
2 - Unzip data/game from sample.tar.gz into bin/recover (and renamed it to 'games') - Done in the repo
3 - Execute `node ./bin/recover/index.js` (normally with this is enough)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Jorge Martín](https://kamilmysliwiec.com)
- Website - [https://misescapes.es](https://misescapes.es/)

## License

Nest is [MIT licensed](LICENSE).
