
## Args

式

~~~ sh
[<named-arg-one>=<its-value>] [<named-arg-two>=<another-value>] [...] <your-func> [<value-of-anonymous-arg-one>] [<value-of-anonymous-arg-two>] [...]
~~~

简曰可：

~~~~
名参在前 调者中 匿名参在后
~~~~

下有例。

### Named Args

For Define

~~~ sh
yourfunc () 
(
	#: named arg using demo
	echo "$a_specify" && 
	ls "$p_specify" && 
	: )
~~~

You can Give args like that

~~~ sh
a_specify='AKA ~~~' p_specify=~ yourfunc
~~~

### Anonymous Args

For Define

~~~ sh
yourfunc () 
(
	#: anonymous arg using demo
	echo "$1" && 
	ls "$2" && 
	#: drop first 2 anonymous arg
	shift 2 && 
	#: then using the rests of anonymous args
	#:  to some fun (here using echo)
	echo "$@" && 
	: )
~~~

You can Give args like that

~~~ sh
yourfunc a ~ 'ccc' "$HOME"
~~~

### Named and Anonymous Args

For Define

~~~ sh
yourfunc () 
(
	#: anonymous arg using
	echo "$1" && 
	#: named arg using
	ls -l -a -- "$a" && 
	: )
~~~

You can Give args like that

~~~ sh
a=~ yourfunc "Things under $HOME"
~~~




