
# A love letter to the CSV format | 致 CSV 格式的情书

*Or why people pretending CSV is dead are wrong*

*或者，假装 CSV 已死的人为何是错的*

Every month or so, a new blog article declaring the near demise of CSV in favor of some "obviously superior" format ([parquet](https://parquet.apache.org/), newline-delimited JSON, [MessagePack](https://msgpack.org/) records etc.) find its ways to the reader's eyes. Sadly those articles often offer a very narrow and biased comparison and often fail to understand what makes CSV a seemingly unkillable staple of data serialization.

每隔一两个月，就会有一篇宣称某种“明显更优越”的格式（如 [parquet](https://parquet.apache.org/)、换行分隔的 JSON、[MessagePack](https://msgpack.org/) 记录等）即将取代 CSV 的博客文章出现在读者眼前。遗憾的是，这些文章往往只提供了非常狭隘且带有偏见的比较，并且常常无法理解是什么让 CSV 成为看似无法被取代的数据序列化基石。

It is therefore my intention, through this article, to write a love letter to this data format, often criticized for the wrong reasons, even more so when it is somehow deemed "cool" to hate on it. My point is not, far from it, to say that CSV is a silver bullet but rather to shine a light on some of the format's sometimes overlooked strengths.

因此，通过这篇文章，我的意图是向这种常因不恰当的原因受到批评，甚至当它被认为“酷”而被憎恨的数据格式，写一封情书。我的观点并非，远非，说 CSV 是万能药，而是要揭示这种格式的一些有时被忽视的优势。

## 1. CSV is dead simple | 1. CSV 极其简单

The specification of CSV holds in its title: "comma separated values". Okay, it's a lie, but still, the specification holds in a tweet and can be explained to anybody in seconds: commas separate values, new lines separate rows. Now quote values containing commas and line breaks, double your quotes, and that's it. This is so simple you might even invent it yourself without knowing it already exists while learning how to program.

CSV 的规范在其标题中就体现了：“逗号分隔值”。好吧，这是一个谎言，但仍然，这个规范可以用一条推文来概括，并且可以在几秒钟内向任何人解释：逗号分隔值，换行分隔行。现在，给包含逗号和换行的值加引号，双写引号，就这样。这如此简单，以至于你甚至可能在学习编程时不知道它已经存在的情况下自己发明它。

Of course it does not mean you should not use a dedicated CSV parser/writer because you *will* mess something up.

当然，这并不意味着你不应该使用专门的 CSV 解析器/写入器，因为你会（ *确实* ）搞砸某些事情。

## 2. CSV is a collective idea | 2. CSV 是一个集体概念

No one owns CSV. It has no real specification (yes, I know about the controversial ex-post [RFC 4180](https://datatracker.ietf.org/doc/html/rfc4180)), just a set of rules everyone kinda agrees to respect implicitly. It is, and will forever remain, an open and free collective idea.

没有人拥有 CSV。它没有真正的规范（是的，我知道那个有争议的事后发布的 [RFC 4180](https://datatracker.ietf.org/doc/html/rfc4180)），只是一套每个人或多或少都同意隐式遵守的规则。它始终是，并将永远是一个开放且自由集体性的想法。

## 3. CSV is text | 3. CSV 是文本

Like JSON, YAML or XML, CSV is just plain text, that you are free to encode however you like. CSV is not a binary format, can be opened with any text editor and does not require any specialized program to be read. This means, by extension, that it can both be read and edited by humans directly, somehow.

像 JSON、YAML 或 XML 一样，CSV 只是纯文本，你可以自由地以任何方式编码。CSV 不是一个二进制格式，可以用任何文本编辑器打开，并且不需要任何专门的程序来读取。这意味着，从广义上讲，它可以直接被人类读取和编辑。

## 4. CSV is streamable | 4. CSV 是可流式传输的

CSV can be read row by row very easily without requiring more memory than what is needed to fit a single row. This also means that a trivial program that anyone can write is able to read gigabytes of CSV data with only some kilobytes of RAM.

CSV 可以非常容易地逐行读取，而不需要比容纳单行所需的更多内存。这也意味着，任何人都能够用仅几 KB 的 RAM 读取 GB 级别的 CSV 数据的简单程序。

By comparison, column-oriented data formats such as parquet are not able to stream files row by row without requiring you to jump here and there in the file or to buffer the memory cleverly so you don't tank read performance.

相比之下，列式数据格式（如 parquet）无法在不让你在文件中跳来跳去或巧妙地缓冲内存以避免读取性能下降的情况下逐行流式传输文件。

But of course, CSV is terrible if you are only interested in specific columns because you will indeed need to read all of a row only to access the part you are interested in.

但当然，如果你只对特定列感兴趣，CSV 是很糟糕的，因为你确实需要读取整行才能访问你感兴趣的部分。

Column-oriented data format are of course a very good fit for the dataframes mindset of R, pandas and such. But critics of CSV coming from this set of practices tend to only care about use-cases where everything is expected to fit into memory.

列式数据格式当然非常适合 R、pandas 等的数据框思维。但来自这些实践批评 CSV 的人往往只关心那些所有内容都预期能适合内存的使用场景。

## 5. CSV can be appended to | 5. CSV 可以追加

It is trivial to add new rows at the end of a CSV file and it is very efficient to do so. Just open the file in append mode (`a+`) and get going.

在 CSV 文件的末尾添加新行非常简单，而且效率很高。只需以追加模式（`a+`）打开文件即可开始操作。

Once again, column-oriented data formats cannot do this, or at least not in a straightforward manner. They can actually be regarded as on-disk dataframes, and like with dataframes, adding a column is very efficient while adding a new row really isn't.

再次强调，列式数据格式无法做到这一点，或者至少不能以简单的方式实现。实际上，它们可以被视为磁盘上的数据框，与数据框类似，添加列非常高效，而添加新行则不然。

## 6. CSV is dynamically typed | 6. CSV 是动态类型的

Please don't flee. Let me explain why this is sometimes a good thing. Sometimes when dealing with data, you might like to have some flexibility, especially across programming languages, when parsing serialized data.

请不要逃离。让我解释为什么这有时是一件好事。在处理数据时，有时你可能希望有一定的灵活性，尤其是在解析序列化数据时，跨编程语言尤其如此。

Consider JavaScript, for instance, that is unable to represent 64 bits integers. Or what languages, frameworks and libraries consider as null values (don't get me started on pandas and null values). CSV lets you parse values as you see fit and is in fact dynamically typed. But this is as much of a strength as it can become a potential footgun if you are not careful.

以 JavaScript 为例，它无法表示 64 位整数。或者，哪些语言、框架和库将 null 值视为 null 值（别提 pandas 和 null 值了）。CSV 允许你根据需要解析值，实际上它是动态类型的。但如果你不小心，这既是它的优势，也可能成为潜在的陷阱。

Note also, but this might be hard to do with higher-level languages such as python and JavaScript, that you are not required to decode the text at all to process CSV cell values and that you can work directly on the binary representation of the text for performance reasons.

请注意，但这可能很难用 Python 和 JavaScript 等高级语言来实现，即您无需解码文本即可处理 CSV 单元格值，并且可以直接在文本的二进制表示上工作以提高性能。

## 7. CSV is succinct | 7. CSV 格式简洁

Having the headers written only once at the beginning of the file means the amount of formal repetition of the format is naturally very low. Consider a list of objects in JSON or the equivalent in XML and you will quickly see the cost of repeating keys everywhere. That does not mean JSON and XML will not compress very well, but few formats exhibit this level of natural conciseness.

将标题仅写在文件开头意味着格式正式重复的量自然非常低。考虑一个 JSON 中的对象列表或 XML 中的等效内容，你将很快看到到处重复键的成本。这并不意味着 JSON 和 XML 不能很好地压缩，但很少有格式表现出这种自然简洁性。

What's more, strings are often already optimally represented and the overhead of the format itself (some commas and quotes here and there) is kept to a minimum. Of course, statically-typed numbers could be represented more concisely, but you will not save up an order of magnitude there neither.

此外，字符串通常已经以最优方式表示，格式本身的额外开销（这里和那里的一些逗号和引号）保持在最低限度。当然，静态类型的数字可以表示得更简洁，但你也不会节省一个数量级。

## 8. Reverse CSV is still valid CSV | 8. 反转 CSV 仍然有效

This one is not often realized by everyone but a reversed (byte by byte) CSV file, is still valid CSV. This is only made possible because of the genius idea to escape quotes by doubling them, which means escaping is a palindrome. It would not work if CSV used a backslash-based escaping scheme, as is most common when representing string literals.

这一点并非每个人都能意识到，但一个字节反转（逐字节反转）的 CSV 文件仍然是有效的 CSV。这是由于一个天才的想法——通过重复引号来转义引号，这意味着转义本身是一个回文。如果 CSV 使用基于反斜杠的转义方案，就像在表示字符串字面量时最常见的那样，那么这是行不通的。

But why should you care? Well, this means you can read very efficiently and very easily the last rows of a CSV file. Just feed the bytes of your file in reverse order to a CSV parser, then reverse the yielded rows and their cells' bytes and you are done (maybe read the header row before though).

但是你为什么要关心呢？好吧，这意味着你可以非常高效和轻松地读取 CSV 文件的最后几行。只需将文件的字节以相反的顺序输入到 CSV 解析器中，然后反转返回的行及其单元格的字节，你就可以完成（也许在之前先读取标题行）。

This means you can very well use a CSV output as a way to efficiently resume an aborted process. You can indeed read and parse the last rows of a CSV file in constant time since you don't need to read the whole file but only to position yourself at the end of the file to buffer the bytes in reverse and feed them to the parser.

这意味着你可以非常有效地使用 CSV 输出作为恢复中断过程的一种方式。你确实可以在常数时间内读取和解析 CSV 文件的最后几行，因为你不需要读取整个文件，只需定位到文件末尾，以反向缓冲字节并将其提供给解析器即可。

## 9. Excel hates CSV | 9. Excel 不喜欢 CSV

It clearly means CSV must be doing something right.

这显然意味着 CSV 正在做些正确的事情。

Signed: [xan](https://github.com/medialab/xan#readme), the CSV magician

署名：[xan](https://github.com/medialab/xan#readme)，CSV 魔术师

<!-- flaws about multiplexing, asv -->

<!-- 多路复用的问题，ASV -->




