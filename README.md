# PostCSS Svg Slimming

A [PostCSS](https://github.com/postcss/postcss) plugin that uses [svg-slimming](https://github.com/benboba/svg-slimming) to perform inline svg content in CSS optimization

The optimization effect indicates:

```css
/* Before optimization */
.foo {
		background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><rect width="100px" height="100px" fill="#ff0000"></rect></svg>');
}
```

```css
/* After optimization */
.foo {
	background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M0,0H100V100H0z"/></svg>');
}
```

## use

Install this plugin

```
npm install postcss-svg-slimming -D
```

Configure the following in postcss.config.js:

```diff
module.exports = {
	plugins: [
+		require('postcss-svg-slimming'),
		...
	]
}
```

## parameter

This plugin supports a parameter of type object, which contains three valid attributes: base64, encode, and rules

### base64

Whether the output is base64 encoded

* Not configured (default)-determined by input
* true-force the output to be base64
* false-even if the input is base64, it will output utf8

### encode

Whether the output is url encode

**Note: When base64 is true, this option will have no effect**

* Not configured (default)-determined by input
* true-the output is forced to url encode
* false-the output will not be url encode (for compatibility reasons, # will be escaped)

### rules

[Please see the optimized configuration of svg-slimming](https://github.com/benboba/svg-slimming)
