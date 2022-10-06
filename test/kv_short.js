import parse from '../index.js';
import {expect} from 'chai';


describe('Short Key Values', function () {
	
	it('short -k=v' , function () {
		
		const argv = parse([ '-b=123' ]);
		expect(argv).to.deep.eql({ b: 123, _: [] });
	});

	it('multi short -k=v' , function () {
		
		const argv = parse([ '-a=whatever', '-b=robots' ]);
		expect(argv).to.deep.eql({ a: 'whatever', b: 'robots', _: [] });
	});

});