import {expect} from 'chai'
import parse from '../index.js';


describe('Boolean', function () {
	


	it('flag boolean default false', function () {
		const argv = parse(['moo'], {
			boolean: ['t', 'verbose'],
			default: { verbose: false, t: false }
		});
		
		expect(argv).to.deep.equal({
			verbose: false,
			t: false,
			_: ['moo']
		});
		
		expect(typeof argv.verbose).to.eql('boolean');
		expect(typeof argv.t).to.eql('boolean');

	});

	it('boolean groups', function () {
		const argv = parse([ '-x', '-z', 'one', 'two', 'three' ], {
			boolean: ['x','y','z']
		});
		
		expect(argv).to.deep.equal({
			x : true,
			y : false,
			z : true,
			_ : [ 'one', 'two', 'three' ]
		});
		
		expect(typeof argv.x).to.eql('boolean');
		expect(typeof argv.y).to.eql('boolean');
		expect(typeof argv.z).to.eql('boolean');
	});
	it('boolean and alias with chainable api', function () {
		const aliased = [ '-h', 'derp' ];
		const regular = [ '--herp',  'derp' ];
		const opts = {
			herp: { alias: 'h', boolean: true }
		};
		const aliasedArgv = parse(aliased, {
			boolean: 'herp',
			alias: { h: 'herp' }
		});
		const propertyArgv = parse(regular, {
			boolean: 'herp',
			alias: { h: 'herp' }
		});
		const expected = {
			herp: true,
			h: true,
			'_': [ 'derp' ]
		};
		
		expect(aliasedArgv).to.deep.equal(expected);
		expect(propertyArgv).to.deep.equal(expected); 
	});

	it('boolean and alias with options hash', function () {
		const aliased = [ '-h', 'derp' ];
		const regular = [ '--herp', 'derp' ];
		const opts = {
			alias: { 'h': 'herp' },
			boolean: 'herp'
		};
		const aliasedArgv = parse(aliased, opts);
		const propertyArgv = parse(regular, opts);
		const expected = {
			herp: true,
			h: true,
			'_': [ 'derp' ]
		};
		expect(aliasedArgv).to.deep.equal(expected);
		expect(propertyArgv).to.deep.equal(expected);
	});

	it('boolean and alias array with options hash', function () {
		const aliased = [ '-h', 'derp' ];
		const regular = [ '--herp', 'derp' ];
		const alt = [ '--harp', 'derp' ];
		const opts = {
			alias: { 'h': ['herp', 'harp'] },
			boolean: 'h'
		};
		const aliasedArgv = parse(aliased, opts);
		const propertyArgv = parse(regular, opts);
		const altPropertyArgv = parse(alt, opts);
		const expected = {
			harp: true,
			herp: true,
			h: true,
			'_': [ 'derp' ]
		};
		expect(aliasedArgv).to.deep.equal(expected);
		expect(propertyArgv).to.deep.equal(expected);
		expect(altPropertyArgv).to.deep.equal(expected);
	});

	it('boolean and alias using explicit true', function () {
		const aliased = [ '-h', 'true' ];
		const regular = [ '--herp',  'true' ];
		const opts = {
			alias: { h: 'herp' },
			boolean: 'h'
		};
		const aliasedArgv = parse(aliased, opts);
		const propertyArgv = parse(regular, opts);
		const expected = {
			herp: true,
			h: true,
			'_': [ ]
		};

		expect(aliasedArgv).to.deep.equal(expected);
		expect(propertyArgv).to.deep.equal(expected); 
	});

	// regression, see https://github.com/substack/node-optimist/issues/71
	it('boolean and --x=true', function() {
		let parsed = parse(['--boool', '--other=true'], {
			boolean: 'boool'
		});

		expect(parsed.boool).to.eql(true);
		expect(parsed.other).to.eql('true');

		parsed = parse(['--boool', '--other=false'], {
			boolean: 'boool'
		});
		
		expect(parsed.boool).to.eql(true);
		expect(parsed.other).to.eql('false');
	});

	it('boolean --boool=true', function () {
		const parsed = parse(['--boool=true'], {
			default: {
				boool: false
			},
			boolean: ['boool']
		});

		expect(parsed.boool).to.eql(true);
	});

	it('boolean --boool=false', function () {
		const parsed = parse(['--boool=false'], {
			default: {
			boool: true
			},
			boolean: ['boool']
		});

		expect(parsed.boool).to.eql(false);
	});

	it('boolean using something similar to true', function () {
		const opts = { boolean: 'h' };
		const result = parse(['-h', 'true.txt'], opts);
		const expected = {
			h: true,
			'_': ['true.txt']
		};

		expect(result).to.deep.equal(expected);
	});

});