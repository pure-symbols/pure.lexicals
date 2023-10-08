

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
    
    Tuple.RECORD = 
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
    type List <T> = (e: echo) => T | List<T> ;
    type Done = <T> () => List<T> ;
    
    export 
    const List = 
    <T,> (head: T) => 
    (tail: List<T>)
    : List<T> => 
        
        Tuple (head) (tail) ;
    
    List.Done = (<T,> (): List<T> => List.Done as List <T>) as Done ;
    
    List.head = <T,> (self: List<T>): T => Tuple.head (self) as T ;
    List.tail = <T,> (self: List<T>): List<T> => Tuple.tail (self) as List <T> ;
    
    List.ranger = 
    <T,> (untils: (low: T) => (high: T) => boolean) => 
    (steps: Fn<T, T>) => 
    (low: T) => 
    (high: T)
    : List<T> => 
        
        untils (low) (high) ? List.Done : 
            List (low) (List.ranger (untils) (steps) (pipe (low) (steps)) (high) ) ;
    
    List.range = (step: number = 1) => List.ranger <number> (low => high => low > high) (low => low + step) ;
    
    List.ARRAY = 
    <T,> (xs: T[])
    : List<T> => 
        
        pipe (xs.reverse()) 
            (looper.reduce (List.Done as List<T>) 
                (list => x => List (x) (list))
            ) as List <T> ;
    
    List.COLLECT = 
    <T,> (limit?: number) => 
    (self: List<T>): T[] => 
        
        pipe (looper.keys(limit ?? pipe (self) (List.size))) 
            (looper.reduce ({ acc: [] as T[], list: self }) 
                (({ acc, list }) => (i) => 
                    ({ acc: [... acc, pipe (list) (List.head)]
                    , list: pipe (list) (List.tail) }))
            ) .acc as T[] ;
    
    List.size = 
    <T,> (self: List<T>)
    : number => 
        
        List.Done === self ? 0 : 
            1 + List.size (pipe (self) (List.tail)) ;
    
    List.chain = <T,> (x: T) => List.chain <T> ;
    
    
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
    
    
    
    Iterador.RECORD = 
    <T,> (self: Downpour<T>)
    : Pair<T, Downpour<T> > => 
        
        apply (Tuple.RECORD) 
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
    type Drainage <S, P> = { rest: () => S, pipe: () => P } ;
    export 
    type Pipeline <T> = <R> (f: Fn<T, R>) => Pipework<R> ;
    export 
    type Pipework <T> = Drainage<T, Pipeline<T> > ;
    export 
    type pipeline = <T> (x: T) => Pipeline<T> ;
    
    const Drainage = 
    <S, P> ({ head, tail }: Pair <() => S, () => P>)
    : Drainage<S, P> => 
        
        ({ rest: head, pipe: tail }) as Drainage <S, P> ;
    
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


namespace nums 
{
    export 
    type Divides = { div: number, rem: number } ;
    
    export 
    const Divides = 
    (a: number) => 
    (b: number): Divides => 
        
        arr.black(a).reduce(
            
            ({ div: c, rem: r }, y) => 
                
                r < b ? 
                { div: c, rem: r } : 
                { div: c + 1, rem: r - b } , 
            
            { div: 0, rem: a } ) ;
    
} ;


namespace looper 
{
    export 
    const keys = (limit: number): IterableIterator<number> => Array(limit).keys() ;
    
    export 
    const reduce = 
    <R,> (init: R) => 
    <T,> (f: (init: R) => (x: T) => R) => 
    (xs: Iterable<T>): R => 
    {
        let result = init;
        for (let x of xs) { result = (f) (result) (x); }
        return result;
    } ;
    
    export 
    const map = 
    <T, U>(f: (x: T) => U) => 
    (xs: Iterable<T>): IterableIterator<U> => 
        
        (function* () { for (let x of xs) { yield f(x); } }) () ;
    
    export 
    const filter = 
    <T,> (cond: (x: T) => boolean) => 
    (xs: Iterable<T>): IterableIterator<T> => 
        
        (function* () { for (let x of xs) { if (cond(x)) { yield x; } } }) () ;
    
    export 
    const iterate = 
    <T,> (f: (x: T) => T) => 
    (x: T): IterableIterator<T> => 
        
        ( function* () 
        {
            let current = x;
            while (true) 
            {
                yield current ;
                current = f(current);
            };
        } ) () ;
    
    export 
    const unfold = 
    <T, R> (f: (x: T) => [R, T] | null) => 
    (x: T): IterableIterator<R> => 
        
        ( function* () 
        {
            let current = x;
            while (true) 
            {
                const result = f(current) ;
                if (result === null) { break; } 
                else { yield result[0] ; current = result[1]; };
            };
        } ) () ;
    
    export 
    const range = 
    (low: number) => 
    (high: number) => 
    (step: number = 1)
    : IterableIterator<number> => 
        
        pure.Pipeline (keys(nums.Divides(high - low)(step).div + 1)) 
            (map (x => x * step)) .pipe()
            (map (x => x + low)) .rest() ;
    
