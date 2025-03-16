# *pure project* 🧫

~~~
🧫 implement all by nothing but only lexical closure . 🧬
~~~


 \____

<sup>*你要像一个主人一样去展开和安排一切，而不是自作聪明地以为只需要像个奴隶一样来被安排被展开这样来面对这一切。* </sup>  
<sub>*这就是这一项目的全部意义了。* </sub>  

<sup>*You should do unfold do scheme for everything like a manager of the world, not think yourself clever to be managed to be setted up just like a slave and thing that is enough just face to everything in this world like that.* </sup>  
<sub>*That's the only point of this, this project or you can say this work, a work of mine.* </sub>  

## Docs

- [*☄️ Lambda Calculus 101*](./.docs/lambda-calculus.101 "Let's See what the Lambda Calculus is ☄️")
- [*🦠 Fixed Point Things*](./.docs/fixed-point.things "Some thing about the Fixed-point Combinators 🦠")



## Intro

This is a theoretical verification in *Functional Programming* studies.

The only one necessary thing of a language for this pure project is a *[**lexical closure**](https://en.wikipedia.org/wiki/Closure_(computer_programming)#Lexical_environment)* feature, means it [bind](https://en.wikipedia.org/wiki/Name_binding) its *[free variables](https://en.wikipedia.org/wiki/Free_variables_and_bound_variables)* by the **[*lexical scoping*](https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scope)**, not the *dynamic scoping*, and this also called ***closure*** or ***function closure***. That means there is a *[first-classed function](https://en.wikipedia.org/wiki/First-class_function) means all function is valve* and *it will pick all the symbol **where it be defined** which is needed by it-self*. With out such thing, all of this projec shall not works.

And with such feature, we can make these things: 

- *Laziness* -- without *lexical closure* feature, then we'll must get the *laziness* just from a language design and implementation.
- *Currying* -- if we don't have the *closure* feature, then we cannot do any *currying* things that means no *(elegant) pipe* then I shall give up this *pure project* at its begin.
- *Tuple* -- we can get numbers of values and let them applies one by one onto a picker, and then we just give a specific picker to get the specific value we've just given in.
- *Iterator* -- we have the *tuple* now and an *iterator* (or *List* or *Sequence*) is just a special 2 length tuple whith a value as the *head* and a closure as the *tail* which can just get the next such tuple. (and you can do almost everything with it such as you can just simply take a `Iterator <Tuple <...>>` as a `Table <...>` ...)
- *Pipeline* -- a simple pipe is just a `λxf.fx` while we're all in currying style and a `Y(λgxf.g(fx))` could be a yard that always can give a closure to its next parameter, and with such thing we can just play pure functional programming with out any *OO Method* grammar to make the nesting callings be listing callings (like `pipeline (x) (f) (f) (f) ... (sys.out)`).

And, with these things, we can do almost (maybe full) things about the compute works, and just with clear, clean, and declarative code expressions.


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

## Further Reading

- **Combinatory logic** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Combinatory_logic "Combinatory logic")</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E7%BB%84%E5%90%88%E5%AD%90%E9%80%BB%E8%BE%91 "组合子逻辑")</sup> 
- **Kolmogorov complexity** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Kolmogorov_complexity "Kolmogorov complexity")</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E6%9F%AF%E6%B0%8F%E5%A4%8D%E6%9D%82%E6%80%A7 "柯氏复杂性")</sup> <sup>[*intro.paulv*](https://homepages.cwi.nl/~paulv/kolmogorov.html "An Introduction to Kolmogorov Complexity and Its Applications (柯尔莫戈罗夫复杂性及其应用简介: https://mitpressbookstore.mit.edu/book/{9780387339986,9781489984456,9783030112974}, https://www.amazon.com/Introduction-Kolmogorov-Complexity-Applications-Monographs/dp/{0387940537,0387948686,0387339981,1489984453,3030112977}/, https://link.springer.com/book/10.1007/{978-1-4757-2606-0,978-0-387-49820-1,978-3-030-11298-1}) (描述复杂性 ISBN:9787030059642)")</sup> 
- **Condensed matter physics** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Condensed_matter_physics "Condensed matter physics")</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E5%87%9D%E8%81%9A%E6%80%81%E7%89%A9%E7%90%86%E5%AD%A6 "凝聚态物理学")</sup> 
- **Lotka–Volterra equations** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations "Lotka–Volterra equations")</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E6%B4%9B%E7%89%B9%E5%8D%A1-%E6%B2%83%E7%88%BE%E6%B3%B0%E6%8B%89%E6%96%B9%E7%A8%8B "洛特卡-沃尔泰拉方程")</sup> 
- **Андрей Никола́евич Колмогоров (Andrey Nikolaevich Kolmogorov)** <sup>[*wiki.ru*](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BB%D0%BC%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B2,_%D0%90%D0%BD%D0%B4%D1%80%D0%B5%D0%B9_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87 "Колмогоров, Андрей Николаевич")</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E5%AE%89%E5%BE%B7%E7%83%88%C2%B7%E6%9F%AF%E7%88%BE%E8%8E%AB%E5%93%A5%E6%B4%9B%E5%A4%AB "安德雷·柯尔莫哥洛夫 (Андрей Колмогоров)")</sup> <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Andrey_Kolmogorov "Andrey Kolmogorov (Андрей Колмогоров)")</sup> 
- **Intuitive statistics (folk statistics)** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Intuitive_statistics "Intuitive statistics (folk statistics)")</sup> 
- **Lazy K** <sup>[*site.trompcl*](https://tromp.github.io/cl/lazy-k.html "Lazy K | tromp cl")</sup> 
- **Lambda Diagrams** <sup>[*site.trompcl*](https://tromp.github.io/cl/diagrams.html "Lambda Diagrams | tromp cl")</sup> <sup>[*src.git.polux*](https://github.com/polux/lambda-diagrams.git "(Apache-2.0) (Languages: Haskell 100.0%) Animations of lambda term reduction sequences // lambda 项约简序列的动画")</sup> <sup>[*show.prime.youtube*](https://www.youtube.com/watch?v=0ZKIuKgiikM&list=PLi8_XqluS5xc7GL-bgVrxpA2Uww6nK0gV&index=7 "Prime Number Sieve in Lambda Calculus | YouTube")</sup> 
- **Lambda Calculus** <sup>[*intro.raul.pdf*](https://arxiv.org/pdf/1503.09060.pdf "A Tutorial Introduction to the Lambda Calculus | Raul Rojas")</sup> <sup>[*intro.trompcl.pdf*](https://tromp.github.io/cl/LC.pdf "Functional Bits: Lambda Calculus based Algorithmic Information Theory | tromp cl")</sup> <sup>[*cl.tromp*](https://tromp.github.io/cl/cl.html "John's Lambda Calculus and Combinatory Logic Playground | tromp cl")</sup> <sup>[*tromp.homepage.git*](https://github.com/tromp/tromp.github.io.git "(Languages: HTML 85.9%, Roff 11.9%, Rust 1.1%, Haskell 0.4%, C 0.3%, PostScript 0.1%, Other 0.3%) John Tromp homepage")</sup> <sup>[*dsc.ml.stackoverflow*](https://stackoverflow.com/questions/22676975/simple-lambda-calculus-dsl-using-gadts-in-ocaml "Simple lambda calculus DSL using GADTs in OCaml // 在 OCaml 中使用 GADT 的简单 lambda 演算 DSL")</sup> 
- **De Bruijn** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/De_Bruijn_index "De Bruijn index (De Bruijn indices)")</sup> <sup>[*wiki.en.indices*](https://en.wikipedia.org/wiki/De_Bruijn_indices "De Bruijn indices (De Bruijn index)")</sup> 
- **Binary Lambda Calculus** <sup>[*intro.trompcl*](https://tromp.github.io/cl/Binary_lambda_calculus.html "Binary Lambda Calculus | tromp cl")</sup> <sup>[*intro.tromp.gist*](https://gist.github.com/tromp/86b3184f852f65bfb814e3ab0987d861 "Binary Lambda Calculus")</sup> <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Binary_lambda_calculus "Binary lambda calculus (Binary combinatory logic)")</sup> <sup>[*wiki.en.logic*](https://en.wikipedia.org/wiki/Binary_combinatory_logic "Binary combinatory logic (Binary lambda calculus)")</sup> <sup>[*tromp.lispnyc*](https://tromp.github.io/cl/lispnycTalk/lispnyc.html "Binary Lambda Calculus: The Smallest Program Language | tromp cl")</sup> <sup>[*ait.tromp*](https://github.com/tromp/AIT.git "(Languages: Haskell 37.6%, HTML 30.9%, TeX 17.7%, C 8.3%, Agda 1.8%, JavaScript 0.8%, Other 2.9%) Algorithmic Information Theory, using Binary Lambda Calculus // 算法信息论，使用二进制 Lambda 演算")</sup> <sup>[*machine.blc.ioccc*](https://www.ioccc.org/2012/tromp/hint.html "Most functional")</sup> <sup>[*machine.blc.src.ioccc*](https://github.com/ioccc-src/winner/blob/master/2012/tromp/tromp.orig.c "(found by: https://www.ioccc.org/years.html)")</sup> 
- **De Bruijn** <sup>[*OEIS*](https://oeis.org/A166315 "A166315		Lexicographically earliest binary de Bruijn sequences, B(2,n).")</sup> <sup>[*wiki.en.notation*](https://en.wikipedia.org/wiki/De_Bruijn_notation "De Bruijn notation")</sup> <sup>[*wiki.en.sequence*](https://en.wikipedia.org/wiki/De_Bruijn_sequence "de Bruijn sequence")</sup> <sup>[*generator.jgeisler0303*](https://jgeisler0303.github.io/deBruijnDecode/ "de Bruijn Sequence Generator")</sup> <sup>[*intro.http (NAN)*](https://debruijnsequence.org/ "De Bruijn Sequence and Universal Cycle Constructions")</sup> <sup>[*intro.chessprogramming (NAN)*](https://chessprogramming.wikispaces.com/De+Bruijn+sequence "")</sup> 
- **Kolmogorov axioms (Probability axioms)** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Kolmogorov_axioms "Kolmogorov axioms (Probability axioms)")</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E6%A9%9F%E7%8E%87%E5%85%AC%E8%A8%AD "概率公理 (柯尔莫哥洛夫公理)")</sup> 
- **John Tromp Things** <sup>[*John Tromp*](https://en.wikipedia.org/wiki/John_Tromp)</sup> <sup>[*homepage.ghio*](https://tromp.github.io/ "John Tromp")</sup> <sup>[*orimaze*](https://tromp.github.io/orimaze.html "OriMaze: a block moving puzzle and maze in one! | John Tromp")</sup> <sup>[*pearls*](https://tromp.github.io/pearls.html "Programming Pearls | John Tromp")</sup> <sup>[*legalgo*](https://tromp.github.io/go/legal.html "Number of legal Go positions | John Tromp")</sup> 
- **Unlambda Lang** <sup>[*unl.site*](http://madore.org/~david/programs/unlambda/ "The Unlambda Programming Language")</sup> <sup>[*esoteric.oerjan*](https://home.nvg.org/~oerjan/esoteric/ "Esoteric programming languages | Ørjan")</sup> 
- **Combinatorics (Math)** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Combinatorics "Combinatorics")</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E7%BB%84%E5%90%88%E6%95%B0%E5%AD%A6 "组合数学")</sup> 
- **Typed lambda calculus** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Typed_lambda_calculus)</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E6%9C%89%E7%B1%BB%E5%9E%8B%CE%BB%E6%BC%94%E7%AE%97)</sup> 
- **Kappa calculus** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Kappa_calculus)</sup> 
- **Fixed-Point Combinator** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Fixed-point_combinator)</sup> <sup>[*wiki.zh*](https://zh.wikipedia.org/wiki/%E4%B8%8D%E5%8A%A8%E7%82%B9%E7%BB%84%E5%90%88%E5%AD%90)</sup> 
- **Fixed-Point Iteration** <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Fixed-point_iteration)</sup> 
- **Point-free style** <sup>[*wiki.haskell*](https://wiki.haskell.org/Pointfree "Pointfree | HaskellWiki")</sup> <sup>[*wiki.en*](https://en.wikipedia.org/wiki/Point-free_style "Point-free style (Tacit programming) | Wiki")</sup> <sup>[*wiki.apl*](https://aplwiki.com/wiki/Point-free_style "Point-free style (Tacit programming) | APL Wiki")</sup> <sup>[*qa*](https://stackoverflow.com/questions/944446/what-is-point-free-style-in-functional-programming)</sup> <sup>[*qa*](https://stackoverflow.com/questions/35796584/point-free-function-gives-different-result-to-non-point-free)</sup> 







