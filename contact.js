var Util = require('./util');
var Contact = {};
var dataFile = Util.getDataPath();

Contact.parseName = function (str) {
  return str.split(",")[0].trim()
};

Contact.parseNumber = function (str) {
  return str.split(",")[1].trim()
}

Contact.createContact = function (str) {
  var contact = {
    name: this.parseName(str),
    number: this.parseNumber(str)
  }
  return contact
}

Contact.loadContacts = function (done) {
  var jsonfile = require('jsonfile')
  jsonfile.readFile(dataFile, function (err,data) {
    done(err,data)
  });
}

Contact.saveContacts = function (contacts, done) {
  var jsonfile = require('jsonfile');
  jsonfile.writeFile(dataFile, contacts, function (err) {
    done(err)
  });
}

Contact.saveContact = function (contact, done) {
  var _this = this

  this.loadContacts(function (err, contacts) {
    if(err) {return done(err) }
    contacts.push(contact)
    _this.saveContacts(contacts, done)
  })
}
Contact.findContacts = function (name, done) {
  this.loadContacts(function (err, contact) {
    if(err) {return done(err)}
    var names = contact.filter(function (contact) {
      return contact.name == name
    })
    done(err, names)
  })
}

module.exports = Contact
