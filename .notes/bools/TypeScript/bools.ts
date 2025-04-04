/** 
  * @license AGPL-3.0
  * @license GFDL-1.3
  * 
  */


/* Depends: Lack */

type Lack <T> = () => T ;



/* Depends: Pair */

type Fn <T, R> = (x: T) => R ;

type Pair <Head, Tail> = <R,> (c: Fn <Head, Fn <Tail, R>>) => R ;

const Pair = 
<H,> (h: H) => 
<T,> (t: T)
: Pair <H, T> => 
	
	(
		<R,> (chooser: Fn <H, Fn <T, R>>)
		: R => chooser (h) (t) 
	
	) as Pair <H, T> ;

Pair.head = (<A,> (a: A) => <B,> (b: B): A => a) as (<A> (a: A) => <B> (b: B) => A) ;
Pair.tail = (<A,> (a: A) => <B,> (b: B): B => b) as (<A> (a: A) => <B> (b: B) => B) ;



/* Bool */

type Boolwire = <R> (a: Lack <R>) => (b: Lack <R>) => R ;


const Boolwire = 
(choose: Fn <Boolwire, Fn <Boolwire, Boolwire>>)
: Boolwire => 
	
	Pair 
		(<R,> (a: Lack <R>) => (b: Lack <R>): R => a ()) 
		(<R,> (a: Lack <R>) => (b: Lack <R>): R => b ()) 
		(choose) ;

Boolwire.true = (Boolwire (Pair.head)) as Boolwire ;
Boolwire.false = (Boolwire (Pair.tail)) as Boolwire ;


/* Wire */

type wire = <R> (a: Lack <R>) => (b: Lack <R>) => (sujet: Boolwire) => R ;

const wire: wire = 
<R,> (a: Lack <R>) => 
(b: Lack <R>) => 
(sujet: Boolwire): R => 
	
	sujet (a) (b) ;



/* try */

const aorb = <T,> (bool: Boolwire, a: T, b: T) => 
	wire (() => {
		console.log ("A");
		return(a)
	}) (() => {
		console.log ("B");
		return(b)
	}) (bool) ;
console.log (aorb (Boolwire.true, 1, 2)); //> "A" //> 1
console.log (aorb (Boolwire.false, 1, 2)); //> "B" //> 2

const aaorbb = <T,> (bool: Boolwire, aa: () => T, bb: () => T): T => wire (aa) (bb) (bool) ;
console.log (aaorbb (
	Boolwire.true, 
	() => {console.log ("AA"); return(11)}, 
	() => {console.log ("BB"); return(22)})); //> "AA" //> 11
console.log (aaorbb (
	Boolwire.false, 
	() => {console.log ("AA"); return(11)}, 
	() => {console.log ("BB"); return(22)})); //> "BB" //> 22


