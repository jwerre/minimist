import parse from '../index.js';
import {expect} from 'chai';


describe('Whitespace', function () {
	
	it('whitespace should be whitespace' , function () {
		var x = parse([ '-x', '\t' ]).x;
		expect(x, '\t');
	});

});