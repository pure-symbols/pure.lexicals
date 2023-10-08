
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

//// https://www.typescriptlang.org/play?#code/FAYw9gdgzgLgBAQwDYEsFQKZTgXjsAClQFsUYAuOCAV2ICMMAnASlwD58AeAFQBoOCMABYoIAc0rdmwSQG0AuuyoYA7nACCjRggCeRFKRjMAdADMUSJIJHjWAbmDAICYlgAOCEBjgqwYACbYwADewHDhcBgAHm5gjPBhETA6bt4AQiiMgbhwPJFRMBgQ2RlZULxwAEr5hcXYpYECUZKsOBzVDhH4XYnhvfmx8d0R4NDwYhYICDn9BMNd4ZzqNUUlmY1wBAiU6tILEf1dO0rT-f2s6HAN2HYDcfCjsPNwsocRAOKTCBUo-kUwZB0dHWFQAkn8IADksCshU3uFfv9AWCIVCdD9-CgwDAUVicXBQXD9n1iXAKoo8Mg0JgoAQABzMAgTJBTexnHpdaKDBJdR7wYhgEAAa1EYhh-hmXTm8Nyy2itTWZQE2w0e2JMsolQwMGojAg3BSGCWHDamwQrC2rHZEQu9XWNzuQz5z1epIAsoKReJxRU3XCZeSclT0FgCAAmRkC4Wi8VsjkHTkxe7PZ1CrAwRgYJCSiLS0lLFZ1K725U7VocGWcNKFxUbAh0ShpNX7DUaE7Pc6IO1lOC3LnJ539V3EgDS6czSAqGeowgqI6J6tJgcpqBDtIAzIy07AJ3GE-vwv2hv1U2RvHhZs8ugX5atu3WVbslJXq7ei9cBA2rs2Fq3q6a6A7LpbWLHs+yTJ1ICeIcZRHM8KlMZBMAgLByjgEdCSvA8FmXRBVxpAhNwIEVCj3ElsKPHkRig+BhEYagoCEHNwjzYkbwKO9QIfMtn3zV8OPfEtNi-JsZVbLUdT1A1UirE1Pwtc0gJtLsuIdSi4EHLph32bghHoxiKjcFBUgqPgsPI-ZcODAiiLohihDIpSLMdKjwmdWAEEYVBxGYzZzNlGt7ygUtVV4tj+IVILP0bct-M4ABhQLVIEEBKHin9432TVtV1fVDU4CTcuko11DYOTEE2EALUAggqqtTK4BA65excjSaJdGUAGUYE87yxAqTqFxbJc4ApPDqVDCMCA8rzRUc4AAF8WsHbS4HFNDwHoDawHoIa2voUQEBgOIKk24FnGOxg0OtcIrPw0MAFZGV8AIoDZRxQCgsAkAwYwkDAMQ-IAIgAWjB8GIbBoHGocT7oG+37-sBuYXsCYwZr6zZUagYxmVZLG-DRvHFIIbHjBIjBWGYW4AHoaeE2K6DhqAEb+gG-LJqMvTFdYCde8mzyp2n6frRnmdZpGOcJnHiZhuA6bNWKEEcR4JfZuYzpxzrKp2ugcdBC1NeMA2da24wMKF+WRboMXVZ+tnkf2vXjDdU3nYtuWFdFpQmbtxH1ad-XPZFxTTWV8X7cluZ1uN4PFZOCP-cdmOR2E+1jYtYIlsuMnrktr3Q44ZW-YdvyU9BTYs5U3P7Xz62xaAA
//// https://tsplay.dev/WYyrxW

