
We have:

~~~ lambda
S = λabc.ac(bc)
K = λab.a = λxy.x
I = λa.a
~~~

So: 

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



