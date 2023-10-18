
We know: 

~~~ lambda
Y = λf.(λs.ss)(λx.f(xx))
Z = λf.(λs.ss)(λx.f(λz.(xx)z))
~~~

And for all combinator `F` and `X`, the `(λz. F z) X` is just equal with `F X`, this is just by the ***β-reduction***.

So: for all combinator `F`, the `(λz. F z)` is just equal with `F`.

So, `Z` is just a `Y`.
