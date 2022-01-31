import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBoardComponent } from './task-board.component';
import { TaskQuickAddComponent } from './task-quick-add/task-quick-add.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskBoardRoutingModule } from './task-board-routing.module';



@NgModule({
  declarations: [
    TaskBoardComponent,
    TaskQuickAddComponent,
    TaskListComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    TaskBoardRoutingModule
  ]
})
export class TaskBoardModule { }
