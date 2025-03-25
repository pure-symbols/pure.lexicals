/** 
  * @license AGPL-3.0
  * @license GFDL-1.3
  * 
  */


/* Depends */

type Fn <T, R> = (x: T) => R ;



/* One length Tuple (Case) */

type Case <A,> = <R,> (c: Fn <A, R>) => R ;

const Case = 
<T,> (x: T)
: Case <T> => 
	
	(
		<R,> (chooser: Fn <T, R>)
		: R => chooser (x) 
	
	) as Case <T> ;

Case.ahead = (<A,> (a: A): A => a) as (<A> (a: A) => A) ;

Case.applies = 
<T, R> (f: Fn <T, R>) => 
(p: Case <T>)
: R => 
	
	((p) (f)) ;

Case.records = 
<T,> (p: Case <T>) => 
<R,> (f: Fn <T, R>)
: R => 
	
	((p) (f)) ;



/* Two length Tuple (Pair) */

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

Pair.applies = 
<H, T, R> (f: Fn <H, Fn <T, R>>) => 
(p: Pair <H, T>)
: R => 
	
	((p) (f)) ;

Pair.records = 
<H, T> (p: Pair <H, T>) => 
<R,> (f: Fn <H, Fn <T, R>>)
: R => 
	
	((p) (f)) ;



/* Three length Tuple (Triple) */

type Triple <One, Two, Three> = <R,> (ch: Fn <One, Fn <Two, Fn <Three, R>>>) => R ;

const Triple = 
<A,> (a: A) => 
<B,> (b: B) => 
<C,> (c: C)
: Triple <A, B, C> => 
	
	(
		<R,> (chooser: Fn <A, Fn <B, Fn <C, R>>>)
		: R => chooser (a) (b) (c) 
	
	) as Triple <A, B, C> ;

Triple.applies = 
<A, B, C, R> (f: Fn <A, Fn <B, Fn <C, R>>>) => 
(three: Triple <A, B, C>)
: R => 

	((three) (f)) ;

Triple.records = 
<A, B, C> (three: Triple <A, B, C>) => 
<R,> (f: Fn <A, Fn <B, Fn <C, R>>>)
: R => 

	((three) (f)) ;

Triple.one = <A,> (a: A) => <B,> (b: B) => <C,> (c: C): A => a ;
Triple.two = <A,> (a: A) => <B,> (b: B) => <C,> (c: C): B => b ;
Triple.three = <A,> (a: A) => <B,> (b: B) => <C,> (c: C): C => c ;



/* try */

(Case (7)) ((a) => console.log (["A::" + a])); //> ["A::7"]
Case.applies ((a) => console.log (["A::" + a])) (Case (7)); //> ["A::7"]
Case.records (Case (7)) ((a) => console.log (["A::" + a])); //> ["A::7"]

(Pair ("a") (0)) ((a) => (b) => console.log (["A::" + a, "B::" + b])); //> ["A::a", "B::0"]
Pair.applies ((a) => (b) => console.log (["A::" + a, "B::" + b])) (Pair ("a") (0)); //> ["A::a", "B::0"]
Pair.records (Pair ("a") (0)) ((a) => (b) => console.log (["A::" + a, "B::" + b])); //> ["A::a", "B::0"]

(Triple ("a") (0) ([0,1,2])) ((a) => (b) => (c) => console.log (["A::" + a, "B::" + b, "C::" + c])); //> ["A::a", "B::0", "C::0,1,2"]
Triple.applies ((a) => (b) => (c) => console.log (["A::" + a, "B::" + b, "C::" + c])) (Triple ("a") (0) ([0,1,2])); //> ["A::a", "B::0", "C::0,1,2"]
Triple.records (Triple ("a") (0) ([0,1,2])) ((a) => (b) => (c) => console.log (["A::" + a, "B::" + b, "C::" + c])); //> ["A::a", "B::0", "C::0,1,2"]



