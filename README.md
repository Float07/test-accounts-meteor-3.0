This repo was created to demonstrate an issue with the Meteor Accounts package when updating from Meteor 2.16 to Meteor 3.0, together with a possible solution that allows for gradual migration to avoid this issue.

# The issue

The issue is simple: Some `Acounts` functions are sync in 2.16 but async in 3.0, which means updating the Meteor version can break a code that used to work in 2.16.

# Possible solution

Add `await` before calling those functions, which are redundant in 2.16 but makes it so the code won't break in 3.0.

# Testing

This repo allows you to test this with two methods: `testA` and `testB`.

after clonning this repo, run `meteor npm install` to install the depdencencies. After that, run the app with `meteor`.

Go to localhost:3000 and try to call the two methods with `Meteor.call('methodName')` and take a look at the server logs. You should see the user document being printed correctly for each method.
![image](https://github.com/user-attachments/assets/58dd73d6-3187-45a1-a33f-5ae29a1fe618)


Now, stop the app and update the Meteor version with `meteor update`, which should update you to 3.0. After the update is done, run `rm -rf node_modules/` and `meteor npm install` to make sure all packages are updated.

Now, run the app with `meteor` again and run the same tests you ran before, with both methods. You'll notice that:

- `testA`, which doesn't use `async` and `await`, prints promises instead of user documents
- `testB`, which uses `async` and `await`, works the same as it did in 2.16, printing the user documents

![image](https://github.com/user-attachments/assets/fb724132-80b9-4e0e-b0a1-4cf53a09df0a)


