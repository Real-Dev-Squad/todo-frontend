import { Link } from '@tanstack/react-router'

export function Navigation() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex gap-4">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link
          to="/dashboard"
          search={{ status: undefined, tab: undefined, search: undefined }}
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>
        <Link to="/teams" search={{}} className="hover:text-gray-300">
          Teams
        </Link>
      </div>
    </nav>
  )
}
