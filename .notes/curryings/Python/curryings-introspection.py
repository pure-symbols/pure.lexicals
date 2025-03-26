
"""
introspection ver.
"""

fixedpoint = lambda f: (lambda x: x (x)) (lambda y: f(lambda *args: y (y) (*args))) ;

curry = lambda func: fixedpoint (lambda curried: 
	lambda *args: (lambda x: curried (* (args + (x,)))) if 
	(len (args) != func.__code__.co_argcount) else 
	func (*args)) ;

"""
# e.g. def
@curry
def prod3 (x, y, z):
	return x + y + z

print (prod3 (3) (4) (5)) # 12

# e.g. lambda
prod_3 = curry (lambda x,y,z: x + y + z)
print (prod_3 (6) (7) (8)) # 21
"""
