# *pure project* 🧫

~~~
🧫 implement all by nothing but only lexical closure . 🧬
~~~

This is a theoretical verification in *Functional Programming* studies.

The only one necessary thing of a language for this pure project is a ***lexical closure*** feature, also called ***closure*** or ***function closure***, means there is a *first-classed function means all function is valve* and *it will pick all the symbol where it be defined which is needed by it-self*. With out such thing, all of them shall not works: 

- *Laziness* -- without *lexical closure* feature, then we'll must get the *laziness* just from a language design and implementation.
- *currying* -- if we don't have the *closure* feature, then we cannot do any *currying* things that means no *(elegant) pipe* then I shall give up this *pure project* at its begin.
- *...* -- ...


And there's also something specially that it is necessary when this *pure project* walks in some special language: 

- *Object*. In Java or TS/JS and other more similar language which don't have *tuple*, I have to use the *object* to mork a specific *tuple* (such as a *pair*). This object is means like such as [records](https://cs3110.github.io/textbook/chapters/data/records_tuples.html) in OCaml (but will, OCaml just have a tuple type ...).
- *Type Comment*. If we can make a *type comment*, just use a *type aliases* (like a `type` in OCaml/Haskell/TS). Don't use a *class* (like a `class` in JS/Java/Python) at the first. If there is not a aliases feature in such language, write a structure comment; or if the language don't support a *type comment*, just skip it.
- *...*. ...


## Thanks for

- [*CS3110*](https://cs3110.github.io/textbook/chapters/hop/higher_order.html?highlight=pipe) from [*Cornell University*](https://www.cs.cornell.edu/courses/cs3110/)
- *ISMISM* courses by *Liu Si Mo* also called *Wei Ming Zi*
- *Lacanian Psychoanalysis* theory from the *Lacanianists*
- *Dialectic* or *Logic* method from *Georg Wilhelm Friedrich Hegel*, *Karl Marx* and the *Leninists*
- *Lambda Calculate* from *Alonzo Church* and *Currying* theory
- *Lexical Closure* feature that provide this project almost
- The [*Functional Programming For The Rest of Us | defmacro*](https://www.defmacro.org/2006/06/19/fp.html) which told me the *CPS Programming*
- *Rain World* game which give me some idea for the names


## Implementations

- [ ] [TypeScript](./pure.ts)
- [ ] [Rust](./pure.rs)
- [ ] [Java](./pure.java)
- [ ] ...

