import { ThemeProvider } from "./contexts/ThemeProvider"
import { RouterProvider } from "react-router-dom"
import { router } from "./routers"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const client = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
