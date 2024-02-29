
# Let's See what the Lambda Calculus is ☄️

It's really not a complex thing. *Let's just start it with a specific code style. 🌝*

## Currying

So, what is currying ?

### 🎨 Simple

*You can take the currying just a specific style at the beginning. 🙃*

If we need an `add` function, you might: 

~~~ julia
add = (x, y) -> x + y
~~~

That maskes you can call like 

~~~ julia
add(1,2)
~~~

to get a `3` .

**Now, we need to start our changing.**

This is your `add` in our new type: 

~~~ julia
add = x -> y -> x + y
~~~

It's equal as: 

~~~ julia
add = x -> ( y -> x + y )
add = x -> ( y -> (x + y) )
~~~

And the calling for it should like: 

~~~ julia
add(1)(2)
~~~

Also got a `3` !

**And with this style you can also do something like:** 

~~~ julia
add_three = add(3)
add_three(4) # ~> 7
add_three(5) # ~> 8
~~~

**Here, the `add(3)` just like to create a object (names *closure*), and it can be called, same as a function.** *(In some language, all function is just a closure.)*

**And, that `add_three = add(3)` is just same like this:** 

~~~ julia
add_three = y -> 3 + y
~~~

**or `add_three = x -> 3 + x` or `add_three = z -> 3 + z` or `add_three = foozzfii -> 3 + foozzfii`, etc ... they all same thing.**

