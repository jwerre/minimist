import parse from '../index.js';
import {expect} from 'chai';

describe('Numbers', function () {

	it('nums', function () {
		var argv = parse([
			'-x', '1234',
			'-y', '5.67',
			'-z', '1e7',
			'-w', '10f',
			'--hex', '0xdeadbeef',
			'789'
		]);
		expect(argv).to.deep.equal({
			x : 1234,
			y : 5.67,
			z : 1e7,
			w : '10f',
			hex : 0xdeadbeef,
			_ : [ 789 ]
		});
		expect(typeof argv.x).to.eql('number');
		expect(typeof argv.y).to.eql('number');
		expect(typeof argv.z).to.eql('number');
		expect(typeof argv.w).to.eql('string');
		expect(typeof argv.hex).to.eql('number');
		expect(typeof argv._[0]).to.eql('number');

	});

	it('already a number', function () {
		var argv = parse([ '-x', 1234, 789 ]);
		expect(argv).to.deep.equal({ x : 1234, _ : [ 789 ] });
		expect(typeof argv.x).to.eql('number');
		expect(typeof argv._[0]).to.eql('number');

	});

});