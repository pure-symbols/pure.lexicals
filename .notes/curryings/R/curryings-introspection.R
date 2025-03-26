
#' introspection ver.

fixedpoint = \ (f) (\ (x) (x) (x)
	) (\ (y) (f) (\ (...) (y) (y) (...))) ;

curry = \ (func) fixedpoint (\ (curried) 
	\ (...) if (base::length (base::list (...)) != base::length (base::formals (func))) 
		(\ (x) curried |> base::do.call (base::list (...) |> base::c (x))) else 
		(func) (...)) ;

#' @examples
#' 
#' define `aaba = curry (\ (x, y, z) x - y - z)`
#' then run `aaba (1) (2) (3)` will get `[1] -4`
#' 
