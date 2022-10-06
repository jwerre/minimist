import parse from '../index.js';
import {expect} from 'chai';

describe('Parse modified', function () {
	
	it('parse with modifier functions' , function () {
		const argv = parse([ '-b', '123' ], { boolean: 'b' });
		expect(argv).to.deep.equal({ b: true, _: [123] });
	});

});
