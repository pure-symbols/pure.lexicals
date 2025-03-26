/** 
  * @license AGPL-3.0
  * @license GFDL-1.3
  * 
  */


/* fixedpoint */

type Fn <T, R> = (x: T) => R ;
type Ω <T,> = (x: Ω <T>) => T ;

type fixedpoint = <I, O> (f: Fn <Fn <I, O>, Fn <I, O>>) => Fn <I, O> ;

const fixedpoint: fixedpoint = 
<I, O> (f: Fn <Fn <I, O>, Fn <I, O>>) => 
	((x) => (x) (x)) 
	((y: Ω <Fn <I, O>>) => 
		(f) ((... z) => (y) (y) (... z))) ;


/* curry */

type Currying <R> = (x: any) => Currying <R> ;
/* maybe this can describe `Fn <any, Fn <any, Fn <any, ... <Fn <any, R>> ... >>>` ... */

const curry = 
<R,> (func: (... args: any[]) => R)
: Currying <R> => 
fixedpoint ((curried: (... args: any[]) => any) => 
	(... args) => args.length != func.length ? 
	(x: any) => curried (... [... args, x]) : 
	func (... args)) ;



/* demo */

console.log ("~~~~~~~~~~~~~~~~~~~~~");


const demo: Currying <number> = curry ((a: string,b: number): number => a.length + b) ;
console.log (demo ("xx") (3)); // 5

console.log (curry ((a: string,b: number) => a.length + b) ("xx") (4)); // 6

