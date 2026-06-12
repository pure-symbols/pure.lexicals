
// ── define ──────────────────────────────────────
namespace Echoes
{
	export 
	const cell = 
	<T = { [key: string]: any },> 
	(yard: { [key: string]: (env: T) => any })
	: T => 
		Object.entries(yard).reduce
		(
			(envs, [fn, f]) => ({ ... envs, [fn]: f(envs) }) ,
			{} as T
		) ;
	
	export 
	const call = 
	<T extends Record<K, (...args: any) => any>, K extends keyof T> 
	(obj: T, key: K): { [P in K]: ReturnType<T[P]>; }[K] => 
		cell<{[P in K]: ReturnType<T[P]>}>(obj)[key] ;
	
} ;


// ── demo ────────────────────────────────────────
const env_ff = 
{
	f1: (env: { [key: string]: Function }) => 
		
		(n: number): number => 1 + n ,
	
	f2: (env: { [key: string]: Function }) => 
		
		(x: number): number => env.f1(x * 2) ,
	
} ;
// ── effect ──────────────────────────────────────
console.log( Echoes.cell(env_ff).f2(3) ); //> 7



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

Echoes
	.cell<{ f2: ReturnType<typeof env_xx.f2> }>(env_xx).f2('a',3)
	.then(r => console.log(r));
	//> 3

Echoes
	.cell(env_xx).f2('a',3)
	.then( (r: number) => console.log(r) );
	//> 3

Echoes
	.call(env_xx,'f2')('a',3)
	.then(r => console.log(r));
	//> 3

console.log( Echoes.cell(env_xx).f('aaaa') ) //> 4

