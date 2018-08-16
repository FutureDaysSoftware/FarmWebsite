# Future Days Farm
A website for the [Future Days Farm](InsertLinkToWebsite)

## Prerequisites for Testing the Website

### macOS
* Download [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
* Download [npm and Node.js](https://nodejs.org/en/)
* Install [n](https://www.npmjs.com/package/n): `$ npm install n -g`
* Install prefered node.js version: `$ sudo n X.X.X`
* Clone the repository: `$ git clone https://github.com/FutureDaysSoftware/FarmWebsite.git`
* [Connect to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)
* Install dependencies: 
	* `$ cd ~/FarmWebsite/`
	* `$ npm install`
* Install [yarn](https://yarnpkg.com/en/): `$ curl -o- -L https://yarnpkg.com/install.sh | bash`
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

### Windows

### Linux

## Testing the Website

### macOS
* In one terminal window:
	* `$ mongod`
* In a seperate terminal window:
	* `$ cd ~/FarmWebsite/`
	* `$ node app.js`
* In a seperate terminal window:
	* `$ cd ~/FarmWebsite/`
	* `$ npm run build:watch`
* In a seperate terminal window:
	* `$ cd ~/FarmWebsite/`
	* `$ yarn appsync-emulator --port 5001`
* Open a web browser and enter the URL: "http://localhost:9001/"

### Windows

### Linux

## Authors
* [Future Days Software](https://github.com/FutureDaysSoftware)
* [Christopher Baron](https://github.com/cbaron)
* [Scott](https://github.com/ScottAP108)
* [Alex Cadigan](https://github.com/AlexCadigan)

## License
This software is licensed under the [MIT License](LICENSE)
