import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { generateFormCode } from '@/generator'

export function CodePane() {
  const { fields } = useStore()
  const code = generateFormCode(fields)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
  }

  return (
    <Card className="h-64 rounded-none border-0 border-t">
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Generated code</CardTitle>
          <Button variant="outline" size="sm" onClick={copy}>
            Copy
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-48">
          <pre className="text-xs p-3">
            <code>{code}</code>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
