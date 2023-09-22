
namespace pure
{
    export 
    type Fn <T, R> = (x: T) => R ;
    export 
    type Lacking <T> = () => T ;
    
    export 
    type pipe = <T,> (x: T) => <R,> (f: Fn<T, R>) => R ;
    export 
    const pipe: pipe = <T,> (x: T) => <R,> (f: Fn<T, R>): R => apply (f) (x) ;
    
    export 
    type apply = <T, R> (f: Fn<T, R>) => (x: T) => R
    export 
    const apply = <T, R> (f: Fn<T, R>) => (x: T): R => f(x) ;
    
    
    
    export 
    type Pipeyard <T> = <R,> (continuation: Fn<T, R>) => Pipeyard<R> ;
    
    export 
    const Pipeyard = 
    <T,> (head: T)
    : Pipeyard<T> => 
        
        ( <R,> (continuation: Fn<T, R>)
        : Pipeyard<R> => 
            
            pipe (continuation(head)) (Pipeyard) 
        
        ) as Pipeyard <T> ;
    
    Pipeyard.BROADCAST = 
    <T,> (self: Pipeyard<T>)
    : T => 
    {
        let over: T = {} as T;
        self (x => over = x);
        return over ;
    } ;
    
    
    
    export 
    type Might <T> = Lacking <T> ;
    export 
    type None = Might<null> ;
    
    export 
    const Might = 
    <T,> (head: T)
    : Might<T> => 
        
        (() => head) as Might <T> ;
    
    export 
    const None = 
    (): Might<null> => 
        
        Might(null) as Might <null> ;
    
    Might.heador = 
    <T,> (mehr: T) => 
    (self: Might<T>)
    : T => 
        
        self() ?? mehr ;
    
    
    
    
    export 
    type wert = <H,> (h: H) => <T,> (t: T) => H ;
    export 
    type mehr = <H,> (h: H) => <T,> (t: T) => T ;
    
    export 
    type echo = mehr|wert ;
    
    export 
    type Tuple <Head, Tail> = (echoes: echo) => Head | Tail ;
    
    export 
    const Tuple = 
    <Head,> (h: Head) => 
    <Tail,> (t: Tail)
    : Tuple<Head, Tail> => 
        
        ( (echoes: echo)
        : Head | Tail => echoes (h) (t) ) as Tuple <Head, Tail> ;
    
    Tuple.Head = (<Head,> (h: Head) => <Tail,> (t: Tail): Head => h) as wert ;
    Tuple.Tail = (<Head,> (h: Head) => <Tail,> (t: Tail): Tail => t) as mehr ;
    
    Tuple.head = 
    <Head, Tail> (self: Tuple<Head, Tail>)
    : Head => 
        
        self (Tuple.Head) as Head ;
    
    Tuple.tail = 
    <Head, Tail> (self: Tuple<Head, Tail>)
    : Tail => 
        
        self (Tuple.Tail) as Tail ;
    
    Tuple.couple = 
    <Head, Tail> (self: Tuple<Head, Tail>)
    : Pair<Head, Tail> => 
        
        Pair (pipe (self) (Tuple.head)) 
            (pipe (self) (Tuple.tail)) ;
    
    
    export 
    type Yard <Mehr, Wert> = (echoes: echo) => Lacking<Mehr | Wert> ;
    
    export 
    const Yard = 
    <Mehr, Wert> (t: Tuple<() => Wert, () => Mehr>)
    : Yard<Mehr, Wert> => 
        
        ( (echoes: echo)
        : Lacking<Mehr | Wert> => 
            
            echoes (Tuple.tail (t)) (Tuple.head (t)) ) ;
    
    
    Yard.mehr = 
    <Mehr, Wert> (self: Yard<Mehr, Wert>)
    : Lacking<Mehr> => 
        
        self (Tuple.Head) as Lacking <Mehr> ;
    
    Yard.wert = 
    <Mehr, Wert> (self: Yard<Mehr, Wert>)
    : Lacking<Wert> => 
        
        self (Tuple.Tail) as Lacking <Wert> ;
    
    
    export 
    type Done = Yard<None, None> ;
    
    export 
    const Done = 
    (): Done => 
        
        Yard (Tuple (None) (None)) ;
    
    
    export 
    type List <T> = { head: T, tail: List<T> } ;
    
