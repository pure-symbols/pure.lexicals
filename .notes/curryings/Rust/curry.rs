macro_rules! curry 
(
	/* Simplest form, without any type annotations. */
	/* assert_eq! (4, curry! (|a, b, c, d| a + b - c - d) (3) (4) (1) (2)); */
	( | $head:ident 
	    $(, $tail:ident )* | 
		$body:expr ) => 
	{
		  move |$head| 
		$(move |$tail|)* 
		{ $body } 
	} ;
	
	/* With input type annotations and a expr/block as function body */
	/* assert_eq! (4, curry! (|a: u8, b: u8, c: u8, d: u8| a + b - c - d) (3) (4) (1) (2)); */
	( | $head:ident:$tipo:ty 
	    $(, $tail:ident:$tipos:ty )* | 
		$body:expr ) => 
	{
		  move |$head:$tipo| 
		$(move |$tail:$tipos|)* 
		{ $body } 
	} ;
	
	/* With input and return type annotations and a block as function body */
	/* assert_eq! (4, curry! (|a: u8, b: u8, c: u8, d: u8| -> u8 { a + b - c - d }) (3) (4) (1) (2)); */
	( | $head:ident:$tipo:ty 
	    $(, $tail:ident:$tipos:ty )* | 
		-> $rendre:ty $body:block ) => 
	{
		  move |$head:$tipo| 
		$(move |$tail:$tipos|)* 
		-> $rendre { $body } 
	} ;
) ;

// use like
fn main () 
{
	assert_eq! (4, curry! (|a, b, c, d| a + b - c - d) (3) (4) (1) (2));
	assert_eq! (4, curry! (|a: u8, b: u8, c: u8, d: u8| a + b - c - d) (3) (4) (1) (2));
	assert_eq! (4, curry! (|a: u8, b: u8, c: u8, d: u8| { let x = a + b - c - d ; x }) (3) (4) (1) (2));
	assert_eq! (4, curry! (|a: u8, b: u8, c: u8, d: u8| -> u8 { a + b - c - d }) (3) (4) (1) (2));
	
	// let add = curry! (|a: u8, b: u8| -> u8 { a + b }) ;
	// assert_eq! (7, curry! (|f, a, b| f(a)(b)) (add) (3) (4)); //// error: cannot infer type
	
	let idiot: fn(u8) -> u8 = |a: u8| -> u8 {a} ;
	// assert_eq! (7, curry! (|a, b, c| c(a) + c(b)) (3) (4) (idiot)); //// error: cannot infer type
	assert_eq! (7, curry! (|a: u8, b: u8, c: fn(u8) -> u8| c(a) + c(b)) (3) (4) (idiot)); //// won't error ...
}
