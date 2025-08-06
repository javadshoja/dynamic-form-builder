import { useStore } from '../store'
import type { AnyField, SelectField, RadioField } from '../types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'

export function InspectorContent({ onClose }: { onClose?: () => void }) {
  const { fields, selectedId, updateField } = useStore()
  const field = fields.find((f) => f.id === selectedId)

  if (!field)
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Select a field on the canvas to edit its properties.
      </div>
    )

  const update = (patch: Partial<AnyField>) => updateField(field.id, patch)

  const optionsEditor = (f: SelectField | RadioField) => (
    <div className="mt-2">
      <Label className="text-sm">Options</Label>
      <div className="grid gap-2 mt-2">
        {(f.options || []).map((opt, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2">
            <Input
              value={opt.label}
              onChange={(e) => {
                const opts = [...f.options]
                opts[idx] = { ...opts[idx], label: e.target.value }
                update({ ...(f as any), options: opts })
              }}
              placeholder="Label"
            />
            <Input
              value={opt.value}
              onChange={(e) => {
                const opts = [...f.options]
                opts[idx] = { ...opts[idx], value: e.target.value }
                update({ ...(f as any), options: opts })
              }}
              placeholder="Value"
            />
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() =>
          update({
            ...(f as any),
            options: [...(f.options || []), { label: 'New', value: 'new' }],
          })
        }
      >
        + Add option
      </Button>
    </div>
  )

  return (
    <ScrollArea className="h-[calc(100vh-56px)]">
      <div className="p-4 grid gap-3">
        <div className="grid gap-1.5">
          <Label>Name</Label>
          <Input
            value={field.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>

        <div className="grid gap-1.5">
          <Label>Label</Label>
          <Input
            value={field.label || ''}
            onChange={(e) => update({ label: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Required</Label>
          <Switch
            checked={!!field.required}
            onCheckedChange={(v) => update({ required: v })}
          />
        </div>

        {field.type === 'text' && (
          <>
            <div className="grid gap-1.5">
              <Label>Placeholder</Label>
              <Input
                value={(field as any).placeholder || ''}
                onChange={(e) => update({ placeholder: e.target.value } as any)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Default</Label>
              <Input
                value={(field as any).defaultValue || ''}
                onChange={(e) =>
                  update({ defaultValue: e.target.value } as any)
                }
              />
            </div>
          </>
        )}

        {field.type === 'number' && (
          <>
            <div className="grid grid-cols-3 gap-2">
              <div className="grid gap-1.5">
                <Label>Min</Label>
                <Input
                  type="number"
                  value={(field as any).min ?? ''}
                  onChange={(e) =>
                    update({
                      min: e.target.value ? Number(e.target.value) : undefined,
                    } as any)
                  }
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Max</Label>
                <Input
                  type="number"
                  value={(field as any).max ?? ''}
                  onChange={(e) =>
                    update({
                      max: e.target.value ? Number(e.target.value) : undefined,
                    } as any)
                  }
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Step</Label>
                <Input
                  type="number"
                  value={(field as any).step ?? 1}
                  onChange={(e) =>
                    update({
                      step: e.target.value ? Number(e.target.value) : undefined,
                    } as any)
                  }
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Default</Label>
              <Input
                type="number"
                value={(field as any).defaultValue ?? ''}
                onChange={(e) =>
                  update({
                    defaultValue: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  } as any)
                }
              />
            </div>
          </>
        )}

        {field.type === 'textarea' && (
          <>
            <div className="grid gap-1.5">
              <Label>Rows</Label>
              <Input
                type="number"
                value={(field as any).rows ?? 4}
                onChange={(e) =>
                  update({ rows: Number(e.target.value) } as any)
                }
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Placeholder</Label>
              <Input
                value={(field as any).placeholder || ''}
                onChange={(e) => update({ placeholder: e.target.value } as any)}
              />
            </div>
          </>
        )}

        {(field.type === 'select' || field.type === 'radio') &&
          optionsEditor(field as any)}

        {field.type === 'date' && (
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1.5">
              <Label>Min</Label>
              <Input
                type="date"
                value={(field as any).min || ''}
                onChange={(e) => update({ min: e.target.value } as any)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Max</Label>
              <Input
                type="date"
                value={(field as any).max || ''}
                onChange={(e) => update({ max: e.target.value } as any)}
              />
            </div>
          </div>
        )}

        <div className="pt-1">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}
