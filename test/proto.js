import parse from '../index.js';
import {expect} from 'chai';

describe('Proto', function () {
	
	it('proto pollution', function () {
		const argv = parse(['--__proto__.x','123']);
		expect({}.x).to.eql(undefined);
		expect(argv.__proto__.x).to.eql(undefined);
		expect(argv.x).to.eql(undefined);
	});

	it('proto pollution (array)', function () {
		const argv = parse(['--x','4','--x','5','--x.__proto__.z','789']);
		expect({}.z).to.eql(undefined);
		expect(argv.x).to.deep.equal([4,5]);
		expect(argv.x.z).to.eql(undefined);
		expect(argv.x.__proto__.z).to.eql(undefined);
	});

	it('proto pollution (number)', function () {
		const argv = parse(['--x','5','--x.__proto__.z','100']);
		expect({}.z).to.eql(undefined);
		expect((4).z).to.eql(undefined);
		expect(argv.x).to.eql(5);
		expect(argv.x.z).to.eql(undefined);
	});

	it('proto pollution (string)', function () {
		const argv = parse(['--x','abc','--x.__proto__.z','def']);
		expect({}.z).to.eql(undefined);
		expect('...'.z).to.eql(undefined);
		expect(argv.x).to.eql('abc');
		expect(argv.x.z).to.eql(undefined);
	});

	it('proto pollution (constructor)', function () {
		const argv = parse(['--constructor.prototype.y','123']);
		expect({}.y).to.eql(undefined);
		expect(argv.y).to.eql(undefined);
	});

	it('proto pollution (constructor function)', function () {
		const argv = parse(['--_.concat.constructor.prototype.y', '123']);
		function fnToBeTested() {}
		expect(fnToBeTested.y).to.eql(undefined);
		expect(argv.y).to.eql(undefined);
	});

	// powered by snyk - https://github.com/backstage/backstage/issues/10343
	it('proto pollution (constructor function) snyk', function () {
		const argv = parse('--_.constructor.constructor.prototype.foo bar'.split(' '));
		expect((function(){}).foo).to.eql(undefined);
		expect(argv.y).to.eql(undefined);
	})

});