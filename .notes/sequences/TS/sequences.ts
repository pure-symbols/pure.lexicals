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



/* Pair */

type Wert = <A> (a: A) => <B> (b: B) => A ;
type Mehr = <A> (a: A) => <B> (b: B) => B ;
type Pair <Head, Tail> = <R,> (chooser: Fn <Head, Fn <Tail, R>>) => R ;

const Pair = 
<H,> (h: H) => 
<T,> (t: T)
: Pair <H, T> => 
	
	(
		<R,> (recorder: Fn <H, Fn <T, R>>)
		: R => recorder (h) (t) 
	
	) as Pair <H, T> ;


Pair.wert = (<W,> (w: W) => <M,> (m: M): W => w as W) as Wert ;
Pair.mehr = (<W,> (w: W) => <M,> (m: M): M => m as M) as Mehr ;

Pair.head = <H, T> (self: Pair <H, T>): H => (self) (Pair.wert) as H ;
Pair.tail = <H, T> (self: Pair <H, T>): T => (self) (Pair.mehr) as T ;

Pair.record = 
<H, T> (p: Pair <H, T>) => 
<R,> (f: Fn <H, Fn <T, R>>)
: R => 

	((p) (f)) ;



/* Iterator */

type Downpour <T> = () => Iterador <T> ;
type Iterador <T> = Pair <T, Downpour <T>> ;

const Iterador = <T,> (h: T) => (t: Downpour <T>): Iterador <T> => Pair (h) (t) ;

Iterador.iterate = <T,> (h: T) => (f: Fn<T, T>): Downpour <T> => 
	() => Iterador (h) (Iterador.iterate (f(h)) (f) ) ;

Iterador.unfold = <T,> (h: T) => <R,> (f: Fn <T, Pair <R, T>>): Downpour <R> => 
	(Pair.record (f (h))) ((head) => (tail) => () => Iterador (head) (Iterador.unfold (tail) (f))) ;

Iterador.head = <T,> (self: Downpour <T>): T => self () (Pair.wert) as T ;
Iterador.tail = <T,> (self: Downpour <T>): Downpour <T> => self () (Pair.mehr) as Downpour <T> ;

Iterador.map = <T, R> (f: Fn<T, R>) => (self: Downpour <T>): Downpour <R> => 
	() => Iterador (pipe (Iterador.head (self)) (f) ) (pipe (Iterador.tail (self)) (Iterador.map (f)) ) ;

Iterador.filter = <T,> (f: Fn<T, boolean>) => (self: Downpour <T>): Downpour <T> => 
	( ({head,tail}) => 
		f(head) ? () => Iterador (head) (Iterador.filter (f) (tail)) : Iterador.filter (f) (tail) 
	) ({ head: Iterador.head (self), tail: Iterador.tail (self) }) ;

Iterador.record = <T,> (self: Downpour <T>): Pair <T, Downpour <T> > => 
	(Pair.record) (self () as Pair <T, Downpour <T> >) ;

Iterador.TAKE = (limit: number) => <T,> (self: Downpour <T>): T[] => 
	
	[... Array(limit).keys()].reduce
	(
		(state, k) => 
			(Pair.record (state)) ( (left) => (right) => 
			(Pair.record (right)) ( (head) => (tail) => 
				Pair ([... left, head]) (Iterador.record (tail)) 
			) ) , 
		
		(Pair ([] as T[]) (Iterador.record (self))) , 
	
	) (Pair.wert) ;




/* Sequences Demo */

pipe ("~~~~~~~~~~~~~~~~~~~~~") (console.log);

pipeline (Iterador.iterate (2) (x => x + 1)) 
	(Iterador.map (x => x*x)) 
	(Iterador.TAKE (10)) 
	(console.log); // [4, 9, 16, 25, 36, 49, 64, 81, 100, 121] 

pipeline (Iterador.unfold (2) (x => Pair (x*x) (x+1))) 
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
		Pair (head) (pipe (tail) 
			(Iterador.filter (x => x < head * head || x % head != 0))) 
	) ) ;

pipeline (primenums) 
	(Iterador.TAKE (11)) 
	(console.log); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
