subs () 
(
	lang () ( _lang_tool "$@" && : ) && 
	frames () ( PKG_SUBS="${PKG_SUBSLANG:-${PKG_SUBS:-subs lang}}" _frame_subs "$@" && : ) && 
	kwargs () ( _frame_kwargs "$@" && : ) && 
	: :: && 
	Subs "$@" && 
	: ) && 
Subs () 
{
	_set_tool () 
	(
		#.	__a__="$(alias)"
		#.	alias a=a b=b
		#.	alias | _set_tool diff "$__a__"
		#.	_set_tool diff "$__a__" <(alias)
		#:>	out: `alias a='a'` and `alias b='b'`
		diff () 
		(
			grep -x -F -f <( echo "$1" ) -v -- "${2:--}" && 
			: ) && 
		: :: && 
		
		#.	( echo a ; echo b ; echo c ) | _set_tool intersect $'c\nd\ne'
		#:>	out: `c`
		intersect () 
		(
			grep -x -F -f <( echo "$1" ) -- "${2:--}" && 
			: ) && 
		
		"$@" && 
		: ) && 
	
	_lang_tool () 
	(
		trim_line () 
		(
			while IFS="${SPACE_CHR:-${IFS}}" read -r -- _trimed ;
			do echo "${_trimed}" && :; done && 
			: ) && 
		
		help_alias () 
		(
			cat - | 
				SPACE_CHR="${IFS}" trim_line | 
				awk '{sub(/^alias /, ""); print}' | 
				while IFS== read -r -- a b ;
				do echo "- ${a}: means ${b}." && :; done | 
				awk '{print} BEGIN { print "'"${SUB_HINTS:-sub command(s) here:}"'" }'
				cat - && 
			#: only run if having args ...
			for _ in "$@" ;
			do 
				echo && 
				echo your command: "$@" && 
				"${@}__helper__" && 
				:; 
			return $? ; done && 
			: ) && 
		
		alias_un () 
		(
			cat - | 
				SPACE_CHR="${IFS}" trim_line | 
				awk '{sub(/^alias /, ""); print}' | 
				while IFS== read -r -- a b ;
				do 
					_name="$(echo $a)" && 
					_body="$(eval echo "$b")" && 
					test "$_name" != "$_body" && 
					echo "unalias -- $_name ${SP:-;}" && 
					:; 
				done | 
				cat - && 
			: ) && 
		
		alias_fn () 
		(
			cat - | 
				SPACE_CHR="${IFS}" trim_line | 
				awk '{sub(/^alias /, ""); print}' | 
				while IFS== read -r -- a b ;
				do 
					_name="$(echo $a)" && 
					_body="$(eval echo "$b")" && 
					test "$_name" != "$_body" && 
					echo "function $_name () ( $_body "'"$@"'" ) ${SP:-&&} " && 
					:; 
				done | 
				cat - && 
			: ) && 
		
		alias_hp () 
		(
			cat - | 
				SPACE_CHR="${IFS}" trim_line | 
				awk '{sub(/^alias /, ""); print}' | 
				while IFS== read -r -- a b ;
				do 
					_name="$(echo $a)" && 
					_body="$(eval echo "$b")" && 
					test "$_name" != "$_body" && 
					echo "function ${_name}__helper__ () ( ${_body}__helper__ "'"$@"'" ) ${SP:-&&} " && 
					:; 
				done | 
				cat - && 
			: ) && 
		
		alias_nm () 
		(
			cat - | 
				SPACE_CHR="${IFS}" trim_line | 
				awk '{sub(/^alias /, ""); print}' | 
				while IFS== read -r -- a b ;
				do 
					echo "$(echo $a)" && 
					:; 
				done | 
				cat - && 
			: ) && 
		
		: :: && 
		"$@" && 
		: ) && 
	
	
	#. eval "$(_frame_subs codes_head)" && 
	#. eval "$(_frame_subs codes_tail)" && 
	_frame_subs () 
	(
		PKG_SUBS="${PKG_SUBSLANG:-${PKG_SUBS:-Subs _lang_tool}}" && 
		NAMEMARK_MORE="${NAMEMARK_MORE:-${MARK_MORE:-}}" && 
		
		_HELP_BODY_SUBS="SUB_HINTS='${SUB_HINTS:-}' "'sub-help help_alias "$@"' && 
		_HELP_BODY_BUTN='builtin help "$@"' && 
		case "$(echo "${EVAL_PLACE:-inside}" | tr -- '[:upper:]' '[:lower:]')" 
		in 
			(i|in|inside|inner)      _help_ctrl='i'  ;; 
			(o|out|outside|outter)   _help_ctrl=''   ;; 
			(_) 1>&2 echo '[ERROR]: subs: frames: EVAL_PLACE: only support `inside` or `outside`.' ; return 7 ;; 
		esac && 

		: 亓可别名 去别承体 && 
		: 亓可助令 略别详体 && 
		
		codes_head () 
		(
			echo '
				{
					! { &>/dev/null local ; } || 
					{
						local __aliases_home__'"$NAMEMARK_MORE"' ;
						local __aliases_ende__'"$NAMEMARK_MORE"' ;
						local __aliases__'"$NAMEMARK_MORE"' ;
					} ;
					:; 
				} && 
				__aliases_home__'"$NAMEMARK_MORE"'="$(alias)" && 
				: ' && 
			: ) && 
		codes_tail () 
		(
			echo '
				alias sub-help=aliases && aliases () 
				( echo "$__aliases__'"$NAMEMARK_MORE"'" | '"${PKG_SUBS}"' "${@:-help_alias}" && : ) && 
				
				__aliases_ende__'"$NAMEMARK_MORE"'="$(alias)" && 
				__aliases__'"$NAMEMARK_MORE"'="$(
					echo "$__aliases_ende__'"$NAMEMARK_MORE"'" | 
						'"${PKG_SUBS}"' _set_tool diff "$__aliases_home__'"$NAMEMARK_MORE"'" | 
						cat -)" && 
				
				eval "
					{ $(aliases cat | SP='"';'"' '"${PKG_SUBS}"' alias_un) :; } && 
					$(aliases cat | SP='"'&&'"' '"${PKG_SUBS}"' alias_fn)
					$(aliases cat | SP='"'&&'"' '"${PKG_SUBS}"' alias_hp)
					: " && 
				
				help () 
				( 
					for _ in '"$_help_ctrl"' $(echo "$1" | '"${PKG_SUBS}"' _set_tool intersect "$(aliases cat | '"${PKG_SUBS}"' alias_nm)") ;
					do 
						{ '"{ ${_HELP_BODY_SUBS} ; } || { ${_HELP_BODY_BUTN} ; }"' ; } ;
					return $? ; done && 
					{ '"{ ${_HELP_BODY_BUTN} ; }"' ; } ; return $? && 
					: ) && 
				: ' && 
			: ) && 
		: :: && 
		"$@" && 
		: ) && 
	
	#. eval "$(_frame_kwargs as_bool SHOW_HINTS y)" && 
	#. eval "$(_frame_kwargs as_bool IS_BARE '')" && 
	_frame_kwargs () 
	(
		as_bool () 
		(
			: 其音嵌之 其出用之 && 
			local NAME_EMBEDDED="${1:-${NAME_EMBEDDED:-}}" && 
			local BOOL_DEFAULT="${2:-${BOOL_DEFAULT:-}}" && 
			echo '
				case "$(echo "${'"$NAME_EMBEDDED"':-'"$BOOL_DEFAULT"'}" | tr '"'"'[:lower:]'"'"' '"'"'[:upper:]'"'"')" 
				in 
					(Y|YES|T|TRUE|O|ON|OK) local __'"$NAME_EMBEDDED"'__=true ;; 
					(N|NO|F|FALSE|X|OFF|NOT) local __'"$NAME_EMBEDDED"'__=false ;; 
					(_) 1>&2 echo unknown kwargs '"$NAME_EMBEDDED"': "'"'"'${'"$NAME_EMBEDDED"'}'"'"'": only support true/false. ; return 13 ;; 
				esac && 
				: ' && 
			: ) && 
		: :: && 
		"$@" && 
		: ) && 
	
	: :: && 
	"$@" && 
	:;
}
