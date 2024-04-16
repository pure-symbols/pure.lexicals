/** 
  * @license AGPL-3.0
  * @license GFDL-1.3
  * 
  */


type Fn <T, R> = (x: T) => R ;

type Wert = <A> (a: A) => <B> (b: B) => A ;
type Mehr = <A> (a: A) => <B> (b: B) => B ;
type Tuple <Head, Tail> = <R,> (chooser: Fn <Head, Fn <Tail, R>>) => R ;

const Tuple = 
<H,> (h: H) => 
<T,> (t: T)
: Tuple <H, T> => 
	
	(
		<R,> (recorder: Fn <H, Fn <T, R>>)
		: R => recorder (h) (t) 
	
	) as Tuple <H, T> ;

Tuple.head = (<A,> (a: A) => <B,> (b: B): A => a) as Wert ;
Tuple.tail = (<A,> (a: A) => <B,> (b: B): B => b) as Mehr ;

Tuple.record = 
<H, T> (tuple: Tuple <H, T>) => 
<R,> (f: Fn <H, Fn <T, R>>)
: R => 

	((tuple) (f)) ;



/* Showings */

console.log ('~~~~~~~~~~~~~~~~~~~~~');

/* unpack */

/* native tuple */ (({ a, b }) => a.length + b) ({a: "abc", b: 1}) ;
/* pure tuple */ Tuple.record (Tuple ("abc") (1)) ((a) => (b) => a.length + b) ;
/* pure tuple */ (Tuple ("abc") (1)) ((a) => (b) => a.length + b) ;
/* pure tuple */ (pair => pair ((a) => (b) => a.length + b)) (Tuple ("abc") (1)) ;

console.log ((({ a, b }) => a.length + b) ({a: "abc", b: 1})); // 4
console.log (Tuple.record (Tuple ("abc") (1)) ((a) => (b) => a.length + b)); // 4
console.log ((Tuple ("abc") (1)) ((a) => (b) => a.length + b)); // 4
console.log ((pair => pair ((a) => (b) => a.length + b)) (Tuple ("abc") (1))); // 4

/* getval */

/* native tuple */ ({head: "abc", tail: 1}).head ;
/* pure tuple */ (Tuple ("abc") (1)) (Tuple.head) ;

console.log (({head: "abc", tail: 1}).head); // "abc"
console.log ((Tuple ("abc") (1)) (Tuple.head)); // "abc"




/* More Tuple */

type Tuple3 <One, Two, Three> = <R,> (chooser: Fn <One, Fn <Two, Fn <Three, R>>>) => R ;

const Tuple3 = 
<A,> (a: A) => 
<B,> (b: B) => 
<C,> (c: C)
: Tuple3 <A, B, C> => 
	
	(
		<R,> (recorder: Fn <A, Fn <B, Fn <C, R>>>)
		: R => recorder (a) (b) (c) 
	
	) as Tuple3 <A, B, C> ;

Tuple3.record = 
<A, B, C> (tuple3: Tuple3 <A, B, C>) => 
<R,> (f: Fn <A, Fn <B, Fn <C, R>>>)
: R => 

	((tuple3) (f)) ;

Tuple3.one = <A,> (a: A) => <B,> (b: B) => <C,> (c: C): A => a ;
Tuple3.two = <A,> (a: A) => <B,> (b: B) => <C,> (c: C): B => b ;
Tuple3.three = <A,> (a: A) => <B,> (b: B) => <C,> (c: C): C => c ;

/* unpack */ (Tuple3 ("aa") (2) ("()")) ((str) => (n) => (x) => str.length + n + x) ;
/* unpack */ ((tuple3) => tuple3 ((str) => (n) => (x) => str.length + n + x)) (Tuple3 ("aa") (2) ("()")) ;
/* getval */ (Tuple3 ("aa") (2) ("()")) (Tuple3.three) ;
/* getval */ ((tuple3) => tuple3 (Tuple3.three)) (Tuple3 ("aa") (2) ("()")) ;

console.log ((Tuple3 ("aa") (2) ("()")) ((str) => (n) => (x) => str.length + n + x)); // "4()"
console.log (((tuple3) => tuple3 ((str) => (n) => (x) => str.length + n + x)) (Tuple3 ("aa") (2) ("()"))); // "4()"
console.log ((Tuple3 ("aa") (2) ("()")) (Tuple3.three)); // "()"
console.log ((Tuple3 ("aa") (2) ("()")) (Tuple3.one)); // "aa"
console.log ((Tuple3 ("aa") (2) ("()")) (Tuple3.two)); // 2


