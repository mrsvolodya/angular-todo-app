import { Component } from '@angular/core';
import { MessageComponent } from '../../components/message/message.component';
import { Todo } from '../../types/todo';
import { TodosService } from '../../services/todos.service';
import { MessageService } from '../../services/message.service';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoComponent } from '../../components/todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { FilterComponent } from '../../components/filter/filter.component';
import { ActivatedRoute } from '@angular/router';
import { Params } from '../../types/params';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [
    MessageComponent,
    TodoFormComponent,
    TodoComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FilterComponent,
  ],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
})
export class TodosPageComponent {
  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  todos$ = this.todosService.todos$;
  activeTodos$ = this.todos$.pipe(
    distinctUntilChanged(),
    map((todos) => todos.filter((todo) => !todo.completed))
  );
  completedTodos$ = this.todos$.pipe(
    map((todos) => todos.filter((todo) => todo.completed))
  );
  activeCount$ = this.activeTodos$.pipe(map((todos) => todos.length));
  errorMessage: string = '';

  visibleTodos = this.route.params.pipe(
    switchMap((params) => {
      switch (params['status'] as Params) {
        case 'active':
          return this.activeTodos$;
        case 'completed':
          return this.completedTodos$;
        default:
          return this.todos$;
      }
    })
  );

  ngOnInit(): void {
    this.route.params.subscribe();
    this.todosService.loadTodos().subscribe({
      error: () => this.messageService.showMessage('Failed to load todos'),
    });
  }

  trackById = (i: number, todo: Todo) => todo.id;

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe({
      error: () => this.messageService.showMessage('Uable to add a todo'),
    });
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({ ...todo, title }).subscribe({
      error: () => this.messageService.showMessage('Unable to rename todo'),
    });
  }

  toggleTodo(todo: Todo) {
    this.todosService
      .updateTodo({ ...todo, completed: !todo.completed })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to toggle a todo'),
      });
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo).subscribe({
      error: () => this.messageService.showMessage('Unable to delete a todo'),
    });
  }
}
