var sayHello = require('../src/hello');

describe('first test', function() {
	
	it('says hello', function() {
		expect(sayHello('Barry')).toBe('Hello, Barry!');
	});
});
