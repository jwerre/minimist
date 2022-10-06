import parse from '../index.js';
import {expect} from 'chai';

describe('Short', function () {

	it('numeric short args', function () {
		expect(parse([ '-n123' ])).to.deep.equal({ n: 123, _: [] });
		expect(
			parse([ '-123', '456' ])
		).to.deep.equal(
			{ 1: true, 2: true, 3: 456, _: [] }
		);
	});

	it('short', function () {
		expect(
			parse([ '-b' ]),
		).to.deep.equal(
			{ b : true, _ : [] },
			'short boolean'
		);
		expect(
			parse([ 'foo', 'bar', 'baz' ]),
		).to.deep.equal(
			{ _ : [ 'foo', 'bar', 'baz' ] },
			'bare'
		);
		expect(
			parse([ '-cats' ]),
		).to.deep.equal(
			{ c : true, a : true, t : true, s : true, _ : [] },
			'group'
		);
		expect(
			parse([ '-cats', 'meow' ]),
		).to.deep.equal(
			{ c : true, a : true, t : true, s : 'meow', _ : [] },
			'short group next'
		);
		expect(
			parse([ '-h', 'localhost' ]),
			{ h : 'localhost', _ : [] },
			'short capture'
		);
		expect(
			parse([ '-h', 'localhost', '-p', '555' ]),
		).to.deep.equal(
			{ h : 'localhost', p : 555, _ : [] },
			'short captures'
		);
	});
	
	it('mixed short bool and capture', function () {
		expect(
			parse([ '-h', 'localhost', '-fp', '555', 'script.js' ]),
		).to.deep.equal(
			{
				f : true, p : 555, h : 'localhost',
				_ : [ 'script.js' ]
			}
		);
	});
	
	it('short and long', function () {
		expect(
			parse([ '-h', 'localhost', '-fp', '555', 'script.js' ]),
		).to.deep.equal(
			{
				f : true, p : 555, h : 'localhost',
				_ : [ 'script.js' ]
			}
		);
	});

});