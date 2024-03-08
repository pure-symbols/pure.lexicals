[play](https://shinylive.io/r/editor/#code=NobwRAdghgtgpmAXGAxgVwE4YJ4DoNgA0qA9hAC5wVJgBmAlgB5wAmADifRQAQC83AHQHcAFLQCUooaMaSRsmeIEQB5OdJHY5EqcJG4DcraOP7D4yQG5ly9Fmx9Be2mggpJDZu048RGuxj0rJI25BoGuJL0tKIARlAAznCIiAA2VADm5AAWcYnJafQJ5KIRFtwAhPzxSSnpEFm5IjUFtCQYMFCpCaIubhYhKmHkfnoKAUEs3AA+AHzcLSksJLgoXal5tYXFpYYz84uIKIrlcN1wgkOqYq7uu5FWNhAAxADk3AACcIywbOkJyjelyBLDgDAgFwABlAoPFHAEHKMZIRuNgUQAvSSMbgAWlRuO4mMhgPeOSo3Awrm40NhUFEAEY5AAmOQAZnEkO4AHd6KkNhk4CVIcB6QBdXEAFmJL3eTxhcP4CN0yNRGKxBIceMxynldJEjNELNE7O4z24IvFOIlyjAAF9RUA)

<sup><sub>Translate from *[the python code](../Python)*: <sub/><sup/>

原理就是：不停地单个单个地接收参数，直到接收到的参数个数和被柯里化函数的参数个数一致。

不像 [不动点组合子的实现](../../fixedpoints/R) 几乎没有用到语言本身特异性的部分而仅仅使用了词法闭包的特性，此处的实现用到了语言特异性的部分，比如参数拼接、元组、内省等这些功能，这是并不一定在其它语言里提供的东西，尤其是如果你（也像我一样）把 Lambda 演算视为「计算」这件事的真正基本部分的话。而这些特异性的部分，在此处的 R 实现中，大都被通过 `::` 运算符从其所在命名空间取得，即便这个命名空间是 `base` 。最初我只是为了尽可能地减少代码被隐式注入一些什么的机会，但我发现，这样一来，有没有 `::` 就几乎成为了是否为语言特异性提供的分水岭。毕竟，确实，即便是 `base` ，对于 R 来说，也并非语言的一部分，而只是**标准库中的一个**罢了。
