/* Fn */

type Fn <T, R> = (x: T) => R ;
type Lacking <T> = () => T ;

/* Pipe */

type pipe = <T,> (x: T) => <R,> (f: Fn<T, R>) => R ;
const pipe: pipe = <T,> (x: T) => <R,> (f: Fn<T, R>): R => (f) (x) ;

type Pipeyard <T> = <R,> (continuation: Fn<T, R>) => Pipeyard<R> ;
type pipeline = <T,> (head: T) => Pipeyard<T> ;

const pipeline: pipeline = <T,> (x: T): Pipeyard<T> => <R,> (c: Fn<T, R>): Pipeyard<R> => pipeline ((c) (x)) ;

/* Pair */

type Pair <Head, Tail> = { head: Head, tail: Tail } ;
const Pair = <H,> (h: H) => <T,> (t: T): Pair<H, T> => ({ head: h, tail: t }) as Pair <H, T> ;

/* Tuple */

type True = <A> (a: A) => <B> (b: B) => A ;
type False = <A> (a: A) => <B> (b: B) => B ;

const Head: True = <A,> (a: A) => <B,> (b: B): A => a ;
const Tail: False = <A,> (a: A) => <B,> (b: B): B => b ;

type Tuple <Head, Tail> = (chooser: True|False) => Head | Tail ;

const Tuple = <H,> (h: H) => <T,> (t: T): Tuple<H, T> => ( (ch: True|False): H|T => ch (h) (t) ) as Tuple <H, T> ;
Tuple.head = <H, T> (self: Tuple<H, T>): H => self (Head) as H ;
Tuple.tail = <H, T> (self: Tuple<H, T>): T => self (Tail) as T ;

Tuple.RECORD = <H, T> (self: Tuple<H, T>): Pair<H, T> => 
    Pair (pipe (self) (Tuple.head)) (pipe (self) (Tuple.tail)) ;

/* Iterator */

type Downpour <T> = () => Iterador<T> ;
type Iterador <T> = Tuple<T, Downpour<T>> ;

const Iterador = <T,> (h: T) => (t: Downpour<T>): Iterador<T> => Tuple (h) (t) ;

Iterador.iterate = <T,> (h: T) => (f: Fn<T, T>): Downpour<T> => 
    () => Iterador (h) (Iterador.iterate (f(h)) (f) ) ;

Iterador.unfold = <T,> (h: T) => <R,> (f: Fn<T, Tuple<R,T>>): Downpour<R> => 
    (({head,tail}) => () => Iterador (head) (Iterador.unfold (tail) (f))) (Tuple.RECORD (f (h))) ;

Iterador.head = <T,> (self: Downpour<T>): T => (Tuple.head) (self() as Tuple <T, Downpour<T> >) ;
Iterador.tail = <T,> (self: Downpour<T>): Downpour<T> => (Tuple.tail) (self() as Tuple <T, Downpour<T> >) ;

Iterador.map = <T, R> (f: Fn<T, R>) => (self: Downpour<T>): Downpour<R> => 
    () => Iterador (pipe (Iterador.head (self)) (f) ) (pipe (Iterador.tail (self)) (Iterador.map (f)) ) ;

Iterador.filter = <T,> (f: Fn<T, boolean>) => (self: Downpour<T>): Downpour<T> => 
    ( ({head,tail}) => 
        f(head) ? () => Iterador (head) (Iterador.filter (f) (tail)) : Iterador.filter (f) (tail) 
    ) ({ head: Iterador.head (self), tail: Iterador.tail (self) }) ;

Iterador.RECORD = <T,> (self: Downpour<T>): Pair<T, Downpour<T> > => 
    (Tuple.RECORD) (self () as Tuple <T, Downpour<T> >) ;

Iterador.TAKE = (limit: number) => <T,> (self: Downpour<T>): T[] => 
    
    [... Array(limit).keys()].reduce
    (
        ({ left, right: { head, tail } }, k) => 
            ({ left: [... left, head], right: Iterador.RECORD (tail) }) , 
        
        ({ left: [] as T[], right: Iterador.RECORD (self) }) , 

    ).left ;



/*//////////////////////////*/

pipeline (Iterador.iterate (2) (x => x + 1)) 
    (Iterador.map (x => x*x))
    (Iterador.TAKE (10)) 
    (console.log); // [4, 9, 16, 25, 36, 49, 64, 81, 100, 121] 

pipeline (Iterador.unfold (2) (x => Tuple (x*x) (x+1)))
    (Iterador.TAKE (10)) 
    (console.log); // [4, 9, 16, 25, 36, 49, 64, 81, 100, 121]

pipeline (Iterador.iterate (2) (x => x + 1)) 
    (Iterador.map (x => x*x))
    (Iterador.filter (x => x%2 != 0))
    (Iterador.TAKE (10)) 
    (console.log); // [9, 25, 49, 81, 121, 169, 225, 289, 361, 441]

pipeline (Iterador.unfold (Iterador.iterate (2) (x => x + 1)) (natus => (({head,tail}) => Tuple (head) (pipe (tail) (Iterador.filter (x => x < head * head || x % head != 0)))) (Iterador.RECORD (natus)))) 
    (Iterador.TAKE (11)) 
    (console.log); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
