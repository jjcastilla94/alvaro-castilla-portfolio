# Contributing

Thanks for your interest in improving this portfolio. It is a personal
project, but suggestions, bug reports and small pull requests are welcome —
especially around accessibility, SEO and content accuracy.

## Getting started

Requirements: **Node.js >= 22.12** and **npm**.

```bash
git clone https://github.com/jjcastilla94/alvaro-castilla-portfolio.git
cd alvaro-castilla-portfolio
npm install
npm run dev          # http://localhost:4321
```

## Quality gates

Every push and pull request to `main` runs the same checks locally and in CI
(`.github/workflows/ci.yml`). All of them must pass before a PR is merged:

```bash
npm run format:check   # Prettier
npm run lint           # ESLint
npm run typecheck      # astro check
npm test               # Vitest (23 unit tests)
npm run build          # production build
npm run test:e2e       # Playwright (41 E2E tests)
```

Use `npm run lint:fix` and `npm run format` to fix most issues automatically.

## Branches and commits

- Branch from `main`, keep branches short-lived and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  `feat:`, `fix:`, `docs:`, `test:`, `ci:`, `style:`, `chore:`.
- Reference the motivation in the body when the change is not self-evident.

## Making changes

- **Content/data:** site copy lives in `src/data/` (see the _Content
  Management_ section of the README). No personal strings belong in
  components.
- **New project:** follow the _Adding a Project_ section of the README
  (entry in `src/data/projects.ts` + images in `src/assets/projects/<id>/`).
- **Documentation:** keep `docs/` in sync with behaviour changes
  (`architecture.md`, `testing.md`, `deployment.md`, `development-log.md`)
  and add an ADR in `docs/decisions.md` for decisions with lasting impact.
- **Tests:** bug fixes need a regression test; new features need unit and/or
  E2E coverage, or a justified note in `docs/testing.md`.

## Pull request checklist

- [ ] `format:check`, `lint`, `typecheck`, `test`, `build` and `test:e2e` pass locally
- [ ] New/changed behaviour is covered by tests (or explicitly justified)
- [ ] Docs updated when behaviour, routes, scripts or deployment change
- [ ] No secrets, API keys or personal data added to the repository
- [ ] Commit messages follow the Conventional Commits style

## Reporting issues

- **Bugs/vulnerabilities:** see [SECURITY.md](SECURITY.md) for private reporting.
- **Everything else:** open an issue with the route, expected vs. actual
  behaviour, browser and viewport.

## License

By contributing you agree that your contributions are licensed under the
[MIT License](LICENSE) of this repository.
