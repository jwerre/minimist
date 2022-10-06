import parse from '../index.js';
import {expect} from 'chai';


describe('Dotted', function () {
	
	it('dotted alias', function () {
		const argv = parse(['--a.b', '22'], {default: {'a.b': 11}, alias: {'a.b': 'aa.bb'}});
		expect(argv.a.b).to.eql(22);
		expect(argv.aa.bb).to.eql(22);
	});

	it('dotted default', function () {
		const argv = parse('', {default: {'a.b': 11}, alias: {'a.b': 'aa.bb'}});
		expect(argv.a.b).to.eql(11);
		expect(argv.aa.bb).to.eql(11);
	});

	it('dotted default with no alias', function () {
		const argv = parse('', {default: {'a.b': 11}});
		expect(argv.a.b).to.eql(11);
	});

});

