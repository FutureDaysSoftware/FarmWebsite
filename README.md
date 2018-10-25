# Future Days Farm
A website for the [Future Days Farm](InsertLinkToWebsite)

## Prerequisites for Testing the Website

### macOS
* Download [npm and Node.js](https://nodejs.org/en/)
* Install [n](https://www.npmjs.com/package/n): `$ npm install n -g`
* Install node.js version 9: `$ sudo n 9.11.2`
* Install [yarn](https://yarnpkg.com/en/): `$ npm install yarn -g`
* Clone the repository: `$ git clone https://github.com/FutureDaysSoftware/FarmWebsite.git`
* Install dependencies: 
	* `$ cd ~/FarmWebsite/`
	* `$ yarn`
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

## Running the Website

### macOS
* `$ cd ~/FarmWebsite/`
* `$ node app.js`

* `$ cd ~/FarmWebsite/`
* `$ npm run build:watch`

* `$ cd ~/FarmWebsite/`
* `$ yarn appsync-emulator --port 5001`

* Open a web browser and enter the URL: "http://localhost:9001/"

## Running Tests

### macOS
* `$ cd ~/FarmWebsite/`
* `$ yarn test`

## Authors
* [Future Days Software](https://github.com/FutureDaysSoftware)
* [Christopher Baron](https://github.com/cbaron)
* [Scott Parton](https://github.com/ScottAP108)
* [Alex Cadigan](https://github.com/AlexCadigan)

## License
This software is licensed under the [MIT License](LICENSE)
