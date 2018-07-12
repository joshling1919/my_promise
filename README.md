# MyPromise

This will be my attempt to follow along with a couple of tutorials in order to
build a promise library.

http://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html
https://github.com/Jeach/jeach-pqueues

## Scenario

Once I'm done with this promise library, I will attempt to:

Here is an example of a real world 'sign up' API call:

1.  Verify if user already exists (email). [if so, fail w/ message, else proceed]
2.  Create credentials (password, salt, etc.). [fail w/ message, else proceed]
3.  Create user profile (username, fname, lname, etc). [fail w/ message, else proceed]
4.  Create action (in order to send conf. email w/ unique ID) [fail w/ message, else proceed]
5.  Send account confirmation email (this uses unique ID from step 4) [fail w/ message, else proceed]
