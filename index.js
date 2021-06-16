const valueParser = require('postcss-value-parser');
const svgSlim = require('svg-slim');

const PLUGIN = 'postcss-svg-slim';

function encode(data) {
	return data.replace(/"/g, "'").replace(/%/g, '%25').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/&/g, '%26').replace(/#/g, '%23').replace(/\s+/g, ' ');
}

function parse(value) {
	let inputBase64 = false;
	let inputEncode = false;
	let svg = value.slice(value.indexOf(',') + 1);

	if (/data:image\/svg\+xml.*?;base64,/.test(value)) {
		svg = Buffer.from(svg, 'base64').toString('utf8');
		inputBase64 = true;
	} else {
		let decodeSvg = svg;
		try {
			decodeSvg = decodeURIComponent(svg);
			inputEncode = decodeSvg !== svg;
			svg = decodeSvg;
		} catch (e) {}
	}

	return {
		svg,
		inputBase64,
		inputEncode,
	};
}

function createPromise(decl, opts, result) {
	const parsed = valueParser(decl.value);
	const promises = [];
	parsed.walk(node => {
		if (node.type !== 'function' || node.value.toLowerCase() !== 'url' || !node.nodes.length) {
			return;
		}

		const value = node.nodes[0].value;
		const { svg, inputBase64, inputEncode } = parse(value, opts);

		let quote = node.nodes[0].quote;
		const outputBase64 = typeof opts.base64 === 'boolean' ? opts.base64 : inputBase64;
		const outputEncode = typeof opts.encode === 'boolean' ? opts.encode : inputEncode;

		promises.push(svgSlim(svg, opts.rules).then(res => {
			let optimizedValue;
			if (outputBase64) {
				const data = Buffer.from(res).toString('base64');

				// 输入的 base64 格式可能包含用户的自定义 hash，需做保留
				let hash = '';
				if (inputBase64) {
					const lastIndex = value.lastIndexOf('#');
					if (lastIndex !== -1) {
						hash = value.slice(lastIndex);
					}
				}

				optimizedValue = `data:image/svg+xml;base64,${data}${hash}`;
			} else {
				let data = res;
				if (outputEncode) {
					data = encode(res);
					quote = '"';
				} else {
					// 如果不转义 “#” 可能会被某些浏览器当作 hash 处理，导致内容被截断
					data = res.replace(/#/g, '%23');
					quote = "'";
				}
				optimizedValue = `data:image/svg+xml;charset=utf-8,${data}`;
			}

			Object.assign(node.nodes[0], {
				value: optimizedValue,
				quote,
				type: 'string',
				before: '',
				after: '',
			});
		}, () => {
			decl.warn(result, `无法正确解析SVG :: ${decl.value}`, {
				plugin: PLUGIN,
			});
		}));
	});

	return Promise.all(promises).then(() => {
		decl.value = parsed.toString();
	});
}

module.exports = (opts = {}) => ({
	postcssPlugin: PLUGIN,
	Once(root, { result }) {
		const promises = [];

		root.walkDecls(decl => {
			if (/data:image\/svg\+xml[^,]*,/.test(decl.value)) {
				promises.push(createPromise(decl, opts, result));
			}
		});

		return Promise.all(promises);
	},
});

module.exports.postcss = true;
