# @advent-of-code-2024/day-02

see https://adventofcode.com/2024/day/2

* test using `yarn test && yarn lint`
* run using `yarn run script`

Part one uses a function to determine if a record is "safe", which is used to
count the number of "safe" records in input.txt.

Part two is a little tricker&mdash;a record is "safe" if removing an element
would make it "safe".

The approach here is a general approach, which is to exhaustively generate the
set of records with each element removed. The shortcut used here is to produce
all possible records using a generator function, and then iterate over it
until a "safe" record is encountered.

In hindsight, this was a mistake&mdash;it's unnecessarily difficult to
understand what's happening. The only small advantage to this approach is that
it can be generalized to allow more than one element to be removed, but the
challenge didn't require that, and I suspect a simple boolean flag would have
resulted in something a lot simpler.
