
在 OCaml ，可以[像这样](https://cs3110.github.io/textbook/chapters/data/lists.html#immediate-matches)模式匹配：

~~~ ml
(* use tuple *)
let rec fac = function
  | (0, acc) -> acc
  | (n, acc) -> fac (n - 1, n * acc) ;;

fac (7, 1) ;; (* 5040 *)

(* use currying *)
let rec fact = function
  | 0 -> fun acc -> acc
  | n -> fun acc -> fact (n - 1) (n * acc) ;;

fact 7 1 ;; (* 5040 *)
~~~

其中特别是第二个写法的可能，将成为我在 TS 设计单纯基于词法闭包的模式匹配功能的重要启示。
