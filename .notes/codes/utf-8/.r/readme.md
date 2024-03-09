<sup><sub>Ref by an answer from *[stackoverflow](https://stackoverflow.com/questions/29344795/generating-a-random-sequence-of-multiple-characters-in-r/77966395#77966395)*: <sub/><sup/>

To see a code number in UTF-8 means which character: 

~~~ r
#' @license mit
#' 

#' @examples 
#' 
#' `9999 %>% seq %>% utf8_see`
#' `19894:19999 %>% utf8_see`
#' ...
#' 
#' `c(65:90,97:122) %>% utf8_see` is A-Z and a-z
#' `48:57 %>% utf8_see` is 0-9
#' `9200:9203 %>% utf8_see` is some clock emoji
#' `10240:10495 %>% utf8_see` is the brailles
#' `c(768:879,1155:1158,1160:1161) %>% utf8_see` is some zero width char
#' `c(688:705,710:740,748:767,1159) %>% utf8_see` is some super/sub scripts
#' `c(94,581,652,654,710,923,955) %>% utf8_see` is some lambda like char
#' ...
#' 
utf8_see = function (n) `names<-`(n,n) |> 
	vapply (intToUtf8, FUN.VALUE="character") ;
~~~

You can just execute the codes in the examples by yourself.

Then, you can just use `sample(n)` to pick some number in it, and trans them into character with `intToUtf8`. Such as: 

~~~ r
c(65:90,97:122) %>% sample(5) %>% intToUtf8
~~~

This will give you a `5` length string with random letters, or you can make this many time i.e. 

~~~ r
7 %>% seq %>% vapply(\ (x) c(65:90,97:122) %>% sample(5) %>% intToUtf8, FUN.VALUE="character")
~~~

So we can also make a tool: 

~~~ r
library(magrittr)

#' @license agpl-3.0
#' @author y.ypa.yhm
#' 
rand.chars = \ (char.set) \ (len, times) times %>% seq %>% 
	vapply(\ (x) char.set %>% sample(len) %>% intToUtf8, FUN.VALUE="character")

`%a2z.randchars%` = c(65:90,97:122) %>% rand.chars
`%braille.randchars%` = 10240:10495 %>% rand.chars
`%num.randchars%` = 48:57 %>% rand.chars
`%lambda.randchars%` = c(94,581,652,654,710,923,955) %>% rand.chars
~~~

Then use like: 
- `5 %a2z.randchars% 10`
- `3 %braille.randchars% 4`
- `9 %num.randchars% 3`
- `4 %lambda.randchars% 3`

This is my generations: 

~~~~
> 5 %a2z.randchars% 10
 [1] "OzQIv" "wQume" "SWaQL" "nBmSE" "gjSvR" "lTMfe" "kJGqt"
 [8] "FcGnf" "jsEUw" "AhFRf"
> 3 %braille.randchars% 4
[1] "⢿⠖⡵" "⣒⠥⣑" "⣮⠨⡆" "⠘⠗⡇"
> 9 %num.randchars% 3
[1] "139475082" "286974310" "389520461"
> 4 %lambda.randchars% 3
[1] "ˆʌɅ^"  "Ʌ^λˆ" "ʎ^λɅ"
~~~~

All codes tested at the *[Webr Playground](https://webr.r-wasm.org/latest/)* and *R Studio*, here is demo on *[Shinylive](https://shinylive.io/r/editor/#code=NobwRAdghgtgpmAXGAxgCygJwM4DpNgA0qA9hAC5wVJgDEA5AAQACANgJYpXZyMzvkAOhAaNhw0czgAPWAAdWcbGJFMJTAAYBOHVsYBSAHz7GPAI4HjjAK7kAZgA4A+jzgb1jDQEYtDrQBZEH11LE1tHFzg3D1xYjw8NFAAKADYAVkQtAAZCLQB2IIAmQoBKUJt7Z1cNRnZlAEEAWgAtRigIABM2xoAvBP8HRDS88vCqqJq6xizGrQStQqyszMWAZlHKyLda5WwSeEYUVhIUAGtGOBgSACt2BK8swv9lh-8tNI2I6p3GcjReABGmCg7FYimwCWSeRSgwceS0hC8XjSGSRaQciK8KReWK8ZSMYU23ymewOPTgmBIjAA7uwOn9DhhMJDUg5BnksmlCHkHog8s9uQM+Sk8pi0lp8VYxltJrt9rxsNY5BSAPSKgGmFCYdhycgQ1SeZIBQjoryEdKFc1pfzch65QqrXIoyWEr4TH6k3isWAAjpQRgcU68dBYGJxA3CaWuRgAXkYdmsEBQ5HYZEYSQgZQ00Hg2AAPI0NBnCJnGAAfQwqQTkABuUDkCgAnun2BQACokACqlUIjAAYp2AHK4ABq9QAMp2AKIxwSoJlQZMUudlADc4ggElo253u73+4PtA3wg4QKwjaSMCgAHNteRyJgShvJBwuBAeG1rwpGqtcFkPMwUC2GgJCYIwja4I2chQJBaAwPEEDAp0uAhjgsZiII6aobgPDkGUgiYUkigQL2Ka5mUZFKOU5jlOItb1k2SQEem0hlNhuHUfIihEVQLq1O2XY9v2Q6jhO06zvOWCLpQzJgE+m4QBo+hQIUPT4O0HSodg+g1HGyTpJkOT5EUpTlEhHQoUy+pKWeoKKOpnRaTp6EPE8LxZG8HwEow5mWVg1n6BA1gwA5mlWc5cZCsMZkaX5ODCEp3owL6MHmU5umHEkxqmlalrpDaPJGQ6TppHxvlaceBoaF5KlqWl4WMA87hVes+i2WCcChU5jD+M1ojaAYQUhfV-kmKsfWaP4BhJSlXUNeNCEbmAAC+AC6QA)*.

Enjoy it. 🎉
