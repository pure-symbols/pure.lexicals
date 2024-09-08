# Pure-Lexical Equivalents

纯词法闭包风格下 (Pure-Lexical) 的等价性 (Equivalents)。

<sup>即</sup>  
<sub>*对应形式的词法闭包表示 🪒 ...*</sub>  
<sup>*The Correspond Forms Indicates in Lexical Closures 🪒 ...*</sup>  

<sub>*... You can just treat this as a simple show about the corresponds 🙃*</sub>  
<sup>*... 你可以简单地把这当作一个简单的对应关系手册 🙃*</sup>  


## *Pipe*

管道

[pipe playground]: https://www.typescriptlang.org/play/?#code/PQKhAIFgCh3CACAbAlgYwKYDsDOHwCCA4gAoAyAtAMwB0ADDHIqprvkQGIAilAjDVUbwoseMBgToMUOA5YxkgC4BPAA7454ADwAVADTgASgD5wAXnAAKAB4AucDoCU504fABuSTJIp1CqdAqfqq++Ba6eqY29k4u2oaRVgBm9poRRsbOZq4ekmgA9riK4CHq9qVhIhFRdg5ZpjBaCVEpsvLpJo72btkiAJAwfZZJzjbOngFB+D7qygCGAE4AJto6puHNVgVYiihYAK5zu4Wp7foZ9eAzGPPL8aYTUyWhqFiV1VYAFhhzSzGX11uK10DzyhRwxQqrww5Ree0qjX0URw-3sgMWwLWcUam0s212ByOKBObVWBk6aNCQPu2OgAzpUPhVjxhQJh2OWFGOEc4zBRSuVIx5iqSK+Pz+dRglNmQpBtPpQ3iiRZOz27OJWFOZIug2lN1lJnlCr6FS2rLVRMKYt+PKs6OWzkGg2ccxwApldzlExg9qWNAAQoYAPIELgAYQIAGUdMLEcq8EhWr6QY4pQ5aQBvQZIDDFAC2GBwODmAHMYemLBmAL7gV0OCZ9BNJKzWOIFoulyrWRwNha5-YLeTt4tl3LQGvegLAacz6fgWfzmeSSyWS4wLMM0JWABEAD99wfdyUB-gIcoc+BDwft6Ntjh8jmaEh8iWe066Xfir8VhZLHNLpYABGlxzOAADU4CAQ2jJvFYADsjp0kM35WFQPKDMhSwrJYAAs6FISq96Ps+r7uIupi8Dh74mnCsGWAAbKmBGgb0oEQbwTF9EMgFxDxEAAEycUMaBxCJFDgGhGGEQ+GBPi+PbkeAvC8DAVajG+AQrmu0AbjRfiWHuV5HhgACOhxIOAADuKCKJ8l5GTeZq4DJcmkdRn61lhwp-gYwFxGxkENneLkkZYGHfrhBjhVhlhUFFSF9AhPJkdOFFUXSgy6X0HkseA9ENtl4LFDxFgBbwBUeSJFh8eA-EVeCIUvni4DiWhKXABRKl0lWqnqe4QA

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

*Function `Pipeyard` and `pipeline` are same here.*

### 🥩 Equal Case

#### Function apply

~~~ ts
const add = (a) => (b) => a + b;
pipeline (7) 
	(add (3))
	(add (4))
	(console.log); //> 14
~~~

~~~ ts
const add = (a, b) => a + b;
console.log(
	add(4,
	add(3,
		7))); //> 14
~~~

#### Sub Scope

~~~ ts
pipeline (6)
	(a => a + 1)
	(b => b * 2)
	(c => c - 3)
	(console.log); //> 11
~~~

~~~ ts
{
	const a = 6;
	const b = a + 1;
	const c = b * 2;
	console.log(c - 3); //> 11
}
~~~

### 📽 <sup>[*see playground*][pipe playground]</sup> 

## *Tuple*

元组

### 🌋 Definitions

#### Depends

