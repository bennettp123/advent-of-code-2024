# @advent-of-code-2024/day-04

see https://adventofcode.com/2024/day/4

* test using `yarn test && yarn lint`
* run using `yarn run script`

The [First attempt](https://github.com/bennettp123/advent-of-code-2024/pull/1)
was to produce all possible rows, columns and diagonals, and then count all
ocurrances of `XMAS` or `SAMX` (`XMAS` reversed). However, I couldn't get it to
correctly produce a list of all diagonals, so I discarded this approach.

Instead, a helper function fetches a string in a direction, up to a desired
length. We then compare this to `XMAS` for all directions, starting at each
position.

For part 2, initially attempted to count diagonals matching `M` and `S`. This
produced the expected result for the exmple provided, but the actual input
included instances of `MAM` and `SAS` (which should not match).
