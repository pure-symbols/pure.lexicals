# FP-Style on Native SHell

原生 SHell 上的 FP 风格

[语法释見此](../../.notes/sh3rrs/.ref-sh "Means on SHell")

## Tuple

Define

~~~ sh
Tuple () { IFS="${fielder:-$IFS}" read -r "${@:-x}" ; }
~~~

Using

~~~ sh
Tuple -- a b < <(echo AAA Bb)
fielder=",$IFS" Tuple -- a b < <(echo AAA, Bb)

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
#| 4cf1b683bd1ff1d721440dfe2e305b25 xiu-0.13.0-aarch64-unknown-linux-gnu
#| e54b20c8252ed476a55da9736944239c xiu-0.13.0-x86_64-apple-darwin
#| 569d094f3ad2ff9e32ea6ddf92cc99b2 xiu-0.13.0-x86_64-pc-windows-msvc.exe
#| b71bdc91910fca252025fafa03eafa59 xiu-0.13.0-x86_64-unknown-freebsd
#| 8ffaca951893cde8eb1da138fda65264 xiu-0.13.0-x86_64-unknown-linux-musl

: 则
md5sum.exe xiu-0.13.0-* | xargs -i -- echo echo {} | sh | while read -r -- a b; do echo $a - $b && mv "$b" "$b - md5_$a" && :; done
#| 4cf1b683bd1ff1d721440dfe2e305b25 - xiu-0.13.0-aarch64-unknown-linux-gnu
#| e54b20c8252ed476a55da9736944239c - xiu-0.13.0-x86_64-apple-darwin
#| 569d094f3ad2ff9e32ea6ddf92cc99b2 - xiu-0.13.0-x86_64-pc-windows-msvc.exe
#| b71bdc91910fca252025fafa03eafa59 - xiu-0.13.0-x86_64-unknown-freebsd
#| 8ffaca951893cde8eb1da138fda65264 - xiu-0.13.0-x86_64-unknown-linux-musl

#: 将得使名改之。可览如下：
ls -1 -- xiu-0.13.0-*
#| 'xiu-0.13.0-aarch64-unknown-linux-gnu - md5_4cf1b683bd1ff1d721440dfe2e305b25'
#| 'xiu-0.13.0-x86_64-apple-darwin - md5_e54b20c8252ed476a55da9736944239c'
#| 'xiu-0.13.0-x86_64-pc-windows-msvc.exe - md5_569d094f3ad2ff9e32ea6ddf92cc99b2'
#| 'xiu-0.13.0-x86_64-unknown-freebsd - md5_b71bdc91910fca252025fafa03eafa59'
#| 'xiu-0.13.0-x86_64-unknown-linux-musl - md5_8ffaca951893cde8eb1da138fda65264'
~~~

按域 (Field) 分理，此元组 (Tuple) 之所德者一也。

若所分者、与 `read --` 后之名者、数目不一，则末之多值做一域、末若不足则不予。例：

~~~ sh
read a b c d < <(echo AA BB CC) && echo "$a - $b - $d - $c"   #> AA - BB -  - CC
read a b < <(echo AA BB CC) && echo "$a - $b"                 #> AA - BB CC
~~~

