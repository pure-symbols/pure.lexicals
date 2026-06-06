#! /bin/env sh

Cross ()
{
	{ x_return () { return "$1" ; } && export -f -- x_return ; } && 
	{ x_bool () { ! x_return "$1" ; } && export -f -- x_bool ; } && 
	{ 
		x_if () 
		{ 
			x_bool "${COND:-0}" && 
			{ "$@" ; return $? ; } || 
			{ eval "$(cat -)" ; return $? ; } ;
		} && 
		export -f -- x_if ;
	} && 
	
	: && 
	
	"$@" && 
	
	:;
} && 

cross () ( Cross "$@" && : ) && 

: \
cross "$@"



