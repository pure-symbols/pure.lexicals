final var birds = 
new Object() 
{
	
	@FunctionalInterface 
	interface Birds { Birds echo(Birds a) ;}
	
	Birds idiot () 
		{ return (Birds) ( a -> a ) ;}
	
	Birds mockingbird () 
		{ return (Birds) ( a -> (a) .echo (a) ) ;}
	
	Birds kestrel () 
		{ return (Birds) ( a -> b -> a ) ;}
	
	Birds kite () 
		{ return (Birds) ( a -> b -> b ) ;}
	
	Birds thrush () 
		{ return (Birds) ( a -> b -> (b) .echo (a) ) ;}
	
	Birds starling () 
		{ return (Birds) ( a -> b -> c -> (a) .echo (c) .echo ((b) .echo (c)) ) ;}
	
	
} ;

/// so that:


birds.idiot() == birds.idiot() ; // true


birds.idiot() 
	
	.echo ( birds.idiot() ) == birds.idiot() ; // true


birds.kite() .echo (birds.kite()) 
	
	.echo ( birds.idiot() ) == birds.idiot() ; // true

/// means: birds.kite() .echo (birds.kite()) == birds.idiot()


birds.mockingbird() .echo (birds.kite()) 
	
	.echo ( birds.idiot() ) == birds.idiot() ; // true

/// means: birds.mockingbird() .echo (birds.kite()) == birds.kite() .echo (birds.kite())


birds.starling() .echo (birds.idiot()) .echo (birds.idiot()) .echo (birds.kite()) 
	
	.echo ( birds.idiot() ) == birds.idiot() ; // true

/// means: birds.starling() .echo (birds.idiot()) .echo (birds.idiot()) .echo (birds.kite()) == birds.idiot()



