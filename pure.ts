
namespace pure
{
    export 
    type Fn <T, R> = (x: T) => R ;
    export 
    type Lazywarp <T> = () => T ;
    
    
    export 
    type Maybe <T> = { head: T } ;
    export 
    type None = Maybe<null> ;
    
    export 
    const Maybe = 
    <T,> (head: T)
    : Maybe<T> => 
        
        ({ head: head }) as Maybe<T> ;
    
    export 
    const None = 
    (): Maybe<null> => 
        
        ({ head: null }) as Maybe<null> ;
    
    
    
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
    const pipeline = {} ;
    
    
    export 
    type Downpour <T> = Lazywarp<Iterador<T> > ;
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

// 


const rangestep = (a: number, t: number, b: number): number[] => Array.from(Array(pure.Divides(b - a)(t).div + 1).keys()).map(x => x * t).map(x => x + a);
const range = (a: number, b: number): number[] => rangestep(a,1,b) ;

pure.pipe (rangestep(2,3,10)) (console.log)
pure.pipe (range(2,10)) (console.log)

namespace Demo
{
    
    const fibo_pipe = 
    pure.pipe
    (pure.pipe 
        (pure.pipe 
            (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
            (pure.Iterador.map (([x, y]) => x)) ) 
        (pure.Iterador.map (x => 2 * x)) ) 
    (pure.Iterador.map (x => x / 2) ) ;
    
    console.log("---=== fibo_pipe ===---")
    
    
    
    const {head, tail} = fibo_pipe() ;
    console.log(head); // 输出 0
    
    const {head: hh, tail: tt} = tail() ;
    console.log(hh); // 输出 1
    
} ;
