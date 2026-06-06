#! /bin/env sh

x_return () { return "$1" ; } && export -f -- x_return
x_bool () { ! x_return "$1" ; } && export -f -- x_bool
x_if () { x_bool "${COND:-0}" && { "$@" ; return $? ; } || { eval "$(cat -)" ; return $? ; } ; } && export -f -- x_if
# COND=1 x_if cd x < <(echo cd y)



#: FN='MAX_TRY=1024 upgiter_rty' upgit
#: FN=upgiter_rty upgit
#: upgit upgiter_rty
#: upgit upgiter
#: upgit
upgit () 
( 
	upgiter () ( cd "$1" && git remote update && : ) && export -f -- upgiter
	#: cd then update
	upgiter_rty () 
	( 
		cd "$1" && 
		while ! (git remote update && echo :SUCC: "$((i))" in: "$1"); 
		do echo :FAIL: "$((++i))" in: "$1" && { x_bool "$((i > ${MAX_TRY:-6}))" && break ; } ; done && 
		: ) && export -f -- upgiter_rty
	#: same, cd then update, just add retry ability and status echo feature.
	
	fn="${1:-${FN:-upgiter}}" && 
	
	#: Just for bare repo
	find -- . -name '*.git' -type d | 
		xargs -i -P0 -- sh -c "$fn {}" | 
		cat && 
	: )


#: FN='MAX_TRY=1024 upgiter_rty' sh upgit.sh
upgit "$@"
