
-- ── demo ────────────────────────────────────────
cell = 
( function () 
	
	a = 1 ;
	b = a + 1 ;
	c = function (n) return a + b * n end ;

return { a = a, c = c } end ) ()

-- ── effect ──────────────────────────────────────
print (cell.a)    -- > 1
print (cell.c(1)) -- > 3
print (cell.b)    -- > nil

