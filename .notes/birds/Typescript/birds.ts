
const aliases = 
(limit: number) => 
<T,> (thing: T)
: T[] => new Array(limit).fill(thing) ;

namespace woods 
{
    export 
    type Birds = <T extends Birds, R extends Birds> (x: T) => R ;
    
    
    
    export 
    const gilaa = 
    ( 
        <A extends Birds> (a: A)
        
        : A => a 
    
    ) as Birds ; export const 
    [
        Gilaa, identitybird, Identitybird, 
        identity, Identity, idiot, Idiot, I, 
        
        , ] = aliases(8)(gilaa) ;
    
    
    export 
    const mockingbird = 
    ( 
        <A extends Birds> (a: A)
        
        : ReturnType<A> => (a) (a) 
    
    ) as Birds ; export const 
    [
        Mockingbird, M, 

        , ] = aliases(2)(mockingbird) ;
    
    
    export 
    const kestrel = 
    ( 
        <A extends Birds> (a: A) => 
        <B extends Birds> (b: B)
        
        : A => a 
    
    ) as Birds ; export const 
    [
        Kestrel, truth, K, 
        
        , ] = aliases(3)(kestrel) ;
    
    
    export 
    const kite = 
    ( 
        <A extends Birds> (a: A) => 
        <B extends Birds> (b: B)
        
        : B => b 
    
    ) as Birds ; export const 
    [
        Kite, falseness, KI, 
        
        , ] = aliases(3)(kite) ;
    
    
    export 
    const thrush = 
    ( 
        <A extends Birds> (a: A) => 
        <B extends Birds> (b: B)
        
        : ReturnType<B> => (b) (a) 
    
    ) as Birds ; export const 
    [
        Thrush, pipe, T, 
        
        , ] = aliases(3)(thrush) ;
    
    
    
    export 
    const starling = 
    ( 
        <A extends Birds> (a: A) => 
        <B extends Birds> (b: B) => 
        <C extends Birds> (c: C)
        
        : ReturnType<ReturnType<A>> => a (c) (b (c)) 
    
    ) as Birds ; export const 
    [
        Starling, S, 
        
        , ] = aliases(2)(starling) ;
    
    
    
    export 
    const konstantmocker = 
    (
        <A extends Birds> (a: A) => 
        <B extends Birds> (b: B)
        
        : ReturnType<B> => (b) (b) 
    
    ) as Birds ; export const 
    [
        KonstantMocker, KM, 
        
        , ] = aliases(2)(konstantmocker) ;
    
    
    
    export 
    const bluebird = 
    (
        <A extends Birds> (a: A) => 
        <B extends Birds> (b: B) => 
        <C extends Birds> (c: C)
        
        : ReturnType<A> => (a) ((b) (c)) 
    
    ) as Birds ; export const 
    [
        Bluebird, B, 
        
        , ] = aliases(2)(bluebird) ;
    
    
    
    export 
    const lark = 
    (
        <A extends Birds> (a: A) => 
        <B extends Birds> (b: B)
        
        : ReturnType<A> => (a) ((b) (b)) 
    
    ) as Birds ; export const 
    [
        Lark, L, 
        
        , ] = aliases(2)(lark) ;
    
    
} ; const 
[
    birds, combs, comb, 
    combinator, combinators, 
    
    , ] = aliases(5)(woods) ;



console.log ( "------------" );

console.log ( woods.starling (woods.gilaa) (woods.gilaa) (woods.kite) ); // (b) => b
console.log ( woods.mockingbird (woods.kite) ); // (b) => b
console.log ( woods.gilaa ); // (a) => a

console.log ( combs.S (combs.I) (combs.I) (combs.KI) ); // (b) => b
console.log ( combs.M (combs.KI) ); // (b) => b
console.log ( combs.I ); // (a) => a

console.log ( birds.I ); // (a) => a
console.log ( birds.K (birds.I) ({} as woods.Birds) ); // (a) => a
console.log ( birds.KI ({} as woods.Birds) ); // (b) => b

