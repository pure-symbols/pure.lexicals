
namespace pure
{
    export 
    type Fn <T, R> = (x: T) => R ;
    export 
    type Lacking <T> = () => T ;
    
    
    export 
    type Might <T> = { head: T } ;
    export 
    type None = Might<null> ;
    
    export 
    const Might = 
    <T,> (head: T)
    : Might<T> => 
        
        ({ head: head }) as Might<T> ;
    
    export 
    const None = 
    (): Might<null> => 
        
        ({ head: null }) as Might<null> ;
    
    
    
    export 
    type Pair <Head, Tail> = { head: Head, tail: Tail } ;
    export 
    type Done = { head: None, tail: None } ;
    
    export 
    const Pair = 
    <Head,> (head: Head) => 
    <Tail,> (tail: Tail)
    : Pair<Head, Tail> => 
        
        ({ head: head, tail: tail }) as Pair<Head, Tail> ;
    
    export 
    const Done = 
    (): Done => Pair (None()) (None()) ;
    
    
    export 
    type List <T> = { head: T, tail: List<T> } ;
    
    export 
    const List = 
    <T,> (head: T) => 
    (tail: List<T>)
    : List<T> => 
        
        Pair (head) (tail) ;
    
    
    export 
    type pipe = <T,> (x: T) => <R,> (f: Fn<T, R>) => R ;
    export 
    const pipe: pipe = <T,> (x: T) => <R,> (f: Fn<T, R>): R => f(x) ;
    
    type Pipework <T> = () => Pipeline<T> ;
    type Pipeline <T> = <R> (f: Fn<T, R>) => Rivulet<R> ;
    type Rivulet <T> = Pair<() => T, Pipework<T> > ;
    type pipeline = <T> (x: T) => Pipeline<T> ;
    
    const Rivulet = 
    <T,> (head: () => T) => 
    (tail: Pipework<T>)
    : Rivulet<T> => 
        
        Pair (head) (tail) ;
    
    export 
    const Pipeline: pipeline = 
    <T,> (x: T): Pipeline<T> => 
        
        <R,> (f: Fn<T, R>) => Rivulet (() => pipe (x) (f)) (() => Pipeline (pipe (x) (f)) ) ;
    
    
    export 
    type Downpour <T> = Lacking<Iterador<T> > ;
    export 
    type Iterador <T> = { head: T, tail: Downpour<T> } ;
    
    export 
    const Iterador = 
    <T,> (head: T) => 
    (tail: Downpour<T>)
    : Iterador<T> => 
        
        Pair (head) (tail) ;
    
    Iterador.iterate = 
    <T,> (head: T) => 
    (f: Fn<T, T>)
    : Downpour<T> => 
        
        () => Iterador (head) (Iterador.iterate (f(head)) (f) ) ;
    
    Iterador.head = 
    <T,> (self: Downpour<T>)
    : T => self().head ;
    
    Iterador.tail = 
    <T,> (self: Downpour<T>)
    : Downpour<T> => self().tail ;
    
    
    Iterador.map = 
    <T, R> (f: Fn<T, R>) => 
    (self: Downpour<T>)
    : Downpour<R> => 
        
        () => Iterador (f(Iterador.head(self))) (Iterador.map (f) (Iterador.tail(self)) ) ;
    
    
    
    Iterador.follows = 
    <T,> (head: T) => 
    (self: Downpour<T>)
    : Downpour<T> => 
        
        () => Iterador (head) (self) ;
    
    Iterador.follow = 
    <T,> (heads: T[]) => 
    (self: Downpour<T>)
    : Downpour<T> => 
        
        heads.reverse().reduce((s, h) => Iterador.follows (h) (s), self) ;
    
    
    Iterador.take = 
    <T,> (limit: number) => 
    (self: Downpour<T>)
    : T[] => [{} as T] //
    
    
    
} ;

namespace calcu 
{
    export 
    type Divides = { div: number, rem: number } ;
    
    export 
    const Divides = 
    (a: number) => 
    (b: number): Divides => 
        
        [...Array(a)].reduce(
            
            ({ div: c, rem: r }, y) => 
                
                r < b ? 
                { div: c, rem: r } : 
                { div: c + 1, rem: r - b } , 
            
            { div: 0, rem: a } ) ;
    
} ;

namespace arr 
{
    export 
    const rangestep = 
    (a: number, t: number, b: number): number[] => 
        
        Array.from(Array(calcu.Divides(b - a)(t).div + 1).keys())
            .map(x => x * t).map(x => x + a) ;
    
    export 
    const range = (a: number, b: number): number[] => rangestep(a,1,b) ;
    
} ;


namespace Demo
{
    
    console.log("---=== arr.range ===---") ;
    
    pure.pipe (arr.rangestep(2,3,10)) (console.log); // [2, 5, 8]
    pure.pipe (arr.range(2,10)) (console.log); // [2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    
    
    
    
    console.log("---=== fibo_pipe ===---")
    
    const fibo_pipe = 
    pure.pipe
    (pure.pipe 
        (pure.pipe 
            (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
            (pure.Iterador.map (([x, y]) => x) ) ) 
        (pure.Iterador.map (x => 2 * x) ) ) 
    (pure.Iterador.map (x => x / 2) ) ;
    
    pure.pipe
    ( [... Array(14)].reduce
    (
        ({a:{head, tail}, r},b) => ({ a: tail(), r: [...r, head] }) , 
        { a: fibo_pipe(), r: [] } ,
    ) ) (console.log); // { "a": { "head": 377 }, "r": [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ] }
    
    
    
    
    
    console.log("---=== fibo_pipeline ===---") ;
    
    const fibo_pipeline = 
    pure.Pipeline (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
        (pure.Iterador.map (([x, y]) => x) ) .tail()
        (pure.Iterador.map (x => 2 * x) ) .tail()
        (pure.Iterador.map (x => x / 2) ) .head() ;
    
    pure.Pipeline
    ( [... Array(14)].reduce
    (
        ({a:{head, tail}, r},b) => ({ a: tail(), r: [...r, head] }) , 
        { a: fibo_pipeline(), r: [] } ,
    ) ) (console.log) .head(); // { "a": { "head": 377 }, "r": [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ] }
    
    
} ;
