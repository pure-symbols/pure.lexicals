
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







