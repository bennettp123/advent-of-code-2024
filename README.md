# advent-of-code-2024

Codebase for https://adventofcode.com/2024

Each day has two challenges.

* Day 1 can be found in `packages/day-01`.
* Day 2 can be found in `packages/day-02`.

etc.

### Running

* A script for a particular day can be run using

```bash
yarn run day NUM
```

### Adding a new day

```bash
yarn run new-day
```

* creates a new package for the next day in packages/day-NN
* sets `dependencies`, `devDependencies`, etc using the values of `initFields`
  in `.yarnrc.yml`
* copies files from `.template` into the package folder
* runs `yarn install` to populate dependencies

### Testing

To test all packages:

```bash
yarn run test
```

To test a specific day:

```bash
yarn workspace @advent-of-code-2024/day-NN run test
```


