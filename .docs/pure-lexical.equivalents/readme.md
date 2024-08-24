# Pure-Lexical Equivalents

等价性 (Equivalents)。

<sup>即</sup>  

<sup>对应形式的词法闭包表示 🪒</sup>  
<sub>The Correspond Forms Indicates in Lexical Closures 🪒</sub>  

<sup>你可以简单地把这当作一个简单的对应关系手册 🙃</sup>  
<sub>You can just treat this as a simple show about the corresponds 🙃</sub>  


## *Pipe*

管道

### 🌋 Definitions

#### Depends

~~~ ts
type Fn <T, R> = (x: T) => R ;
~~~

#### Pipe

~~~ ts
type pipe = <T,> (x: T) => <R,> (f: Fn <T, R>) => R ;

const pipe: pipe = 
<T,> (x: T) => 
<R,> (f: Fn <T, R>): R => 
	
	(f) (x) ;
~~~

#### Pipeline

~~~ ts
type Pipeyard <T> = <R,> (continuation: Fn <T, R>) => Pipeyard <R> ;
type pipeline = <T,> (head: T) => Pipeyard <T> ;

const pipeline: pipeline = 
<T,> (s: T): Pipeyard <T> => 
<R,> (continuation: Fn <T, R>): Pipeyard <R> => 
	
	pipeline ((continuation) (s)) ;
~~~

~~~ ts
const Pipeyard = 
<T,> (head: T)
: Pipeyard <T> => 
	
	( <R,> (continuation: Fn <T, R>)
	: Pipeyard <R> => 
		
		pipe (continuation (head)) (Pipeyard) 
	
	) as Pipeyard <T> ;

Pipeyard.BROADCAST = 
<T,> (self: Pipeyard<T>)
: T => 
{
	let message: T = {} as T;
	self (x => message = x);
	return message ;
} ;
~~~

Function `Pipeyard` and `pipeline` are same here.

### 🥩 Equal Case

#### Function apply

~~~ ts
const add = (a) => (b) => a + b;
pipeline (7) 
	(add (3))
	(add (4))
	(console.log); //> 14

pipeline (6)
	(a => a + 1)
	(b => b * 2)
	(c => c - 3)
	(console.log); //> 11
~~~

~~~ ts
const add = (a, b) => a + b;
console.log(add(4, add(7, 3))); //> 14

{
	const a = 6;
	const b = a + 1;
	const c = b * 2;
	console.log(c - 3); //> 11
}
~~~