*(They're all Julia codes, you can just test them on [this Julia web repl](https://keno.github.io/julia-wasm/website/repl.htm). ✨)*

OK, that's all. You've already touch all the points of *Lambda Calculus*. Funny? *Let me tell you what you just touched. 🌜*


### 🏹 Lambda Calculus

*I'll tell you three point of the convert or equivalence in lambda calculus (or maybe more) by just introduce some **lexical closure** examples also. 🧪*

[Reduction | Lambda Calculus | Wiki]: https://en.wikipedia.org/wiki/Lambda_calculus#Reduction "Reduction | Lambda Calculus | Wikipedia"

#### *0*

In: 

~~~ julia
add = x -> y -> x + y
~~~

1. For closure `y -> x + y`, the `y` which at right hand of `+` is a kind of *bound variables* , because there is a `y` at left hand of this closure's `->`.
2. For closure `y -> x + y`, the `x` which at left hand of `+` is a kind of *free variables* , because there is not a `x` at left hand of this closure's `->`.
3. So, how can the interpreter knows what is the `x` ? That depends on what `x` is at the place where this `y -> x + y` being.
4. So ... Here, `y -> x + y` is the return value of `x -> y -> x + y`, so, what the `x` right side of `->` in `x -> x` will be, that the `x` right side of the first `->` in `x -> y -> x + y` will be.


#### *1*

**That means, for `add = x -> y -> x + y`, a** 

~~~ julia
add_one = add(1)
~~~

**is same as a** 

~~~ julia
add_one = y -> 1 + y
~~~

*That's what a closure's definition does which more than only a function's*, and, that is what the ***η-reduction*** (or *η-equivalence*) in [*Lambda Calculus*][Reduction | Lambda Calculus | Wiki] is: 

> ***η-reduction**: which captures a notion of extensionality*

#### *2*

Also, for 

~~~ julia
pipe = x -> f -> f(x)
~~~

a 

~~~ julia
pipe_four = pipe(4)
~~~

is equal with a 

~~~ julia
pipe_four = f -> f(4)
~~~

#### *3*

That's why 

~~~ julia
pipe(4)(add(1))
~~~

is same as 

~~~ julia
( f -> f(4) )( x -> 1 + x )
~~~

means 

~~~ julia
pipe_four(add_one)
~~~

result should be: 

~~~ julia
( f -> f(4) )( x -> 1 + x )
( x -> 1 + x )(4)
1 + 4
~~~

means `5`.

#### *4*

And this steps 

~~~ julia
( f -> f(4) )( x -> 1 + x )
( x -> 1 + x )(4)
1 + 4
~~~

It's the steps which called ***β-reduction*** in [*Lambda Calculus*][Reduction | Lambda Calculus | Wiki]: 

> ***β-reduction**: applying functions to their arguments*

#### *5*

And, clearly, they are both equal things: 

~~~ julia
( f -> f(4) )( x -> 1 + x )
( x -> x(4) )( y -> 1 + y )
( j -> j(4) )( a -> 1 + a )
( k -> k(4) )( i -> 1 + i )
~~~

And that's the steps called ***α-conversion*** in [*Lambda Calculus*][Reduction | Lambda Calculus | Wiki]: 

> ***α-conversion**: changing bound variables*

#### *6*

And, if there is a *type system* in that language, for this 

~~~ julia
( f -> f(4) )( x -> 1 + x )
~~~

The type of `x -> 1 + x` should be evaluate automatically.

Because of the `f` is already applies on `f(4)` in the `f -> f(4)`.

The type of `f` left hand of `->` in `f -> f(4)` can be ensure by that `f` at `f(4)` which is right hand of `->`, cause `4` is just a number, it makes that `f`'s argument's type must be a number.

#### *7*

All we've writed is not like something kind of a `a -> a b`, they all just like the `a -> b -> a b`.

For **only** a `b -> b a`, it is a *lambda*, but it has one *unbound variable* `a` there (or called *free variable* also).

But for the `a -> b -> b a`, it is a *lambda* also, but all variables for it are *bound variables*. In that case, we call it a *Combinator*.

Examples: 

- `a -> a` **is** a *Combinator*
- `a -> a b` is **not** a *Combinator*
- `a -> b -> a b` **is** a *Combinator*
- `a -> b -> a` **is** a *Combinator*
- `b -> a` is **not** a *Combinator*
- `a -> b -> c -> c (x -> a)` **is** a *Combinator*
- `a -> b -> c -> c (x -> y)` is **not** a *Combinator*

*Done. 🌚*


## Syntaxes Ref

Here are something about the relationship of syntaxes between *lambda calculate*, *Julia*, *ES6*, *Python*, and *OCaml*.

| row | lambda calculate | Julia | ES6 | Python | OCaml |
| --- | ---------------- | ----- | --- | ------ | ----- |
|  1  | `λa.a` or `λx.x` | `a -> a` or `x -> x` | `a => a` or `x => x` | `lambda a: a` or `lambda x: x` | `fun a -> a` or `fun x -> x` |
|  2  | `λxy.x` or `λx.λy.x` or `λx.(λy.x)` | `x -> y -> x` or `x -> (y -> x)` | `x => y => x` or `x => (y => x)` | `lambda x: lambda y: x` or `lambda x: (lambda y: x)` | `fun x y -> x` or `fun x -> fun y -> x` or `fun x -> (fun y -> x)` |
|  3  | `λxf.fx` or `λxf.f x` or `λxf.(f x)` or `λx.λf.fx` means `λx.(λf.fx)` | `x -> f -> f(x)` or `x -> f -> (f)(x)` means `x -> (f -> f(x))` | `x => f => f(x)` or `x => f => (f) (x)` means `x => (f => f(x))` | `lambda x: lambda f: f(x)` or `lambda x: lambda f: (f) (x)` means `lambda x: (lambda f: f(x))` | `fun x f -> f x` or `fun x -> fun f -> f x` or `fun x -> fun f -> (f) (x)` means `fun x -> (fun f -> (f) (x))` |
|  4  | `λfgx.f(gx)` or `λf.λg.λx.f(gx)` same as `λf.(λg.(λx.( (f) ((g) (x)) )))` | `f -> g -> x -> (f)((g)(x))` same as `f -> (g -> (x -> ( (f)((g)(x)) )))` | `f => g => x => (f) ((g) (x))` same as `f => (g => (x => ( (f) ((g) (x)) )))` | `lambda f: lambda g: lambda x: (f) ((g) (x))` same as `lambda f: (lambda g: (lambda x: ( (f) ((g) (x)) )))` | `fun f g x -> f (g x)` or `fun f -> fun g -> fun x -> f (g x)` same as `fun f -> (fun g -> (fun x -> ( (f) ((g) (x)) )))` |
|  5  | `λabf.fab` or `λa.λb.λf.(fa)b` same as `λa.(λb.(λf.( ((f) (a)) (b) )))` | `a -> b -> f -> (f)(a)(b)` same as `a -> (b -> (f -> ( ((f)(a))(b) )))` | `a => b => f => (f) (a) (b)` same as `a => (b => (f => ( ((f) (a)) (b) )))` | `lambda a: lambda b: lambda f: (f) (a) (b)` same as `lambda a: (lambda b: (lambda f: ( ((f) (a)) (b) )))` | `fun a b f -> f a b` or `fun a -> fun b -> fun f -> (f a) b` same as `fun a -> (fun b -> (fun f -> ( ((f) (a)) (b) )))` |



## Combinatory Logic

*Oh did me just mention about **Combinators** ? There is something more funny ! 🌛*

This is something kind of *Lambda Calculus* called [*Combinatory Logic*](https://en.wikipedia.org/wiki/Combinatory_logic).

### 🛶 *To Mock a Mockingbird*

This is a book by *Raymond Merrill Smullyan*. He and the *Haskell Brooks Curry* both hobby on birds-watching, and in this book, all *Combinators* are analogies as *Birds*.

### 🕊️ Birds

| Bird Name | Bird Symbol | Lambda Syntax | OCaml Syntax | ES6 Syntax |
| --------- | ----------- | ------------- | ------------ | ---------- |
| *Identity Bird (aka Idiot)* | `I` | `λa.a` | `fun x -> x` | `x => x` |
| *Mockingbird* | `M` | `λa.aa` | `fun x -> x x` | `x => x (x)` |
| *Kestrel (True)* | `K` | `λab.a` | `fun x y -> x` | `x => y => x` |
| *Kite (False)* | `KI` | `λab.b` | `fun x y -> y` | `x => y => y` |
| *Thrush* | `T` | `λab.ba` | `fun x f -> f x` | `x => f => f (x)` |
| *Starling* | `S` | `λabc.(ac)(bc)` | `fun a b c -> a c (b c)` | `a => b => c => a (c) (b (c))` |

The `K` can used as `true` in *Lambda Calculus*, and the `false` is `KI` which can just got by `K I`: 

~~~ lambda
KI = (λxy.y) ;
K I = (λxy.x) (λa.a)
    = (λx.λy.x) (λa.a)
    = (λy.λa.a)
    = (λx.λy.y)
    = (λxy.y) = KI .
~~~

And, all things can be described by just using `S` `K` `I` those three combinators ... or just use `S` and `K` cause `I` is just `SKK` means `(((S)(K))(K))`.

This is a full (maybe) table about that from [a website](https://www.angelfire.com/tx4/cus/combinator/birds.html): 

| Bird | Symbol | Function Abstraction | Combinator | SK Combinator |
| ---- | ------ | -------------------- | ---------- | ------------- |
| *Bluebird* | `B` | `λabc.a(bc)` | `S(KS)K` | `((S(KS))K)` |
| *Blackbird* | `B1` | `λabcd.a(bcd)` | `BBB` | `((S(K((S(KS))K)))((S(KS))K))` |
| *Bunting* | `B2` | `λabcde.a(bcde)` | `B(BBB)B` | `((S(K((S(K((S(KS))K)))((S(KS))K))))((S(KS))K))` |
| *Becard* | `B3` | `λabcd.a(b(cd))` | `B(BB)B` | `((S(K((S(K((S(KS))K)))((S(KS))K))))((S(KS))K))` |
| *Cardinal* | `C` | `λabc.acb` | `S(BBS)(KK)` | `((S((S(K((S(KS))K)))S))(KK))` |
| *Dove* | `D` | `λabcd.ab(cd)` | `BB` | `(S(K((S(KS))K)))` |
| *Dickcissel* | `D1` | `λabcde.abc(de)` | `B(BB)` | `(S(K(S(K((S(KS))K)))))` |
| *Dovekies* | `D2` | `λabcde.a(bc)(de)` | `BB(BB)` | `((S(K((S(KS))K)))(S(K((S(KS))K))))` |
| *Eagle* | `E` | `λabcde.ab(cde)` | `B(BBB)` | `(S(K((S(K((S(KS))K)))((S(KS))K))))` |
| *Bald Eagle* | `Ê` | `λabcdefg.a(bcd)(efg)` | `B(BBB)(B(BBB))` | `((S(K((S(K((S(KS))K)))((S(KS))K))))(S(K((S(K((S(KS))K)))((S(KS))K)))))` |
| *Finch* | `F` | `λabc.cba` | `ETTET` | `((S(K((S((SK)K))(K((S(K(S((SK)K))))K)))))((S(K((S(K((S(KS))K)))((S(KS))K))))((S(K(S((SK)K))))K)))` |
| *Goldfinch* | `G` | `λabcd.ad(bc)` | `BBC` | `((S(K((S(KS))K)))((S((S(K((S(KS))K)))S))(KK)))` |
| *Hummingbird* | `H` | `λabc.abcb` | `BW(BC)` | `((S(K((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K)))(S(K((S((S(K((S(KS))K)))S))(KK)))))` |
| *Identity Bird (aka Idiot)* | `I` | `λa.a` | `SKK` | `((SK)K)` |
| *Jay* | `J` | `λabcd.ab(adc)` | `B(BC)(W(BC(B(BBB))))` | `((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))(K((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S(K((S(KS))K)))((S(KS))K))))))))` |
| *Kestrel (True)* | `K` | `λab.a` | `K` | `K` |
| *Lark* | `L` | `λab.a(bb)` | `CBM` | `((S((S(KS))K))(K((S((SK)K))((SK)K))))` |
| *Mockingbird* | `M` | `λa.aa` | `SII` | `((S((SK)K))((SK)K))` |
| *Double Mockingbird* | `M2` | `λab.ab(ab)` | `BM` | `(S(K((S((SK)K))((SK)K))))` |
| *Owl* | `O` | `λab.b(ab)` | `SI` | `(S((SK)K))` |
| *Queer Bird* | `Q` | `λabc.b(ac)` | `CB` | `((S(K(S((S(KS))K))))K)` |
| *Quixotic Bird* | `Q1` | `λabc.a(cb)` | `BCB` | `((S(K((S((S(K((S(KS))K)))S))(KK))))((S(KS))K))` |
| *Quizzical Bird* | `Q2` | `λabc.b(ca)` | `C(BCB)` | `((S(K(S((S(K((S((S(K((S(KS))K)))S))(KK))))((S(KS))K)))))K)` |
| *Quirky Bird* | `Q3` | `λabc.c(ab)` | `BT` | `(S(K((S(K(S((SK)K))))K)))` |
| *Quacky Bird* | `Q4` | `λabc.c(ba)` | `F*B` | `((S(K((S((S(K((S(KS))K)))S))(KK))))((S(K(S((S(K((S((S(K((S(KS))K)))S))(KK))))((S(KS))K)))))K))` |
| *Robin* | `R` | `λabc.bca` | `BBT` | `((S(K((S(KS))K)))((S(K(S((SK)K))))K))` |
| *Starling* | `S` | `λabc.ac(bc)` | `S` | `S` |
| *Thrush* | `T` | `λab.ba` | `CI` | `((S(K(S((SK)K))))K)` |
| *Turing* | `U` | `λab.b(aab)` | `LO` | `((S(K(S((SK)K))))((S((SK)K))((SK)K)))` |
| *Vireo (aka Pairing)* | `V` | `λabc.cab` | `BCT` | `((S(K((S((S(K((S(KS))K)))S))(KK))))((S(K(S((SK)K))))K))` |
| *Warbler* | `W` | `λab.abb` | `C(BMR)` | `((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K)` |
| *Converse Warbler* | `W1` | `λab.baa` | `CW` | `((S(K(S((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K))))K)` |
| *Why Bird (aka Sage Bird)* | `Y` | `λa.a(λa)` | `SLL` | `(((SS)K)((S(K((SS)(S((SS)K)))))K))` |
| *Identity Bird Once Removed* | `I*` | `λab.ab` | `S(SK)` | `(S(SK))` |
| *Warbler Once Removed* | `W*` | `λabc.abcc` | `BW` | `(S(K((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K)))` |
| *Cardinal Once Removed* | `C*` | `λabcd.abdc` | `BC` | `(S(K((S((S(K((S(KS))K)))S))(KK))))` |
| *Robin Once Removed* | `R*` | `λabcd.acdb` | `C*C*` | `((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK)))))` |
| *Finch Once Removed* | `F*` | `λabcd.adcb` | `BC*R*` | `((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK))))))` |
| *Vireo Once Removed* | `V*` | `λabcd.acbd` | `C*F*` | `((S(K((S((S(K((S(KS))K)))S))(KK))))((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK)))))))` |
| *Identity Bird Twice Removed* | `I**` | `λabc.abc` | ` ` | ` ` |
| *Warbler Twice Removed* | `W**` | `λabcd.abcdd` | `B(BW)` | `(S(K(S(K((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K)))))` |
| *Cardinal Twice Removed* | `C**` | `λabcde.abced` | `BC*` | `(S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))` |
| *Robin Twice Removed* | `R**` | `λabcde.abdec` | `BR*` | `(S(K((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK)))))))` |
| *Finch Twice Removed* | `F**` | `λabcde.abedc` | `BF*` | `(S(K((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK))))))))` |
| *Vireo Twice Removed* | `V**` | `λabcde.abecd` | `BV*` | `(S(K((S(K((S((S(K((S(KS))K)))S))(KK))))((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK)))))))))` |
| *Kite (False)* | `KI` | `λab.b` | `KI` | `(K((SK)K))` |
| *Omega* | `Ω` | `λ` | `MM` | `(((S((SK)K))((SK)K))((S((SK)K))((SK)K)))` |
| *Konstant Mocker* | `KM` | `λab.bb` | `KM` | `(K((S((SK)K))((SK)K)))` |
| *Crossed Konstant Mocker* | `C(KM)` | `λab.aa` | `C(KM)` | `((S(K(S(K((S((SK)K))((SK)K))))))K)` |
| *Theta* | `Θ` | `λ` | `YO` | `(((SS)K)((S(K((SS)(S((SS)K)))))K)(S((SK)K)))` |

And here is a [*SK Compiler*](https://crypto.stanford.edu/~blynn/lambda/sk.html) and [*Some Other Compiler*](https://crypto.stanford.edu/~blynn/lambda/logski.html).

And ...

> If we can replace all code by functions, Replace all functions by combinators, And replace all combinators by S and K ;
> 
> Then we can replace all code by S and K.
> 

> 如果我们能用函数替换所有代码、用组合子取代所有函数、再用 S 和 K 替换所有组合子 ——
> 
> 那么我们就可以用 S 和 K 替换所有代码。
> 

*Cool hugh ? 🌞*

Here's more details about [*combinatory logic*](https://ncatlab.org/nlab/show/combinatory+logic) and [*partial combinatory algebra*](https://ncatlab.org/nlab/show/partial+combinatory+algebra), and something about [*fixed-point combinator*](https://ncatlab.org/nlab/show/fixed-point+combinator#combinatory_logic) you might interested in which with its combinatory logic. *(Well, I just found those links by [this question and its answer](https://math.stackexchange.com/questions/4330664/is-sk-s-i-iss-k-ssk-kik-s-i-i-really-a-fixed-point-combinato). You can also see my [doc](../fixed-point-things) about those 🙃)*


### 🪐 More

(some links for some notes about combinators in future ...)








