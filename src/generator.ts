import type { AnyField } from './types'

const escape = (s: string) => s.replace(/`/g, '\\`')

function fieldDefault(f: AnyField) {
  switch (f.type) {
    case 'text':
    case 'textarea':
      return f.defaultValue ?? ''
    case 'number':
      return f.defaultValue ?? (undefined as unknown as number)
    case 'select':
    case 'radio':
      return f.defaultValue ?? f.options?.[0]?.value ?? ''
    case 'checkbox':
    case 'switch':
      return !!f.defaultChecked
    case 'date':
      return f.defaultValue ?? ''
  }
}

function renderInputByType(f: AnyField) {
  const reqRule = f.required
    ? `, validators: { onChange: ({ value }) => (!value ? 'Required' : undefined) }`
    : ''
  const baseField = `<form.Field name="${f.name}"${reqRule}>
  {(field) => (
    <div className="field">
      <label>${f.label || f.name}${f.required ? ' *' : ''}</label>
      INPUT_ELEMENT
      {field.state.meta.errors?.length ? <div className="error">{field.state.meta.errors.join(', ')}</div> : null}
    </div>
  )}
</form.Field>`

  switch (f.type) {
    case 'text':
      return baseField.replace(
        'INPUT_ELEMENT',
        `<input type="text" value={field.state.value ?? ''} onChange={(e) => field.handleChange(e.target.value)} placeholder="${escape((f as any).placeholder || '')}" />`,
      )
    case 'number':
      return baseField.replace(
        'INPUT_ELEMENT',
        `<input type="number" value={field.state.value ?? ''} onChange={(e) => field.handleChange(e.target.value === '' ? undefined : Number(e.target.value))} min={(f as any).min} max={(f as any).max} step={(f as any).step ?? 1} />`,
      )
    case 'textarea':
      return baseField.replace(
        'INPUT_ELEMENT',
        `<textarea rows={(f as any).rows ?? 4} value={field.state.value ?? ''} onChange={(e) => field.handleChange(e.target.value)} placeholder="${escape((f as any).placeholder || '')}" />`,
      )
    case 'select':
      return baseField.replace(
        'INPUT_ELEMENT',
        `<select value={field.state.value ?? ''} onChange={(e) => field.handleChange(e.target.value)}>
  ${(f as any).options?.map((o: any) => `<option value="${escape(o.value)}">${escape(o.label)}</option>`).join('\n  ') || ''}
</select>`,
      )
    case 'radio':
      return baseField.replace(
        'INPUT_ELEMENT',
        `${(f as any).options?.map((o: any) => `<label><input type="radio" name="${f.name}" checked={field.state.value === '${escape(o.value)}'} onChange={() => field.handleChange('${escape(o.value)}')} /> ${escape(o.label)}</label>`).join('\n') || ''}`,
      )
    case 'checkbox':
      return baseField.replace(
        'INPUT_ELEMENT',
        `<input type="checkbox" checked={!!field.state.value} onChange={(e) => field.handleChange(e.target.checked)} />`,
      )
    case 'switch':
      return baseField.replace(
        'INPUT_ELEMENT',
        `<input type="checkbox" role="switch" checked={!!field.state.value} onChange={(e) => field.handleChange(e.target.checked)} />`,
      )
    case 'date':
      return baseField.replace(
        'INPUT_ELEMENT',
        `<input type="date" value={field.state.value ?? ''} onChange={(e) => field.handleChange(e.target.value)} min="${(f as any).min || ''}" max="${(f as any).max || ''}" />`,
      )
  }
}

export function generateFormCode(fields: AnyField[]) {
  const initialValuesLines = fields.map(
    (f) => `    ${f.name}: ${JSON.stringify(fieldDefault(f))},`,
  )
  const fieldsRender = fields.map((f) => renderInputByType(f)).join('\n\n  ')

  return `import * as React from 'react';
import { useForm } from '@tanstack/react-form';

export function GeneratedForm() {
  const form = useForm({
    defaultValues: {
${initialValuesLines.join('\n')}
    },
    onSubmit: async ({ value }) => {
      alert('Submitted: ' + JSON.stringify(value, null, 2));
    },
  });

  return (
    <form.Provider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="generated-form"
      >
  ${fieldsRender}

        <button type="submit">Submit</button>
      </form>
    </form.Provider>
  );
}
`
}
