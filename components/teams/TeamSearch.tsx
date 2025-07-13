import { SearchIcon, SlidersHorizontal } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type TeamSearchProps = {
  activeTab: string
}

function TeamSearch({ activeTab }: TeamSearchProps) {
  return (
    <div className="flex justify-between">
      <div className="mt-4 flex space-x-4">
        <div className="flex h-10 items-center space-x-4 rounded-md border border-neutral-300 px-4">
          <SearchIcon />
          <Input
            className="h-8 border-none shadow-none focus:border-none focus:shadow-none focus:ring-0 focus:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:outline-none"
            placeholder="Search Task"
          />
        </div>
        <div className="flex items-center space-x-2">
          <SlidersHorizontal size={20} />
          <p>Filters</p>
        </div>
      </div>
      {activeTab === 'tasks' ? (
        <Button>Settings</Button>
      ) : activeTab === 'members' ? (
        <Button>Add Member</Button>
      ) : (
        ''
      )}
    </div>
  )
}

export default TeamSearch
