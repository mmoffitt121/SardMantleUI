import { Component, OnInit } from '@angular/core';
import { take, takeUntil, timer } from 'rxjs';
import { TaskService } from 'src/app/services/tasks/task.service';
import { DestroyableComponent } from '../../shared/util/destroyable/destroyable.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends DestroyableComponent implements OnInit  {
  public tasks: any[];

  displayedColumns: string[] = ['Name', 'Progress', 'Message', 'Submitted', 'Actions'];

  public cancel(id: string) {
    this.taskService.cancel(id).pipe(take(1)).subscribe(result => {
      this.loadTasks();
    })
  }

  private loadTasks() {
    this.taskService.get().pipe(take(1)).subscribe(tasks => this.tasks = tasks);
  }

  constructor(private taskService: TaskService) { super(); }

  ngOnInit(): void {
    timer(0, 5).pipe(takeUntil(this.destroyed$)).subscribe(x => {
      this.loadTasks();
    })
  }
}
