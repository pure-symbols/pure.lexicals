
namespace pure
{
    export 
    type Fn <T, R> = (x: T) => R ;
    export 
    type Lacking <T> = () => T ;
    
    
    export 
    type Might <T> = Lacking <T> ;
    export 
    type None = Might<null> ;
    
    export 
    const Might = 
    <T,> (head: T)
    : Might<T> => 
        
        (() => head) as Might<T> ;
    
    export 
    const None = 
    (): Might<null> => 
        
        Might(null) as Might<null> ;
    
    Might.heador = 
    <T,> (mehr: T) => 
    (self: Might<T>)
    : T => 
        
        self() ?? mehr ;
    
    
    
    export 
    type Pair <Head, Tail> = { head: Head, tail: Tail } ;
    export 
    type Logik <Wert, Mehr> = { wert: () => Wert, mehr: () => Mehr } ;
    export 
    type Done = { wert: None, mehr: None } ;
    
    export 
    const Pair = 
    <Head,> (head: Head) => 
    <Tail,> (tail: Tail)
    : Pair<Head, Tail> => 
        
        ({ head: head, tail: tail }) as Pair<Head, Tail> ;
    
    export 
    const Logik = 
    <Wert, Mehr> ({ head, tail }: Pair <() => Wert, () => Mehr>)
    : Logik<Wert, Mehr> => 
        
        ({ wert: head, mehr: tail }) as Logik<Wert, Mehr> ;
    
    export 
    const Done = 
    (): Done => Logik(Pair (None()) (None()) ) ;
    
    
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
    
    type Pipeline <T> = <R> (f: Fn<T, R>) => Pipework<R> ;
    type Pipework <T> = Logik<T, Pipeline<T> > ;
    type pipeline = <T> (x: T) => Pipeline<T> ;
    
    const Pipework = 
    <T,> (head: () => T) => 
    (tail: () => Pipeline<T>)
    : Pipework<T> => 
        
        pipe (Pair (head) (tail)) (Logik) ;
    
    export 
    const Pipeline: pipeline = 
    <T,> (x: T): Pipeline<T> => 
        
        <R,> (f: Fn<T, R>) => Pipework (() => pipe (x) (f)) (() => Pipeline (pipe (x) (f)) ) ;
    
    
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

namespace nums 
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
        
        Array.from(Array(nums.Divides(b - a)(t).div + 1).keys())
            .map(x => x * t).map(x => x + a) ;
    
    export 
    const range = (a: number, b: number): number[] => rangestep(a,1,b) ;
    
} ;

namespace fun 
{
    export 
    const memoize = 
    <T extends (...args: any[]) => any> (f: T)
    : T => 
    {
        const mem = {} as Record<string, ReturnType<T>> ;
        
        return ( (...args: Parameters<T>)
        : ReturnType<T> => 
        {
            const k = JSON.stringify(args) ;
            if (!(k in mem)) { mem[k] = f(...args); } ;
            return mem[k] ;
        } ) as T ;
    } ;
    
    
    export 
    const apply = 
    <T,> (f: Function) => 
    (args: any[]) => 
    (owner: T|undefined = undefined)
    : any => 
        
        f.call(owner, ...args) ;
    
    export 
    const applies = memoize(apply) ;
    
    
    
    export 
    namespace Echoes
    {
        export 
        const echoes =
        <T = {[key: string]: any},> 
        (waves: {[key: string]: (env: T) => any})
        : T => 
            
            Object.entries(waves).reduce
            (
                (envs, [fn, f]) => ({... envs, [fn]: f(envs)}) ,
                {} as T
            ) ;
        
        export 
        const calls = 
        <
            T extends Record<K, (...args: any) => any> , 
            K extends keyof T , 
        > 
        (record: T, key: K)
        : { [P in K]: ReturnType<T[P]> ; }[K] => 
            
            echoes <{[P in K]: ReturnType<T[P]> }> (record) [key] ;
        
    } ;
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
        ({ a: { head, tail }, r }, b) => ({ a: tail(), r: [...r, head] }) , 
        { a: fibo_pipe(), r: [] } ,
    ) ) (console.log); // { "a": { "head": 377 }, "r": [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ] }
    
    
    
    
    
    console.log("---=== fibo_pipeline ===---") ;
    
    const fibo_pipeline = 
    pure.Pipeline (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
        (pure.Iterador.map (([x, y]) => x) ) .mehr()
        (pure.Iterador.map (x => 2 * x) ) .mehr()
        (pure.Iterador.map (x => x / 2) ) .wert() ;
    
    pure.Pipeline
    ( [... Array(14)].reduce
    (
        ({ a: { head, tail }, r}, b) => ({ a: tail(), r: [...r, head] }) , 
        { a: fibo_pipeline(), r: [] } ,
    ) ) (console.log) .wert(); // { "a": { "head": 377 }, "r": [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ] }
    
    
    
    console.log("---=== fibo_pipeline ===---") ;
    
    pure.Pipeline (5)
        (x => x + 7) .mehr()
        (x => "x" + x) .mehr()
        (console.log) .wert(); // "x12"
    
    
    
    console.log("---=== fibo_tree ===---") ;
    
    const fibo_tree = (n: number): number => (n > 1 ? fun.applies (fibo_tree) ([n - 1]) () + fun.applies (fibo_tree) ([n - 2]) () : n ) ;
    // console.log(fun.applies (fibo_tree) ([41]) () ); // 165580141, but very long wait, won't stack overflow.
    
    
    console.log("---=== echoable ===---") ;
    
    const echoable =
    {
        x0: (env: { [key: string]: any }) => 
            
            2 ,
        
        f: (env: { [key: string]: any }) => 
            
            (s: string)
            : number => 
                s.length ,
        
        f2: (env: { [key: string]: any }) => 
            
            (s: string) => (n: number)
            : Promise<number> => 
                Promise.resolve(env.f(s) + n - env.x0) ,
        
        f22: (env: { [key: string]: any }) => 
            
            (s: string, n: number)
            : Promise<number> => 
                env.f2(s)(n) ,
    } ;
    
    fun.Echoes.echoes (echoable).f2 ("huge") (6)
        .then( (x: number) => `Promising: will 10 - 2 = 8 ~: ${x}` )
        .then(console.log); // "Promising: will 10 - 2 = 8 ~: 8"
    
    fun.Echoes.calls (echoable,'f2') ("huge") (7)
        .then(x => `Promising: will 11 - 2 = 9 ~: ${x}`)
        .then(console.log); // "Promising: will 11 - 2 = 9 ~: 9"
    
} ;
