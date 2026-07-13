# Coding Challenges

A collection of small coding exercises implemented in TypeScript, each with its own test suite.

## Requirements

- Node.js (v20+ recommended)
- npm

## Setup

```bash
npm install
```

## Running tests

```bash
npm test
```

To debug tests with an inspector (attach via `chrome://inspect`, VS Code, or IntelliJ):

```bash
npm run test:debug                       # all tests
npm run test:debug -- path/to/file.test.ts   # a single file
```

## Project structure

Each challenge lives in `src/` as a source file paired with its own `*.test.ts` file.

| Challenge            | Source                                             | Description                                                                     |
|----------------------|----------------------------------------------------|---------------------------------------------------------------------------------|
| Group / Count / Sort | [src/group-count-sort.ts](src/group-count-sort.ts) | Generic `groupBy`, `countBy`, and `sortBy` helpers keyed by a selector function |
| Pick / Omit          | [src/pick-omit.ts](src/pick-omit.ts)               | Generic `pick` and `omit`helpers keyed by a selector function    |

## Tech stack

- TypeScript (ESM, `"type": "module"`)
- Jest + ts-jest (ESM preset)
