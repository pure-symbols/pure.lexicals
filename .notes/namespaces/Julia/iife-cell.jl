

# ── demo ────────────────────────────────────────
cell = 
( () -> begin 
	
	a = 1 ;
	b = a + 1 ;
	c = (n) -> a + b * n ;

( a = a, c = c ) end )()

# ── effect ──────────────────────────────────────
cell.a #> 1
cell.c(1) #> 3
cell.b #!> ERROR: type NamedTuple has no field b


