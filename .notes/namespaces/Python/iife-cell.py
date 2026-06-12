
# ── deps ────────────────────────────────────────
ns_dic = lambda cls = 'dict_as_ns': lambda dic: type (cls, (), dic) ()
yard = lambda *anony_args,**named_args: ns_dic('ns_yard')(dict(*anony_args,**named_args))


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
print(cell.b) #!> 'ns_yard' object has no attribute 'b'



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
print(cell.b) #!> 'ns_yard' object has no attribute 'b'