    export 
    const List = 
    <T,> (head: T) => 
    (tail: List<T>)
    : List<T> => 
        
        Pair (head) (tail) ;
    
    
    
    
    export 
    type Downpour <T> = () => Iterador<T> ;
    export 
    type Iterador <T> = Tuple<T, Downpour<T> > ;
    
    export 
    const Iterador = 
    <T,> (head: T) => 
    (tail: Downpour<T>)
    : Iterador<T> => 
        
        Tuple (head) (tail) ;
    
    Iterador.iterate = 
    <T,> (head: T) => 
    (f: Fn<T, T>)
    : Downpour<T> => 
        
        () => Iterador (head) (Iterador.iterate (f(head)) (f) ) ;
    
    Iterador.head = 
    <T,> (self: Downpour<T>)
    : T => 
        
        apply (Tuple.head) 
            (self() as Tuple <T, Downpour<T> >) ;
    
    Iterador.tail = 
    <T,> (self: Downpour<T>)
    : Downpour<T> => 
        
        apply (Tuple.tail) 
            (self() as Tuple <T, Downpour<T> >) ;
    
    
    
    Iterador.map = 
    <T, R> (f: Fn<T, R>) => 
    (self: Downpour<T>)
    : Downpour<R> => 
        
        () => Iterador (pipe (Iterador.head (self)) (f) ) 
            (pipe (Iterador.tail (self)) (Iterador.map (f)) ) ;
    
    
    
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
    
    
    
    Iterador.couple = 
    <T,> (self: Downpour<T>)
    : Pair<T, Downpour<T> > => 
        
        apply (Tuple.couple) 
            (self () as Tuple <T, Downpour<T> >) ;
    
    
    Iterador.take = 
    <T,> (limit: number) => 
    (self: Downpour<T>)
    : T[] => [{} as T] //
    
    
    
    
    
    
    
    
    
    
    
    export 
    type Pair <Head, Tail> = { head: Head, tail: Tail } ;
    
    export 
    const Pair = 
    <Head,> (head: Head) => 
    <Tail,> (tail: Tail)
    : Pair<Head, Tail> => 
        
        ({ head: head, tail: tail }) as Pair <Head, Tail> ;
    
    export 
    type Drainage <Wert, Mehr> = { wert: () => Wert, mehr: () => Mehr } ;
    export 
    type Pipeline <T> = <R> (f: Fn<T, R>) => Pipework<R> ;
    export 
    type Pipework <T> = Drainage<T, Pipeline<T> > ;
    export 
    type pipeline = <T> (x: T) => Pipeline<T> ;
    
    const Drainage = 
    <Wert, Mehr> ({ head, tail }: Pair <() => Wert, () => Mehr>)
    : Drainage<Wert, Mehr> => 
        
        ({ wert: head, mehr: tail }) as Drainage <Wert, Mehr> ;
    
    const Pipework = 
    <T,> (head: () => T) => 
    (tail: () => Pipeline<T>)
    : Pipework<T> => 
        
        pipe (Pair (head) (tail)) (Drainage) as Pipework <T>;
    
    export 
    const Pipeline: pipeline = 
    <T,> (x: T): Pipeline<T> => 
        
        ( <R,> (f: Fn<T, R>) => 
            
            Pipework (() => pipe (x) (f)) 
                (() => Pipeline (pipe (x) (f)) ) 
        
        ) as Pipeline <T> ;
    
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
    (a: number) => (t: number) => (b: number): number[] => 
        
        Array.from(Array(nums.Divides(b - a)(t).div + 1).keys())
            .map(x => x * t).map(x => x + a) ;
    
    export 
    const range = (a: number) => (b: number): number[] => rangestep(a)(1)(b) ;
    
} ;

