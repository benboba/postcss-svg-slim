# PostCSS Svg Slimming

一款 [PostCSS](https://github.com/postcss/postcss) 插件，使用 [svg-slimming](https://github.com/benboba/svg-slimming) 对 CSS 中的内联 svg 内容进行优化

优化效果示意：

```css
/* 优化前 */
.foo {
    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><rect width="100px" height="100px" fill="#ff0000"></rect></svg>');
}
```

```css
/* 优化后 */
.foo {
    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M0,0H100V100H0z"/></svg>');
}
```

## 使用

安装本插件

```
npm install postcss-svg-slimming
```

在 postcss.config.js 中配置如下内容：

```diff
module.exports = {
  plugins: [
+   require('postcss-svg-slimming'),
    ...
  ]
}
```

## 参数

本插件支持一个 object 类型的参数，包含三个有效的属性：base64、encode 和 rules

### base64

输出结果是否采用 base64 编码

* 不配置（默认） —— 根据输入决定
* true —— 强制输出的结果为 base64 编码
* false —— 即使输入为 base64 编码，也会输出 utf8

### encode

输出结果是否进行 url encode
**注意：当 base64 为 true 时，此选项将没有任何影响**

* 不配置（默认） —— 根据输入决定
* true —— 输出结果强制进行 url encode
* false —— 输出结果一定不会 url encode（考虑兼容性原因，会对 # 进行转义）

### rules

请查看 [svg-slimming 的优化配置](https://github.com/benboba/svg-slimming)
