import parse from '../index.js';
import {expect} from 'chai';

describe('Default Boolean', function () {
	
	it('boolean default true', function () {
		const argv = parse([], {
			boolean: 'sometrue',
			default: { sometrue: true }
		});
		expect(argv.sometrue).to.eql(true);
	});

	it('boolean default false', function () {
		const argv = parse([], {
			boolean: 'somefalse',
			default: { somefalse: false }
		});
		expect(argv.somefalse).to.eql(false);
	});

	it('boolean default to null', function () {

		let argv;

		argv = parse([], {
			boolean: 'maybe',
			default: { maybe: null }
		});
		expect(argv.maybe).to.eql(null);

		argv = parse(['--maybe'], {
			boolean: 'maybe',
			default: { maybe: null }
		});
		expect(argv.maybe).to.eql(true);

	});

});