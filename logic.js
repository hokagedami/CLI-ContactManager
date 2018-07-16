const mongoose = require('mongoose');
const assert = require('assert');
const chalk = require('chalk');
const print = console.info;

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/contact-manager', { useNewUrlParser: true });

toLower = (v) => {
    return v.toLowerCase();
};

const contactSchema = mongoose.Schema({
    firstName: { type: String, set: toLower },
    lastName: { type: String, set: toLower },
    phone: { type: String, set: toLower },
    email: { type: String, set: toLower }
});

const Contact = mongoose.model('Contact', contactSchema);

const addContact = (contact) => {
    Contact.create(contact, (error) => {
        assert.equal(null, error);
        print(chalk.blue('New Contact Added!'));
        closeConnection();
    });
};


const getContact = (name) => {

    const search = new RegExp(name, 'i');

    Contact.find({ $or: [{ firstName: search }, { lastName: search }] })
        .exec((error, contact) => {
            assert.equal(null, error);
            print(chalk.yellowBright(contact));
            if (contact.length <= 1) {
                print(chalk.blue(`${contact.length} match found.`));
            } else {
                print(chalk.blue(`${contact.length} matches found.`));
            }
            closeConnection();
        });
};

const updateContact = (_id, contact) => {
    Contact.update({ _id }, contact)
        .exec((error, status) => {
            assert.equal(null, error);
            print(chalk.blue('Contact Updated Successfully!'));
            closeConnection();
        });
};

const deleteContact = (_id) => {
    Contact.remove({ _id })
        .exec((error, status) => {
            assert.equal(null, error);
            print(chalk.blue('Contact Deleted Successfully!'));
            closeConnection();
        });
};

const getContactList = () => {
    Contact.find()
        .exec((error, contacts) => {
            assert.equal(null, error);
            print(chalk.green(contacts));
            if (contacts.length <= 1) {
                print(chalk.blue(`${contacts.length} contact found.`));
            } else {
                print(chalk.blue(`${contacts.length} contacts found.`));
            }
            closeConnection();
        });
};

const closeConnection = () => {
    mongoose.connection.close();
    print(chalk.blue('Connection Closed!'));
};

module.exports = {
    addContact,
    getContact,
    getContactList,
    updateContact,
    deleteContact
};