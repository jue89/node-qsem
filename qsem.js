function Semaphore (capacity) {
	if (capacity === undefined) capacity = 1;
	if (typeof capacity !== 'number') throw new Error('Capacity must be a number');
	this.tokens = capacity;
	this.stack = [];
};

Semaphore.prototype._handleStack = function () {
	while (this.tokens > 0 && this.stack.length) {
		this.tokens--;
		this.stack.shift()();
	}
};

Semaphore.prototype.enter = function () {
	return new Promise((resolve) => {
		// Push job to stack
		this.stack.push(resolve);
		this._handleStack();
	});
};

Semaphore.prototype.leave = function () {
	// Increase tokens
	this.tokens++;
	this._handleStack();
};

module.exports = (capacity) => new Semaphore(capacity);
