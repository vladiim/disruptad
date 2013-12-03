# Dependencies

* Ruby 2.0.0-p0
* node: `$ brew install node`

Run `$ bundle install`
Run `$ npm install`

***

# Coffeescript

To compile coffeescript to javascript run `$ guard` as a b/ground process.

It is currently set up to translate the following files:

* From `./coffee/routes/*.coffee` to `./routes/*.js`
* From `./coffee/public/*.coffee` to `./public/javascripts/*.js`
* From `./tests/coffee/*.coffee` to `./tests/javascripts/*.js`

You can update these settings in `./Guardfile`

***

# Testing

* Run `npm test`

To test files individually install mocha globally `$ sudo npm install -g mocha` then run `$ mocha tests/javascript/myTestFile.js`

***

# Server

* Run `npm start`
* Go to http://localhost:3000

***

# Deployment

TBC