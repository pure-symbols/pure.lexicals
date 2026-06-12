
(* ── demo ──────────────────────────────────────── *)
type cell = { a: int; c: unit -> int } ;;

let cell = 
( fun () -> 

	let a = 1 in
	let b = a + 1 in
	let c = fun () -> a + b in

{ a = a; c = c } ) () ;;

(* ── effect ────────────────────────────────────── *)
cell.a   ;; (* :> 1 *)
cell.c() ;; (* :> 3 *)
cell.b   ;; (* !> This expression has type cell There is no field b within type cell *)



(* 其实 let 本身就是 iife 的糖：所以 *)


(* ── demo ──────────────────────────────────────── *)
let cell_y = 

	let a = 1 in
	let b = a + 1 in
	let c = fun () -> a + b in

{ a = a; c = c } ;;

(* ── effect ────────────────────────────────────── *)
cell_y.a   ;; (* :> 1 *)
cell_y.c() ;; (* :> 3 *)

(*
	另外，我发现如果不给变量注明类型，它会向上找到就近的那个相似的 type ，
	比如具有相同字段的 record ，不论这个 type 是什么名称。
	*)

