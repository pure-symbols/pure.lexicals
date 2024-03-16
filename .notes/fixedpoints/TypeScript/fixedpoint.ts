type Fn <T, R> = (x: T) => R ;
type Ω <T,> = (x: Ω <T>) => T ;

type fixedpoint = <I, O> (f: Fn <Fn <I, O>, Fn <I, O>>) => Fn <I, O> ;

const fixedpoint: fixedpoint = 
<I, O> (f: Fn <Fn <I, O>, Fn <I, O>>) => 
	((x) => (x) (x)) 
	((y: Ω <Fn <I, O>>) => 
		(f) ((... z) => (y) (y) (... z))) ;

const fac = fixedpoint (
(f: (n: number) => number) => 
	(n: number) => n === 0 ? 1 : n * f(n - 1)) ;

console.log (fac (6)); // 720

