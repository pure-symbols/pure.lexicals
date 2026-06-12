
# ── define ──────────────────────────────────────
ns_dic = lambda dic: type ('dict_as_ns', (), dic) ()
yard = lambda dic: ns_dic(dict(dic))

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


