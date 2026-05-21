
## Pipes

命令调遣，皆用其名。

乎其名、或简或全，并传其参、或有名或无名，即成一有其实时工作进度之所行。

命令者，号曰【程序】。所行者，号曰【进程】。后者乃调前者即可创，前者之所谓乃创后者以为用。

### 窍

所创诸行者，皆定有此三窍：
- `stdin` 曰入、以在行中有得
- `stdout` 曰出、以在行中有产
- `stderr` 曰叫、以在行中有示

假有令曰 `command-self` ：
- 可 `command-self < file-a` 以使其行中之得源于 `file-a` 之内容
- 可 `command-self > file-b` 以使其行中之产给予 `file-b` 以具名
- 可 `command-self 2> file-c` 以使其行中之示改现 `file-c` 之当中

上之三者可按需而同用。

此中之 file 亦可用无名，借符 `<(gen text)` 即能使 `gen text` 一调其行中将产之内容作此无名 file 之内容。即：可 `command-self < <(gen text)` 以使其行中之得源于 `gen text` 之行中所产。此事，可详見于: [Files](../Files)

### 管

式: 

~~~ sh
<command-a> | <command-b> | ...
~~~

即: 
- 使 command a 之向 stdout 中将填入之内容，
- 成 command b 之从 stdin 中将取得之内容。
- 往后亦同

故若有：
- 命令 `gen novel --file <file-path>` 可随机生成小说文本至于指定文件；命令 `gen novel --stdout` 则向其 stdout 写予小说内容
- 命令 `ai givefile --file <file-path>` 可予 AI 内容以文件；而命令 `ai givefile --stdin` 可通过 stdin 予 AI 内容

则可：
- `ai givefile --stdin < <(gen novel --stdout)` 概似于 `gen novel --stdout | ai givefile --stdin`
- `gen novel --stdout > >(ai givefile --stdin)` 亦概似 `gen novel --stdout | ai givefile --stdin`

--- 无非运行之主体所自不同。其：

- `ai givefile --stdin < <(gen novel --stdout)` 者：将以 `ai givefile --stdin` 之所行为主、 `gen novel --stdout` 为辅；
- `gen novel --stdout > >(ai givefile --stdin)` 者：将以 `gen novel --stdout` 之所行为主、 `ai givefile --stdin` 为辅；
- `gen novel --stdout | ai givefile --stdin` 者：将以此间 SHell 之此处作管线而得之所行为主、余者皆辅。

另：

~~~ sh
<command-a> |& <command-b> |& ...
~~~

此符 `|&` 使前之行者之 stdout 与 stderr 皆入后之行者之 stdin ，而符 `|` 则只令前之行者之 stdout 入后之行者之 stdin 。

示：

~~~ sh
(echo a >&2) |& awk '{print $0,"x"}' #> a x
~~~

此处以圆括号整体之以形成一专输出 stderr 命令之模拟。

若无之则不成，若为 `echo a >&2 |& awk '{print $0,"x"}'` 则此 `>&2` 之效乃非原行者之性：
- 其 `|&` 旦寻于其前之行者之 stdout 、无出，因已交于别处；
- 其 `|&` 旦寻于其前之行者之 stderr 、无出，因得其交者非前行者自身之 stderr 。

亦有例：

~~~ sh
echo a | (tee >(cat >&2) |& awk '{print "inside",$0}') 2>&1 | awk '{print "outside",$0}' #> outside a #> outside inside a
#: 此 inside 前之 |& 未得 tee 之 >&2 所予

echo a | ((tee >(cat >&2)) |& awk '{print "inside",$0}') 2>&1 | awk '{print "outside",$0}' #> outside inside a #> outside inside a
#: 此 inside 前之 |& 却能得 tee 之 >&2 所予：因其前得于圆括符内故可以为乃模拟 stderr 有出之一整体、则其后 |& 可得之。
~~~

特符 `|&` 虽能合前者之 stdout 与 stderr ，然亦仅此二者、更多另立之号则无复加。其符非是「万般皆汇」之意尔！

### 程