[*see playground*](https://www.typescriptlang.org/play/?#code/PQKhAIFgCh3CACAbAlgYwKYDsDOHwCCA4gAoAyAtAMwB0ADDHIqprvkQGIAilAjDVUbwoseMBgToMUOA5YxkgC4BPAA7454ADwAVADTgASgD5wAXnAAKAB4AucDoCU504fABuSTJIp1CqdAqfqq++Ba6eqY29k4u2oaRVgBm9poRRsbOZq4ekmgA9riK4CHq9qVhIhFRdg5ZpjBaCVEpsvLpJo72btkiAJAwfZZJzjbOngFB+D7qygCGAE4AJto6puHNVgVYiihYAK5zu4Wp7foZ9eAzGPPL8aYTUyWhqFiV1VYAFhhzSzGX11uK10DzyhRwxQqrww5Ree0qjX0URw-3sgMWwLWcUam0s212ByOKBObVWBk6aNCQPu2OgAzpUPhVjxhQJh2OWFGOEc4zBRSuVIx5iqSK+Pz+dRglNmQpBtLgcCEcEs8USLJ2e3ZxKwpzJFyV4GlN1lJnlCvNBvNFS2rM1RMKYt+PKs6OWzgNBuccxwApldzlExgrqWNAAQoYAPIELgAYQIAGUdMLEWq8EhWsGQY4pQ5aQBvA1IDDFAC2GBwODmAHMYbmLHmAL7gb0OCbmtNJKzWOJlivVyrWRxthULYv7BbyXuVmu5aBNwMBYBL5dL8ArtfLySWSyXGAFhmhKwAIgAfmfzyeSuP8BDlEXwBfz0fRtscPkizQkPkq0PBoNX8UvwrBYlhzJclgAEaXHM4AANTgBBEx9IybxWAA7O6dJDEBVhUDygzYUsKyWAALPhWHqm+H5fj+7gbqYvAkX+B7qNCVgAGzZhRMG9DB8G8FxfRDBBcQiRAABMglDGgcQyRQ4B4QRlHvhgn7fkO9HgLwvAwA2oy-gE267tA+7IYelino+l4YAAjocSDgAA7igiifA+VnPjauAqWptHMX0AHNkRwqgQYUFxHxCFIa+Pk0aBRGkQYQGWGhBh4TydFLgxTF0oMpkBeCgHCuxSEFfyIkWJFvClYFMkWGJ4DiTV4Kxd+eLgPJeGZcADE6XSDa6fp7hAA)

## *Tuple*

元组

### 🌋 Definitions

#### Depends

~~~ ts
type Fn <T, R> = (x: T) => R ;
~~~

#### One Field Tuple

...

#### Pair Tuple

~~~ ts
type Pair <Head, Tail> = <R,> (c: Fn <Head, Fn <Tail, R>>) => R ;

const Pair = 
<H,> (h: H) => 
<T,> (t: T)
: Pair <H, T> => 
	
	(
		<R,> (chooser: Fn <H, Fn <T, R>>)
		: R => chooser (h) (t) 
	
	) as Pair <H, T> ;

Pair.head = (<A,> (a: A) => <B,> (b: B): A => a) as (<A> (a: A) => <B> (b: B) => A) ;
Pair.tail = (<A,> (a: A) => <B,> (b: B): B => b) as (<A> (a: A) => <B> (b: B) => B) ;

Pair.applies = 
<H, T, R> (f: Fn <H, Fn <T, R>>) => 
(p: Pair <H, T>)
: R => 
	
	((p) (f)) ;
~~~

### 🥩 Equal Case

#### Apply with Unpack

~~~ ts
(Pair ("a") (0)) ((a) => (b) => console.log (["A::" + a, "B::" + b])); //> ["A::a", "B::0"]
Pair.applies ((a) => (b) => console.log (["A::" + a, "B::" + b])) (Pair ("a") (0)); //> ["A::a", "B::0"]
~~~

~~~ ts
(({a, b}) => console.log (["A::" + a, "B::" + b])) ({a: "a", b: 0}); //> ["A::a", "B::0"]
~~~

[*see playground*](https://www.typescriptlang.org/play/?#code/PQKhAIFgCh3CACAbAlgYwKYDsDOHwCGA5gA5IC0AzAHQAMMciqmu+RAZgCYUCM1lDeFFjxgMcdAAuATxL4AYlnAAeACoAacACUAfOAC84ABQAPAFzhVASgN6t4ANwwZc8AAUCKAE4qAEhgJOTVVPJD1DZS11PSM0C0U-AKDwBLVQzV0dG307Rwk0AHtcSXdPH0MYZV9o4wALC19svUqNGMkLaxgLD28-YPDm6ABIGCGjUaHImtjagoK8L3ilKs1UjW0dLImLexzwNFn5jB8jWpsjSRtR0ZsCHFLelcs9J2gYHq9qWqSDY2UAQWmBAs-yaKgAQtMAEYWcFWEG2Qi3e5GAExYHgUGI5TgmIw8BwxFY14faiSUK-VGA9EgsE46Gw+EExFQ5F-f40zF03HGfGEvaE17vMrUAgkMgoDD3CrQJ7rXTGdhLPopZbyzZgmBGEjdMoq1RbaA7RHXYZGbXndhWGxCt7QYAOx0O8BOl2OiSgcAAVywJAIaAA1qJ8kUcAUkBhqEgCkRjAAiAB+SeTSfAKbTybjVlenpIXq8+BwMgjomMH3jBCzxlo1uMRgIYKMrMRhVw4cj0djRgA2nH-mYzHHwABqQiaOPggdD0dQgC61pzEDzBfARekJZAwAenzFEqldYbiKbYNbYYjUZjxl7-cHI7H4AnU7vc9rRnLRjjlfONezME9GAARy9AgkHAAB3FBJFqUtzQAbwITQoQAXxPUN2wvLtryfUcEIfSdbxnedzngixPzjRCLFoFDbSAA)

## *Circuit*

电路（其实是分支逻辑啦）





