var sayHello = require('../src/hello');

describe('first test', function() {
	
	it('says hello', function() {
		expect(sayHello('BoB')).toBe('Hello, BoB!');
	});
});
