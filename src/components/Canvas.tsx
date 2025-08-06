import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'

export function Canvas() {
  const { fields, selectField, selectedId, removeField } = useStore()

  return (
    <div className="flex-1 h-full">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Form canvas</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-56px)]">
            <div className="p-3">
              {fields.length === 0 && (
                <div className="text-muted-foreground">
                  Click a field on the left to add it.
                </div>
              )}
              <div className="grid gap-2 mt-2">
                {fields.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => selectField(f.id)}
                    className={`border rounded-md p-3 cursor-pointer transition ${
                      selectedId === f.id
                        ? 'ring-2 ring-primary'
                        : 'hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {f.type}
                        </div>
                        <div className="font-medium">{f.label || f.name}</div>
                        <div className="text-xs text-muted-foreground">
                          name: {f.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {f.required ? (
                          <Badge variant="secondary">required</Badge>
                        ) : null}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeField(f.id)
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
