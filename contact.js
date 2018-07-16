#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');


const {
    addContact,
    getContact,
    getContactList,
    updateContact,
    deleteContact
} = require('./logic');

const questions = [{
        type: 'input',
        name: 'firstName',
        message: 'Enter First Name....'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter Last Name....'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter Phone Number....'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email address....'
    }
];


program
    .version('0.0.1')
    .description('Contact Management Sysyem');

program
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() => {
        prompt(questions)
            .then(answers => addContact(answers));
    });

program
    .command('getContact <name>')
    .alias('r')
    .description('Get contact')
    .action(name => getContact(name));

program
    .command('updateContact <_id>')
    .alias('u')
    .description('Update Contact.')
    .action(_id => {
        prompt(questions)
            .then((answers) => updateContact(_id, answers));
    });

program
    .command('deleteContact <_id>')
    .alias('d')
    .description('Delete Contact')
    .action(_id => deleteContact(_id));

program.command('getContactList')
    .alias('l')
    .description('List All Contacts')
    .action(() => getContactList());

if (!process.argv.slice(2).length || !/[arud]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
}

program.parse(process.argv);