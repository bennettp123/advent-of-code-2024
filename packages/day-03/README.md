# @advent-of-code-2024/day-03

see https://adventofcode.com/2024/day/3

* test using `yarn test && yarn lint`
* run using `yarn run script`

Implemented a tokenizer using two separate generator functions: the first a
tokenizer, which extracts valid tokens, and a parser, which interprets the
tokens and applies the logic.

This was a much better use of generator functions than yesterday&mdash;it
made it extremely easy to extend part&nbsp;1 to support the extra commands in
part&nbsp;2.
