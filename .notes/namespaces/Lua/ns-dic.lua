
-- ── demo ────────────────────────────────────────
dic = {}

dic.a = 1
dic.b = dic.a + 1
dic.c = function () return dic.a + dic.b end

-- ── effect ──────────────────────────────────────
print (dic.a)    -- > 1
print (dic.b)    -- > 2
print (dic.c(1)) -- > 3

