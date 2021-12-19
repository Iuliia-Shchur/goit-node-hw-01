
const chalk = require('chalk');
const { Command } = require('commander');
const {listContacts, addContact, getContactById, removeContact} = require('./contact');

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
    
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.table(contacts)
      break;

    case 'get':
      const logContactById = await getContactById(id)
      if(logContactById) {
          console.log(chalk.blue('Found contact'));
          console.log(logContactById);
          return

      } 
          console.log(chalk.cyan('Contact not found'));

      
      break;

    case 'add':
      const contact = await addContact(name, email, phone)
      console.log(chalk.green('Added new contact'));
      console.log(contact);
      break;

    case 'remove':
     const updatedContacts = await removeContact(id)
     console.log(chalk.greenBright(' Contact deleted successfully'));
     console.table(updatedContacts);
      break;

    default:
      console.warn(chalk.red('Unknown action type!'));
  }
}

invokeAction(argv).then(() => console.log('Operation successful'));

