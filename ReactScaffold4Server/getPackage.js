var packageq = require('./package.json');

var devDependenciesArray = [];
for(var k in packageq.devDependencies) {
  devDependenciesArray.push(k);
}

var dependenciesArray= [];
for(var k in packageq.dependencies) {
  dependenciesArray.push(k);
}

console.log("sudo npm i --save-dev " + devDependenciesArray.join(' '));
console.log("sudo npm i --save " + dependenciesArray.join(' '));

/**
 sudo npm i --save-dev babel-core babel-loader eslint jest-cli json-loader react-hot-loader react-tools supervisor webpack webpack-dev-server
 sudo npm i --save babel babel-runtime body-parser chroma-js compression cors express flux fuzzy isomorphic-fetch moment node-jsx object-assign react react-a11y react-document-title react-router ua-parser-js when
 **/
