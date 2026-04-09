# @qamelo-io/ui

Shared design system for all Qamelo platform frontends. This package provides UI components, design tokens, and utilities. All Qamelo applications (qamelo-console, qamelo-iam, etc.) must use this library for their UI layer.

## Setup

Add this import to your application's entry point (e.g., `main.tsx` or root layout):

```tsx
import '@qamelo-io/ui/styles/globals.css'
```

This provides all design tokens (colors, spacing, typography) and base styles for light and dark mode.

## Rules

1. **Always import from `@qamelo-io/ui`** -- never create local duplicates of components that exist in this package. All UI primitives come from the design system.

2. **Import globals.css** -- `import '@qamelo-io/ui/styles/globals.css'` must be in your app entry point. This provides all design tokens and base styles. Without it, components will not render correctly.

3. **Icons: Lucide React only** -- `import { IconName } from 'lucide-react'`. No HTML entities, no emoji, no other icon libraries.

4. **Class merging: use `cn()`** -- `import { cn } from '@qamelo-io/ui'`. Never concatenate class strings manually.

5. **Colors: design tokens only** -- use Tailwind utilities (`bg-primary`, `text-muted-foreground`, `border-destructive`). Never hardcode hex/rgb/oklch values. Never use arbitrary Tailwind values for colors (`bg-[#xxx]`).

6. **Dark mode** -- all components support light and dark mode automatically via CSS custom properties. When adding custom styling, use the `dark:` variant. Never check theme mode in JavaScript for styling purposes.

7. **Forms** -- use React Hook Form + Zod for form validation. Use the `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` components from `@qamelo-io/ui`.

8. **No browser dialogs** -- never use `window.confirm()`, `window.alert()`, or `window.prompt()`. Use the `Dialog` or `AlertDialog` components from this package. (Phase 2 will provide a `useConfirm()` hook for programmatic confirm dialogs.)

9. **v0.app decomposition** -- when importing designs from v0.app: reusable UI components belong in `@qamelo-io/ui`, page-specific composition stays in the consumer app.

10. **State management** -- `@qamelo-io/ui` is state-agnostic. Recommended: React Query (TanStack Query) for server state, Zustand for complex client state.

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
- **CommandPalette** -- cmdk-based command palette with Ctrl+K/Cmd+K shortcut, grouped items, search filtering
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

### Auth

- **AuthLayout** -- centered card layout for authentication pages (logo, title, description, footer slots)
- **LoginForm** -- email + password login form with error display, loading state, and children slot for OIDC buttons
- **PasswordForm** -- new password + confirm password form with client-side mismatch validation
- **TotpInput** -- OTP code input using InputOTP, auto-fires onComplete when all digits entered
- **OidcButton** -- outline button for "Continue with {provider}" social login flows

### Page layouts

- **AppShell** -- page layout shell with `mode` prop: `"default"` (sidebar + topbar + content) and `"canvas"` (full viewport for designer)
- **Sidebar** + **useSidebar()** -- main navigation sidebar with SidebarHeader, SidebarContent, SidebarFooter, NavGroup, NavItem, NavCollapsible. Manual collapse only. Mobile renders as Sheet overlay.
- **TopBar** -- top navigation bar with breadcrumbs, search, and actions slots
- **AuthLayout** -- centered card layout for authentication pages (logo, title, description, footer slots)
- **Error pages** -- NotFoundPage (404), ForbiddenPage (403), ServerErrorPage (500) with i18n-ready text props
- **NoAccessPage** -- access denied page for unauthorized users

### Canvas support

- **SettingsLayout** -- content-area layout with section nav sidebar for settings pages
- **FloatingToolbar** -- positioned overlay toolbar (6 positions: top-left/center/right, bottom-left/center/right)
- **SlidePanel** -- non-modal side panel sliding in from left or right, with header and scrollable content
- **CollapsiblePanel** -- bottom-anchored panel with always-visible header, expandable content area

### Data

- **DataTable** -- TanStack Table wrapper with sorting, filtering, pagination, row selection, loading skeleton, empty state. All labels i18n-ready.
- **Charts** -- LineChartWidget, BarChartWidget, AreaChartWidget, PieChartWidget wrapping Recharts with design tokens

### Guards

- **Authorize** -- conditional rendering based on `allowed` boolean, renders fallback (default: NoAccessPage) when unauthorized

### Hooks

- **useTheme()** -- light/dark/system mode with localStorage persistence. Wrap app in `<ThemeProvider>`.
- **useSidebar()** -- sidebar collapse/expand state with localStorage persistence. Used within `<SidebarProvider>`.
- **useConfirm()** -- Promise-based confirmation dialog. Returns `{ confirm, ConfirmDialog }`. Supports destructive variant.

### Utilities

- **`cn()`** -- class name merging utility (clsx + tailwind-merge). Import: `import { cn } from '@qamelo-io/ui'`

## Coming soon -- DO NOT build locally

- Finalized visual identity (color palette, typography, spacing) via v0.app prototyping (Phase 3)