~~~ ts
type Fn <T, R> = (x: T) => R ;
~~~

#### One length Tuple (Case Box)

[case playground]: https://www.typescriptlang.org/play/?#code/PQKhAIFgCh3CACAbAlgYwKYDsDOHwCGA5gA5IC0AzAHQAMMciqmu+RAZgCYUCM1lDeFFjxgMcdAAuATxL4AYlnAAeACoAacACUAfOAC84ABQAPAFzhVASgN6t4ANwwZc8AGECeFQEF1ew8pafsZoFoo+mro2+naOEmgA9riS7p74hjBqwaYW1jAWHl5q-nowAJDlRuVlgdloABYJCXgATmFKWdo6VtUW9jHgDU2txiY25eU2nqlFqnpO0DCFGNQE9RgEnAbGyr56RgQW3lZHtoRTODve+4fgx2f3C0tpqyRkKBiXGdCdusbs7RUGi60VK0CMJAKaSB3Xy2jOE2gZSMEJsRnYVhsT2gy2oLQwiRanC+wiy+0hM3wxVBpKC+wB4HCv1h0D6CKRlVR-0xcUWfMSyXAJBQrgCGn25ksNNq9MBzJO8IG6LRY15MGAGs1GvAWp1mviSRwCSQKyQCSIxgARAA-W1223ge2Ou2WqzY0DgJL4E1KSQAVzI+BAwGMy2MAHYeSiCDSBUaTdQzRajABtS3eMxmS3gADUhAAupiHHq9GmM2Zw5b8+qIJJ1uAcCgALaBoUioMhiHtiNRg6xw3G03m4xlzPZvMEQtukvgUcVqsSD0EN5IaTgJsJFoAa1ENaFfvxDZkJtElNe70+xj7Zzjg8Tw9T6bHuYLUbDRkj041paf8+r0A9DAAEc-QIJBwAAdxQOtT2jftcDvJMR1-cdXzRSNi2-Wdf0rf89z9LASAINAdw3bddwAiASAPfAcGPDsz3xQliVDaEP17GMbwHBMkMfctUMnIsZznXC92A0DwKgmDgyvABvAgAF94PjIdkznASp2MeSLHDJTMOAH9y1E6AgA "Field One"

~~~ ts
type Case <A,> = <R,> (c: Fn <A, R>) => R ;

const Case = 
<T,> (x: T)
: Case <T> => 
	
	(
		<R,> (chooser: Fn <T, R>)
		: R => chooser (x) 
	
	) as Case <T> ;

Case.ahead = (<A,> (a: A): A => a) as (<A> (a: A) => A) ;

Case.applies = 
<T, R> (f: Fn <T, R>) => 
(p: Case <T>)
: R => 
	
	((p) (f)) ;

Case.records = 
<T,> (p: Case <T>) => 
<R,> (f: Fn <T, R>)
: R => 
	
	((p) (f)) ;
~~~

It's same with the `pipe`: 

~~~ ts
/* one len tuple */ (Case (7)) ((a) => console.log (["A::" + a])); //> ["A::7"]
/* the simple pipe */ (pipe (7)) ((a) => console.log (["A::" + a])); //> ["A::7"]
~~~

#### Two length Tuple (Pair Tuple)

