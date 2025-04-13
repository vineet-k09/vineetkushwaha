// components/Navbar.tsx
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="p-4 text-white flex gap-4 fixed top-0 left-0">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  )
}
