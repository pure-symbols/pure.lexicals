Subs () 
{
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
				awk '{print} BEGIN { print "sub command(s) here:" }'
				cat - && 
			#: only run if having args ...
			for _ in "$@" ;
			do 
				echo && 
				echo sub command: "$@" && 
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
		
		: :: && 
		"$@" && 
		: ) && 
	
	
	#. eval "$(_frame_subs codes_head)" && 
	#. eval "$(_frame_subs codes_tail)" && 
	_frame_subs () 
	(
		: 亓可别名 去别承体 && 
		: 亓可助令 略别详体 && 
		
		codes_head () 
		(
			echo '
				local __aliases_home__="$(alias)" && 
				: ' && 
			: ) && 
		codes_tail () 
		(
			echo '
				alias sub-help=aliases && aliases () ( echo "$__aliases__" | _lang_tool "${@:-help_alias}" && : ) && 
				local __aliases_ende__="$(alias)" && 
				local __aliases__="$(echo "$__aliases_ende__" | _set_tools diff "$__aliases_home__")" && 
				eval "
					{ $(aliases cat | SP='"';'"' _lang_tool alias_un) :; } && 
					$(aliases cat | SP='"'&&'"' _lang_tool alias_fn)
					$(aliases cat | SP='"'&&'"' _lang_tool alias_hp)
					: " && 
				help () ( sub-help help_alias "$@" ) && 
				: ' && 
			: ) && 
		: :: && 
		"$@" && 
		: ) && 
	
	: :: && 
	"$@" && 
	:;
} && 


Subs :;

