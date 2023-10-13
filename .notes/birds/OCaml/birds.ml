module Birds = 
struct
	
	type 'a bird = Bird of ('a bird -> 'a bird);;
	
	let calls (Bird a) b = a b ;;
 	(* let rec calling = fun (Bird a) -> fun b -> calling (a b) ;; *)
	
	let idiot = Bird (fun a -> a ) ;;
	let identitybird = idiot ;;
	let gilaa = idiot ;;
	let id = idiot ;;
	let i = idiot ;;
	
	let mockingbird = Bird (fun (Bird a) -> a (Bird a) ) ;;
	let mock = mockingbird ;;
	let m = mockingbird ;;
	
	let kestrel = Bird (fun a -> Bird (fun b -> a )) ;;
	let truely = kestrel ;;
	let k = kestrel ;;
	
	let kite = Bird (fun a -> Bird (fun b -> b )) ;;
	let falsely = kite ;;
	let ki = kite ;;
	
	let thrush = Bird (fun a -> Bird (fun b -> calls b a )) ;;
	let piper = thrush ;;
	let t = thrush ;;
	
	let starling = Bird (fun a -> Bird (fun b -> Bird (fun c -> calls (calls a c) (calls b c) ))) ;;
	let s = starling ;;
	
end ;;

module Woods = Birds ;;
module Combinators = Birds ;;
module Combs = Birds ;;

let (|:>) = Woods.piper ;;
let (>:>) = Combs.calls ;;

let a = Combs.calls (Combs.calls (Combs.calls Combs.s Combs.i) Combs.i) Combs.ki ;;
let b = Combs.s >:> Combs.i >:> Combs.i >:> Combs.ki ;;
(* let c = Combs.calling Combs.s Combs.i Combs.i Combs.ki ;; *)


(* assert (a = b) ;; *)
(* assert (c = Combs.calling b) ;; *)
