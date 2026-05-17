# FP-Style on Native SHell

原生 SHell 上的 FP 风格

[语法释見此](../../.notes/sh3rrs/.ref-sh "Means on SHell")

## Tuple from `read`

关系

~~~ sh
Tuple () { IFS="${FIELDER:-${IFS}}" read -r "${@:-x}" && :; }
~~~

示例

~~~ sh
Tuple -- a b < <(echo AAA Bb)
FIELDER=",$IFS" Tuple -- a b < <(echo AAA, Bb)

#: 皆可使 a 定值 AAA 又使 b 定值 Bb
~~~

语法見释
- [Args](../../.notes/sh3rrs/.ref-sh/Args "Args on SHell")
- [Files](../../.notes/sh3rrs/.ref-sh/Files "Files on SHell")

此 `read --` 之能也。其取一行、以 `"$IFS"` 为分割之定，将值分作各域 (Fields) 而按序各与 `--` 后之余参绑名作定。

故，亦可如是用：

~~~ sh
: 已有
md5sum.exe xiu-0.13.0-* | xargs -i -- echo echo {} | sh
#|	4cf1b683bd1ff1d721440dfe2e305b25 xiu-0.13.0-aarch64-unknown-linux-gnu
#|	e54b20c8252ed476a55da9736944239c xiu-0.13.0-x86_64-apple-darwin
#|	569d094f3ad2ff9e32ea6ddf92cc99b2 xiu-0.13.0-x86_64-pc-windows-msvc.exe
#|	b71bdc91910fca252025fafa03eafa59 xiu-0.13.0-x86_64-unknown-freebsd
#|	8ffaca951893cde8eb1da138fda65264 xiu-0.13.0-x86_64-unknown-linux-musl

: 则
md5sum.exe xiu-0.13.0-* | xargs -i -- echo echo {} | sh | while read -r -- a b; do echo $a - $b && mv "$b" "$b - md5_$a" && :; done
#|	4cf1b683bd1ff1d721440dfe2e305b25 - xiu-0.13.0-aarch64-unknown-linux-gnu
#|	e54b20c8252ed476a55da9736944239c - xiu-0.13.0-x86_64-apple-darwin
#|	569d094f3ad2ff9e32ea6ddf92cc99b2 - xiu-0.13.0-x86_64-pc-windows-msvc.exe
#|	b71bdc91910fca252025fafa03eafa59 - xiu-0.13.0-x86_64-unknown-freebsd
#|	8ffaca951893cde8eb1da138fda65264 - xiu-0.13.0-x86_64-unknown-linux-musl

#: 将得使名改之。可览如下：
ls -1 -- xiu-0.13.0-*
#|	'xiu-0.13.0-aarch64-unknown-linux-gnu - md5_4cf1b683bd1ff1d721440dfe2e305b25'
#|	'xiu-0.13.0-x86_64-apple-darwin - md5_e54b20c8252ed476a55da9736944239c'
#|	'xiu-0.13.0-x86_64-pc-windows-msvc.exe - md5_569d094f3ad2ff9e32ea6ddf92cc99b2'
#|	'xiu-0.13.0-x86_64-unknown-freebsd - md5_b71bdc91910fca252025fafa03eafa59'
#|	'xiu-0.13.0-x86_64-unknown-linux-musl - md5_8ffaca951893cde8eb1da138fda65264'
~~~

按域 (Field) 分理，此元组 (Tuple) 之所德者一也。

若所分者、与 `read --` 后之名者、数目不一，则末之多值做一域、末若不足则不予。例：

~~~ sh
(read a b c d < <(echo AA BB CC) && echo "$a - $b - $d - $c")  #> AA - BB -  - CC
(read a b < <(echo AA BB CC) && echo "$a - $b")                #> AA - BB CC
~~~

有，名参 `IFS` 可定一条目 (Entry) 之域 (Field) 分。又，匿参之选 (Option) 者 `read` 之 `-d` 可定所入数据中各条目 (Entry) 之分。

可見于例：

~~~ sh
echo	亥 戌 酉 申 未 午 巳 辰 卯 寅 丑 子 ... | while read -d ' ' -- e; do echo "$e"; done #: 可得其安序而单字为行。
~~~

此 `-d` 之值者，可约为默认换行符。而若此 `-d` 之值，不见于 `read` 之 stdin 所入，则能读入全值予于 `--` 后所指之量名。

然，纵使从头至尾而读入者，首尾之连续白符 (IFS) 则因分域为空而均为弃之。見：

~~~ sh
( read -r -d ';' -- a b < <(echo $'  \n\n  x\n  y\n  z\n  \n\n  ' ';') && echo ">>>$a~$b<<<" ) #>= $'>>>x~y\n  z<<<'
~~~

上例相应之名者有二，故第二名得后续诸值截至但遇一白符为止。

故，若应名独有一，则前后白符之清除 (trim) 即可成。示：

~~~ sh
( read -r -d ';' -- a < <(echo $'  \n\n  x\n  y\n  z\n  \n\n  ' ';') && echo ">>>$a<<<" )     #>= $' >>>x\n  y\n  z<<<
( read -r -d $'\1' -- a < <(echo $'  \n\n  x\n  y\n  z\n  \n\n  ' $'\1') && echo ">>>$a<<<" )     #>= $' >>>x\n  y\n  z<<<
( read -r -d '👻' -- a < <(echo $'  \n\n  x\n  y\n  z\n  \n\n  ' '👻') && echo ">>>$a<<<" )  #>= $' >>>x\n  y\n  z<<<
( read -r -d '​' -- a < <(echo $'  \n\n  x\n  y\n  z\n  \n\n  ' '​') && echo ">>>$a<<<" )       #>= $' >>>x\n  y\n  z<<<
~~~

上例第三，其 `-d` 之值非空值、乃一零宽字符 `​` 若用之，则可关得：

~~~ sh
trim () ( IFS="${TRIMMER:-${IFS}}" Tuple -d "${ENDER:=​}" -- s < <(echo "$@" "${ENDER}") && echo "$s" && : )
~~~

見例：

~~~ sh
: 先样示
echo  $'  \n  U W U \n  x \n\n '    $'  x\n  U W U \n   \n\n '
#|	  
#|	  U W U 
#|	  x 
#|	
#|	    x
#|	  U W U 
#|	   
#|	
#|	 

: 后样示
trim  $'  \n  U W U \n  x \n\n '    $'  x\n  U W U \n   \n\n '
#|	U W U 
#|	  x 
#|	
#|	    x
#|	  U W U
~~~





