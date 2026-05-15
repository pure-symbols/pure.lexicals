
## Files

分有名、无名。

File 之用，亦取亦予。实若通口，名可有无。

### 有名

有名，妇孺皆知之：循 Path 即是。诸多项事皆可如此循得。

名者所为，用于寻其所指。

如：

常存文本于如是名：
- `/etc/profile`
- `~/.profile`
- `~/.bashrc`

常存设备于如是名：
- `/dev/...`

存物于名，即能以名用之：
- 曰取： `command < /path/to/file` 乃使此 File 被取内容至 command 之 stdin
- 曰予： `command > /path/to/file` 乃使此 File 被予内容自 command 之 stdout

而使事物可具名，所谓无非复用：将一内容，一次具名、使可多用。

例假如有：
- 命令 `look-file <file-path>` 可打开指定文件阅读其内容；命令 `look-file --stdin` 则从其 stdin 读取其中内容
- 命令 `random-file <file-path>` 可产出随机文件至指定文件；命令 `random-file --stdout` 则向其 stdout 写予随机内容

则可：

~~~ sh
: 取
look-file --stdin < ~/novel.text
#: like: `look-file ~/novel.text`

: 予
random-file --stdout > ~/random.text
#: like: `random-file ~/random.text`
~~~


### 无名

无名，即有内容、不使具名，独令内容得完成之时便可当即用也。

其式：

~~~ sh
<(some-command that-can-generate-contents into-stdout.) #: 用于无名 File 内容之取
>(some-command that-can-generate-contents into-stdout.) #: 用于无名 File 内容之予
~~~

须注意，此 `<()` `>()` 乃是一语义整体！不能看作单独的 `<` `>` 与括号 `()` 的灵活组合：
- 

例假如有：
- 命令 `gen novel --file <file-path>` 可随机生成小说文本至于指定文件；命令 `gen novel --stdout` 则向其 stdout 写予小说内容
- 命令 `ai givefile --file <file-path>` 可予 AI 内容以文件；而命令 `ai givefile --stdin` 可通过 stdin 予 AI 内容

则可：

~~~ sh
: 取 - 用符 <()
ai givefile --file <(gen novel --stdout)
#: Will equivalent to: `ai givefile --file ~/novel.text` if you already have contents in this file
#: so you can see: just replace filename path as `<(content-gen-command)`

: 予 - 用符 >()
gen novel --file >(ai givefile --stdin)
#: Will equivalent to: `gen novel --file ~/novel-another.text` to save the ai-gen to a file then give that file to ai
#: also you can see: just replace filename path as `>(content-receive-command)`
~~~

又假如有：
- 命令 `gen vsix --id haberdashPI.terminal-polyglot:v0.6.0` 可生成指定 Vsix 文件二进制内容至于其 stdout ；加 `--save-file <path>` 可存为文件
- 命令 `gen oci --id ghcr.io/orhun/kmon/kmon:latest` 可生成指定 OCI TAR 文件二进制内容至于其 stdout ；加 `--save-file <path>` 可存为文件
亦有：
- 命令 `vscode plginstall --from-file <vsix-pkg-path>` 可从插件离线包文件向协议支持工具安装插件；而命令 `vscode plginstall` 则从其 stdin 读取离线包内容
- 命令 `docker load --input <oci-tar-path>` 可从镜像归档文件向容器管理工具导入镜像；而命令 `docker load` 则从其 stdin 读取归档内容

则可：

~~~ sh
: 取
docker load --input <(gen oci --id ghcr.io/orhun/kmon/kmon:latest)
#: 将等效于: `docker load --input --from-file orhun.kmon-latest.tar` 若你已存得文件
#: 从中可見: 用符 <() 于原有名之位、并填能向 stdout 生成所愿内容之命令即可

: 予
gen oci --id ghcr.io/orhun/kmon/kmon:latest --save-file >(docker load)
#: 将等效于: `gen oci --id ghcr.io/orhun/kmon/kmon:latest --save-file orhun.kmon-latest.tar` 存得文件后再去导入
#: 从中亦見: 用符 >() 于原有名之位、并填能从 stdin 取得所给内容之命令即可

::::

: 取
vscode plginstall --from-file <(gen vsix --id haberdashPI.terminal-polyglot:v0.6.0)
#: 将等效于: `vscode plginstall --from-file haberdashPI.terminal-polyglot-v0.6.0.vsix` 若你已存得文件
#: 从中可見: 用符 <() 于原有名之位、并填能向 stdout 生成所愿内容之命令即可

: 予
gen vsix --id haberdashPI.terminal-polyglot:v0.6.0 --save-file >(vscode plginstall)
#: 将等效于: `gen vsix --id haberdashPI.terminal-polyglot:v0.6.0 --save-file haberdashPI.terminal-polyglot-v0.6.0.vsix` 存得文件后再去安装
#: 从中亦見: 用符 >() 于原有名之位、并填能从 stdin 取得所给内容之命令即可
~~~

简言之：无名之名，以内容指。借符 `<()` 以取 `>()` 以予其内，乃如临名。