【程序】之所启于命令调遣者，【进程】也。

所用之中一 SHell ，即乃一【进程】也。乃由 SHell 之【程序】依默认命令调遣之参而所启，启为【交互式】、如是方能得【提示符】并自此输入以交互也。

人于一 SHell 之交互中，所仰赖即其所行【进程】之存在也。既所为者乃命令之交互，即明了、此【进程】之中能再启一行。此于行当中由其所又启之另行者：曰【子进程】。

夫【子进程】者，可为任一命令所能启，故亦可为有一 SHell 也。除去直呼其名之命令，管道 `|` 或圆括 `()` 亦均能启此 SHell 之【进程】之所类（即自同程序）之【子进程】：此亦上文所谓「为辅」之所指也。

花括 `{}` 则不使启另行、旦圆括 `()` 能启，故【功能】之定义者：
- `<func-name> () ( ... func body ... )` 将不使其中量名干扰本【进程】之【环境】：故可用于纯函数之定义。
- `<func-name> () { ... func body ... ; }` 将能使其中量名干扰本【进程】之【环境】：故可用于副作用之定义。

更多之详、可見乎: [Commands](../Commands)

### 管更多用 <sub>(Advantages)</sub>

#### 叉 曰分诸出 `=<=<`

行者有三窍，窍乃固有穴。

- 一曰 `stdin` 以行间入物、记作 `0`
- 一曰 `stdout` 以行间出物、记作 `1`
- 一曰 `stderr` 以行间示详、记作 `2`

此三者外，亦可启新穴为用。

穴连起止、似窍开如洞口、实路通如经络。起止必皆写明为【显】：
- 若有入无出、则不能成窍而敕令无成尔；
- 若无入有出、则其令虽成却无甚物可出。

示：

~~~ sh
: 简
(echo a >&6) 6>&1 #> a
(echo a >&3) 3>&1 #> a
(echo a >&1023) 1023>&1 #> a
(echo a 1>&1023) 1023>&1 #> a
(echo a 1>& 1023) 1023>& 1 #> a
#: 三者效同。
#: 其给予符 > 原当标出从何而予、然若从常出 &1 而予者，可略其 1 而独写一 > 符即可。

#: 释窍开曰 6 者之令文:
#: -	其 >& 6 乃显定此洞之如何入：例中定其入之源为 echo 所建行者
#: -	其 6> 乃显定此洞之如何入：例中定其出之標为圆括所建行者之 &1 常出

: 用
echo a | (tee >(cat >&3) | awk '{print "inside",$0}') 3>&1 | awk '{print "outside",$0}' #> outside a #> outside inside a
echo a | (tee >(cat >&3) | awk '{print "inside",$0}' >&1) 3>&1 | awk '{print "outside",$0}' #> outside a #> outside inside a
#: 此二者同。

#: 释:
#: -	此例中，以 tee 使入物分一叉、分出者至于窍 &3 而得免 inside 之加衔；
#: -	建 awk 以使 tee 原线出物加衔 inside 并作常出、后又将分叉至 &3 者亦并回常出；
#: -	故有二常出者，又皆得 awk 再加衔 outside ，故见经 &3 之 outside a 、与经 awk inside 之 outside inside a 。

#: 详、知者可过: 
#: 1.	建一 echo 以出物作例
#: 2.	建子行者：
#: 	-	先 tee 分支原出物使以新窍 &3 出 (其窍立源)
#: 	-	有 tee 出物 awk 加衔 inside 再使以 &1 出即出物 (二者同于此)
#: 	-	子行者新窍 &3 当得其处此使以 &1 出 (其窍立用) (新窍立源必立用)
#: 3. 再建一 awk 使前者出物再加衔以 outside 以见其效

: 又用
echo a | (tee >(cat >&3) | awk '{print "inside",$0}' >&4) 3>&1 4>&1 | awk '{print "outside",$0}' #> outside a #> outside inside a
#: 此，同于上二者。但独加衔 inside 之原叉乃使出窍 &4 、又在圆括外指其 &4 之用乃又使出回 &1 窍。

