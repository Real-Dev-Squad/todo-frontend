import { USER_TYPE_ENUM } from '../common/common-enum'

export type TaskAssignmentReqDto = {
  task_id: string
  assignee_id: string
  user_type: USER_TYPE_ENUM
}
