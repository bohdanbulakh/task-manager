# Task-manager

This application is powerful and scalable REST API for task managing.\
You can create workspaces for tasks and task categories, add users to your workspace, change their roles or assign them
a task.
The application also has permission system, which allow/deny some actions for users according to their role in
workspace.

## Requirements

- Node.js and npm
- Docker

## Development

1. Clone repo
   ```bash
   git clone https://github.com/bohdanbulakh/task-manager.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.development.env` file using [.env.example](.env.example) as template

4. Apply prisma schema to your database
   ```bash
   npx prisma migrate dev
   ```

5. Run application
   ```bash
   npm run start:dev
   ```

## Testing

1. Stop your postgresql service
   ```bash
   sudo service postgresql stop
   ```

2. Start testing database with docker compose
   ```bash
   sudo docker compose -f testing.yaml up
   ```

3. Run integration tests
   ```bash
   npm run test:integration
   ```

## Deploy

1. Clone repository

2. Ensure you have docker installed on your machine

3. Create `.env` and add these variables, that are not included in [.env.example](.env.example)
   ```dotenv
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
   ```

4. Start app
   ```shell
   sudo docker compose up
   ```

## Project  structure

```
.
├── prisma
│   └── migrations
│       ├── 20240610133121_create_initial_schema
│       ├── 20240610162859_set_default_status
│       ├── 20240613152025_add_users
│       ├── 20240617204533_add_relations
│       ├── 20240621110931_added_workspaces
│       ├── 20240709112350_improve_workspace_user_table
│       ├── 20240714103730_add_sessions
│       └── 20240721125225_create_permission_system
└── src
    └── v1
        ├── api
        │   ├── controllers
        │   ├── decorators
        │   ├── dto
        │   ├── middleware
        │   ├── pipes
        │   ├── responses
        │   └── services
        │       └── tests
        ├── config
        ├── database
        │   └── repositories
        ├── exceptions
        ├── mappers
        ├── modules
        ├── security
        │   ├── decorators
        │   ├── guards
        │   └── strategies
        └── utils
            └── documentation

34 directories

```

## Database schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Status {
  TO_DO
  IN_PROGRESS
  COMPLETED
  ON_HOLD
  CANCELLED
}

enum Priority {
  HIGH
  MEDIUM
  LOW
}

enum RoleName {
  ADMIN
  USER
}

model User {
  id             String          @id @default(uuid())
  username       String          @unique
  password       String          
  name           String          
  workspaceUsers WorkspaceUser[] 
  createdAt      DateTime        @default(now()) @map("created_at")
  updatedAt      DateTime        @updatedAt() @map("updated_at")
  sessions       Session[]       

  @@map("user")
}

model Session {
  token     String   @id
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String   @map("user_id")
  createdAt DateTime @default(now()) @map("created_at")

  @@map("session")
}

model Task {
  id             String         @id @default(uuid())
  name           String         
  description    String         
  status         Status?        @default(TO_DO)
  priority       Priority       
  deadline       DateTime?      
  workspace      Workspace      @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId    String         @map("workspace_id")
  owner          WorkspaceUser  @relation("owner", fields: [ownerId], references: [id], onDelete: Cascade)
  ownerId        String         @map("owner_id")
  assignedUser   WorkspaceUser? @relation("assigned", fields: [assignedUserId], references: [id], onDelete: SetNull)
  assignedUserId String?        @map("assigned_user_id")
  category       Category?      @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  categoryId     String?        @map("category_id")
  createdAt      DateTime       @default(now()) @map("created_at")
  updatedAt      DateTime       @updatedAt() @map("updated_at")

  @@map("task")
}

model Category {
  id          String        @id @default(uuid())
  name        String        
  description String?       
  workspace   Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId String        @map("workspace_id")
  owner       WorkspaceUser @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  ownerId     String        @map("owner_id")
  tasks       Task[]        
  createdAt   DateTime      @default(now()) @map("created_at")
  updatedAt   DateTime      @updatedAt() @map("updated_at")

  @@map("category")
}

model Workspace {
  id             String          @id @default(uuid())
  name           String          
  description    String?         
  categories     Category[]      
  tasks          Task[]          
  workspaceUsers WorkspaceUser[] 
  createdAt      DateTime        @default(now()) @map("created_at")
  updatedAt      DateTime        @updatedAt() @map("updated_at")

  @@map("workspace")
}

model WorkspaceUser {
  id                String             @id @default(uuid())
  user              User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId            String             @map("user_id")
  workspace         Workspace          @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId       String             @map("workspace_id")
  categories        Category[]         
  createdTasks      Task[]             @relation("owner")
  assignedTasks     Task[]             @relation("assigned")
  workspaceUserRole WorkspaceUserRole? 
  createdAt         DateTime           @default(now()) @map("created_at")
  updatedAt         DateTime           @updatedAt() @map("updated_at")

  @@unique([userId, workspaceId])
  @@map("workspace_user")
}

model WorkspaceUserRole {
  workspaceUser   WorkspaceUser @relation(fields: [workspaceUserId], references: [id], onDelete: Cascade)
  workspaceUserId String        @id @map("workspace_user_id")
  role            RoleName      
  permissions     Permission[]  
  createdAt       DateTime      @default(now()) @map("created_at")
  updatedAt       DateTime      @updatedAt() @map("updated_at")

  @@map("workspace_user_role")
}

model Permission {
  id                  String            @id @default(uuid())
  action              String            
  workspaceUserRole   WorkspaceUserRole @relation(fields: [workspaceUserRoleId], references: [workspaceUserId], onDelete: Cascade)
  workspaceUserRoleId String            @map("workspace_user_role_id")
  createdAt           DateTime          @default(now()) @map("created_at")
  updatedAt           DateTime          @updatedAt() @map("updated_at")

  @@unique([action, workspaceUserRoleId])
  @@map("permission")
}

```