: 示用
echo a | (tee >(cat >&3) | awk '{print "inside",$0}' >&4) 3>&1 4>&2 | awk '{print "outside",$0}' #2> inside a #> outside a
#: 此，概同于上二者。但独加衔 outside 之前、使已加 inside 者用作示出而非出物，故其未予 awk outside 二不得此加衔矣。

: 另用
echo a | ( (tee >(cat >&3) | awk '{print "inside",$0}' >&4) 3>&1 4>&5 | awk '{print "outside",$0}') 5>&1 #> inside a #> outside a
echo a | ( (tee >(cat >&3) | awk '{print "inside",$0}' >&4) 3>&1 4>&666 | awk '{print "outside",$0}') 666>&1 #> inside a #> outside a
echo a | ( (tee >(cat >&3) | awk '{print "inside",$0}' >&4) 3>&1 4>&4 | awk '{print "outside",$0}') 4>&1 #> inside a #> outside a
echo a | ( (tee >(cat >&3) | awk '{print "inside",$0}' >&4) 3>&1 | awk '{print "outside",$0}') 4>&1 #> inside a #> outside a
#: 若要使上者皆出于常而非示，可如此。上诸者同，皆将衔 inside 并予 &4 之这一分叉、在 outside 前使不予 &1 即可。
#: 可予 &5 可 &6 可任意亦可原样于 &4 ，非 &1 即可不入管道。亦可 &2 ，然此线多用于行间示事、故可以不擅占之为上也。

: 用弃
echo a | ( (tee >(cat >&3) | awk '{print "inside",$0}' >&4) 3>&1 4>/dev/null | awk '{print "outside",$0}') 4>&1 #> outside a
echo a | (tee >(cat >&3) | awk '{print "inside",$0}' >&4) 3>&1 4>/dev/null | awk '{print "outside",$0}' #> outside a
#: 此例弃衔 inside 者、故仅剩 outside a 出之
#: 而因有弃故窍 &4 本若无入，无入索出则亦无可出也。

: 用多
echo a | (tee >(cat >&3) >(cat >&4) >(cat >&5) | awk '{print "inside",$0}') 3>&1 4>&2 5>/dev/null | awk '{print "outside",$0}' #2> a #> outside a #> outside inside a
#: 此例不再释之
#: 其理显而易见 请君但可一辨
~~~

式：

~~~ sh
: 简式以 &3 或 &4
(命令夫能出物 >&3) 3>&1 #> 命令所行之出物
(命令夫能出物 >&4) 4>&1 #> 命令所行之出物

: 用叉以 &3
命令夫能出物 | (tee >(cat >&3) | 命令夫当用物) 3>&1 | 另命令夫当用物

: 用叉以多
命令夫能出物 | ( ( (tee >(cat >&3) >(cat >&4) >(cat >&5) | 命令夫当用物) 3>&1 | 另一命令夫当用物) 4>&1 | 另二命令夫当用物) 5>&1 | 另三命令夫当用物
命令夫能出物 | (tee >(cat >&6) | 另三命令夫当用物) 6>&1 | (tee >(cat >&6) | 另二命令夫当用物) 6>&1 | (tee >(cat >&6) | 另一命令夫当用物) 6>&1 | 命令夫当用物
#: 若此用物之另命令皆用尽物而不再有出，则此二式可概一致。曰：予之又一窍号亦算用、但确保此窍号后又得用尔。
~~~

#### 汇 曰合诸入 `>=>=`

示以简：

~~~ sh
: 汇入一
(
	awk '{print $0,"willcatch-A"}' <&666 ; 
	: ) 666< <(echo input-A)
#> input-A willcatch-A

: 汇入二
(
	awk '{print $0,"willcatch-B"}' <&666 ; 
	awk '{print $0,"willcatch-A"}' <&22 ; 
	: ) 666< <(echo input-B) 22< <(echo input-A)
#> input-B willcatch-B
#> input-A willcatch-A

