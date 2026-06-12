
# ── define ──────────────────────────────────────
ns_dic = lambda cls = 'dict_as_ns': lambda dic: type (cls, (), dic) ()
yard = lambda *x,**nx: ns_dic('ns_yard')(dict(*x,**nx))
# ── or simply ───────────────────────────────────
yard = lambda *x,**nx: (lambda cls: lambda dic: type (cls, (), dic) ())('ns_yard')(dict(*x,**nx))

# ── demo ────────────────────────────────────────
yrd = yard(
	a = lambda echoes: 
		1, 
	b = lambda echoes: 
		echoes.a() + 1, 
	fnc = lambda echoes: 
		lambda x, y: x * y + echoes.a() + echoes.b(), 
	_ = ...)

# ── effect ──────────────────────────────────────
print((yrd.a(), yrd.b(), yrd.fnc()(60, 2))) #> (1, 2, 123)


