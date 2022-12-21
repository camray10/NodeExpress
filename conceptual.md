### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
	- **Callbacks** A callback is a function that is passed as an argument to another function and is executed after the outer function has completed. 
	- **Promises** A promise is an object that represents the eventual completion or failure of an async operation.
	- **Async/await** Async/await is a syntax that allows you to write async code in a synchronous-looking style. It is built on top of promises and makes it easier to write and read async code.

- What is a Promise?
	- A promise is an object that represents the eventual completion or failure of an async operation. It has a `then` method, which takes two callback functions as arguments: one for the fulfillment of the promise and one for rejection.

- What are the differences between an async function and a regular function?
	- An `async function` is a special type of function in JavaScript that allows you to use the await keyword inside the function body. The `await` keyword can be used to wait for a promise to resolve before proceeding with the rest of the async function's logic. A regular function does not have the `await` keyword and has to use promises and callbacks.

- What is the difference between Node.js and Express.js?
	- Node.js is a runtime environment for running JavaScript on the server. It provides a platform for building server-side applications with JavaScript. Express.js is a framework built on top of Node.js for building web applications and APIs.

- What is the error-first callback pattern?
	- The error-first callback pattern is a standard way of handling errors in Node.js. It involves passing a callback function to an async function that takes an error object as the first argument. If an error occurs during the async operation, the error object is passed to the callback function. If the operation is successful, the error argument is passed as null.
	
	```js
	app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;
  
  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});

- What is middleware?
	- It is code that runs in the **middle** of the request / response cycle. In Express, middleware are functions that get access to the req and res objects and can also call the next function. It opens up the door for separating our code into more logical groupings and providing more robust / abstracted error handling.

- What does the `next` function do?
	- The `next` function is used to pass control to the next middleware function in the stack. It is typically used in middleware functions that perform certain tasks before or after the main application logic.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
	- There are 3 separate API request to github, which could be simplified to 1 request. The variables names could be more descriptive. An error handling function is necessary.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}

