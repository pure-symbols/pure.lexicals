/** 
  * @license AGPL-3.0
  * @license GFDL-1.3
  * 
  */

type Fn <T, R> = (x: T) => R ;

type pipe = <T,> (x: T) => <R,> (f: Fn <T, R>) => R ;

const pipe: pipe = 
<T,> (x: T) => 
<R,> (f: Fn <T, R>): R => 
	
	(f) (x) ;

type Pipeyard <T> = <R,> (continuation: Fn <T, R>) => Pipeyard <R> ;

const Pipeyard = 
<T,> (p: T): Pipeyard <T> => 
<R,> (continuation: Fn <T, R>): Pipeyard <R> => 
	
	Pipeyard ((continuation) (p)) ;

type pipeline = <T,> (head: T) => Pipeyard <T> ;
const pipeline: pipeline = Pipeyard as pipeline ;

