
# What

What is currying ?

## Simple

*You can take the currying just a specific style.*

If we need an `add` function, you might: 

~~~ julia
add = (x, y) -> x + y
~~~

That maskes you can 

~~~ julia
add(1,2)
~~~

to get a `3` .

**Now, you need to change.**

This is your `add` in our new type: 

~~~ julia
add = x -> y -> x + y
~~~

And the calling for it be like: 

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

**Here, the `add(3)` just like to create a object, and it can be called like a function.**

**And, that `add_three = add(3)` is just same like this:** 

~~~ julia
add_three = y -> 3 + y
~~~

**or `add_three = x -> 3 + x` or `add_three = z -> 3 + z` or `add_three = foozzfii -> 3 + foozzfii`, etc ... they all same thing.**

## More

There is a *lexical closure* feature.

In: 

~~~ julia
add = x -> y -> x + y
~~~

1. For the closure `y -> x + y`, the `y` which at right hand of `+` is a kind of *bound variables* , because there is a `y` at left hand of this closure's `->`.
2. For the closure `y -> x + y`, the `x` which at left hand of `+` is a kind of *free variables* , because there is not a `x` at left hand of this closure's `->`.
3. So, how can the interpreter knows what is the `x` ? That depends on what `x` is at the place where this `y -> x + y` being.
4. So ... Here, `y -> x + y` is the return value of `x -> y -> x + y`, so, what the `x` right side of `->` in `x -> x` will be, that the `x` right side of the first `->` in `x -> y -> x + y` will be.

**... Means, for `add = x -> y -> x + y`, a** 

~~~ julia
add_one = add(1)
~~~

**is same as a** 

~~~ julia
add_one = y -> 1 + y
~~~

That's it.

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

that's why 

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

--------

Here are something about the relationship of syntaxes between *lambda calculate*, *Julia*, *ES6*, *Python*, and *OCaml*.

| row | lambda calculate | Julia | ES6 | Python | OCaml |
| --- | ---------------- | ----- | --- | ------ | ----- |
|  1  | `λa.a` or `λx.x` | `a -> a` or `x -> x` | `a => a` or `x => x` | `lambda a: a` or `lambda x: x` | `fun a -> a` or `fun x -> x` |
|  2  | `λxy.x` or `λx.λy.x` | `x -> y -> x` | `x => y => x` | `lambda x: lambda y: x` | `fun x y -> x` or `fun x -> fun y -> x` |
|  2  | `λxf.fx` or `λxf.f x` or `λxf.(f x)` or `λx.λf.fx` | `x -> f -> f(x)` | `x => f => f(x)` or `x => f => (f) (x)` | `lambda x: lambda f: f(x)` or `lambda x: lambda f: (f) (x)` | `fun x f -> f x` or `fun x -> fun f -> f x` or `fun x -> fun f -> (f) (x)` |







