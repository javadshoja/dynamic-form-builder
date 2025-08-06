import * as React from 'react'
import { useStore } from '../store'
import type { AnyField } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from '@tanstack/react-form'
function getDefaultValue(f: AnyField) {
  switch (f.type) {
    case 'text':
    case 'textarea':
    case 'date':
      return (f as any).defaultValue ?? ''
    case 'number':
      return (f as any).defaultValue ?? undefined
    case 'select':
    case 'radio':
      return (f as any).defaultValue ?? (f as any).options?.[0]?.value ?? ''
    case 'checkbox':
    case 'switch':
      return !!(f as any).defaultChecked
  }
}

export function Preview() {
  const { fields } = useStore()

  const form = useForm({
    defaultValues: Object.fromEntries(
      fields.map((f) => [f.name, getDefaultValue(f)]),
    ),
    onSubmit: async ({ value }) => {
      alert('Submitted: ' + JSON.stringify(value, null, 2))
    },
  })

  // Re-initialize default values when fields change (preserve values if names unchanged)
  React.useEffect(() => {
    form.reset({
      defaultValues: Object.fromEntries(
        fields.map((f) => [f.name /* compute default like above */]),
      ),
      values: Object.fromEntries(
        fields.map((f) => [
          f.name,
          form.state.values[f.name] ?? getDefaultValue(f),
        ]),
      ),
      // You can also choose to omit `values` if you want to reset to defaults
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.map((f) => `${f.name}:${f.type}`).join('|')])

  const renderField = (f: AnyField) => {
    const requiredValidator = f.required
      ? {
          onChange: ({ value }: any) =>
            !value && value !== 0 ? 'Required' : undefined,
        }
      : undefined

    switch (f.type) {
      case 'text':
        return (
          <form.Field key={f.id} name={f.name} validators={requiredValidator}>
            {(field) => (
              <div className="grid gap-1">
                <Label htmlFor={f.id}>
                  {f.label || f.name}
                  {f.required ? ' *' : ''}
                </Label>
                <Input
                  id={f.id}
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={(f as any).placeholder || ''}
                />
                {field.state.meta.errors?.length ? (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        )

      case 'number':
        return (
          <form.Field key={f.id} name={f.name} validators={requiredValidator}>
            {(field) => (
              <div className="grid gap-1">
                <Label htmlFor={f.id}>
                  {f.label || f.name}
                  {f.required ? ' *' : ''}
                </Label>
                <Input
                  id={f.id}
                  type="number"
                  value={field.state.value ?? ''}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                    )
                  }
                  min={(f as any).min}
                  max={(f as any).max}
                  step={(f as any).step ?? 1}
                />
                {field.state.meta.errors?.length ? (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        )

      case 'textarea':
        return (
          <form.Field key={f.id} name={f.name} validators={requiredValidator}>
            {(field) => (
              <div className="grid gap-1">
                <Label htmlFor={f.id}>
                  {f.label || f.name}
                  {f.required ? ' *' : ''}
                </Label>
                <Textarea
                  id={f.id}
                  rows={(f as any).rows ?? 4}
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={(f as any).placeholder || ''}
                />
                {field.state.meta.errors?.length ? (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        )

      case 'select':
        return (
          <form.Field key={f.id} name={f.name} validators={requiredValidator}>
            {(field) => (
              <div className="grid gap-1">
                <Label>
                  {f.label || f.name}
                  {f.required ? ' *' : ''}
                </Label>
                <select
                  className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm"
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  {(f as any).options?.map((o: any, idx: number) => (
                    <option key={idx} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {field.state.meta.errors?.length ? (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        )

      case 'radio':
        return (
          <form.Field key={f.id} name={f.name} validators={requiredValidator}>
            {(field) => (
              <div className="grid gap-1">
                <Label>
                  {f.label || f.name}
                  {f.required ? ' *' : ''}
                </Label>
                <div className="flex flex-wrap gap-3">
                  {(f as any).options?.map((o: any, idx: number) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name={f.name}
                        checked={field.state.value === o.value}
                        onChange={() => field.handleChange(o.value)}
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
                {field.state.meta.errors?.length ? (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        )

      case 'checkbox':
        return (
          <form.Field key={f.id} name={f.name} validators={requiredValidator}>
            {(field) => (
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={!!field.state.value}
                  onCheckedChange={(v) => field.handleChange(!!v)}
                />
                {f.label || f.name}
                {f.required ? ' *' : ''}
              </label>
            )}
          </form.Field>
        )

      case 'switch':
        return (
          <form.Field key={f.id} name={f.name} validators={requiredValidator}>
            {(field) => (
              <div className="flex items-center justify-between">
                <Label>
                  {f.label || f.name}
                  {f.required ? ' *' : ''}
                </Label>
                <Switch
                  checked={!!field.state.value}
                  onCheckedChange={(v) => field.handleChange(!!v)}
                />
              </div>
            )}
          </form.Field>
        )

      case 'date':
        return (
          <form.Field key={f.id} name={f.name} validators={requiredValidator}>
            {(field) => (
              <div className="grid gap-1">
                <Label htmlFor={f.id}>
                  {f.label || f.name}
                  {f.required ? ' *' : ''}
                </Label>
                <Input
                  id={f.id}
                  type="date"
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  min={(f as any).min || undefined}
                  max={(f as any).max || undefined}
                />
                {field.state.meta.errors?.length ? (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        )
    }
  }

  return (
    <Card className="w-[380px] h-full rounded-none border-0 border-l">
      <CardHeader className="py-3">
        <CardTitle className="text-sm">Preview</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-56px)]">
          <div className="p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="grid gap-4"
            >
              {fields.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Add fields to see the live preview here.
                </p>
              ) : (
                fields.map((f) => (
                  <div key={f.id} className="grid gap-2">
                    {renderField(f)}
                  </div>
                ))
              )}

              {fields.length > 0 && (
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              )}
            </form>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
