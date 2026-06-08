#! /bin/env sh

Cross ()
{
	{ x_Return () { return "$1" ; } && export -f -- x_Return ; } && 
	{ x_Bool () { ! x_Return "$1" ; } && export -f -- x_Bool ; } && 
	{ 
		x_If () 
		{ 
			x_Bool "${COND:-0}" && 
			{ "$@" ; return $? ; } || 
			{ eval "$(cat -)" ; return $? ; } ;
		} && 
		export -f -- x_If ;
	} && 
	
	: && 
	
	x_return () ( x_Return "$@" && : ) && 
	x_bool () ( x_Bool "$@" && : ) && 
	x_if () ( x_If "$@" && : ) && 
	export -f -- x_return x_bool x_if && 
	
	: && 
	
	{ 
		x_Retry () 
		{ 
			while ! { 
				{
					"${@:-:}" ;
					rtn=$? ;
				} ;
				
				x_Return $rtn && 
				(1>&"${FILE_DESCRIPTOR:-${FD:-1}}" echo :: succeed after "$((retried))" times tryed) && 
				
				:; } ; 
			do 
				(1>&"${FILE_DESCRIPTOR:-${FD:-1}}" echo :: already tryed "$((++retried))" times) && 
				{ x_Bool "$((retried > ${MAX_TRY:-6}))" && break ; } && 
				:; 
			done && 
			
			x_Return $rtn && 
			
			:;
		} && x_retry () ( x_Retry "$@" && : ) && export -f -- x_Retry x_retry ;
	} && 
	
	: && 
	
	"$@" && 
	
	:;
} && 

cross () ( Cross "$@" && : ) && 

: \
cross "$@"



