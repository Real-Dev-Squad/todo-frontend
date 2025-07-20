export type UserRef = {
  id: string
  name: string
  addedOn: string | null
  tasksAssignedCount: number | null
}

export type Label = {
  id: string
  name: string
  color: string
  createdAt: string
  updatedAt: string | null
  createdBy: UserRef
  updatedBy: UserRef | null
}
