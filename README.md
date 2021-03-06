# scrilio-admin

## installation

## Install the node modules dependencies
```bash
npm install

```

## Install the database and tables

### MySQL dependency

You will need to install `mysql 5.6` or greater. See [mysql installer](https://dev.mysql.com/downloads/installer/) instructions for more detail

### Configuration files

You will need to copy each of `config.json.template` files to the correct locations.

```bash
cp ./client/src/config/config.json.template ./client/src/config/config.json
cp ./server/config/config.json.template ./server/config/config.json
```

### Create the database

You will need to initially create the `scrilio_admin` database prior to running any database scripts:

```bash
mysql -uroot
CREATE DATABASE scrilio_admin;
exit
```

### Running the migration script


```bash
./node_modules/.bin/knex migrate:latest
```

## running the application (in development)
```
node ./server/index.js
```

## create the admin user
* go to `http://localhost:8090/#/setup`
* follow the instructions... TBD
