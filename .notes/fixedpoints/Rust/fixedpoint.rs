//! A simple implementation of the Y Combinator:
//! λf.(λn.nn)(λn.f(nn))
//! <=> λf.(λn.f(nn))(λn.f(nn))
//! 

/// A function type that takes its own type as an input is an infinite recursive type.
/// We introduce the "Apply" trait, which will allow us to have an input with the same type as self, and break the recursion.
/// The input is going to be a trait object that implements the desired function in the interface.
/// 
trait Apply <T, R> 
{
	fn apply 
	(&self, f: &dyn Apply <T, R>, t: T) 
		-> R ;
}

/// If we were to pass in self as f, we get:
/// λf.λt.sft
/// => λs.λt.sst [s/f]
/// => λs.ss
/// 
impl <T, R, F> Apply <T, R> for F 
where F: 
	Fn (&dyn Apply <T, R>, T) -> R 
{
	fn apply 
	(&self, f: &dyn Apply <T, R>, t: T) 
		-> R 
	{ self (f, t) }
}

/// (λt(λn.(λy.nny))(λn.(λy.f(λz.nnz)y)))t
/// => (λn.nn)(λn.f(nn))
/// => Yf
/// 
fn fixedpoint <T, R> 
(f: impl Fn (&dyn Fn (T) -> R, T) -> R) 
	-> impl Fn (T) -> R 
{
	move |t| 
		
		( &|n: &dyn Apply <T, R>, fixedpoint| 
		  	n.apply (n, fixedpoint) ) 
		
		( &|n: &dyn Apply <T, R>, fixedpoint| 
		  	f (&|z| n.apply (n, z), fixedpoint)
		, t)
}


/// Use
/// 
fn main () 
{
	/* Factorial of n. */ 
	let factorial = fixedpoint 
	(
		| fac: &dyn Fn (usize) -> usize
		, n
		| 
			if n == 0 { 1 } 
			else { n * fac (n - 1) }
		) ;
	
	/* nth Fibonacci number. */ 
	let fibonacci = fixedpoint 
	(
		| fib: &dyn Fn ((usize, usize, usize, )) -> usize
		, (x, y, n, )
		| 
			match n 
			{
				0 => x, 
				1 => y, 
				_ => fib ((y, x + y, n - 1, )), 
			}
		) ;
	
	/* Drive function. */
	let n = 10 ;
	println! ("factorial ({}) = {}", n, factorial (n)); /* factorial (10) = 3628800 */
	println! ("fibonacci (1, 1, {}) = {}", n, fibonacci ((1, 1, n, ))); /* fibonacci (1, 1, 10) = 89 */
}
