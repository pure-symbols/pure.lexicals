#' Y = λf.(λs.ss)(λx.f(xx))
#' Z = λf.(λs.ss)(λx.f(λz.(xx)z))
#' 

fixedpoint <- \ (f) (\ (x) (x) (x)) (\ (y) (f) ((y) (y))) # y-combinator.

fixedpoint <- \ (f) (\ (x) (x) (x))(\ (y) (f) (\ (a) (y) (y) (a))) # z-combinator.
fixedpoint <- \ (f) (\ (x) (x) (x))(\ (y) (f) (\ (...) (y) (y) (...))) # z-combinator also.

fac <- fixedpoint (\ (f) \ (n) if (n<2) 1 else n*f(n-1))

fac(9) # [1] 362880

fib <- fixedpoint (\ (f) \ (n) if (n <= 1) n else f(n-1) + f(n-2))

fib(9) # [1] 34
