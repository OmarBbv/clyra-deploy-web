import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

interface LoadingErrorStatesProps {
  isLoading: boolean
  isError: boolean
  errorMessage?: string
}

export default function LoadingErrorStates({
  isLoading,
  isError,
  errorMessage = "Veriler yüklenirken bir hata oluştu.",
}: LoadingErrorStatesProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-56">
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-lg font-medium">Yükleniyor...</p>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="w-full max-w-md mx-auto mt-56">
        <AlertTitle>Hata</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    )
  }

  return null
}