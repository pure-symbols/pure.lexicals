
We know: 

~~~ lambda
Y = λf.(λs.ss)(λx.f(xx))
Z = λf.(λs.ss)(λx.f(λz.(xx)z))
~~~

And for all combinator `F` and `X`, the `(λz. F z) X` is just equal with `F X`, this is just by the ***β-reduction***.

So: for all combinator `F`, the `(λz. F z)` is just equal with `F`. Means, `λx.f(λz.(xx)z)` just same as `λx.f(xx)`.

So we can know that, a `Z` is just a `Y`.
