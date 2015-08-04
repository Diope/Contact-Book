#!/usr/bin/env node
var Command = require('./command.js')

function handleResult(err) {
  if (err) {
    console.log('Error!')
  } else {
    console.log('OK! The command ran successfully!')
  }
}


if(Command.getOperation() === 'add'){
  Command.add(handleResult);
  }else if(Command.getOperation() === 'find') {
	   Command.find(handleResult);
  }else {
	   return console.log('Unknown Command!');
}
