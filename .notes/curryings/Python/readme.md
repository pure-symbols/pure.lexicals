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

Tested on *[RustPython Demo](https://rustpython.github.io/demo/)*. Enjoy it 🫡.

----

Or you can use *[toolz](https://toolz.readthedocs.io/ "Toolz is pure Python; Toolz relies only on the standard library; Toolz simultaneously supports Python versions 3.4+ and PyPy !!")* by [`pip install toolz`](https://pypi.org/project/toolz/ "A set of utility functions for iterators, functions, and dictionaries.") or [`pip install cytoolz`](https://pypi.org/project/cytoolz/ "Cython implementation of the toolz package, which provides high performance utility functions for iterables, functions, and dictionaries.") if you use the *cython*. They have things about currying. Repo: [`pytoolz/toolz`](https://github.com/pytoolz/toolz.git "A functional standard library for Python.") [`pytoolz/cytoolz`](https://github.com/pytoolz/cytoolz.git "Cython implementation of Toolz: High performance functional utilities")
