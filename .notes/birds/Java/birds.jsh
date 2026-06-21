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


"verifier";

birds.idiot() == birds.idiot() ; // true
birds.thrush() == birds.thrush() ; // true

///: verifier: 'I'/'T'


"verify func";

birds.idiot() 
	.echo ( birds.idiot() ) == birds.idiot() ; // true
birds.idiot() 
	.echo ( birds.thrush() ) == birds.thrush() ; // true

///: verified: func of: "I"


"eq tes: K(I)(S)";

birds.kestrel() .echo (birds.idiot()) .echo (birds.starling()) 
	.echo ( birds.idiot() ) == birds.idiot() ; // true
birds.kestrel() .echo (birds.idiot()) .echo (birds.starling()) 
	.echo ( birds.thrush() ) == birds.thrush() ; // true

///: means: birds.kestrel() .echo (birds.idiot()) .echo (birds.starling()) == birds.idiot()
///: aka: K(I)(S) = "I"


"eq tes: KI(S)";

birds.kite() .echo (birds.starling()) 
	.echo ( birds.idiot() ) == birds.idiot() ; // true
birds.kite() .echo (birds.starling()) 
	.echo ( birds.thrush() ) == birds.thrush() ; // true

///: means: birds.kite() .echo (birds.starling()) == birds.idiot()
///: aka: KI(S) = "I"
///: -- (well, KI(anything) can always be I)


"eq tes: KI(KI)";

birds.kite() .echo (birds.kite()) 
	.echo ( birds.idiot() ) == birds.idiot() ; // true
birds.kite() .echo (birds.kite()) 
	.echo ( birds.thrush() ) == birds.thrush() ; // true

///: means: birds.kite() .echo (birds.kite()) == birds.idiot()
///: aka: KI(KI) = "I"


"eq tes: M(KI)";

birds.mockingbird() .echo (birds.kite()) 
	.echo ( birds.idiot() ) == birds.idiot() ; // true
birds.mockingbird() .echo (birds.kite()) 
	.echo ( birds.thrush() ) == birds.thrush() ; // true

///: means: birds.mockingbird() .echo (birds.kite()) == birds.kite() .echo (birds.kite())
///: aka: M(KI) = KI(KI) = "I"


"eq tes: SII(KI)";

birds.starling() .echo (birds.idiot()) .echo (birds.idiot()) .echo (birds.kite()) 
	.echo ( birds.idiot() ) == birds.idiot() ; // true
birds.starling() .echo (birds.idiot()) .echo (birds.idiot()) .echo (birds.kite()) 
	.echo ( birds.thrush() ) == birds.thrush() ; // true

///: means: birds.starling() .echo (birds.idiot()) .echo (birds.idiot()) .echo (birds.kite()) == birds.idiot()
///: aka: SII(KI) = M(KI) = KI(KI) = "I"


"neq tes: K(I)";

birds.kestrel() .echo (birds.idiot()) 
	.echo ( birds.thrush() ) == birds.thrush() ; // false
birds.kestrel() .echo (birds.idiot()) 
	.echo ( birds.mockingbird() ) == birds.mockingbird() ; // false

///: means: birds.kestrel() .echo (birds.idiot()) == birds.idiot()
///: aka: K(I) != "I"


"DONE.";




////* ====================== *////

/*** (Detailed output) ==>
1-27	Variable declaration & initialization ⮕ $0@1cab0bfb
32-32	Variable declaration & initialization ⮕ "verifier"
34-34	Variable declaration & initialization ⮕ true
35-35	Variable declaration & initialization ⮕ true
37-40	Variable declaration & initialization ⮕ "verify func"
42-43	Variable declaration & initialization ⮕ true
44-45	Variable declaration & initialization ⮕ true
47-50	Variable declaration & initialization ⮕ "eq tes: K(I)(S)"
52-53	Variable declaration & initialization ⮕ true
54-55	Variable declaration & initialization ⮕ true
57-61	Variable declaration & initialization ⮕ "eq tes: KI(S)"
63-64	Variable declaration & initialization ⮕ true
65-66	Variable declaration & initialization ⮕ true
68-73	Variable declaration & initialization ⮕ "eq tes: KI(KI)"
75-76	Variable declaration & initialization ⮕ true
77-78	Variable declaration & initialization ⮕ true
80-84	Variable declaration & initialization ⮕ "eq tes: M(KI)"
86-87	Variable declaration & initialization ⮕ true
88-89	Variable declaration & initialization ⮕ true
91-95	Variable declaration & initialization ⮕ "eq tes: SII(KI)"
97-98	Variable declaration & initialization ⮕ true
99-100	Variable declaration & initialization ⮕ true
102-106	Variable declaration & initialization ⮕ "neq tes: K(I)"
108-109	Variable declaration & initialization ⮕ false
110-111	Variable declaration & initialization ⮕ false
113-122	Variable declaration & initialization ⮕ "DONE."
***/


