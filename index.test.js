/* eslint-disable no-undef, no-undefined */

const postcss = require('postcss');

const plugin = require('./');

async function run(input, output, opts = {}) {
	const result = await postcss([plugin(opts)]).process(input, { from: undefined });
	if (output === 'error') {
		expect(result.messages[0].type).toEqual('warning');
		expect(result.messages[0].text.startsWith('无法正确解析SVG :: ')).toEqual(true);
		return;
	}
	expect(result.css).toEqual(output);
	expect(result.warnings()).toHaveLength(0);
}

it('default', async() => {
	await run(`a{background-image: url(data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="%23ff0000"></rect></svg>);}`, `a{background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='red' d='m0,0h1e2v1e2H0z'/%3E%3C/svg%3E");}`);

	await run(`a{background-image: url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="#fFFf00"></rect></svg>);}`, `a{background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><path fill="%23ff0" d="m0,0h1e2v1e2H0z"/></svg>');}`);

	await run(`a{background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDBweCcgaGVpZ2h0PScxMDBweCcgZmlsbD0iI2ZGRmYwMCI+PC9yZWN0Pjwvc3ZnPg==);}`, `a{background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNmZjAiIGQ9Im0wLDBoMWUydjFlMkgweiIvPjwvc3ZnPg==);}`);

});

it('extra meta data', async() => {
	await run(`a{background-image: url(data:image/svg+xml;charset=undefined;evil message,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="%23ff0000"></rect></svg>);}`, `a{background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='red' d='m0,0h1e2v1e2H0z'/%3E%3C/svg%3E");}`);

	await run(`a{background-image: url(data:image/svg+xml;charset=undefined;evil message,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="#fFFf00"></rect></svg>);}`, `a{background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><path fill="%23ff0" d="m0,0h1e2v1e2H0z"/></svg>');}`);

	await run(`a{background-image: url(data:image/svg+xml;charset=undefined;evil message;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDBweCcgaGVpZ2h0PScxMDBweCcgZmlsbD0iI2ZGRmYwMCI+PC9yZWN0Pjwvc3ZnPg==#test);}`, `a{background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNmZjAiIGQ9Im0wLDBoMWUydjFlMkgweiIvPjwvc3ZnPg==#test);}`);

});

it('multiple images', async() => {
	await run(`a{background-image: url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="%23ff0000"></rect></svg>), url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="#fFFf00"></rect></svg>), url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDBweCcgaGVpZ2h0PScxMDBweCcgZmlsbD0iI2ZGRmYwMCI+PC9yZWN0Pjwvc3ZnPg==);}`, `a{background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='red' d='m0,0h1e2v1e2H0z'/%3E%3C/svg%3E"), url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><path fill="%23ff0" d="m0,0h1e2v1e2H0z"/></svg>'), url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNmZjAiIGQ9Im0wLDBoMWUydjFlMkgweiIvPjwvc3ZnPg==);}`);
});

it('parse fail', async() => {
	await run(`a{background-image: url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="#fFFf00"></svg>);}`, 'error');
});

it('with option', async() => {
	await run(`a{background-image: url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="#fFFf00"></rect></svg>);}`, `a{background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNmZjAiIGQ9Im0wLDBoMWUydjFlMkgweiIvPjwvc3ZnPg==);}`, {
		base64: true,
	});

	await run(`a{background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDBweCcgaGVpZ2h0PScxMDBweCcgZmlsbD0iI2ZGRmYwMCI+PC9yZWN0Pjwvc3ZnPg==);}`, `a{background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><path fill="%23ff0" d="m0,0h1e2v1e2H0z"/></svg>');}`, {
		base64: false,
	});

	await run(`a{background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDBweCcgaGVpZ2h0PScxMDBweCcgZmlsbD0iI2ZGRmYwMCI+PC9yZWN0Pjwvc3ZnPg==);}`, `a{background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ff0' d='m0,0h1e2v1e2H0z'/%3E%3C/svg%3E");}`, {
		base64: false,
		encode: true,
	});

	await run(`a{background-image: url(data:image/svg+xml;charset=undefined;evil message,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="%23ffff00"></rect></svg>);}`, `a{background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><path fill="%23ff0" d="m0,0h1e2v1e2H0z"/></svg>');}`, {
		encode: false,
	});
});

it('with rules', async() => {
	await run(`a{background-image: url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100px' height='100px' fill="#fFFf00"></rect></svg>);}`, `a{background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><rect width="1e2px" height="1e2px" fill="%23fFFf00"/></svg>');}`, {
		rules: {
			'shorten-shape': [false],
			'rm-px': [false],
			'shorten-color': [false],
		},
	});
});
