
[🕹 Play](https://www.typescriptlang.org/play/?#code/FAehAJABSTwEwUwGYEsB28rS9nu-+mFQEMBbeAZwAdiBjDATWICdZgBvYASHgA8qA9swAu4brQGoKogJ4tY4ALxiuAHgAqS8O3ABtANbwZALnDTmaAOYBdU8VQzwAXwA0APhUAKeLQAWAylMdAyNTcytbcG9UADdTdQBKJQ97RycE7njklS4AeQAjACsfYQA6eFRhC0pvPwCKBNLmeFgAV3puLk9OroqYihc9RFRBxGskxQ9PHVLZ8D6BodRIxGj+pPTwFx72J3BiCnB1TqSAbm5uPkERFQkpUVpiABsnrW4Ned5hCthDgCUfEJYKoANKDTyzUosSwUOwOCYpBxuQYgz7fVC-cCGGQCRBHDzcTwCIrxQbY0wghJBPQABXAaHAIMiAOErWYqHUMio8A0uhp1jcp2cuiZ2U6clYqnYfPpqEZzPgrPZnO5vP5bicbiJRQSIRk1nA5y4wD252AoAg0Dg8FIAkwBAdjvwwDu0nmsQA+og8coONxEABGUxral6sJVCKmABirVQtGEyEkzgROU6nlQplQrVI+XgzCp4CzObz2QD4AA1IWthcuIgAEzBvqh8lmCOoGzR2PxxNyzaTVNcLq8TPZ3P5kfF5jZPqlQOeXjgABU4DrSW2xtNFsw829JXtToPDpdkgoAie8FKTwElk84CYrFKEtgay9iEa9c8AGYkgkhWAPAA7Oa5pgNuCC2vuh5QXgx73O6MQerwC6+pwXC8AADI2sTNqErYWO2kSpMmYqDp0Zbrv6WFxNoegtuEBFwmkKadGmsJ4VYGSDhOY7ZBQl4VJYwi+NWxq1g2URNjRYbsQx+wOMR-YsYOnhsfRliDBmhajnmnFcKYNLMAIpDIBQPJFmOHj9gZRkmRezSnk8MTwGss4qUklZygAtPBpQYWuJqGiBlowEgiB7tBEU4Oa95sFwj7yFK4D1qYLJshyXI8sIGW4vBiG8LOdYeJqL5Ie+daeAA5MQFUuN+3ClEJFSeFO-aumeF5Xje+a-tw-7gJ+0XyPVT4lbwZWVdVtWcQ1vhNVEzDcTp2Rteel7Xs1P5Gn1A3ADF9WPC8o0uBV9YVQkE01XVcWNagzXLSe7VrV1CQ9Vw23mitHXrXe8jxawo3vhNxDA2d4BJH1AAs5pAA "🎮")


## NS Yard

基于字典的命名空间场

### 定义

~~~ tsx
namespace Yard
{
	export 
	const yard = 
	<T = { [key: string]: any },> 
	(echoes: { [key: string]: (env: T) => any })
	: T => 
		Object.entries(echoes).reduce
		(
			(envs, [fn, f]) => ({ ... envs, [fn]: f(envs) }) ,
			{} as T
		) ;
	
	export 
	const call = 
	<T extends Record<K, (...args: any) => any>, K extends keyof T> 
	(obj: T, key: K): { [P in K]: ReturnType<T[P]>; }[K] => 
		yard<{[P in K]: ReturnType<T[P]>}>(obj)[key] ;
	
} ;
~~~

### 示例

简单

~~~ tsx
// ── demo ────────────────────────────────────────
const env_ff = 
{
	f1: (env: { [key: string]: Function }) => 
		
		(n: number): number => 1 + n ,
	
	f2: (env: { [key: string]: Function }) => 
		
		(x: number): number => env.f1(x * 2) ,
	
} ;
// ── effect ──────────────────────────────────────
console.log( Yard.yard(env_ff).f2(3) ); //> 7
~~~

异步

~~~ tsx
// ── demo ────────────────────────────────────────
const env_xx = 
{
	x0: (env: { [key: string]: any }) => 
		
		1 ,
	
	f: (env: { [key: string]: any }) => 
		
		(s: string)
		: number => s.length ,
	
	f2: (env: { [key: string]: any }) => 
		
		(s: string, n: number)
		: Promise<number> => Promise.resolve(env.f(s) + n - env.x0) ,
} ;

// ── effect ──────────────────────────────────────

Yard
	.yard<{ f2: ReturnType<typeof env_xx.f2> }>(env_xx).f2('a',3)
	.then(r => console.log(r));
	//> 3

Yard
	.yard(env_xx).f2('a',3)
	.then( (r: number) => console.log(r) );
	//> 3

Yard
	.call(env_xx,'f2')('a',3)
	.then(r => console.log(r));
	//> 3

console.log( Yard.yard(env_xx).f('aaaa') ) //> 4
~~~

### 原理

函数 `yard` 接受一个第一层属性在形式上都合乎某种规定的结构体，然后将这第一层属性转换为另一种形式，并在此过程中完成它们之间依赖关系的建立。这是一个宽依赖的转换，因此使用（万能的聚合函数）折叠 (Fold) —— 在 TypeScript 里它叫 `reduce` 。

依赖的建立机制，依靠语言的闭包 (closure) 机制：
- 每个属性都会被传入一个 env 、而这个 env 又包含了完成了转换的所有（它之前的）属性。
- 然后取得了旧版本 env 的它又会被并入这个旧的 env 形成一个新的 env 。

—— 这样其实不太优雅，因为同样的内容可能会在环境里被重复叠加。传入的项 (record) 中有几个子项 (field) ，最早一条子项就会被叠加多少次，其余类推。但也可能不完全是局限，如果传来传去的都只是索引那么虽然结构确实不咋优雅、但至少内存占用膨胀不至于那么大。

这跟 [隔壁](../Python) 用语法糖 —— 让 Env 自身作为方法 (method) 的 Self 位来导入 —— 并不一样，后者显然不会这样冗余。

*这是两种实现思路的差异。这里的 Echoes 方案在那边应该也能做，但 TypeScript 的泛型表达很流畅、所以先在这儿借之来展示此 Echoes 方案的思路。同理，那边的利用 OOP 语法糖语言特性的思路这边按说肯定也行，但我就是还没做，因为还不会。*