: 汇入多
(
	awk '{print $0,"willcatch-B"}' <&666 ; 
	awk '{print $0,"willcatch-A"}' <&22 ; 
	awk '{print $0,"willcatch-333"}' <&333 ; 
	: ) 22< <(echo input-A) 333< <(echo input-333) 666< <(echo input-B)
#> input-B willcatch-B
#> input-A willcatch-A
#> input-333 willcatch-333

: 汇入用零
(
	awk '{print $0,"willcatch-B"}' <&666 ; 
	awk '{print $0,"willcatch-A"}' <&22 ; 
	awk '{print $0,"willcatch-0"}' <&0 ; 
	: ) 22< <(echo input-A) 0< <(echo input-0) 666< <(echo input-B)
#> input-B willcatch-B
#> input-A willcatch-A
#> input-0 willcatch-0

: 汇入默认即用零
(
	awk '{print $0,"willcatch-B"}' <&666 ; 
	awk '{print $0,"willcatch-A"}' <&22 ; 
	awk '{print $0,"willcatch-000"}' <&0 ; 
	: ) 22< <(echo input-A) < <(echo input-000) 666< <(echo input-B)
#> input-B willcatch-B
#> input-A willcatch-A
#> input-000 willcatch-000
(
	awk '{print $0,"willcatch-B"}' <&666 ; 
	awk '{print $0,"willcatch-A"}' <&22 ; 
	awk '{print $0,"willcatch-000"}' ; 
	: ) 22< <(echo input-A) 0< <(echo input-000) 666< <(echo input-B)
#> input-B willcatch-B
#> input-A willcatch-A
#> input-000 willcatch-000
(
	awk '{print $0,"willcatch-B"}' <&666 ; 
	awk '{print $0,"willcatch-A"}' <&22 ; 
	awk '{print $0,"willcatch-000"}' ; 
	: ) 22< <(echo input-A) < <(echo input-000) 666< <(echo input-B)
#> input-B willcatch-B
#> input-A willcatch-A
#> input-000 willcatch-000
~~~

見理：
- 使 `<&号` 可定其入、使 `号< 源` 可定此入之来（来者不可缺）。
- 若未显定其入号、则号即以零为默认即如 `<&0` 写于此。
- 而 `<&0` 既为默认即意为其可省略、略之如写 `<&0` 于此。

因故更有用：

~~~ sh
: 用
echo input-A | (
	awk '{print $0,"willcatch-B"}' <&666 ; 
	awk '{print $0,"willcatch-A"}' <&0 ; 
	: ) 666< <(echo input-B)
#> input-B willcatch-B
#> input-A willcatch-A

: 用同
echo input-A | (
	awk '{print $0,"willcatch-B"}' <&666 ; 
	awk '{print $0,"willcatch-A"}' <&0 ; 
	: ) 666< <(echo input-B) 0<&0
#> input-B willcatch-B
#> input-A willcatch-A

: 并用
echo input-A | (
	awk '{print $0,"willcatch-B"}' <&666 & 
	awk '{print $0,"willcatch-A"}' <&0 & 
	wait && 
	: ) 666< <(echo input-B) 0<&0
#> input-B willcatch-B
#> input-A willcatch-A

: 再并用
echo input-E | (
	awk '{print $0,"willcatch-B"}' <&666 & 
	(sleep 1 && awk '{print $0,"willcatch-E"}') <&0 & 
	awk '{print $0,"willcatch-Y"}' <&999 & 
	wait && 
	: ) 999< <(echo input-Y) 0<&0 666< <(echo input-B)
#> input-B willcatch-B
#> input-Y willcatch-Y
#> input-E willcatch-E

: 另再并用无管
(
	(sleep 0 ; awk '{print $0,"willcatch-B"}') <&666 & 
	(sleep 2 ; awk '{print $0,"willcatch-E"}') <&0 & 
	(sleep 1 ; awk '{print $0,"willcatch-Y"}') <&999 & 
	wait && 
	: ) 999< <(echo input-Y) 0< <(echo input-E) 666< <(echo input-B)
#> input-B willcatch-B
#> input-Y willcatch-Y
#> input-E willcatch-E
~~~




