import {expect} from 'chai'
import parse from '../index.js';


describe('All Booleans', function () {
	
	it('flag boolean true (default all --args to boolean)', function () {

		const argv = parse(['moo', '--honk', 'cow'], {
			boolean: true
		});
		
		expect(argv).to.deep.equal({
			honk: true,
			_: ['moo', 'cow']
		});
		
		expect(typeof argv.honk).to.eql('boolean');

	});

	it('flag boolean true only affects double hyphen arguments without equals signs', function () {

		const argv = parse(['moo', '--honk', 'cow', '-p', '55', '--tacos=good'], {
			boolean: true
		});
		
		expect(argv).to.deep.equal({
			honk: true,
			tacos: 'good',
			p: 55,
			_: ['moo', 'cow']
		});
		
		expect(typeof argv.honk).to.eql('boolean');

	});
});

