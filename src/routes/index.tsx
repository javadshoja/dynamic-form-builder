import { Palette } from '@/components/Palette'
import { Canvas } from '@/components/Canvas'
import { CodePane } from '@/components/CodePane'
import { Preview } from '@/components/Preview'
import { useStore } from '@/store'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { InspectorContent } from '@/components/InspectorContent'
import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export default function App() {
  const { addField, selectedId, fields } = useStore()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (selectedId) setOpen(true)
  }, [selectedId])

  const selected = fields.find((f) => f.id === selectedId)

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <div className="text-sm font-semibold">Dynamic Form Builder</div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={!selected}
          >
            Inspector
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Palette onPick={addField} />
        <Canvas />
        <Preview />
      </div>

      <CodePane />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-96 p-0">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle className="text-sm">Inspector</SheetTitle>
            <SheetDescription className="text-xs">
              Edit the selected field’s properties.
            </SheetDescription>
          </SheetHeader>
          <InspectorContent onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: App,
})
