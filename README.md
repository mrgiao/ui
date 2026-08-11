# @mrgiao/ui

The shared UI library for mrgiao projects.

It is built from shadcn source components using the React Aria base. The
library owns accessible interaction behavior, component composition, semantic
Tailwind classes, and CVA variants. Each consuming project owns its theme
tokens and product-specific wrappers.

## Components

The package exports the complete shared catalogue from one entry point:

- controls: Button, Badge, Input, Textarea, Checkbox, Switch, Select, Toggle
- surfaces: Card, Dialog, AlertDialog, Popover, Sheet, Separator
- menus and navigation: DropdownMenu, Command, Tabs, Sidebar, Pagination
- feedback: Alert, Progress, Spinner, Skeleton, Empty, Sonner
- forms: Field, Label, InputGroup
- data primitives: React Aria Table and TanStack Table dependency

Import only what a project uses; bundlers can tree-shake the other exports.

```tsx
import { Badge, Button, Dialog, DropdownMenu } from "@mrgiao/ui";
import "@mrgiao/ui/styles.css";
```

## Development

```bash
npm install
npm run check
```

The package is an ESM library with generated declarations. Keep reusable
behavior here. Keep product-specific components in the consuming application.

## Install in a project

The package is published to GitHub Packages. A consuming project needs GitHub
Packages authentication and this npm scope mapping:

```bash
npm login --scope=@mrgiao --auth-type=legacy --registry=https://npm.pkg.github.com
npm config set @mrgiao:registry https://npm.pkg.github.com
npm install @mrgiao/ui
```

Use a GitHub token with package read access when npm prompts for credentials.

Then import only the components that project uses:

```tsx
import { Button, DropdownMenu, Spinner } from "@mrgiao/ui";
import "@mrgiao/ui/styles.css";
```

Release a new version by tagging the repository, for example `v0.2.0`.
GitHub Actions runs the quality gate and publishes the package.

## Theming

Components use semantic tokens such as `bg-primary`, `text-muted-foreground`,
and `border-border`. Projects can provide different visual identities by
defining their own token values in their global CSS without forking component
behavior.

## Component changes

If a component needs a reusable behavior or API change, update it here, add a
regression test, run `npm run check`, and release a new version. If a component
is specific to one product, compose the shared primitives in that product
instead of adding product language to this package.

The package is intentionally React Aria-only. Do not introduce Radix UI or
Base UI primitives.
