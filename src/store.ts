import { create } from 'zustand'
import type { AnyField, FieldType } from './types'
import { nanoid } from 'nanoid'

type State = {
  fields: AnyField[]
  selectedId?: string
  addField: (type: FieldType) => void
  removeField: (id: string) => void
  selectField: (id?: string) => void
  moveField: (fromIndex: number, toIndex: number) => void
  updateField: (id: string, patch: Partial<AnyField>) => void
}

const defaultForType = (type: FieldType): AnyField => {
  const id = nanoid(8)
  const base = {
    id,
    type,
    name: `${type}_${id.slice(0, 4)}`,
    label: type.toUpperCase(),
    required: false,
  } as any
  switch (type) {
    case 'text':
      return { ...base, placeholder: 'Enter text', defaultValue: '' }
    case 'number':
      return {
        ...base,
        min: undefined,
        max: undefined,
        step: 1,
        defaultValue: undefined,
      }
    case 'textarea':
      return {
        ...base,
        rows: 4,
        placeholder: 'Enter details',
        defaultValue: '',
      }
    case 'select':
      return {
        ...base,
        options: [
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' },
        ],
        defaultValue: 'a',
      }
    case 'radio':
      return {
        ...base,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
        defaultValue: 'yes',
      }
    case 'checkbox':
      return { ...base, defaultChecked: false }
    case 'switch':
      return { ...base, defaultChecked: false }
    case 'date':
      return { ...base, min: undefined, max: undefined, defaultValue: '' }
  }
}

export const useStore = create<State>((set, get) => ({
  fields: [],
  selectedId: undefined,
  addField: (type) =>
    set((s) => ({
      fields: [...s.fields, defaultForType(type)],
      selectedId: get().fields.at(-1)?.id,
    })),
  removeField: (id) =>
    set((s) => ({
      fields: s.fields.filter((f) => f.id !== id),
      selectedId: s.selectedId === id ? undefined : s.selectedId,
    })),
  selectField: (id) => set({ selectedId: id }),
  moveField: (from, to) =>
    set((s) => {
      const arr = [...s.fields]
      const [item] = arr.splice(from, 1)
      arr.splice(to, 0, item)
      return { fields: arr }
    }),
  updateField: (id, patch) =>
    set((s) => ({
      fields: s.fields.map((f) =>
        f.id === id
          ? ({ ...f, ...patch, name: patch.name ?? f.name } as AnyField)
          : f,
      ),
    })),
}))
