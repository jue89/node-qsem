const qSem = require('../qsem.js');

test('set default to 1 token', () => {
	const s = qSem();
	expect(s.tokens).toBe(1);
});

test('complain about wrong capacity type', () => {
	try {
		qSem(true);
		throw new Error('nope');
	} catch (e) {
		expect(e.message).toEqual('Capacity must be a number');
	}
});

test('push new jobs on stack', () => {
	const s = qSem(0);
	s.enter();
	expect(s.stack.length).toBe(1);
});

test('execute job on stack if tokens are avaible', () => {
	const s = qSem(1);
	return s.enter().then(() => {
		expect(s.tokens).toBe(0);
	});
});

test('execute all jobs on stack if tokens are avaible', () => {
	const s = qSem(2);
	s.enter();
	return s.enter().then(() => {
		expect(s.tokens).toBe(0);
	});
});

test('add token on leave', () => {
	const s = qSem(0);
	s.leave();
	expect(s.tokens).toBe(1);
});

test('execute job is another job left the semaphore', () => {
	const s = qSem(1);
	s.enter();
	const q = s.enter();
	s.leave();
	return q;
});
