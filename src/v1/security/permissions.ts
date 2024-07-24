export enum Permissions {
  WORKSPACES_$WORKSPACEID_UPDATE = 'workspaces:$workspaceId:update',
  WORKSPACES_$WORKSPACEID_DELETE = 'workspaces:$workspaceId:delete',
  WORKSPACES_$WORKSPACEID_MANAGE = 'workspaces:$workspaceId:manage',

  CATEGORIES_$CATEGORYID_UPDATE = 'categories:$categoryId:update',
  CATEGORIES_$CATEGORYID_DELETE = 'categories:$categoryId:delete',

  TASKS_$TASKID_UPDATE = 'tasks:$taskId:update',
  TASKS_$TASKID_DELETE = 'tasks:$taskId:delete',
}
