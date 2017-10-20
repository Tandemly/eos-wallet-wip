var jsf = require('json-schema-faker');
var mockDataSchema = require('./schema');
var fs = require('fs');

var json = JSON.stringify(jsf(mockDataSchema));

fs.writeFile("./mock/_db.json", json, function (err) {
  if (err) {
    return console.log(err);
  } else {
    console.log("Mock data generated.");
  }
});