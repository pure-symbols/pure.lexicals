/** 
  * @license AGPL-3.0
  * @license GFDL-1.3
  * 
  */



/* Fn */

type Fn <T, R> = (x: T) => R ;
type Lacking <T> = () => T ;



/* Pipe */

type pipe = <T,> (x: T) => <R,> (f: Fn <T, R>) => R ;

const pipe: pipe = 
<T,> (x: T) => 
<R,> (f: Fn <T, R>): R => 
	
	(f) (x) ;


type Pipeyard <T> = <R,> (continuation: Fn <T, R>) => Pipeyard <R> ;
type pipeline = <T,> (head: T) => Pipeyard <T> ;

const pipeline: pipeline = 
<T,> (s: T): Pipeyard <T> => 
<R,> (continuation: Fn <T, R>): Pipeyard <R> => 
	
	pipeline ((continuation) (s)) ;



/* Tuple */

type Wert = <A> (a: A) => <B> (b: B) => A ;
type Mehr = <A> (a: A) => <B> (b: B) => B ;

const wert: Wert = <A,> (a: A) => <B,> (b: B): A => a ;
const mehr: Mehr = <A,> (a: A) => <B,> (b: B): B => b ;

type Tuple <Head, Tail> = <R,> (chooser: Fn <Head, Fn <Tail, R>>) => R ;

const Tuple = 
<H,> (h: H) => 
<T,> (t: T)
: Tuple <H, T> => 
	
	(
		<R,> (recorder: Fn <H, Fn <T, R>>)
		: R => recorder (h) (t) 
	
	) as Tuple <H, T> ;


Tuple.head = <H, T> (self: Tuple <H, T>): H => self (wert) as H ;
Tuple.tail = <H, T> (self: Tuple <H, T>): T => self (mehr) as T ;

Tuple.record = 
<H, T> (tuple: Tuple <H, T>) => 
<R,> (f: Fn <H, Fn <T, R>>)
: R => 

	((tuple) (f)) ;



/* Iterator */

type Downpour <T> = () => Iterador <T> ;
type Iterador <T> = Tuple <T, Downpour <T>> ;

const Iterador = <T,> (h: T) => (t: Downpour <T>): Iterador <T> => Tuple (h) (t) ;

Iterador.iterate = <T,> (h: T) => (f: Fn<T, T>): Downpour <T> => 
	() => Iterador (h) (Iterador.iterate (f(h)) (f) ) ;

Iterador.unfold = <T,> (h: T) => <R,> (f: Fn <T, Tuple <R, T>>): Downpour <R> => 
	(Tuple.record (f (h))) ((head) => (tail) => () => Iterador (head) (Iterador.unfold (tail) (f))) ;

Iterador.head = <T,> (self: Downpour <T>): T => (Tuple.head) (self() as Tuple <T, Downpour <T> >) ;
Iterador.tail = <T,> (self: Downpour <T>): Downpour <T> => (Tuple.tail) (self() as Tuple <T, Downpour <T> >) ;

Iterador.map = <T, R> (f: Fn<T, R>) => (self: Downpour <T>): Downpour <R> => 
	() => Iterador (pipe (Iterador.head (self)) (f) ) (pipe (Iterador.tail (self)) (Iterador.map (f)) ) ;

Iterador.filter = <T,> (f: Fn<T, boolean>) => (self: Downpour <T>): Downpour <T> => 
	( ({head,tail}) => 
		f(head) ? () => Iterador (head) (Iterador.filter (f) (tail)) : Iterador.filter (f) (tail) 
	) ({ head: Iterador.head (self), tail: Iterador.tail (self) }) ;

Iterador.record = <T,> (self: Downpour <T>): Tuple <T, Downpour <T> > => 
	(Tuple.record) (self () as Tuple <T, Downpour <T> >) ;

Iterador.TAKE = (limit: number) => <T,> (self: Downpour <T>): T[] => 
	
	[... Array(limit).keys()].reduce
	(
		(state, k) => 
			(Tuple.record (state)) ( (left) => (right) => 
			(Tuple.record (right)) ( (head) => (tail) => 
				Tuple ([... left, head]) (Iterador.record (tail)) 
			) ) , 
		
		(Tuple ([] as T[]) (Iterador.record (self))) , 
	
	) (wert) ;




/* Sequences Demo */

pipe ("~~~~~~~~~~~~~~~~~~~~~") (console.log);

pipeline (Iterador.iterate (2) (x => x + 1)) 
	(Iterador.map (x => x*x)) 
	(Iterador.TAKE (10)) 
	(console.log); // [4, 9, 16, 25, 36, 49, 64, 81, 100, 121] 

pipeline (Iterador.unfold (2) (x => Tuple (x*x) (x+1))) 
	(Iterador.TAKE (10)) 
	(console.log); // [4, 9, 16, 25, 36, 49, 64, 81, 100, 121]

pipeline (Iterador.iterate (2) (x => x + 1)) 
	(Iterador.map (x => x*x)) 
	(Iterador.filter (x => x%2 != 0)) 
	(Iterador.TAKE (10)) 
	(console.log); // [9, 25, 49, 81, 121, 169, 225, 289, 361, 441]

const primenums = 
Iterador.unfold (Iterador.iterate (2) (x => x + 1)) 
	( naturalnums => (Iterador.record (naturalnums)) ( (head) => (tail) => 
		Tuple (head) (pipe (tail) 
			(Iterador.filter (x => x < head * head || x % head != 0))) 
	) ) ;

pipeline (primenums) 
	(Iterador.TAKE (11)) 
	(console.log); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
