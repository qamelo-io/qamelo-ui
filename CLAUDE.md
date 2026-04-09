# CLAUDE.md -- qamelo-ui

This is the **qamelo-ui** monorepo -- the shared design system for all Qamelo platform frontends.
Published as `@qamelo-io/ui` on the GitHub npm registry.

## Repository structure

```
qamelo-ui/
  packages/ui/       # @qamelo-io/ui -- the published design system package
  apps/storybook/    # Storybook 8 -- internal, not published
  pnpm-workspace.yaml
```

- **pnpm workspaces** with `pnpm@10`. Always use `pnpm`, never npm or yarn.
- `packages/ui` is the only publishable package. It contains all components, tokens, and utilities.
- `apps/storybook` is the development environment for previewing and testing components. It imports from `@qamelo-io/ui` via workspace resolution.

## Commands

```bash
pnpm install                          # Install all deps
pnpm lint                             # Lint all workspaces
pnpm typecheck                        # Typecheck all workspaces
pnpm --filter @qamelo-io/ui test         # Run Vitest (packages/ui)
pnpm --filter @qamelo-io/ui build        # Build the library (Vite)
pnpm --filter storybook dev           # Start Storybook dev server (port 6006)
pnpm --filter storybook build         # Build Storybook for deployment
cd packages/ui && npm pack --dry-run  # Verify package contents
```

## How to add a new component

1. Create `packages/ui/src/components/my-component.tsx`
2. Import `cn` from `../tokens/cn`
3. Use CVA (`class-variance-authority`) for variant definitions
4. Use Radix UI primitives as the foundation where applicable
5. Export all public symbols from `packages/ui/src/index.ts` (barrel file)
6. Add a Storybook story in `apps/storybook/src/stories/MyComponent.stories.tsx`
7. Add a Vitest smoke test in `packages/ui/src/components/__tests__/my-component.test.tsx`

## Component conventions

- All components use `React.forwardRef`
- CVA for variant styling (`class-variance-authority`)
- `cn()` for class merging -- never raw string concatenation
- Lucide React for icons -- never other icon libraries
- All colors via CSS custom properties / Tailwind utilities -- never hardcoded hex/rgb/oklch values
- Components must work in both light and dark mode
- Radix UI primitives are the foundation for interactive components

## Storybook conventions

- Stories go in `apps/storybook/src/stories/`
- Import components from `@qamelo-io/ui` (workspace resolution)
- Each component gets at minimum: a Default story and an AllVariants story
- Key components should have interaction tests via `play()` functions
- The a11y addon runs automatically on all stories
- Dark mode toggle is available in the toolbar

## Testing

- Vitest with jsdom + React Testing Library
- Test files at `packages/ui/src/components/__tests__/*.test.tsx`
- Focus on external behavior, not internal implementation
- Test: rendering, variants, click/interaction handlers, disabled states
- Run with `pnpm --filter @qamelo-io/ui test`

## MSW (Mock Service Worker)

- Handlers in `apps/storybook/src/mocks/handlers/`
- Organized by domain: `auth.ts`, `users.ts`, `packages.ts`, `monitoring.ts`
- Barrel export from `handlers/index.ts`
- Stories can override handlers via `parameters.msw`

## Tokens

- `packages/ui/src/tokens/globals.css` -- all design tokens in oklch color space
- Light mode in `:root`, dark mode in `.dark`
- Tailwind 4 `@theme inline` block maps tokens to utilities
- `packages/ui/src/tokens/cn.ts` -- the `cn()` utility (clsx + tailwind-merge)
- Never hardcode colors -- always use token-based Tailwind classes

## Commit conventions

- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for tooling/config
- `docs:` for documentation
- Include slice number when applicable: `feat: add DataTable component (slice 2.2)`