    export 
    const collect = 
    <T,> (xs: Iterable<T>)
    : T[] => [... xs] ;
} ;


namespace arr 
{
    export 
    const range = 
    (a: number) => (t?: number) => (b: number): number[] => 
        
        pure.pipe (looper.range (a) (b) (t)) (looper.collect) ;
    
    export 
    const black = (size: number): any[] => [... Array(size)] ;
    
    export 
    const fills = 
    <T,> (thing: T) => 
    (limit: number)
    : T[] => 
        
        new Array(limit).fill(thing) ;
    
} ;



namespace Demo
{
    
    console.log("---=== arr.range ===---");
    
    pure.pipe (arr.range (2) (3) (10) ) (console.log); // [2, 5, 8]
    pure.pipe (arr.range (2) () (10) ) (console.log); // [2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    
    console.log("---=== looper ===---");

    pure.Pipeyard (looper.keys(10))
        (looper.map (x => x * x))
        (looper.collect)
        (console.log); // [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
    
    pure.Pipeyard (looper.range (4) (10) ())
        (looper.collect)
        (console.log); // [4, 5, 6, 7, 8, 9, 10]
    
    pure.Pipeyard (looper.range (2) (10) (3))
        (looper.collect)
        (console.log); // [2, 5, 8]
    
    pure.Pipeyard (looper.keys(10))
        (looper.reduce ({ x: "", y: 1 }) (({x, y}) => z => ({ x: x + z, y :y + z })))
        (console.log); // { "x": "0123456789", "y": 46 }
    
    
    
    
    console.log("---=== Tuple ===---");
    
    pure.pipe (pure.Tuple.RECORD (pure.Tuple (1) ("zzz"))) (console.log); // { "head": 1, "tail": "zzz" }
    pure.pipe (pure.Tuple.head (pure.Tuple (1) ("zzz"))) (console.log); // 1
    pure.pipe (pure.Tuple.tail (pure.Tuple (1) ("zzz"))) (console.log); // "zzz"
    
    
    console.log("---=== Pipeline ===---");
    
    pure.Pipeline (5) 
        (x => x + 7) .pipe()
        (x => "`x" + x) .pipe()
        (console.log) .rest(); // "`x12"
    
    console.log
    ( pure.Pipeline (5) 
        (x => x + 7) .pipe()
        (x => "x" + x) .pipe()
        (x => "~~" + x) .rest()
    ); // "~~x12"
    
    
    
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
    
    
    
    console.log("---=== List ===---");
    
    pure.Pipeyard (pure.List.range () (1) (5)) 
        (pure.List.COLLECT (10)) 
        (console.log); // [1, 2, 3, 4, 5, () => pure.List.Done, () => pure.List.Done, () => pure.List.Done, () => pure.List.Done, () => pure.List.Done]
    
    pure.Pipeyard (pure.List.range () (1) (5)) 
        (pure.List.size) 
        (console.log); // 5
    
    pure.Pipeyard (pure.List.range (3) (2) (10)) 
        (pure.List.COLLECT ()) 
        (console.log); // [2, 5, 8]
    
    pure.Pipeyard ([1,2,3,7,8,7,6]) 
        (pure.List.ARRAY) 
        (pure.List.COLLECT ()) 
        (console.log); // [1, 2, 3, 7, 8, 7, 6]
    
    
    
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
    (pure.Iterador.RECORD ) ;
    
    
    pure.pipe
    ( arr.black(14).reduce
    (
        ({ a: { head, tail }, r }, b) => 
            ({ a: pure.Iterador.RECORD(tail), r: [...r, head] }) , 
        
        { a: fibo_pipe, r: [] } , 
    
    ) ) (console.log); // { "a": { "head": 377 }, "r": [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ] }
    
    
    
    console.log("---=== fibo_pipeline ===---");
    
    const fibo_pipeline = 
    pure.Pipeline (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
        (pure.Iterador.map (([x, y]) => x) ) .pipe()
        (pure.Iterador.map (x => 2 * x) ) .pipe()
        (pure.Iterador.map (x => x / 2) ) .pipe()
        (pure.Iterador.RECORD ) .rest() ;
    
    pure.Pipeline
    ( arr.black(14).reduce
    (
        ({ a: { head, tail }, r}, b) => 
            ({ a: pure.Iterador.RECORD(tail), r: [...r, head] }) , 
        
        { a: fibo_pipeline, r: [] } , 
    
    ) ) (console.log) .rest(); // { "a": { "head": 377 }, "r": [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ] }
    
    
    console.log("---=== fibo_pipeyard ===---");
    
    pure.Pipeyard (pure.Iterador.iterate ([0, 1]) (([a, b]) => [b, a + b]) ) 
        (pure.Iterador.map (([x, y]) => x) ) 
        (pure.Iterador.map (x => 2 * x) ) 
        (pure.Iterador.map (x => x / 2) ) 
        (pure.Iterador.RECORD ) 
        (fibo_pipeyard => arr.black(7).reduce
        (
            ({ a: { head, tail }, r}, b) => 
                ({ a: pure.Iterador.RECORD(tail), r: [...r, head] }) , 
            
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
