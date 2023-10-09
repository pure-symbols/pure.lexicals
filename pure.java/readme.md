[play]: https://dev.java/playground/

*All codes tested on [this playground][play].*

## Diffs

There will be something defferect in *Java*.

### *Closures*

We mock a closure with method inner an *Anonymous Sub-Class*.

#### What we cannot

In Java you can't write a value like that: 

~~~ java
<A> Function<A, A> idiot = a -> a ; /// err
var idiot = (<A> Function<A, A>) (a -> a) ; /// err
~~~

You can just: 

~~~ java
<A> A idiot (A a) { return a ; }

/// or
final var birds = 
new Object() 
{
    <A> A idiot (A a) { return a ; }
} ;

birds.idiot(7) ; // 7
~~~

#### So what we can

The generic just allowed at method but not a lambda.

So, we can just let the method be a value !!

Like these: 

##### *For normal way*

we define: 

~~~ java
final var things = 
new Object() 
{
	Integer a = 7 ;
	String b = "bzzzz" ;
	<A> Function<A,A> idi = (<A> Function<A,A>) (a -> a) ;
} ;
~~~

and want: 

~~~ java
things.a ; // 7
things.b ; // "bzzzz"
things.idi.apply(things.a) ; // 7
things.idi.apply(things.b) ; // "bzzzz"
~~~

but we cannot, because the `<A> Function<A,A> idi = (Function<A,A>) (a -> a) ;` is unsupported in Java (yet now), it will give error because of this line.

But we can do things like that now: *all method just use to return a value*.

Like that: 

##### *Our new way here*

~~~ java
final var things = 
new Object() 
{
	Integer a () { return 7 ;}
	String b () { return "bzzzz" ;}
	<A> Function<A,A> idi () { return (Function<A,A>) (a -> a) ;}
} ;
~~~

 And then so we can use:

~~~ java
things.a() ; // 7
things.b() ; // "bzzzz"
things.idi().apply(things.a()) ; // 7
things.idi().apply(things.b()) ; // "bzzzz"
~~~

*Things* is done !!

And that's all given by [*anonymous (sub)classes*](https://stackoverflow.com/questions/36799485/what-does-anonymous-subclass-mean-in-java)' supports in *Java*.

##### *(Or we can also just ...)*

~~~ java
final var things = 
new Object() 
{
	Integer a = 7 ;
	String b = "bzzzz" ;
	<A> Function<A,A> idi () { return (Function<A,A>) (a -> a) ;}
} ;

things.a ; // 7
things.b ; // "bzzzz"
things.idi().apply(things.a) ; // 7
things.idi().apply(things.b) ; // "bzzzz"
~~~

... means only lambda values into method style.

### *Namespaces*

Or called *modules*. That is simple, also a `new Object () {...}`, we have no necessary to use a *IIFE* even ...

### *Types*

I don't know how to define (or mock) a recursive type in Java yet ...



