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
