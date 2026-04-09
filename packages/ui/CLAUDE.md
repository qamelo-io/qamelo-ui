# @qamelo/ui

Shared design system for all Qamelo platform frontends. This package provides UI components, design tokens, and utilities. All Qamelo applications (qamelo-console, qamelo-iam, etc.) must use this library for their UI layer.

## Setup

Add this import to your application's entry point (e.g., `main.tsx` or root layout):

```tsx
import '@qamelo/ui/styles/globals.css'
```

This provides all design tokens (colors, spacing, typography) and base styles for light and dark mode.

## Rules

1. **Always import from `@qamelo/ui`** -- never create local duplicates of components that exist in this package. All UI primitives come from the design system.

2. **Import globals.css** -- `import '@qamelo/ui/styles/globals.css'` must be in your app entry point. This provides all design tokens and base styles. Without it, components will not render correctly.

3. **Icons: Lucide React only** -- `import { IconName } from 'lucide-react'`. No HTML entities, no emoji, no other icon libraries.

4. **Class merging: use `cn()`** -- `import { cn } from '@qamelo/ui'`. Never concatenate class strings manually.

5. **Colors: design tokens only** -- use Tailwind utilities (`bg-primary`, `text-muted-foreground`, `border-destructive`). Never hardcode hex/rgb/oklch values. Never use arbitrary Tailwind values for colors (`bg-[#xxx]`).

6. **Dark mode** -- all components support light and dark mode automatically via CSS custom properties. When adding custom styling, use the `dark:` variant. Never check theme mode in JavaScript for styling purposes.

7. **Forms** -- use React Hook Form + Zod for form validation. Use the `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` components from `@qamelo/ui`.

8. **No browser dialogs** -- never use `window.confirm()`, `window.alert()`, or `window.prompt()`. Use the `Dialog` or `AlertDialog` components from this package. (Phase 2 will provide a `useConfirm()` hook for programmatic confirm dialogs.)

9. **v0.app decomposition** -- when importing designs from v0.app: reusable UI components belong in `@qamelo/ui`, page-specific composition stays in the consumer app.

10. **State management** -- `@qamelo/ui` is state-agnostic. Recommended: React Query (TanStack Query) for server state, Zustand for complex client state.

## Available components

### Primitives

- **Button** -- clickable action trigger (variants: default, destructive, outline, secondary, ghost, link)
- **Badge** -- status indicator label (variants: default, secondary, destructive, outline)
- **Input** -- single-line text input
- **Textarea** -- multi-line text input
- **Label** -- accessible form label
- **Checkbox** -- boolean toggle with checked/unchecked/indeterminate states
- **Switch** -- toggle switch for on/off settings
- **Slider** -- range input for numeric values
- **Select** -- dropdown selection from a list of options
- **RadioGroup** -- single selection from a set of options
- **Toggle** -- pressable button that toggles between on/off
- **ToggleGroup** -- group of toggles with single or multiple selection

### Feedback

- **Alert** -- inline message for important information
- **AlertDialog** -- modal confirmation dialog requiring user action
- **Dialog** -- modal overlay for focused tasks
- **Drawer** -- slide-up panel from screen bottom (mobile-friendly)
- **Sheet** -- slide-in panel from screen edge (left, right, top, bottom)
- **Toaster** (Sonner) -- toast notification system for transient messages
- **Progress** -- progress bar for loading/completion states
- **Skeleton** -- placeholder loading animation
- **Tooltip** -- small popup on hover for supplementary info
- **HoverCard** -- rich content popup on hover
- **Popover** -- floating panel anchored to a trigger element

### Navigation

- **Tabs** -- tabbed content switching
- **Accordion** -- collapsible content sections
- **Collapsible** -- single collapsible section
- **Breadcrumb** -- hierarchical page location trail
- **Pagination** -- page navigation controls
- **NavigationMenu** -- top-level site navigation with dropdowns
- **Menubar** -- horizontal menu bar with submenus
- **Command** -- searchable command palette / combobox
- **ContextMenu** -- right-click context menu
- **DropdownMenu** -- menu triggered by a button click

### Data display

- **Table** -- HTML table primitives (Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableCaption)
- **Calendar** -- date picker calendar grid
- **Card** -- container with header, content, and footer sections
- **Carousel** -- horizontally scrollable content slider
- **Chart** -- Recharts wrapper with design token integration
- **Avatar** -- user profile image with fallback
- **AspectRatio** -- maintain width-to-height ratio for content

### Layout

- **Separator** -- horizontal or vertical divider line
- **ScrollArea** -- custom styled scrollable container
- **Resizable** -- resizable panel groups (ResizablePanelGroup, ResizablePanel, ResizableHandle)

### Forms

- **Form** -- React Hook Form integration (Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage)
- **InputOTP** -- one-time password input with grouped slots

### Utilities

- **`cn()`** -- class name merging utility (clsx + tailwind-merge). Import: `import { cn } from '@qamelo/ui'`

## Coming soon (Phase 2) -- DO NOT build locally

These components are planned and will be added to `@qamelo/ui`. Do not create local implementations -- wait for the design system version.

- **AppShell** -- page layout shell (default mode: sidebar + topbar + content; canvas mode: full viewport)
- **Sidebar** + **useSidebar()** -- main navigation sidebar with NavGroup, NavItem, NavCollapsible
- **TopBar** -- top navigation bar with breadcrumbs, search, and user menu slots
- **DataTable** -- TanStack Table wrapper for all tabular data (sorting, filtering, pagination, empty state, loading skeleton)
- **useConfirm()** -- Promise-based confirm dialog hook (replaces window.confirm)
- **useTheme()** -- light/dark/system mode toggle with localStorage persistence
- **Authorize** + **NoAccessPage** -- permission-aware conditional rendering
- **Auth layouts** -- AuthLayout, LoginForm, PasswordForm, TotpInput, OidcButton
- **Error pages** -- 404, 403, 500
- **Canvas support** -- FloatingToolbar, SlidePanel, CollapsiblePanel
- **Settings layout** + **Command Palette shell**

## Coming soon (Phase 3)

- Finalized visual identity (color palette, typography, spacing) via v0.app prototyping
