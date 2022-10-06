import parse from '../index.js';
import {expect} from 'chai';

describe('Long options', function () {

	it('long opts', function () {

		expect(
			parse([ '--bool' ]),
		).to.deep.equal(
			{ bool : true, _ : [] },
			'long boolean'
		);

		expect(
			parse([ '--pow', 'xixxle' ]),
		).to.deep.equal(
			{ pow : 'xixxle', _ : [] },
			'long capture sp'
		);

		expect(
			parse([ '--pow=xixxle' ]),
		).to.deep.equal(
			{ pow : 'xixxle', _ : [] },
			'long capture eq'
		);

		expect(
			parse([ '--host', 'localhost', '--port', '555' ]),
		).to.deep.equal(
			{ host : 'localhost', port : 555, _ : [] },
			'long captures sp'
		);

		expect(
			parse([ '--host=localhost', '--port=555' ]),
		).to.deep.equal(
			{ host : 'localhost', port : 555, _ : [] },
			'long captures eq'
		);

	});

});