namespace fun 
{
    export 
    const memoize = 
    <T extends (...args: any[]) => any> (f: T)
    : T => 
    {
        const mem = {} as Record <string, ReturnType<T> > ;
        
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
    <T,> (f: Function, args: any[]
    , owner: T|undefined = undefined)
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
            ( (envs, [fn, f]) => 
                ({... envs, [fn]: f(envs)}) , 
            
            {} as T ) ;
        
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
    
    console.log("---=== arr.range ===---");
    
    pure.pipe (arr.rangestep (2) (3) (10) ) (console.log); // [2, 5, 8]
    pure.pipe (arr.range (2) (10) ) (console.log); // [2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    
    console.log("---=== Tuple ===---");
    
    pure.pipe (pure.Tuple.couple (pure.Tuple (1) ("zzz"))) (console.log); // { "head": 1, "tail": "zzz" }
    pure.pipe (pure.Tuple.head (pure.Tuple (1) ("zzz"))) (console.log); // 1
    pure.pipe (pure.Tuple.tail (pure.Tuple (1) ("zzz"))) (console.log); // "zzz"
    
    
    
    
    
    
    console.log("---=== Pipeline ===---");
    
    pure.Pipeline (5) 
        (x => x + 7) .mehr()
        (x => "`x" + x) .mehr()
        (console.log) .wert(); // "`x12"
    
    console.log
    ( pure.Pipeline (5) 
        (x => x + 7) .mehr()
        (x => "x" + x) .mehr()
        (x => "~~" + x) .wert()
    ); // "~~x12"
    
    
    
    console.log("---=== fibo_tree ===---");
    
    const fibo_tree = (n: number): number => (n > 1 ? fun.applies (fibo_tree, [n - 1]) + fun.applies (fibo_tree, [n - 2]) : n ) ;
    console.log(fun.applies (fibo_tree, [41])); // 165580141, very quick.
    
    console.log("---=== fibo_pipe ===---");
    
    const fibo_pipe = 
    pure.pipe 
    (pure.pipe 
    (pure.pipe 
    (pure.pipe 
    (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
    (pure.Iterador.map (([x, y]) => x) )) 
    (pure.Iterador.map (x => 2 * x) )) 
    (pure.Iterador.map (x => x / 2) )) 
    (pure.apply (pure.Iterador.couple) ) ;
    
    
    pure.pipe
    ( [... Array(14)].reduce
    (
        ({ a: { head, tail }, r }, b) => 
            ({ a: pure.Iterador.couple(tail), r: [...r, head] }) , 
        
        { a: fibo_pipe, r: [] } , 
    
    ) ) (console.log); // { "a": { "head": 377 }, "r": [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ] }
    
    
    
    
    
    console.log("---=== fibo_pipeline ===---");
    
    const fibo_pipeline = 
    pure.Pipeline (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
        (pure.Iterador.map (([x, y]) => x) ) .mehr()
        (pure.Iterador.map (x => 2 * x) ) .mehr()
        (pure.Iterador.map (x => x / 2) ) .mehr()
        (pure.apply (pure.Iterador.couple) ) .wert() ;
    
    pure.Pipeline
    ( [... Array(14)].reduce
    (
        ({ a: { head, tail }, r}, b) => 
            ({ a: pure.Iterador.couple(tail), r: [...r, head] }) , 
        
        { a: fibo_pipeline, r: [] } , 
    
    ) ) (console.log) .wert(); // { "a": { "head": 377 }, "r": [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ] }
    
    
    
    
    
    
    console.log("---=== Pipeyard ===---");
    
    console.log
    ( pure.Pipeyard.BROADCAST 
    ( pure.Pipeyard (5) 
        (x => x + 7) 
        (x => "x" + x) 
        (x => "??" + x) ) 
    ); // "??x12"
    
    pure.Pipeyard (5) 
        (x => x + 7) 
        (x => "x" + x) 
        (x => "!!" + x) 
        (console.log); // "!!x12"
    
    console.log("---=== fibo_pipeyard ===---");
    
    pure.Pipeyard (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
        (pure.Iterador.map (([x, y]) => x) ) 
        (pure.Iterador.map (x => 2 * x) ) 
        (pure.Iterador.map (x => x / 2) ) 
        (pure.apply (pure.Iterador.couple) ) 
        (fibo_pipeyard => [... Array(7)].reduce
        (
            ({ a: { head, tail }, r}, b) => 
                ({ a: pure.Iterador.couple(tail), r: [...r, head] }) , 
            
            { a: fibo_pipeyard, r: [] } , 
        
        ) ) (console.log); // { "a": { "head": 13 }, "r": [ 0, 1, 1, 2, 3, 5, 8 ] }
    
    
    
    
    
    
    console.log("---=== echoable ===---");
    
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
