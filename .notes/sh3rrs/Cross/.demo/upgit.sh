#! /bin/env bash

x_return () { return "$1" ; } && export -f -- x_return
x_bool () { ! x_return "$1" ; } && export -f -- x_bool
x_if () { x_bool "${COND:-0}" && { "$@" ; return $? ; } || { eval "$(cat -)" ; return $? ; } ; } && export -f -- x_if
# COND=1 x_if cd x < <(echo cd y)
# COND="$((2 > 1))" x_if cd x < <(echo cd y)
# COND="$((2 < 1))" x_if cd x < <(echo cd y)



#: FN='MAX_TRY=1024 upgit_rty' main
main () 
( 
	upgit () ( cd "$1" && git remote update && : ) && export -f -- upgit
	#: cd then update
	upgit_rty () 
	( 
		cd "$1" && 
		while ! (git remote update && echo :SUCC: after "$((i))" times try in: "$1"); 
		do echo :FAIL: already "$((++i))" times in: "$1" && { ! x_bool "$((i < ${MAX_TRY:-6}))" && break ; } ; done && 
		: ) && export -f -- upgit_rty
	#: same, cd then update, just add retry ability and status echo feature.
	
	fn="${1:-${FN:-upgit}}" && 
	
	#: Just for bare repo
	find -- . -name '*.git' -type d | 
		xargs -i -P0 -- sh -c "$fn {}" | 
		cat && 
	: )


#: FN='MAX_TRY=1024 upgit_rty' bash upgit.sh
#: bash upgit.sh 'MAX_TRY=1024 upgit_rty'
#: MAX_TRY=1024 bash upgit.sh upgit_rty
#: bash upgit.sh upgit_rty
#: bash upgit.sh upgit
#: bash upgit.sh
main "$@"





