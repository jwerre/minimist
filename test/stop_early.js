import parse from '../index.js';
import {expect} from 'chai';


describe('Stop early', function () {
	

	it('stops parsing on the first non-option when stopEarly is set', function () {
		const argv = parse(['--aaa', 'bbb', 'ccc', '--ddd'], {
			stopEarly: true
		});

		expect(argv).to.deep.equal({
			aaa: 'bbb',
			_: ['ccc', '--ddd']
		});

	});


});