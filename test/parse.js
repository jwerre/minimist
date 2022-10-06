import parse from '../index.js';
import {expect} from 'chai';

describe('Parse', function () {

	it('parse args', function () {
		expect(
			parse([ '--no-moo' ])
		).to.deep.equal(
			{ moo : false, _ : [] },
			'no'
		);
		expect(
			parse([ '-v', 'a', '-v', 'b', '-v', 'c' ])
		).to.deep.equal(
			{ v : ['a','b','c'], _ : [] },
			'multi'
		);
	});
	
	it('comprehensive', function () {
		expect(
			parse([
				'--name=meowmers', 'bare', '-cats', 'woo',
				'-h', 'awesome', '--multi=quux',
				'--key', 'value',
				'-b', '--bool', '--no-meep', '--multi=baz',
				'--', '--not-a-flag', 'eek'
			]),
		).to.deep.equal(
			{
				c : true,
				a : true,
				t : true,
				s : 'woo',
				h : 'awesome',
				b : true,
				bool : true,
				key : 'value',
				multi : [ 'quux', 'baz' ],
				meep : false,
				name : 'meowmers',
				_ : [ 'bare', '--not-a-flag', 'eek' ]
			}
		);
	});

	it('flag boolean', function () {
		const argv = parse([ '-t', 'moo' ], { boolean: 't' });
		expect(argv).to.deep.equal({ t : true, _ : [ 'moo' ] });
		expect(typeof argv.t).to.eql('boolean');
	});

	it('flag boolean value', function () {
		const argv = parse(['--verbose', 'false', 'moo', '-t', 'true'], {
			boolean: [ 't', 'verbose' ],
			default: { verbose: true }
		});
		
		expect(argv).to.deep.equal({
			verbose: false,
			t: true,
			_: ['moo']
		});
		
		expect(typeof argv.verbose).to.eql('boolean');
		expect(typeof argv.t).to.eql('boolean');
	});

	it('newlines in params' , function () {

		let args;

		args = parse([ '-s', "X\nX" ])

		expect(args).to.deep.equal({ _ : [], s : "X\nX" });
		
		// reproduce in bash:
		// VALUE="new
		// line"
		// node program.js --s="$VALUE"
		args = parse([ "--s=X\nX" ])
		expect(args).to.deep.equal({ _ : [], s : "X\nX" });
	});

	it('strings' , function () {
		const s = parse([ '-s', '0001234' ], { string: 's' }).s;
		expect(s).to.eql('0001234');
		expect(typeof s).to.eql('string');
		
		const x = parse([ '-x', '56' ], { string: 'x' }).x;
		expect(x).to.eql('56');
		expect(typeof x).to.eql('string');
	});

	it('stringArgs', function () {
		const s = parse([ '  ', '  ' ], { string: '_' })._;
		expect(s).to.have.length(2);
		expect(typeof s[0]).to.eql('string');
		expect(s[0]).to.eql('  ');
		expect(typeof s[1]).to.eql('string');
		expect(s[1]).to.eql('  ');
	});

	it('empty strings', function() {
		const s = parse([ '-s' ], { string: 's' }).s;
		expect(s).to.eql('');
		expect(typeof s).to.eql('string');

		const str = parse([ '--str' ], { string: 'str' }).str;
		expect(str, '');
		expect(typeof str).to.eql('string');

		const letters = parse([ '-art' ], {
			string: [ 'a', 't' ]
		});

		expect(letters.a).to.eql('');
		expect(letters.r).to.eql(true);
		expect(letters.t).to.eql('');

	});


	it('string and alias', function() {
		const x = parse([ '--str',  '000123' ], {
			string: 's',
			alias: { s: 'str' }
		});

		expect(x.str).to.eql('000123');
		expect(typeof x.str).to.eql('string');
		expect(x.s).to.eql('000123');
		expect(typeof x.s).to.eql('string');

		const y = parse([ '-s',  '000123' ], {
			string: 'str',
			alias: { str: 's' }
		});

		expect(y.str).to.eql('000123');
		expect(typeof y.str).to.eql('string');
		expect(y.s).to.eql('000123');
		expect(typeof y.s).to.eql('string');
	});

	it('slashBreak', function () {
		expect(
			parse([ '-I/foo/bar/baz' ]),
		).to.deep.equal(
			{ I : '/foo/bar/baz', _ : [] }
		);
		expect(
			parse([ '-xyz/foo/bar/baz' ]),
		).to.deep.equal(
			{ x : true, y : true, z : '/foo/bar/baz', _ : [] }
		);
	});

	it('alias', function () {
		const argv = parse([ '-f', '11', '--zoom', '55' ], {
			alias: { z: 'zoom' }
		});
		expect(argv.zoom).to.eql(55);
		expect(argv.z).to.eql(argv.zoom);
		expect(argv.f).to.eql(11);
	});

	it('multiAlias', function () {
		const argv = parse([ '-f', '11', '--zoom', '55' ], {
			alias: { z: [ 'zm', 'zoom' ] }
		});
		expect(argv.zoom).to.eql(55);
		expect(argv.z).to.eql(argv.zoom);
		expect(argv.z).to.eql(argv.zm);
		expect(argv.f).to.eql(11);
	});

	it('nested dotted objects', function () {
		const argv = parse([
			'--foo.bar', '3', '--foo.baz', '4',
			'--foo.quux.quibble', '5', '--foo.quux.o_O',
			'--beep.boop'
		]);
		
		expect(argv.foo).to.deep.equal({
			bar : 3,
			baz : 4,
			quux : {
				quibble : 5,
				o_O : true
			}
		});
		expect(argv.beep).to.deep.equal({ boop : true });
	});


});