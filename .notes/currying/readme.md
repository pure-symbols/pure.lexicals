
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

## Official

Here are something about the relationship of syntaxes between *lambda calculate*, *Julia*, *ES6*, *Python*, and *OCaml*.

| row | lambda calculate | Julia | ES6 | Python | OCaml |
| --- | ---------------- | ----- | --- | ------ | ----- |
|  1  | `λa.a` or `λx.x` | `a -> a` or `x -> x` | `a => a` or `x => x` | `lambda a: a` or `lambda x: x` | `fun a -> a` or `fun x -> x` |
|  2  | `λxy.x` or `λx.λy.x` | `x -> y -> x` | `x => y => x` | `lambda x: lambda y: x` | `fun x y -> x` or `fun x -> fun y -> x` |
|  2  | `λxf.fx` or `λxf.f x` or `λxf.(f x)` or `λx.λf.fx` | `x -> f -> f(x)` | `x => f => f(x)` or `x => f => (f) (x)` | `lambda x: lambda f: f(x)` or `lambda x: lambda f: (f) (x)` | `fun x f -> f x` or `fun x -> fun f -> f x` or `fun x -> fun f -> (f) (x)` |







