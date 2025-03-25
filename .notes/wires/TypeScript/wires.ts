/** 
  * @license AGPL-3.0
  * @license GFDL-1.3
  * 
  */


/* Depends */

type Lack <T> = () => T ;



/* Bool */

type BOOL = <R> (a: Lack <R>) => (b: Lack <R>) => R ;
const TRUE: BOOL = <R,> (a: Lack <R>) => (b: Lack <R>): R => a () ;
const FALSE: BOOL = <R,> (a: Lack <R>) => (b: Lack <R>): R => b () ;



/* Wire */

type wire = <R> (a: Lack <R>) => (b: Lack <R>) => (sujet: BOOL) => R ;

const wire: wire = 
<R,> (a: Lack <R>) => 
(b: Lack <R>) => 
(sujet: BOOL): R => 
	
	sujet (a) (b) ;



/* try */

const aorb = <T,> (bool: BOOL, a: T, b: T) => 
	wire (() => {
		console.log ("A");
		return(a)
	}) (() => {
		console.log ("B");
		return(b)
	}) (bool) ;
console.log (aorb (TRUE, 1, 2)); //> "A" //> 1
console.log (aorb (FALSE, 1, 2)); //> "B" //> 2

const aaorbb = <T,> (bool: BOOL, aa: () => T, bb: () => T): T => wire (aa) (bb) (bool) ;
console.log (aaorbb (
	TRUE, 
	() => {console.log ("AA"); return(11)}, 
	() => {console.log ("BB"); return(22)})); //> "AA" //> 11
console.log (aaorbb (
	FALSE, 
	() => {console.log ("AA"); return(11)}, 
	() => {console.log ("BB"); return(22)})); //> "BB" //> 22


