import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  testA() {
    // This test is supposed to work for Meteor 2.16 but break for Meteor 3.0
    console.log('test A');
    const userByUsername = Accounts.findUserByUsername('username');
    const userByEmail = Accounts.findUserByEmail('email@email.com');

    console.log({
      userByUsername,
      userByEmail,
    });
  },

  async testB() {
    // This test is supposed to work for both Meteor 2.16 and Meteor 3.0
    console.log('test B');
    const userByUsername = await Accounts.findUserByUsername('username');
    const userByEmail = await Accounts.findUserByEmail('email@email.com');

    console.log({
      userByUsername,
      userByEmail,
    });
  },
});

Meteor.startup(async () => {
  const user = await Meteor.users.findOneAsync();
  if (user) return;

  Accounts.createUser({
    username: 'username',
    email: 'email@email.com',
  });
})
