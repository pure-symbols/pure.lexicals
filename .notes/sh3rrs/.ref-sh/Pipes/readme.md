
## Pipes

命令调遣，皆用其名。

乎其名、或简或全，并传其参、或有名或无名，即成一有其实时工作进度之所行。

命令者，号曰【程序】。所行者，号曰【进程】。后者乃调前者即可创，前者之所谓乃创后者以为用。

### 窍

所创诸行，皆定有此三窍：
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

### 程

【程序】之所启于命令调遣者，【进程】也。

所用之中一 SHell ，即乃一【进程】也。乃由 SHell 之【程序】依默认命令调遣之参而所启，启为【交互式】、如是方能得【提示符】并自此输入以交互也。

人于一 SHell 之交互中，所仰赖即其所行【进程】之存在也。既所为者乃命令之交互，即明了、此【进程】之中能再启一行。此于行当中由其所又启之另行者：曰【子进程】。

夫【子进程】者，可为任一命令所能启，故亦可为有一 SHell 也。除去直呼其名之命令，管道 `|` 或圆括 `()` 亦均能启此 SHell 之【进程】之所类（即自同程序）之【子进程】：此亦上文所谓「为辅」之所指也。

花括 `{}` 则不使启另行、旦圆括 `()` 能启，故【功能】之定义者：
- `<func-name> () ( ... func body ... )` 将不使其中量名干扰本【进程】之【环境】：故可用于纯函数之定义。
- `<func-name> () { ... func body ... ; }` 将能使其中量名干扰本【进程】之【环境】：故可用于副作用之定义。

更多之详、可見乎: [Commands](../Commands)
