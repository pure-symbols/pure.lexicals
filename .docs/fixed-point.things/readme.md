
# Some thing about the *Fixed-point Combinators* 🦠

## 🧪 SKI

### Knows

We have:

~~~ lambda
S = λabc.ac(bc)
K = λab.a = λxy.x
I = λa.a
~~~

and 

~~~ lambda
Y = λf.(λs.ss)(λx.f(xx))
~~~

And that's what I want to prove: 

~~~ lambda
Y = S(K(SII))(S(S(KS)K)(K(SII)))
~~~

### Provings

~~~ lambda
SII = λc.c(c) = λs.ss = M
KM = λab.bb = λxy.yy
KS = λxabc.ac(bc)

S(KS)
 = λbc.(λxa'b'c'.a'c'(b'c'))c(bc)
 = λbc.(λb'c'.bcc'(b'c'))
 = λbcde.bce(de)

S(KS)K = λcde.c(de) = B = λxyz.x(yz)
SB = λbcz.c(bcz) = λxyz.y(xyz)
SB(KM) = λyz.y(zz) = λab.a(bb) = L
S(KM) = λbc.(bc)(bc) = λab.ab(ab) = M2

S(KM)L
 = λb. (λyz.y(zz))b ((λyz.y(zz))b)
 = λb. (λz.b(zz)) ((λyz.y(zz))b)
 = λb. (λz.b(zz)) (λz.b(zz)) = λf. (λx.f(xx)) (λx.f(xx)) = Y
~~~

So: 

~~~ lambda
Y = S(KM)L
 = λf.(λx.f(xx))(λx.f(xx))
 = λf.M(λx.f(xx))
 = λf.(λs.ss)(λx.f(xx))
~~~

So we can sure: 

~~~ lambda
Y
 = S(K(SII))(S(S(KS)K)(K(SII)))
 = S(K(M))(S(S(KS)K)(K(M)))
 = S(KM)(SB(KM))
 = S(KM)L = λf.(λx.f(xx))(λx.f(xx))
~~~

### More

And that is how the `Y` works:

~~~ lambda
Y = S(KM)L
 = λb. (λz.b(zz)) (λz'.b(z'z'))
 = λb. (b( (λz'.b(z'z')) (λz'.b(z'z')) ))
 = λb. (b( (λz'.b(z'z')) (λz''.b(z''z'')) ))
 = λb. b b ( (λz''.b(z''z'')) (λz''.b(z''z'')) )
 = λb. b b ( (λz''.b(z''z'')) (λz'.b(z'z')) )
 = λb. b b b ( (λz'.b(z'z')) (λz''.b(z''z'')) )
 = λb. b b b b ( (λz''.b(z''z'')) (λz'.b(z'z')) )
 = λb. b b b b b ( (λz'.b(z'z')) (λz''.b(z''z'')) )
 = λb. b b b b b b ( (λz''.b(z''z'')) (λz'.b(z'z')) )
 ...
~~~


## 💉 Y & Z

We know: 

~~~ lambda
Y = λf.(λs.ss)(λx.f(xx))
Z = λf.(λs.ss)(λx.f(λz.(xx)z))
~~~

### Same

And for all combinator `F` and `X`, the `(λz. F z) X` is just equal with `F X`, this is just by the ***β-reduction***.

So: for all combinator `F`, the `(λz. F z)` is just equal with `F`. Means, `λx.f(λz.(xx)z)` just same as `λx.f(xx)`.

So we can know that, a `Z` is just a `Y`.

### Diff

**But**, if your compute system is not like the form system of *lambda-calculus*, you may need to use `Z` not `Y`. That's because even they are same thing in *lambda-calculus*, they're also able to use for declare different behavior in other system and that's only need there shall have different behavior between `xx` and `λz.(xx)z` in that compute system.

That's why there's also a `Z`, not only a `Y`, or things won't be enough.

Such as `λz.(xx)z` is just means a value, but `xx` means make a *evaluate* in time and immediately. You can found such design of these behaviors in most of computer programming languages.

- Such as `(x) (x)` in *JS* means there will make a evaluate in time so the `Y` must make a *stack overflow* error. Here, you must replace the `(x) (x)` with a `z => (x) (x) (z)` namely that means replace `Y` with `Z`.
- But a same `(x) (x)` in *Lua* can just means a value until it need be evaluated, so even the `(function (x) return (x) (x) end) (function (x) return (x) (x) end)` also won't make any error. And if you want to told the computer it should be evaluate in time in *Lua*, you just write a `((x) (x))` then it will evaluated immediately, so you can just write a `(function (x) return ((x) (x)) end) (function (x) return ((x) (x)) end)` to *Lua* to get a *stack overflow* error.

## 🌋 And

### *SK*

The simplest fixed-point combinator in the SK-calculus (found by [John Tromp](https://en.wikipedia.org/wiki/John_Tromp 'John Tromp is a Dutch computer scientist. He formerly worked for Dutch Centre for Mathematics and Computer Science. Tromp discovered the number of legal states of the board game Go, and co-authored with Bill Taylor the Tromp-Taylor Rules, which they call "the logical rules of Go". He is also known for Binary combinatory logic (Binary lambda calculus).')) and its corresponds to the lambda expression is: 

~~~ ml
Y' = SSK(S(K(SS(S(SSK))))K)
Y' = (λab.aba) (λab.a(bab))
~~~

Provings: 

~~~ ml
Y' = SSK(S(K(SS(S(SSK))))K)

S = λabc.ac(bc)
K = λab.a

SS 
 = (λabc.ac(bc)) (λa'b'c'.a'c'(b'c'))
 = (λbc.(λa'b'c'.a'c'(b'c'))c(bc))
 = (λbc.(λc'.cc'((bc)c')))
 = (λabc.bc(abc))

SSK 
 = (λabc.bc(abc)) (λa'b'.a')
 = (λbc.bc((λa'b'.a')bc))
 = (λbc.bc(b))
 = (λab.aba)

SSK 
 = (λabc.ac(bc)) (λabc.ac(bc)) (λab.a)
 = (λabc.ac(bc)) (λa'b'c'.a'c'(b'c')) (λa''b''.a'')
 = (λc.(λa'b'c'.a'c'(b'c'))c((λa''b''.a'')c))
 = (λc.(λb'c'.cc'(b'c'))(λb''.c))
 = (λc.(λc'.cc'((λb''.c)c')))
 = (λc.(λc'.cc'c))
 = (λab.aba)

S(SSK) 
 = (λabc.ac(bc)) (λa'b'.a'b'a')
 = (λbc.(λa'b'.a'b'a')c(bc))
 = (λbc.(λb'.cb'c)(bc))
 = (λbc.(c(bc)c))
 = (λab.b(ab)b)

SS(S(SSK)) 
 = (λabc.bc(abc)) (λa'b'.b'(a'b')b')
 = (λbc.bc((λa'b'.b'(a'b')b')bc))
 = (λbc.bc((c(bc)c)))
 = (λab.ab(b(ab)b))

K(SS(S(SSK))) 
 = (λa'b'.a') (λab.ab(b(ab)b))
 = (λb'.(λab.ab(b(ab)b)))
 = (λa.(λbc.bc(c(bc)c)))
 = (λabc.bc(c(bc)c))

S(K(SS(S(SSK)))) 
 = (λabc.ac(bc)) (λa'b'c'.b'c'(c'(b'c')c'))
 = (λbc.(λa'b'c'.b'c'(c'(b'c')c'))c(bc))
 = (λbc.(λc'.(bc)c'(c'((bc)c')c')))
 = (λab.λc.(ab)c(c((ab)c)c))
 = (λabc.abc(c(abc)c))

S(K(SS(S(SSK))))K 
 = (λabc.abc(c(abc)c)) (λa'b'.a')
 = (λbc.(λa'b'.a')bc(c((λa'b'.a')bc)c))
 = (λbc.b(c(b)c))
 = (λab.a(bab))

SSK(S(K(SS(S(SSK))))K) 
 = (λa'b'.a'b'a') (λab.a(bab))
 = (λb'.(λab.a(bab))b'(λab.a(bab)))
 = (λb'.(λb.b'(bb'b))(λab.a(bab)))
 = (λb'.(b'((λab.a(bab))b'(λab.a(bab)))))
 = (λb'.(b'((λb.b'(bb'b))(λab.a(bab)))))
 = (λb'.(b'((b'((λab.a(bab))b'(λab.a(bab)))))))
 = (λb'.(b'(b'((λab.a(bab))b'(λab.a(bab))))))
 = (λb'.(b'(b'(b'((λab.a(bab))b'(λab.a(bab)))))))
 = (λb'.(b'(b'(b'(b'((λab.a(bab))b'(λab.a(bab))))))))
 = ...
 = (λa'b'.a'b'a') (λab.a(bab))
 = (λab.aba) (λab.a(bab))

Y' = SSK(S(K(SS(S(SSK))))K) = (λab.aba) (λab.a(bab))
~~~

### *Turing fixed-point combinator*

~~~ ml
Θ = (λab.b(aab)) (λab.b(aab)) = (λx.xx) (λab.b(aab))
~~~

~~~ ml
Θ = (λab.b(aab)) (λab.b(aab)) = (λx.xx) (λab.b(aab))

(λab.b(aab)) (λab.b(aab)) 
 = (λa''b''.b''(a''a''b'')) (λab.b(aab))
 = (λb''.b''((λa'b'.b'(a'a'b'))(λab.b(aab))b''))
 = (λb''.b''((λb'.b'((λab.b(aab))(λab.b(aab))b'))b''))
 = (λb'''.b'''((λb''.b''((λa'b'.b'(a'a'b'))(λab.b(aab))b''))b'''))
 = (λb'''.b'''((λb''.b''((λb'.b'((λab.b(aab))(λab.b(aab))b'))b''))b'''))
 = (λb'''.b'''((b'''((λb'.b'((λab.b(aab))(λab.b(aab))b'))b'''))))
 = (λb'''.b'''((b'''((b'''((λab.b(aab))(λab.b(aab))b'''))))))
 = (λb'''.b'''(b'''(b'''((λab.b(aab))(λab.b(aab))b'''))))
 = (λt.t(t(t((λab.b(aab))(λab.b(aab))t))))
 = (λt.t(t(t(t((λab.b(aab))(λab.b(aab))t)))))
 = (λt.t(t(t(t(t((λab.b(aab))(λab.b(aab))t))))))
 = (λt.t(t(t(t(t(t((λab.b(aab))(λab.b(aab))t)))))))
 = (λt.t(t(t(t(t(t(Θt)))))))
 = (λt.t(t(t(t(t(t(t(Θt))))))))
 = ...

Θt = t(Θt)
~~~

~~~ ml
A' = λz.Az
A' a 
 = (λz.Az) a
 = A a

λz.Az 
 = A'
 = A

Θ 
 = (λx.xx) (λab.b(aab))
 = (λx.xx) (λab.b(λz.aabz))
~~~

### *Another type of 'Z'*

~~~ ml
Z  = λf.(λs.ss)(λx.f(λz.(xx)z))
Z' = λf.(λs.ss)(λx.λz.f((xx)z))
~~~

`Z` is simply equal to `Y`: 

~~~ ml
A' = λz.Az
A' a 
 = (λz.Az) a
 = A a

λz.Az 
 = A'
 = A

Z 
 = λf.(λs.ss)(λx.f(λz.(xx)z))
 = λf.(λs.ss)(λx.f(xx))
 = Y
~~~

`Z'`: 

~~~ ml
Z' 
 = λf.(λs.ss)(λx.λz.f((xx)z))
 = λf.(λxz.f((xx)z))(λxz.f((xx)z))

Z' f 
 = (λf.(λxz.f((xx)z))(λxz.f((xx)z))) f
 = (λxz.f((xx)z)) (λxz.f((xx)z))

Z' 
 = λf.(λxz.f((xx)z))(λxz.f((xx)z))
 = λf.(λz'.f(((λxz.f((xx)z))(λxz.f((xx)z)))z'))
 = λfg.f(((λxz.f((xx)z)) (λxz.f((xx)z)))g)
 = λfg.f((Z' f)g)
 = λfg.f(Z'fg)
 = λfg.f((λf'g'.f'(Z'f'g'))fg)
 = λfg.f(f(Z'fg))
 = λfg.f(f(f(Z'fg)))
 = λfg.f(f(f(f(Z'fg))))
 = ...

Z' a b 
 = (λfg.f(Z'fg)) a b
 = (a (Z' a b))
 = (a (a (Z' a b)))
 = (a (a (a (Z' a b))))
 = ...

Z' a b = (a (Z' a b))
~~~



## 🌠 Also

- <sup>([BCL](https://en.wikipedia.org/wiki/Binary_combinatory_logic "Binary combinatory logic"))</sup> Binary combinatory logic
- <sup>([IAJ](https://en.wikipedia.org/wiki/Iota_and_Jot "Iota and Jot"))</sup> Iota and Jot
- <sup>([SKI](https://en.wikipedia.org/wiki/SKI_combinator_calculus "SKI combinator calculus"))</sup> SKI combinator calculus
- <sup>([UNL](https://en.wikipedia.org/wiki/Unlambda "Unlambda"))</sup> Unlambda
- <sup>([LZK](https://tromp.github.io/cl/lazy-k.html "Lazy-K"))</sup> Lazy-K
- <sup>([TCP](https://esolangs.org/wiki/S_and_K_Turing-completeness_proof "S and K Turing-completeness proof"))</sup> S and K Turing-completeness proof

