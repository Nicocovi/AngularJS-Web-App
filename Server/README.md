# Server

## Setup (before first run)

go to your project root folder via command line
```
cd path/to/workspace/...
```

**install node dependencies**

```
npm install
```

**set up your database**

* create a new directory where your database will be stored (it's a good idea to separate data and business logic - the data directory should be on a different place than your app)
* start the database server 
```
mongod --dbpath relative/path/to/database
```
* create all database schemes and import data to begin with 
```
mongorestore dump/
```

**set up environment configuration**

copy one of the config files in the config directory and rename it to `config.js`. DO NOT check in your config.js file into source control. If you make a changes that your team members should be able to see (e.g. introducing a new config variable), change it in `config.dev_local.js`

You can also create more example config files in your `config` directory, e.g. `config.dev_server` for your development server. 

Note: While it is a good idea to have some configuration available for everyone, it is considered bad practice to check in sensitive data into source control (e.g. credentials for database access)

## running

start the web server
```
node server.js
```

or start the server using gulp in an development environment
```
gulp
```

## API

### Sign up

1. 	POST: http://localhost:3000/api/user/signup,
	Header:
```
content-type application/json
```
	Body:
```
{
    "email": "xxx",
    "password": "xxx"
}
```

    Answer:
```
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Retrieve events of a specific user:

1. 	POST: http://localhost:3000/api/user/login

	Header: 
```
content-type application/json
```
	Body: 
```		
		{
		"email": "xxx",
	
		"password": "xxx"
		}
```

2.	Copy access tokes from result.

3. 	GET: http://localhost:3000/api/user/event

	Header: 
```
content-type application/json
Authorization JWT xxx(access token)
```	
