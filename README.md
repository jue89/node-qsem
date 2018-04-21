# qSem

This is another semaphore implementation for Node.js. It utilises native promises and has no dependencies to other modules.

## API

Requiring the module returns a factory.

```js
const qsem = require('qsem')(capacity);
```

The parameter ```capacity``` states the initial amount of tokens. If not specified it is set to 1.

### Method: enter

```js
qsem.enter().then(() => {...});
```

Returns a promise that resolves once tokens are available.

### Method: leave

```js
qsem.leave();
```

Increases the number of tokens and calls the next job if one is waiting in the queue.

### Method: limit

```js
qsem.limit(cb).then(() => {...});
```

Calls the method ```cb``` once tokens are available. If ```cb``` returns a Promise that is resolved or rejected, the number of available tokens is increased automatically. Don't call ```qsem.leave()``` inside of ```cb```! ```qsem.limit()``` itself returns a promise that reflects the result of ```cb```.
