# Security Policy

## Reporting a Vulnerability

This repository hosts a static personal portfolio with no authentication, no
database and no server-side logic, so the attack surface is limited to the
deployed site itself.

Please **do not open a public issue** for security matters. Instead, report them
privately using one of these channels:

- **GitHub Security Advisories:** [Report a vulnerability](https://github.com/jjcastilla94/alvaro-castilla-portfolio/security/advisories/new)
- **Email:** alvarocastilla49@gmail.com (subject: `[SECURITY] alvaro-castilla-portfolio`)

## What to include

- Description of the issue and its impact
- Steps to reproduce (URL, page, payload if applicable)
- Affected URL or component (e.g. a route, the CV file, SEO metadata)

## Response

- Acknowledgement within **72 hours**
- Status update while the issue is being triaged
- Fix or mitigation published through a pull request on `main`
- Credit given in the advisory (or kept private, on request)

## Scope

In scope: the deployed site at <https://alvarocastilladev.vercel.app>, this
repository's source and CI workflow.

Out of scope: third-party services linked from the site (GitHub, LinkedIn,
Vercel status), dependency vulnerabilities with no exploit path for this
project, and social-engineering attacks against the maintainer.
