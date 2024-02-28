<sup><sub>An answer from *[stackoverflow](https://stackoverflow.com/questions/9458271/currying-decorator-in-python/78025654#78025654)*: <sub/><sup/>

This is my *lambda styled* code (and its refs): 

~~~ py
# ref: https://rosettacode.org/wiki/Y_combinator#Python
fixedpoint = lambda f: (lambda x: x(x)) (lambda y: f(lambda *args: y (y) (*args))) ;

# ref: https://python-course.eu/advanced-python/currying-in-python.php#Decorator-for-currying
curry = lambda func: fixedpoint (lambda curried: 
	lambda *args: (lambda x: curried (* (args + (x,)))) if 
	(len (args) != func.__code__.co_argcount) else 
	func (*args)) ;

# license: gpl-2.0. if you have better ideas show them plz ...
~~~

Uses: 

~~~ py
# e.g. def
@curry
def prod3 (x, y, z):
	return x + y + z

print (prod3 (3) (4) (5)) # 12

# e.g. lambda
prod_3 = curry (lambda x,y,z: x + y + z)
print (prod_3 (6) (7) (8)) # 21
~~~

The function while call `curry (f)` returns, will pick args one-by-one until the coumt of them equal with the function `f` which be given to the calling `curry (f)`, then that `f` can be call by those rgs we've just picked.

You can try them on *[shinylive](https://shinylive.io/py/editor/#code=NobwRAdghgtgpmAXGKAHVA6VBPMAaMAYwHsIAXOcpMAYgAIAnOAM0ToAsyzUBnRAen4NiPOFygkAJnAzEGAc34B3AJYBrFfwCaAfRIwARiuhk5NAArYy7UgB0IzFQA84k1MWNk6AXjoAbWANJKDpWOgAKAMNguic2J3CnAEokiKigkOw2ZkjAmIAqKAU+OmwI7FTwwuKU1IBue3t6JjDObj5BHGtSAFoSAFcGUQw4fv4oSQA3KAhCVx6umwh+QkGGbGN5HuMFqyWsdlQaABE4EgYoUwYe5jk+tY2IeXtVhnWffzyQ5n7Z7OdXO5PGkvnRXgwVK42I0yOkCkV5CVctEQnEwWtIZIIvkIgieHQANQRJx4WqpFTMOgwyKUXE1OgAQl8P1mGB0emI0nZGBIOgRA3IqTgflEVIgtjILMI2LxKToDXFEHofhUcwgojY8lQfh6ACYMAAGDB0CmlYj9DhQSZwOgGMQUBgm6RQfE8GxKOjWOAwOjagBedAwQcaSroMnkxukzHsAAFwdh7FHfcJJABmYl4UqZv1JRAwphkQYQWKE0qlv0h1AQ8gRKuc9PhVOVAAslQArHL6ABGXUh+jh41wqD2OuSHTp3zxkEo2J4bB4P3xUtlIk5kfVrzhUfjiIANkqAHZKgAOTt0XVdkNgAC+AF0gA)* or *[RustPython Demo](https://rustpython.github.io/demo/)*. Enjoy it 🫡.

----

Or you can use *[toolz](https://toolz.readthedocs.io/ "Toolz is pure Python; Toolz relies only on the standard library; Toolz simultaneously supports Python versions 3.4+ and PyPy !!")* by [`pip install toolz`](https://pypi.org/project/toolz/ "A set of utility functions for iterators, functions, and dictionaries.") or [`pip install cytoolz`](https://pypi.org/project/cytoolz/ "Cython implementation of the toolz package, which provides high performance utility functions for iterables, functions, and dictionaries.") if you use the *cython*. They have things about currying. Repo: [`pytoolz/toolz`](https://github.com/pytoolz/toolz.git "A functional standard library for Python.") [`pytoolz/cytoolz`](https://github.com/pytoolz/cytoolz.git "Cython implementation of Toolz: High performance functional utilities")
