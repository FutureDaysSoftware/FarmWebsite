# Future Days Farm
A website for the [Future Days Farm](InsertLinkToWebsite)

## Prerequisites
* Download [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
* Download [npm and Node.js](https://nodejs.org/en/)

### macOS
* `$ npm install n -g`
* `$ sudo n 9.3.0`
* `$ git clone https://github.com/FutureDaysSoftware/FarmWebsite.git`
* [Connect to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)
* `$ cd ~/FarmWebsite/`
* `$ npm install`

### Windows

### Linux

## Setting Up Environment
* Create a file called `.env` in the `~/FarmWebsite/` directory
* Add these environment variables into the `.env` file:
```
COOKIE=""

DOMAIN=""

HTTP_PORT=""

NAME=""

NODE_ENV=""

GOOGLE_BUCKET=""

JWS_SECRET=""

MONGODB=""

SALT=""

STORAGE_URL=""
```

## Running/Testing The Website
* `$ mongod`
* `$ cd ~/FarmWebsite/`
* `$ node app.js`
* `$ cd ~/FarmWebsite/`
* `$ npm run build:watch`
* Open a web browser and enter the URL: "http://localhost:9001/"

## Authors
* [Future Days Software](https://github.com/FutureDaysSoftware)
* [Christopher Baron](https://github.com/cbaron)
* [Alex Cadigan](https://github.com/AlexCadigan)

## License
This software is licensed under the [MIT License](LICENSE)
