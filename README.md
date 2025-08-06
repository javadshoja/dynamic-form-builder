# Dynamic Form Builder (TanStack Form + shadcn/ui)

A drag-and-drop form builder that lets you add fields, edit their properties, preview the live form, and generate ready-to-use code powered by TanStack Form. The UI uses shadcn/ui components, and the Inspector opens in a Sheet for a clean, focused workflow.

## Features

- Palette of field types: Text, Number, Textarea, Select, Radio, Checkbox, Switch, Date
- Canvas to arrange fields
- Inspector in a shadcn Sheet to edit name, label, required, placeholders, options, etc.
- Live Preview panel (right side) that renders a working form using TanStack Form + shadcn/ui
- Code generation pane with a Copy button (outputs a React component using TanStack Form)
- Persist and extend easily (Zustand store and typed field model)

## Tech Stack

- React + TypeScript + Vite
- @tanstack/react-form (form state and bindings)
- shadcn/ui + Tailwind CSS (UI components and styling)
- Zustand (global state)
- Optional: dnd-kit for drag-and-drop ordering (currently using click-to-add; easy to extend)

## Getting Started

1. Clone and install

```bash
git clone https://github.com/javadshoja/dynamic-form-builder dynamic-form-builder
cd dynamic-form-builder
npm install
```

## Usage

1. Add fields

- Click a field type (e.g., Text, Select) in the left Palette to add it to the Canvas.

2. Edit field properties

- Click a field in the Canvas to select it.
- Click “Inspector” in the header (auto-opens on selection).
- Use the Sheet to edit name, label, required, defaults, options, etc.

3. Live preview

- The right-side Preview renders a functional form using @tanstack/react-form and shadcn/ui components.
- Submit to see current values in an alert (you can change the handler).

4. Generate code

- The bottom Code pane keeps an up-to-date React component using TanStack Form with simple HTML inputs.
- Click Copy to copy the code to your clipboard.

## TanStack Form Notes

- This project follows the “form composition” pattern from TanStack Form v1.
- There is no FormProvider or form.Provider used. The form instance from useForm exposes JSX helpers like form.Field which we render directly.
- When fields change, Preview keeps or initializes values per field with setFieldValue.

## Customizing

- Drag-and-drop ordering: Add @dnd-kit/sortable to Canvas to allow reordering.
- Validation: Extend validators per field (min/max, patterns, custom functions).
- Schema: Optionally generate Zod schema and integrate with validators.
- Generated code: Update generator.ts to emit shadcn/ui components instead of native inputs if you want consistency with the Preview.
- Persistence: Save/load field configurations (e.g., to localStorage, files, or an API).

## Scripts

- Dev: `npm run dev`
- Build: `npm run build`
- Preview built app: `npm run preview`

## License

MIT

## Acknowledgements

- TanStack Form: https://tanstack.com/form
- shadcn/ui: https://ui.shadcn.com
- Vite: https://vitejs.dev/
- Zustand: https://github.com/pmndrs/zustand
