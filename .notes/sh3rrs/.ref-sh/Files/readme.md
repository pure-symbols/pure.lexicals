
## Files

分有名、无名。

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

存物于名，即能以名调遣之。

而使事物可具名，所谓无非复用：将一内容，一次具名、使可多用。

### 无名

无名，即有内容、不使具名，独令内容得完成之时便可当即用也。

其式：

~~~ sh
<(some-command that-can-generate-contents into-stdout.)
~~~

例有：
- 命令 `gen novel` 可随机生成小说文本至于其 `stdout`
- 命令 `gen vsix -- haberdashPI.terminal-polyglot` 可生成 ID 为 haberdashPI.terminal-polyglot 的 Vsix 文件二进制内容至于其 `stdout`
- 命令 `gen oci -- ghcr.io/orhun/kmon/kmon` 可生成 ID 为 ghcr.io/orhun/kmon/kmon 的 OCI TAR 文件二进制内容至于其 `stdout`
- 命令 `ai givefile -- <file-path>` 可予 AI 文件

则可：

~~~ sh
vi <(gen novel) #: like: vi some-gened-novel.text #: just replace filename path as `<(xxx)`
vscodecli-ifthereis install-plg --from-file <(gen vsix -- haberdashPI.terminal-polyglot) --not-download
cat <(gen oci -- ghcr.io/orhun/kmon/kmon) | podman load #: seems like: gen oci -- ghcr.io/orhun/kmon/kmon | podman load
ai givefile -- <(echo 'here is the contents :D') #: just give contents to a path-required interface.
~~~

简言之：无名之名，以内容指。借符 `<()` 予之，乃如临名。









