import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/schema/tarefa.schema';
import { Task } from './entities/task.entity';
import { UserModule } from 'src/user/user.module'; // Import UserModule
import { ProjectModule } from 'src/project/project.module';
import { Project, ProjectSchema } from 'src/schema/projeto.schema';
import { TaskUser, TaskUserSchema } from 'src/schema/tarefa-usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: TaskUser.name, schema: TaskUserSchema },
      { name: Project.name, schema: ProjectSchema }, // se necessário
    ]),
    UserModule, // Use forwardRef
    ProjectModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [
    TaskService,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
})
export class TaskModule {}
