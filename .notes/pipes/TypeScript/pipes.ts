/** 
  * @license AGPL-3.0
  * @license GFDL-1.3
  * 
  */


/* Depends */

type Fn <T, R> = (x: T) => R ;



/* Pipe */

type pipe = <T,> (x: T) => <R,> (f: Fn <T, R>) => R ;

const pipe: pipe = 
<T,> (x: T) => 
<R,> (f: Fn <T, R>): R => 
	
	(f) (x) ;



/* Pipeline */

type Pipeyard <T> = <R,> (continuation: Fn <T, R>) => Pipeyard <R> ;
type pipeline = <T,> (head: T) => Pipeyard <T> ;

const pipeline: pipeline = 
<T,> (p: T): Pipeyard <T> => 
<R,> (continuation: Fn <T, R>): Pipeyard <R> => 
	
	pipeline ((continuation) (p)) ;

const Pipeyard = 
<T,> (head: T)
: Pipeyard <T> => 
	
	( <R,> (continuation: Fn <T, R>)
	: Pipeyard <R> => 
		
		pipe (continuation (head)) (Pipeyard) 
	
	) as Pipeyard <T> ;

Pipeyard.__broadcast = 
<T,> (self: Pipeyard<T>)
: T => 
{
	let message: T = {} as T;
	self (x => message = x);
	return message ;
} ;



/* try */

const add = (b) => (a) => a + b;
pipeline (42) 
	(add (3))
	(add (4))
	(console.log); //> 49

pipeline (6)
	(a => a + 1)
	(b => b * 2)
	(c => c - 3)
	(console.log); //> 11
