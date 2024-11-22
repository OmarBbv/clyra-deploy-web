import { ModeToggle } from "@/components/mode-toggle"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full">
      <span>Navbar</span>
      <div>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar