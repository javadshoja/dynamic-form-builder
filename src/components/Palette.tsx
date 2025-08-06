import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { FieldType } from '@/types'

const ITEMS: { label: string; type: FieldType }[] = [
  { label: 'Text', type: 'text' },
  { label: 'Number', type: 'number' },
  { label: 'Textarea', type: 'textarea' },
  { label: 'Select', type: 'select' },
  { label: 'Radio', type: 'radio' },
  { label: 'Checkbox', type: 'checkbox' },
  { label: 'Switch', type: 'switch' },
  { label: 'Date', type: 'date' },
]

export function Palette({ onPick }: { onPick: (type: FieldType) => void }) {
  return (
    <Card className="w-64 h-full rounded-none border-0 border-r">
      <CardHeader className="py-3">
        <CardTitle className="text-sm">Fields</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-56px)]">
          <div className="p-3 grid gap-2">
            {ITEMS.map((i) => (
              <Button
                key={i.type}
                variant="outline"
                className="justify-start"
                onClick={() => onPick(i.type)}
              >
                + {i.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
