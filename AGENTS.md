# AGENTS.md

## Cursor Cloud specific instructions

This is a multi-language SDK monorepo (TypeScript, Python, C#/.NET) for Microsoft 365 Copilot APIs client libraries. There are no runnable servers or services — the "application" is a set of library packages validated via build + test.

### System dependencies (pre-installed in snapshot)

- **Node.js 22.x** (for TypeScript)
- **.NET SDK 8.x + 10.x** (installed to `$HOME/.dotnet`; `DOTNET_ROOT` and `PATH` set in `~/.bashrc`)
- **Python 3.12 + Poetry 2.x** (Poetry installed via pip; binary at `$HOME/.local/bin/poetry`)

### TypeScript (`typescript/`)

- `npm ci` installs all workspace packages (Lerna monorepo with npm workspaces).
- `npm run build` in `typescript/` runs prettier check then builds `agents-m365copilot-core` and `agents-m365copilot-beta` via Lerna. The `agents-m365copilot` (v1.0) package is excluded from the Lerna `@microsoft/agents-m365copilot-*` scope — build it separately with `npm run build` inside `typescript/packages/agents-m365copilot/`.
- `npm run test` runs Vitest tests (only `agents-m365copilot-core` has tests).
- `npm run lint` requires an `eslint.config.*` at the TypeScript root, which does not exist. Lint the core package directly: `npx eslint --config packages/agents-m365copilot-core/eslint.config.mjs --quiet "packages/agents-m365copilot-core/src/**/*.ts"` from the `typescript/` directory.

### .NET (`dotnet/`)

- `dotnet restore Microsoft.Agents.M365Copilot.sln` then `dotnet build Microsoft.Agents.M365Copilot.sln -c Debug`.
- `dotnet test Microsoft.Agents.M365Copilot.sln -c Debug` runs xUnit tests (71 tests across Core and Beta test projects).
- NU1903 warnings about `Microsoft.Bcl.Memory` vulnerability are expected and non-blocking.

### Python (`python/packages/`)

Three independent Poetry-managed packages. Each must be installed and tested separately:
- `microsoft_agents_m365copilot_core` — has 22 unit tests (`poetry run pytest .`)
- `microsoft_agents_m365copilot` — Kiota-generated, no tests (pytest exit code 5 is expected)
- `microsoft_agents_m365copilot_beta` — Kiota-generated, no tests (pytest exit code 5 is expected)

Install pattern for each: `cd python/packages/<pkg> && poetry install`.
Build: `poetry build`. Lint: `poetry run isort --check-only .`.
