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

///: so that ---------------------


"verifier" ;

birds.idiot() == birds.idiot() ;// true
birds.thrush() == birds.thrush() ;// true

///: verifier: 'I'/'T'


"verify func" ;

final var bird_I = birds.idiot();
bird_I .echo ( birds.idiot() ) == birds.idiot() ;// true
bird_I .echo ( birds.thrush() ) == birds.thrush() ;// true
bird_I .echo ( bird_I ) == bird_I ;// true

///: verified: func of: "I"


"eq tes: K(I)(S)" ;

final var bird_K_I_S = birds.kestrel() .echo (birds.idiot()) .echo (birds.starling());
bird_K_I_S .echo ( birds.idiot() ) == birds.idiot() ;// true
bird_K_I_S .echo ( birds.thrush() ) == birds.thrush() ;// true
bird_K_I_S .echo ( bird_K_I_S ) == bird_K_I_S ;// true

///: means: birds.kestrel() .echo (birds.idiot()) .echo (birds.starling()) == birds.idiot()
///: aka: K(I)(S) = "I"


"eq tes: KI(S)" ;

final var bird_KI_S = birds.kite() .echo (birds.starling());
bird_KI_S .echo ( birds.idiot() ) == birds.idiot() ;// true
bird_KI_S .echo ( birds.thrush() ) == birds.thrush() ;// true
bird_KI_S .echo ( bird_KI_S ) == bird_KI_S ;// true

///: means: birds.kite() .echo (birds.starling()) == birds.idiot()
///: aka: KI(S) = "I"
///: -- (well, KI(anything) can always be I)


"eq tes: KI(KI)" ;

final var bird_KI_KI = birds.kite() .echo (birds.kite());
bird_KI_KI .echo ( birds.idiot() ) == birds.idiot() ;// true
bird_KI_KI .echo ( birds.thrush() ) == birds.thrush() ;// true
bird_KI_KI .echo ( bird_KI_KI ) == bird_KI_KI ;// true

///: means: birds.kite() .echo (birds.kite()) == birds.idiot()
///: aka: KI(KI) = "I"


"eq tes: M(KI)" ;

final var bird_M_KI = birds.mockingbird() .echo (birds.kite());
bird_M_KI .echo ( birds.idiot() ) == birds.idiot() ;// true
bird_M_KI .echo ( birds.thrush() ) == birds.thrush() ;// true
bird_M_KI .echo ( bird_M_KI ) == bird_M_KI ;// true

///: means: birds.mockingbird() .echo (birds.kite()) == birds.kite() .echo (birds.kite())
///: aka: M(KI) = KI(KI) = "I"


"eq tes: SII(KI)" ;

final var bird_S_I_I_KI = birds.starling() .echo (birds.idiot()) .echo (birds.idiot()) .echo (birds.kite());
bird_S_I_I_KI .echo ( birds.idiot() ) == birds.idiot() ;// true
bird_S_I_I_KI .echo ( birds.thrush() ) == birds.thrush() ;// true
bird_S_I_I_KI .echo ( bird_S_I_I_KI ) == bird_S_I_I_KI ;// true

///: means: birds.starling() .echo (birds.idiot()) .echo (birds.idiot()) .echo (birds.kite()) == birds.idiot()
///: aka: SII(KI) = M(KI) = KI(KI) = "I"


"neq tes: K(I)" ;

final var bird_K_I = birds.kestrel() .echo (birds.idiot());
bird_K_I .echo ( birds.thrush() ) == birds.thrush() ;// false
bird_K_I .echo ( birds.mockingbird() ) == birds.mockingbird() ;// false
bird_K_I .echo ( bird_K_I ) == bird_K_I ;// false

///: means: birds.kestrel() .echo (birds.idiot()) == birds.idiot()
///: aka: K(I) != "I"


"DONE." ;




////* ====================== *////

/*** (Detailed output) ==>
1-27	Variable declaration & initialization ⮕ $0@1cab0bfb
32	Variable declaration & initialization ⮕ "verifier"
34	Variable declaration & initialization ⮕ true
35	Variable declaration & initialization ⮕ true
37-40	Variable declaration & initialization ⮕ "verify func"
42	Variable declaration & initialization ⮕ $0$$Lambda/0x000000008c102420@40f08448
43	Variable declaration & initialization ⮕ true
44	Variable declaration & initialization ⮕ true
45	Variable declaration & initialization ⮕ true
47-50	Variable declaration & initialization ⮕ "eq tes: K(I)(S)"
52	Variable declaration & initialization ⮕ $0$$Lambda/0x000000008c102420@40f08448
53	Variable declaration & initialization ⮕ true
54	Variable declaration & initialization ⮕ true
55	Variable declaration & initialization ⮕ true
57-61	Variable declaration & initialization ⮕ "eq tes: KI(S)"
63	Variable declaration & initialization ⮕ $0$$Lambda/0x000000008c108c78@32cf48b7
64	Variable declaration & initialization ⮕ true
65	Variable declaration & initialization ⮕ true
66	Variable declaration & initialization ⮕ true
68-73	Variable declaration & initialization ⮕ "eq tes: KI(KI)"
75	Variable declaration & initialization ⮕ $0$$Lambda/0x00000000d1102870@70a9f84e
76	Variable declaration & initialization ⮕ true
77	Variable declaration & initialization ⮕ true
78	Variable declaration & initialization ⮕ true
80-84	Variable declaration & initialization ⮕ "eq tes: M(KI)"
86	Variable declaration & initialization ⮕ $0$$Lambda/0x00000000d1102870@70a9f84e
87	Variable declaration & initialization ⮕ true
88	Variable declaration & initialization ⮕ true
89	Variable declaration & initialization ⮕ true
91-95	Variable declaration & initialization ⮕ "eq tes: SII(KI)"
97	Variable declaration & initialization ⮕ $0$$Lambda/0x00000000a6102870@70a9f84e
98	Variable declaration & initialization ⮕ true
99	Variable declaration & initialization ⮕ true
100	Variable declaration & initialization ⮕ true
102-106	Variable declaration & initialization ⮕ "neq tes: K(I)"
108	Variable declaration & initialization ⮕ $0$$Lambda/0x00000000a6108c78@32cf48b7
109	Variable declaration & initialization ⮕ false
110	Variable declaration & initialization ⮕ false
111	Variable declaration & initialization ⮕ false
113-122	Variable declaration & initialization ⮕ "DONE."
***/
