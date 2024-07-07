# Contributing

## Set up development environment

Install dependencies:

```bash
yarn
```

## Build package

```bash
yarn clean
yarn build
```

## Publish package

### Using CI (preferred)

```bash
bumpversion patch # minor|major|patch
git push origin main --tags
```

### From local machine

Build package and publish to NPM:

```bash
yarn publish
```
