# Future Days Farm
A website for the [Future Days Farm](InsertLinkToWebsite)

## Prerequisites for Testing the Website

### macOS
* Download [npm and Node.js](https://nodejs.org/en/)
* Install [n](https://www.npmjs.com/package/n): `$ npm install n -g`
* Install prefered node.js version: `$ sudo n X.X.X`
* Install [yarn](https://yarnpkg.com/en/): `$ npm install yarn -g`
* Clone the repository: `$ git clone https://github.com/FutureDaysSoftware/FarmWebsite.git`
* [Connect to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)
* Install dependencies: 
	* `$ cd ~/FarmWebsite/`
	* `$ yarn`
* Install the AppSync emulator: 
	* `$ cd ~/FarmWebsite/`
	* `$ yarn add @conduitvc/appsync-emulator-serverless@0.6.4`
* Add `export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"` to your `.bash_profile`
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
* [Scott](https://github.com/ScottAP108)
* [Alex Cadigan](https://github.com/AlexCadigan)

## License
This software is licensed under the [MIT License](LICENSE)
