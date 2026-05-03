import {EventEmitter} from 'events';

const myEmiiter = new EventEmitter();

function greetHandler(name  = "Kirk") {
  console.log('Hello '+ name);
}

function goodbyeHandler(name = "Kirk") {
  console.log('Bye '+ name);
}

// Register event listener
myEmiiter.on('greet', greetHandler);
myEmiiter.on('goodbye', goodbyeHandler);

// Emit events
myEmiiter.emit('greet', 'john');
myEmiiter.emit('goodbye', 'john');

// Error handling
myEmiiter.on('error',(err) =>{
  console.log('An error occured: ', err)
});

// Stimulate error
myEmiiter.emit('error', new Error('Something went wrong'));