[pair playground]: https://www.typescriptlang.org/play/?#code/PQKhAIFgCh3CACAbAlgYwKYDsDOHwCGA5gA5IC0AzAHQAMMciqmu+RAZgCYUCM1lDeFFjxgMcdAAuATxL4AYlnAAeACoAacACUAfOAC84ABQAPAFzhVASgN6t4ANwwZc8AAUCKAE4qAEhgJOTVVPJD1DZS11PSM0C0U-AKDwBLVQzV0dG307Rwk0AHtcSXdPH0MYZV9o4wALC19svUqNGMkLaxgLD28-YPDm6ABIGCGjUaHImtjagoK8L3ilKs1UjW0dLImLexzwNFn5jB8jWpsjSRtR0ZsCHFLelcs9J2gYHq9qWqSDY2UAQWmBAs-yaKgAQtMAEYWcFWEG2Qi3e5GAExYHgUGI5TgmIw8BwxFY14faiSUK-VGA9EgsE46Gw+EExFQ5F-f40zF03HGfGEvaE17vMrUAgkMgoDD3CrQJ7rXTGdhLPopZbyzZgmBGEjdMoq1RbaA7RHXYZGbXndhWGxC6CkrwYQpeTjS4RymI6h4+d2a2VRGJK1UqtYZDVdbQm4ajc0kS3WvJvaDAZMp5PgVPplP5Io4ApIDDUJAFIjGABEAD9K1XK+Bq7Wq6WrLbQOASABXB3gHAyfOiYwfMsERvGWjx80EMFGVmIwq4PMFoslowAbVL-zMZlL4AA1IRNKXwRut7uoQBda0OTN6VfrsxD-eHsy0UuniQtsVkaTgAC2BS8AGtRBgFt207btpF7EBgC9UVxVQKVjCMCdESnMFZ1zfNC2LYwbyPHc93AA88JPc9zgHIxSyHc5RybK9wFwu9SwfDdn1fJMIAwABHNsCCQcAAHcUEkWo+3HTRpz2dD5ywpcGOPAiiM3fCzzHSimPAUdL2Ta81w3e9CMfVi3wgNssBIAg0EA38AKA9jWw7fBwMg6D7UdP8XX7PUKKokcxyQycJL0KTMMXHDdKU3cCGYiLwBU2jtPo8L9MUoy7K4ni+ME4TRKMABvKLYoAXzQnNpNCldwvkgrFPkuLjHyiw1PEixaGKrTgB029ksMl8YCAA "Field Two"

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

Pair.records = 
<H, T> (p: Pair <H, T>) => 
<R,> (f: Fn <H, Fn <T, R>>)
: R => 
	
	((p) (f)) ;
~~~

### 🥩 Equal Case

#### Apply Mork

pair: 

~~~ ts
(Pair ("a") (0)) ((a) => (b) => console.log (["A::" + a, "B::" + b])); //> ["A::a", "B::0"]
Pair.applies ((a) => (b) => console.log (["A::" + a, "B::" + b])) (Pair ("a") (0)); //> ["A::a", "B::0"]
~~~

~~~ ts
((a, b) => console.log (["A::" + a, "B::" + b])) ("a", 0); //> ["A::a", "B::0"]
~~~

case: 

~~~ ts
(Case (7)) ((a) => console.log (["A::" + a])); //> ["A::7"]
Case.applies ((a) => console.log (["A::" + a])) (Case (7)); //> ["A::7"]
~~~

~~~ ts
((a) => console.log (["A::" + a])) (7); //> ["A::7"]
~~~



#### Unpack Mork

pair: 

~~~ ts
(Pair ("a") (0)) ((a) => (b) => console.log (["A::" + a, "B::" + b])); //> ["A::a", "B::0"]
Pair.records (Pair ("a") (0)) ((a) => (b) => console.log (["A::" + a, "B::" + b])); //> ["A::a", "B::0"]
~~~

~~~ ts
(({a, b}) => console.log (["A::" + a, "B::" + b])) ({a: "a", b: 0}); //> ["A::a", "B::0"]
~~~

case: 

~~~ ts
(Case (7)) ((a) => console.log (["A::" + a])); //> ["A::7"]
Case.records (Case (7)) ((a) => console.log (["A::" + a])); //> ["A::7"]
~~~

~~~ ts
(({a}) => console.log (["A::" + a])) ({a: 7}); //> ["A::7"]
~~~




### 📽 <sup>[*one*][case playground]</sup> <sup>[*two*][pair playground]</sup> <sup>...</sup> 

## *Circuit*

电路（其实是分支逻辑啦）

[circuit playground]: ...

### 🌋 Definitions

### 🥩 Equal Case

### 📽 <sup>[*see playground*][circuit playground]</sup>


