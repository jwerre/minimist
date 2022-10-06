import parse from '../index.js';
import {expect} from 'chai';

describe('Unknown', function () {	

	it('boolean and alias is not unknown', function () {
		const unknown = [];
		function unknownFn(arg) {
			unknown.push(arg);
			return false;
		}
		const aliased = [ '-h', 'true', '--derp', 'true' ];
		const regular = [ '--herp',  'true', '-d', 'true' ];
		const opts = {
			alias: { h: 'herp' },
			boolean: 'h',
			unknown: unknownFn
		};
		const aliasedArgv = parse(aliased, opts);
		const propertyArgv = parse(regular, opts);

		expect(unknown).to.deep.equal(['--derp', '-d']);
	});

	it('flag boolean true any double hyphen argument is not unknown', function () {
		const unknown = [];
		function unknownFn(arg) {
			unknown.push(arg);
			return false;
		}
		const argv = parse(['--honk', '--tacos=good', 'cow', '-p', '55'], {
			boolean: true,
			unknown: unknownFn
		});
		expect(unknown).to.deep.equal( ['--tacos=good', 'cow', '-p']);
		expect(argv).to.deep.equal( {
			honk: true,
			_: []
		});
	});

	it('string and alias is not unknown', function () {
		const unknown = [];
		function unknownFn(arg) {
			unknown.push(arg);
			return false;
		}
		const aliased = [ '-h', 'hello', '--derp', 'goodbye' ];
		const regular = [ '--herp',  'hello', '-d', 'moon' ];
		const opts = {
			alias: { h: 'herp' },
			string: 'h',
			unknown: unknownFn
		};
		const aliasedArgv = parse(aliased, opts);
		const propertyArgv = parse(regular, opts);

		expect(unknown).to.deep.equal(['--derp', '-d']);
	});

	it('default and alias is not unknown', function () {
		const unknown = [];
		function unknownFn(arg) {
			unknown.push(arg);
			return false;
		}
		const aliased = [ '-h', 'hello' ];
		const regular = [ '--herp',  'hello' ];
		const opts = {
			default: { 'h': 'bar' },
			alias: { 'h': 'herp' },
			unknown: unknownFn
		};
		const aliasedArgv = parse(aliased, opts);
		const propertyArgv = parse(regular, opts);

		expect(unknown).to.deep.equal([]);
		unknownFn(); // exercise fn for 100% coverage
	});

	it('value following -- is not unknown', function () {
		const unknown = [];
		function unknownFn(arg) {
			unknown.push(arg);
			return false;
		}
		const aliased = [ '--bad', '--', 'good', 'arg' ];
		const opts = {
			'--': true,
			unknown: unknownFn
		};
		const argv = parse(aliased, opts);

		expect(unknown).to.deep.equal(['--bad']);
		expect(argv).to.deep.equal({
			'--': ['good', 'arg'],
			'_': []
		})
	});


});