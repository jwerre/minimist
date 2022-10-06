import {expect} from 'chai'
import parse from '../index.js';


describe('Dash', function () {
	
	it('-', function () {
		
		expect(parse([ '-n', '-' ])).to.deep.equal({ n: '-', _: [] });
		expect(parse([ '-' ])).to.deep.equal({ _: [ '-' ] });
		expect(parse([ '-f-' ])).to.deep.equal({ f: '-', _: [] });
		expect(
			parse([ '-b', '-' ], { boolean: 'b' })
		).to.deep.equal(
			{ b: true, _: [ '-' ] }
		);
		expect(
			parse([ '-s', '-' ], { string: 's' })
		).to.deep.equal(
			{ s: '-', _: [] }
		);
	});

	it('-a -- b', function () {
		
		expect(parse([ '-a', '--', 'b' ])).to.deep
			.equal({ a: true, _: [ 'b' ] });

		expect(parse([ '--a', '--', 'b' ])).to.deep
			.equal({ a: true, _: [ 'b' ] });

		expect(parse([ '--a', '--', 'b' ])).to.deep
			.equal({ a: true, _: [ 'b' ] });

	});

	it('move arguments after the -- into their own `--` array', function() {
		
		const result = parse(
			[ '--name', 'John', 'before', '--', 'after' ], { '--': true });

		expect( result ).to.deep.equal(
			{ name: 'John', _: [ 'before' ], '--': [ 'after' ] }
		);
	});

});