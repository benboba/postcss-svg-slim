module.exports = {
	'parserOptions': {
		'sourceType': 'module',
		'ecmaFeatures': {
			'impliedStrict': true,
			'jsx': true,
		},
		'ecmaVersion': 2019,
	},
	'root': true,
	'env': {
		'browser': true,
		'node': true,
		'commonjs': true,
		'es6': true,
	},
	'rules': {
		// --- Possible Errors ---

		// for 循环不得因方向错误造成死循环
		'for-direction': 2,

		// getter 必须有返回值
		'getter-return': [2, {
			'allowImplicit': true, // 允许返回 undefined
		}],

		// 禁止给 Promise 构造函数传入一个 async 函数
		'no-async-promise-executor': 2,

		// 禁止在循环中 await
		// @off 存在串行 await 的场景
		'no-await-in-loop': 0,

		// 禁止与 -0 做比较 （要精确判断 -0，请使用 Object.is）
		'no-compare-neg-zero': 2,

		// 禁止在 if, for, while 中出现赋值语句，除非用小括号括起来
		'no-cond-assign': [2, 'except-parens'],

		// 禁止 console （考虑到调试需要，只抛出 warning）
		'no-console': 1,

		// 禁止使用常量作为判断条件
		'no-constant-condition': [2, {
			'checkLoops': false, // 允许在 for, while, do...while 中使用常量判断（为了实现一些算法，需要人为创造死循环）
		}],

		// 禁止在正则中匹配控制字符 \x （考虑特殊场景确有需求，只抛出 warning）
		'no-control-regex': 1,

		// 禁止 debugger （考虑到调试需要，只抛出 warning）
		'no-debugger': 1,

		// 函数参数禁止重名
		'no-dupe-args': 2,

		// Object 中禁止重复的 key
		'no-dupe-keys': 2,

		// switch 中禁止重复的 case
		'no-duplicate-case': 2,

		// 禁止出现空代码块
		// 允许空的 catch
		'no-empty': [2, {
			'allowEmptyCatch': true,
		}],

		// 正则表达式中禁止出现空的字符集 [] （如果想匹配中括号请转义）
		'no-empty-character-class': 2,

		// catch 定义的参数禁止赋值
		'no-ex-assign': 2,

		// 禁止额外的布尔值转换
		'no-extra-boolean-cast': 2,

		// 禁止冗余的小括号
		'no-extra-parens': [2, 'all', {
			'conditionalAssign': false, // 考虑可读性，条件判断中允许冗余的括号
			'nestedBinaryExpressions': false, // 考虑可读性，嵌套的二进制表达式中允许冗余的括号
			'ignoreJSX': 'all', // 对于 JSX，忽略本条规则
			'enforceForArrowConditionals': false, // 当箭头函数返回一个三元表达式时，允许用括号将三元表达式括起来
		}],

		// 禁止额外的分号
		'no-extra-semi': 2,

		// 禁止对函数声明重新赋值
		'no-func-assign': 2,

		// 禁止在块作用域内使用 var 或函数声明 （可以使用 let 或 const）
		'no-inner-declarations': [2, 'both'],

		// 禁止使用非法的正则表达式
		'no-invalid-regexp': 2,

		// 禁止使用不规范空格
		'no-irregular-whitespace': [2, {
			'skipStrings': true, // 允许在字符串中使用
			'skipComments': true, // 允许在注释中使用
			'skipTemplates': true, // 允许在模板字符串中使用
		}],

		// 禁止正则表达式 u 修饰符不正确的使用
		'no-misleading-character-class': 2,

		// 禁止把原生对象Math, JSON, Reflect当函数使用
		'no-obj-calls': 2,

		// 禁止通过对象的原型链隐式调用 Object.prototype （通过 Object.create(null) 创建的对象可能无法回溯到 Object.prototype 从而引发错误，建议显式使用 Object.prototype.xxx.call(A) 来代替 A.xxx）
		'no-prototype-builtins': 2,

		// 禁止在正则表达式中出现连续空格
		'no-regex-spaces': 2,

		// 禁止数组中出现连续逗号
		'no-sparse-arrays': 2,

		// 禁止在普通字符串中出现模板字符串语法
		'no-template-curly-in-string': 2,

		// 禁止出现难以理解的多行代码
		'no-unexpected-multiline': 2,

		// 禁止出现不可到达的代码，如在 return, throw 之后的代码
		'no-unreachable': 2,

		// 禁止在 finally 块中出现 return, throw, break, continue （允许在嵌套作用域下出现）
		'no-unsafe-finally': 2,

		// 禁止出现不安全的否定，如 for (!key in obj} {}，应该写为for (!(key in obj)} {}
		'no-unsafe-negation': 2,

		// 禁止在 await 或 yield 的异步结果返回之前进行赋值运算，以减少竞争条件错误，如 result += await foo(); 应改为 let bar = await foo(); result += bar;
		'require-atomic-updates': 2,

		// 禁止直接对 NaN 进行判断，必须使用 isNaN
		'use-isnan': 2,

		// typeof 判断条件只能是 "undefined", "object", "boolean", "number", "string", "function" 或 "symbol"
		'valid-typeof': 2,


		// --- Best Practices ---

		// 禁止定义没有 getter 的 setter （反之允许）
		'accessor-pairs': 2,

		// 当调用 Array.prototype 的方法时，回调函数必须有正确的返回值
		'array-callback-return': 2,

		// 禁止在块作用域外部调用内部 var 定义的变量
		'block-scoped-var': 2,

		// class 的非静态方法必须包含 this 关键字
		'class-methods-use-this': 2,

		// 禁止一个函数的复杂度超过 30
		'complexity': [2, {
			max: 30,
		}],

		// 函数的所有条件分支必须都显式地返回值或都隐式地返回 undefined
		'consistent-return': 2,

		// 条件判断语句必须包含大括号，允许单行语句省略大括号
		'curly': [2, 'multi-line', 'consistent'],

		// switch 语句必须包含 default
		'default-case': 2,

		// 点运算符前后插入换行符的规则
		// @off
		'dot-location': 0,

		// 调用对象的属性或方法时，禁止中括号内直接使用不必要的字符串字面量
		'dot-notation': [2, {
			'allowKeywords': true, // 允许字面量为关键字的情况
			'allowPattern': '^[A-Z0-9_]+$', // 允许纯大写 + 数字 + 下划线的情况
		}],

		// 禁止使用 == 和 != 做条件判断
		'eqeqeq': [2, 'always', {
			'null': 'ignore', // 和 null 对比时除外
		}],

		// for in 时需检测 hasOwnProperty
		'guard-for-in': 2,

		// 每一个文件最多只允许定义一个 class
		'max-classes-per-file': 2,

		// 禁止 alert, confirm, prompt （考虑到调试需要，仅抛出 warning）
		'no-alert': 1,

		// 禁止使用 arguments.caller 和 arguments.callee
		'no-caller': 2,

		// switch 的条件中出现 var, let, const, function, class 等关键字，必须使用花括号把内容括起来
		'no-case-declarations': 2,

		// 禁止正则表达式以等号开头 （遇到这种情况必须将等号转义，否则看起来像 /= 运算，易引起混淆）
		'no-div-regex': 2,

		// 当 if .. else .. 的每个分支都有 return 语句时， else { return xxx } 块可以省略为 return xxx
		// @off 考虑到可读性，不进行限制
		'no-else-return': 0,

		// 禁止定义空函数 （至少需要写一行注释）
		'no-empty-function': 2,

		// 禁止解构赋值时使用空对象 {} 或空数组 [] （如 let { a: {} } = foo()，应改为 let { a } = foo() 或 let { a = {} } = foo() 或 let { a: {b} } = foo()）
		'no-empty-pattern': 2,

		// 禁止使用 == 和 != 与 null 做判断
		// @off 与 eqeqeq 有冲突
		'no-eq-null': 0,

		// 禁止使用 eval
		'no-eval': 2,

		// 禁止扩展原生对象
		'no-extend-native': 2,

		// 禁止调用额外的 bind （如不含 this 关键字的匿名函数，所有的箭头函数等，会忽略参数为函数的情况）
		'no-extra-bind': 2,

		// 禁止额外的 label
		'no-extra-label': 2,

		// 要求 switch 的每个 case 都必须包含中断：break, return, throw
		// @off switch 缩写是很常见的
		'no-fallthrough': 0,

		// 数值字面量禁止小数点前后没有数字
		'no-floating-decimal': 2,

		// 禁止对全局变量赋值
		'no-global-assign': 2,

		// 禁止使用隐式类型转换
		'no-implicit-coercion': [2, {
			'allow': ['+', '!!'], // 允许 + 转数值 '' + 转字符串和 !! 转布尔值
		}],

		// 禁止隐式的声明全局变量
		// @off 模块化开发不存在此问题
		'no-implicit-globals': 0,

		// 禁止在 setTimeout 和 setInterval 中传入字符串，因会触发隐式 eval
		'no-implied-eval': 2,

		// 禁止在 class 方法以外的地方使用 this （如果需要用混入，请在注释中用 jsDoc 语法显式声明 @this）
		'no-invalid-this': 2,

		// 禁止使用 Function.prototype.__iterator__ 创建迭代器
		'no-iterator': 2,

		// 禁止 labels
		// @off label 很常用，尤其是多重循环中
		'no-labels': 0,

		// 禁止使用无效的块作用域 （块作用域内必须有 let, const, class 声明）
		'no-lone-blocks': 2,

		// 禁止在 var 定义循环条件的 for 循环体内声明函数 （使用 let 则允许）
		'no-loop-func': 2,

		// 禁止魔法数字 （所有用于计算的数字需要用明确的变量定义）
		'no-magic-numbers': [2, {
			'ignore': [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 允许从 -1 到 10 的整数
			'ignoreArrayIndexes': true, // 允许数组下标
		}],

		// 禁止连续的多个空格
		'no-multi-spaces': [2, {
			'ignoreEOLComments': false, // 行尾注释之前也禁止多个空格
		}],

		// 禁止使用 \ 来定义多行字符串 （如有需求请使用模板字符串）
		'no-multi-str': 2,

		// 禁止 new 一个类而不存储该实例 （考虑到存在某些不严谨的库，暂时只抛出 warning）
		'no-new': 1,

		// 禁止使用 new Function 创造函数
		'no-new-func': 2,

		// 禁止 new Boolean, Number 或 String
		'no-new-wrappers': 2,

		// 禁止使用 0 开头的数字来表示八进制
		'no-octal': 2,

		// 禁止在字符串中使用八进制转义符 \2
		'no-octal-escape': 2,

		// 禁止为函数参数重新赋值
		'no-param-reassign': 2,

		// 禁止使用 __proto__ （如需追溯原型链，请使用 getPrototypeOf）
		'no-proto': 2,

		// 禁止重复声明
		'no-redeclare': 2,

		// 自定义禁止使用的对象名和属性名列表
		// @off 请各业务自己具体定义
		'no-restricted-properties': 0,

		// 禁止在 return 中赋值
		'no-return-assign': 2,

		// 禁止在 return 中使用 await
		'no-return-await': 2,

		// 禁止 location.href = 'javascript:xxx'
		'no-script-url': 2,

		// 禁止将自己赋值给自己
		'no-self-assign': 2,

		// 禁止自己与自己作比较
		'no-self-compare': 2,

		// 禁止逗号操作符 （会忽略 for 循环的初始化或更新部分，或将逗号分隔的表达式用小括号括起来）
		'no-sequences': 2,

		// 禁止 throw 字面量，必须 throw 一个 Error 对象
		'no-throw-literal': 2,

		// 循环体内必须对循环条件进行修改
		'no-unmodified-loop-condition': 2,

		// 禁止出现无意义的表达式
		'no-unused-expressions': [2, {
			'allowShortCircuit': true, // 允许使用 a || b()，禁止 a || b - 条件表达式的后一个分支执行了函数
			'allowTernary': true, // 允许 a ? b() : c() ，三元表达式的两个分支都执行了函数
			'allowTaggedTemplates': true, // 允许带 tag 的模板字符串 tag`aa`，禁止 `aa` - 非多行或无字符串拼接的模板字符串没有意义
		}],

		// 禁止定义不使用的 label
		'no-unused-labels': 2,

		// 禁止不必要的 call 和 apply
		'no-useless-call': 2,

		// 禁止在 catch 中不做任何操作而直接 throw 捕获到的错误
		'no-useless-catch': 2,

		// 禁止不必要的字符串拼接
		'no-useless-concat': 2,

		// 禁止无用的转义
		'no-useless-escape': 2,

		// 禁止无意义的 return;
		'no-useless-return': 2,

		// 禁止使用void
		'no-void': 2,

		// 禁止注释中出现 todo, fixme, xxx，用这个来提醒开发者，写了 TODO 就一定要做完
		'no-warning-comments': 1,

		// 禁止 with
		'no-with': 2,

		// 正则表达式中推荐使用命名捕获组
		// @off 太超前了，支持不理想
		'prefer-named-capture-group': 0,

		// Promise 的 reject 方法必须传入一个 Error 对象
		'prefer-promise-reject-errors': [2, {
			'allowEmptyReject': true, // 允许空的 reject()
		}],

		// parseInt 方法必须传进制参数
		'radix': 2,

		// 定义为 async 的异步方法必须包含 await
		'require-await': 2,

		// 正则表达式必须包含 u 修饰符
		// @off 有时候额外的 u 修饰符可能导致错误的匹配
		'require-unicode-regexp': 0,

		// 变量定义必须提前到顶部
		// @off 跟随相关代码块会更清晰
		'vars-on-top': 0,

		// 自执行函数必须使用小括号括起来
		'wrap-iife': [2, 'inside'], // 格式为： (function(){ do something... })()

		// 禁止 Yoda 格式的判断条件 （如 if (true === a)，应使用 if (a === true)）
		'yoda': 2,


		// --- Strict Mode ---

		// 必须开启 'strict mode'
		// @off 编译选项中已开启
		'strict': 0,


		// --- Variables ---

		// 变量定义时是否必须初始化
		// @off 不限制
		'init-declarations': 0,

		// 禁止使用 delete 删除变量 （不限制删除对象属性）
		'no-delete-var': 2,

		// label 不得与变量重名
		'no-label-var': 2,

		// 禁用特定的全局变量
		// @off 具体业务自己定义即可
		'no-restricted-globals': 0,

		// 禁止跨作用域定义同名变量、函数、参数等
		'no-shadow': [2, {
			'builtinGlobals': true, // 禁止覆盖全局对象
		}],

		// 禁止使用保留字作为变量名
		'no-shadow-restricted-names': 2,

		// 禁止访问未定义的变量或方法
		'no-undef': 2,

		// 禁止将 undefined 赋值给变量
		'no-undef-init': 2,

		// 禁止使用 undefined （如需判断一个变量是否为 undefined，请使用 typeof a === 'undefined'）
		'no-undefined': 2,

		// 禁止定义不使用的变量
		'no-unused-vars': [2, {
			'vars': 'all', // 变量定义必须被使用
			'args': 'after-used', // 警告函数中最末尾未被使用的形参
			'ignoreRestSiblings': true, // 忽略剩余子项 fn(...args) { ... }，{ a, b, ...coords }
			'caughtErrors': 'none', // 忽略 catch 语句的参数使用
		}],

		// 禁止在变量被定义之前使用它
		'no-use-before-define': [2, {
			'functions': false, // 允许函数在定义之前被调用
			'classes': false, // 允许类在定义之前被引用
		}],


		// --- Node.js and CommonJS ---

		// 避免多次执行回调函数 （默认禁止名称为 callback, cb, next 的回调函函数多次运行）
		'callback-return': 2,

		// 必须在模块的顶级调用 require 语句 （考虑到异步条件加载，只抛出 warning）
		'global-require': 1,

		// callback 中的 err, error 参数和变量必须被处理
		'handle-callback-err': 2,

		// 禁止使用 Buffer 的构造函数，而改用工厂方法 Buffer.from, Buffer.alloc, Buffer.allocUnsafe
		'no-buffer-constructor': 2,

		// 禁止用逗号混合不同类型的 require，禁止用逗号混合 require 和 变量定义
		'no-mixed-requires': [2, {
			'grouping': true, // 禁止用逗号混合不同类型的 require
			'allowCall': false, // 禁止 require 之后立即执行，或立即调用 require 结果的方法
		}],

		// 禁止使用 new require 来导入模块
		'no-new-require': 2,

		// 禁止使用 __dirname + 'filename' 的形式拼接路径，应该使用 path.join 或 path.resolve 来代替
		'no-path-concat': 2,

		// 禁止使用 process.env 调用全局环境变量，推荐在不同模块配置自己的环境变量
		// @off 暂不限制
		'no-process-env': 0,

		// 禁止使用 process.exit() 终止 NodeJs 进程，应该改为抛出 Error 的方式
		'no-process-exit': 2,

		// 禁止特定的模块
		// @off 不限制
		'no-restricted-modules': 0,

		// 禁止调用后缀为 Sync 的方法
		// @off 不限制
		'no-sync': 0,


		// --- Stylistic Issues ---

		// 数组的中括号内是否需要换行
		'array-bracket-newline': [2, 'consistent'], // 不限制，但同一个数组前后必须保持一致

		// 数组的中括号内禁止空格
		'array-bracket-spacing': [2, 'never'],

		// 数组中元素是否需要换行
		'array-element-newline': [2, 'consistent'], // 不限制，但同一个数组各项之间必须保持一致

		// 当大括号代码块单行书写时，开始和结束的大括号内必须加空格
		'block-spacing': [2, 'always'],

		// 代码块的大括号不允许单独换行 （如 if (x) {} ，不能写成： if (x)\n{}）
		'brace-style': [2, '1tbs'],

		// 变量需要以驼峰式命名 （忽略常量以及前缀或后缀的下划线）
		'camelcase': [2, {
			'properties': 'never', // 不检查属性名
			'ignoreDestructuring': true, // 不检查解构赋值
		}],

		// 注释中第一个字母是否需要大写
		// @off 不限制
		'capitalized-comments': 0,

		// 数组、对象、函数参数列表的末尾逗号使用规则
		// 多行书写时必须添加末尾逗号，单行书写时禁止
		'comma-dangle': [2, 'always-multiline'],

		// 逗号之前不允许加空格，之后必须加空格
		'comma-spacing': 2,

		// 多行语句中，逗号只能在行尾使用，不允许出现在行首
		'comma-style': 2,

		// 计算属性的中括号内禁止空格
		'computed-property-spacing': 2,

		// 限制使用 this 的别名
		'consistent-this': [2, '_this', 'me', 'self'], // 只允许 _this, me, self

		// 每一个文件必须以空白行结束
		'eol-last': 2,

		// 执行函数时，函数名和小括号之间禁止空格
		'func-call-spacing': 2,

		// 把函数赋值给变量时，变量名和函数名必须匹配
		// @off 不限制
		'func-name-matching': 0,

		// 函数表达式必须具名
		// @off 不强制
		'func-names': 0,

		// 限制定义函数必须使用函数声明或函数表达式
		// @off 不限制
		'func-style': 0,

		// 函数参数的小括号的换行规则
		'function-paren-newline': [2, 'consistent'], // 不限制，前后必须保持一致

		// 变量名黑名单
		// @off 不限制
		'id-blacklist': 0,

		// 变量名长度限制
		// @off 不限制
		'id-length': 0,

		// 变量名必须匹配正则规则
		// @off 不限制
		'id-match': 0,

		// 禁止在箭头函数的箭头处换行
		'implicit-arrow-linebreak': 2,

		// 缩进规则
		'indent': [2, 'tab', {
			'SwitchCase': 1,
		}],

		// JSX 语法必须使用双引号 （内容有双引号的除外）
		'jsx-quotes': 2,

		// 冒号之前禁止空格，冒号之后必须加空格
		'key-spacing': 2,

		// 关键字前后必须有空格
		'keyword-spacing': 2,

		// 规定单行注释出现的位置
		// @off 不限制
		'line-comment-position': 0,

		// 限制换行符的类型 \n || \r\n
		// @off 不限制
		'linebreak-style': 0,

		// 注释前后加空白行的规则
		// @off 不限制
		'lines-around-comment': 0,

		// 类成员之间必须加空白行
		// 单行成员之后可以不加
		'lines-between-class-members': [2, 'always', {
			'exceptAfterSingleLine': true,
		}],

		// 最大块嵌套深度为 5 层
		'max-depth': [2, 5],

		// 限制单行代码的最大长度
		'max-len': [2, {
			'code': 120, // 单行代码不能超过 120 个字符
			'ignoreComments': true, // 注释不限制
			'ignoreUrls': true, // 不限制 url 的长度
			'ignoreStrings': true, // 不限制字符串的长度
			'ignoreTemplateLiterals': true, // 不限制模板字符串的长度
			'ignoreRegExpLiterals': true, // 不限制正则表达式的长度
		}],

		// 限制单个文件的最大行数
		'max-lines': [2, {
			'max': 800, // 不允许单个文件超过 800 行
			'skipBlankLines': true, // 不计算空白行
			'skipComments': true, // 不计算注释
		}],

		// 限制单个函数的最大行数
		'max-lines-per-function': [2, {
			'max': 100, // 单个函数不允许超过 100 行
			'skipBlankLines': true, // 不计算空白行
			'skipComments': true, // 不计算注释
		}],

		// 限制最大回调深度，避免“回调地狱”
		'max-nested-callbacks': [2, 3], // 回调嵌套不允许超过 3 层

		// 函数形参的最大个数
		'max-params': [2, 10], // 禁止函数形参超过 10 个

		// 每一个代码块中允许的最大语句数
		'max-statements': [2, 20, { // 不能超过 20 个
			'ignoreTopLevelFunctions': true, // 忽略代码根下的函数
		}],

		// 单行允许的最大语句数
		'max-statements-per-line': [2, {
			'max': 2, // 不能超过 2 个
		}],

		// 多行注释的风格
		// @off 不限制
		'multiline-comment-style': 0,

		// 三元表达式是否强制换行
		// @off 不限制
		'multiline-ternary': 0,

		// new 关键字后类名应首字母大写
		'new-cap': [2, {
			'capIsNew': false, // 允许大写开头的函数直接执行
		}],

		// new关键字后类应包含小括号
		'new-parens': 2,

		// 链式调用是否必须换行
		// @off 不限制
		'newline-per-chained-call': 0,

		// 禁止使用 Array 构造函数，以避免“单参数陷阱” （允许使用 Array(num) 或 new Array(num) 直接创建长度为 num 的数组）
		'no-array-constructor': 2,

		// 禁止位运算
		// @off 不限制
		'no-bitwise': 0,

		// 禁止 continue
		// @off 不限制
		'no-continue': 0,

		// 禁止行内注释
		// @off 不限制
		'no-inline-comments': 0,

		// else 块中如果只有一个 if ，应该合并为 else if
		// @off 考虑到代码可读性，不宜限制
		'no-lonely-if': 0,

		// 禁止使用混合的逻辑判断，必须把不同的逻辑用小括号括起来
		'no-mixed-operators': [2, {
			'groups': [
				['&&', '||'],
			],
		}],

		// 禁止混合空格和 tab 缩进
		'no-mixed-spaces-and-tabs': 2,

		// 禁止连续赋值 （如 a = b = c = 100）
		'no-multi-assign': 2,

		// 禁止最大的连续空白行数
		'no-multiple-empty-lines': [2, {
			'max': 3, // 最多允许连续 3 个空白行
			'maxEOF': 1, // 文件末尾只能有 1 个空白行
			'maxBOF': 0, // 文件头禁止以空白行开始
		}],

		// 禁止 if ... else 及三元表达式判断否条件（只对 if 条件后只有一个 else 分支的情况生效）
		// 如 if (!state) { a(); } else { b(); }，应改为 if (state) { b(); } else { a(); }
		// 如 !a ? c : b 应改为 a ? b : c
		'no-negated-condition': 2,

		// 禁止嵌套的三元表达式
		'no-nested-ternary': 2,

		// 禁止使用new Object
		'no-new-object': 2,

		// 禁止 ++ 和 -- 运算符
		// @off 不限制
		'no-plusplus': 0,

		// 禁止特定的语法
		// @off 不限制
		'no-restricted-syntax': 0,

		// 禁止代码中的 tab
		// 允许使用 tab 缩进
		'no-tabs': [2, {
			'allowIndentationTabs': true,
		}],

		// 禁止三元表达式
		// @off 不限制
		'no-ternary': 0,

		// 禁止行尾空格
		'no-trailing-spaces': 2,

		// 禁止属性或变量的前缀、后缀下划线
		// @off 不限制
		'no-underscore-dangle': 0,

		// 禁止不必要的三元表达式
		'no-unneeded-ternary': [2, {
			'defaultAssignment': false, // 禁止 x ? x : 1 形式的三元表达式
		}],

		// 禁止属性前出现空格，如 foo. bar()
		'no-whitespace-before-property': 2,

		// 禁止没有大括号的 if, else, while, do-while, for 语句多行书写
		'nonblock-statement-body-position': 2,

		// 对象大括号内换行符的使用规则
		'object-curly-newline': [2, {
			'consistent': true, // 不限制，但必须前后一致
		}],

		// 对象大括号内空格的使用规则
		'object-curly-spacing': [2, 'always'], // 大括号内部必须加空格

		// 对象和数组成员的书写规则
		// 允许所有成员写在一行，否则必须分行书写
		'object-property-newline': [2, {
			'allowAllPropertiesOnSameLine': true,
		}],

		// var, let, const 的合并规则
		'one-var': [2, 'never'], // 禁止合并

		// var, let, const 定义的变量的换行规则
		'one-var-declaration-per-line': 2, // 初始化变量必须独占一行

		// 缩写运算符的应用规范
		// @off 不限制
		'operator-assignment': 0,

		// 运算符前后的换行逻辑
		// @off 不限制
		'operator-linebreak': 0,

		// 嵌套的代码块前后是否需要空白行
		// @off 不限制，由开发人员根据代码可读性自己决定
		'padded-blocks': 0,

		// 要求某几种类型的语句之间插入空白行
		// @off 不限制，由开发人员根据代码可读性自己决定
		'padding-line-between-statements': 0,

		// 禁止 Object.assign 的第一个参数是空对象 （如 Object.assign({}, obj1, obj2)），或只传入一个参数 （如 Object.assign({ a: 1 })）
		'prefer-object-spread': 2,

		// 定义一个对象时，属性是否要用引号
		'quote-props': [2, 'as-needed', { // 在必要时（如包含连字符或空格）必须加引号
			'keywords': true, // 与关键词重名的属性必须加引号
			'unnecessary': false, // 可加可不加的情况不报错
			'numbers': true, // 数字必须加引号
		}],

		// 字符串必须使用单引号
		'quotes': [2, 'single', {
			'avoidEscape': true, // 允许包含单引号的字符串使用双引号
			'allowTemplateLiterals': true, // 允许使用模板字符串
		}],

		// 行尾必须使用分号结束
		'semi': 2,

		// 分号之前禁止空格，分号之后必须加空格
		'semi-spacing': 2,

		// 只允许行尾分号，禁止行首分号
		'semi-style': 2,

		// 对象的属性必须按字母序排列
		// @off 不限制
		'sort-keys': 0,

		// var, let, const 必须按字母序排列
		// @off 不限制
		'sort-vars': 0,

		// 代码块大括号之前必须加空格
		'space-before-blocks': 2,

		// 函数小括号之前的空格规则
		'space-before-function-paren': [2, 'never'], // 禁止加空格

		// 小括号内禁止空格
		'space-in-parens': 2,

		// 二元运算符前后必须加空格
		'space-infix-ops': 2,

		// 一元运算符前后的空格规则
		'space-unary-ops': [2, {
			'words': true, // new, delete, typeof, void, yield 之后必须加空格
			'nonwords': false, // -, +, --, ++, !, !! 前后禁止加空格
		}],

		// 注释的空格规则
		'spaced-comment': [2, 'always', { // 注释的 // 和 /* 之后必须紧跟空格
			'line': {
				'markers': ['/'], // 允许三斜线注释
			},
			'block': {
				'markers': ['*'], // 允许 /** 开头的注释
				'balanced': true, // 多行注释的结尾 */ 之前必须加空格
			},
		}],

		// switch 的冒号之前禁止空格，之后必须加空格
		'switch-colon-spacing': 2,

		// 利用模板字符串创建模板渲染函数，在调用时禁止在模板字符串和函数名之间插入空格
		'template-tag-spacing': 2,

		// 禁止文件头出现 BOM
		'unicode-bom': 2,

		// 正则表达式字面量必须用小括号括起来
		// @off 不限制
		'wrap-regex': 0,


		// --- ECMAScript 6 ---

		// 箭头函数只允许在必要时添加大括号
		'arrow-body-style': 2,

		// 单一参数的箭头函数禁止添加小括号
		'arrow-parens': [2, 'as-needed'],

		// 箭头函数的箭头前后必须加空格
		'arrow-spacing': 2,

		// 子类的构造函数中必须调用 super()
		'constructor-super': 2,

		// Generators 函数的星号之前禁止加空格，之后必须加空格
		'generator-star-spacing': 2,

		// class 定义的类名不得与其它变量重名
		'no-class-assign': 2,

		// 禁止出现难以理解的箭头函数
		'no-confusing-arrow': [2, {
			'allowParens': true, // 允许用小括号括起来的情况
		}],

		// 禁止对 const 定义重新赋值
		'no-const-assign': 2,

		// 禁止同名的类成员
		'no-dupe-class-members': 2,

		// 禁止重复的 import 导入
		'no-duplicate-imports': 2,

		// 禁止使用 new Symbol
		'no-new-symbol': 2,

		// 禁止特定的 import 导入
		// @off 不限制
		'no-restricted-imports': 0,

		// 禁止在构造函数的 super 之前使用 this
		'no-this-before-super': 2,

		// 禁止不必要的计算键值 （如 var a = { ['0']: 0 }）
		'no-useless-computed-key': 2,

		// 禁止无用的构造函数
		'no-useless-constructor': 2,

		// 禁止无效的重命名 （如 import {a as a} from xxx）
		'no-useless-rename': 2,

		// 禁止使用 var，必须用 let 或 const
		'no-var': 2,

		// 强制使用 ES6 的缩写语法
		'object-shorthand': 2,

		// 在适用箭头函数回调的场景，推荐使用箭头函数作为回调
		'prefer-arrow-callback': [2, {
			'allowNamedFunctions': true, // 允许具名的函数表达式作为回调函数
			'allowUnboundThis': true, // 当回调中包含 this 时，不强制转为箭头函数
		}],

		// 对于只在初始化时赋值的变量，推荐使用 const
		'prefer-const': 2,

		// 在适合用解构赋值的场景，推荐使用解构赋值
		// @off 过度的解构不利于可读性
		'prefer-destructuring': 0,

		// 禁止对字符串字面量进行 2, 8, 16 进制的 parseInt 转换
		'prefer-numeric-literals': 2,

		// 禁用 arguments，推荐使用剩余参数 ...args
		'prefer-rest-params': 2,

		// 推荐使用解构来取代 Function.prototype.apply （如 foo.apply(null | undefined | foo, args) 应改为 foo(...args)）
		'prefer-spread': 2,

		// 在适合使用模板字符串的场景，推荐使用模板字符串
		'prefer-template': 2,

		// Generators 函数的函数体内必须有 yield （对空函数不报错）
		'require-yield': 2,

		// 解构的 ... 运算符后不允许有空格
		'rest-spread-spacing': 2,

		// import 导入必须按字母序排列
		// @off 不限制
		'sort-imports': 0,

		// 创建 Symbol 必须带描述
		'symbol-description': 2,

		// 模板字符串的 ${} 的大括号内禁止加空格
		'template-curly-spacing': 2,

		// yield* 的星号之前禁止加空格，之后必须加空格
		'yield-star-spacing': 2,
	},
};
