fixedpoint = \ (f) (\ (x) (x) (x)
	) (\ (y) (f) (\ (...) (y) (y) (...))) ;

curry = \ (func) fixedpoint (\ (curried) 
	\ (...) if (length (list (...)) != length (formals (func))) 
		(\ (x) curried |> do.call (list (...) |> c(x))) else 
		(func) (...)) ;

#' @examples
#' 
#' define `aaba = curry (\ (x, y, z) x - y - z)`
#' then run `aaba (1) (2) (3)` will get `[1] -4`
#' 
