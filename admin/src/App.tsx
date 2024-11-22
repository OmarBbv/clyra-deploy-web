import { RouterProvider } from "react-router-dom";
import router from "@/routers/index";
import { ThemeProvider } from "./context/theme-provider";
import { client } from "./utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}