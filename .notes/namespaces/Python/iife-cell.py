
# ── deps ────────────────────────────────────────
ns_dic = lambda dic: type ('dict_as_ns', (), dic) ()
yard = lambda *args,**nmargs: ns_dic(dict(*args,**nmargs))



# ── normal ────────

# ── demo ────────────────────────────────────────
cell = (
(lambda a:
(lambda b:
(lambda fnc:
	
	yard( a = a, fnc = staticmethod(fnc) )

) (fnc = lambda: a+b)
) (b = a + 1)
) (a = 1) )

# ── effect ──────────────────────────────────────
print(cell.a) #> 1
print(cell.fnc()) #> 3
print(cell.b) #!> 'dict_as_ns' object has no attribute 'b'



# ── walrus ────────

# ── demo ────────────────────────────────────────
cell = (
lambda _rtn = -1: 
(
	a := 1 ,
	b := a + 1 ,
	fnc := lambda: a+b ,
	
	yard( a = a, fnc = staticmethod(fnc) ) 

)[_rtn] ) (-1)

# ── effect ──────────────────────────────────────
print(cell.a) #> 1
print(cell.fnc()) #> 3
print(cell.b) #!> 'dict_as_ns' object has no attribute 'b'
