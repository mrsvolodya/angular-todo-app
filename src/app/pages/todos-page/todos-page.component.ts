import { Component } from '@angular/core';
import { MessageComponent } from '../../components/message/message.component';
import { Todo } from '../../types/todo';
import { TodosService } from '../../services/todos.service';
import { MessageService } from '../../services/message.service';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoComponent } from '../../components/todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
})
export class TodosPageComponent {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];
  errorMessage: string = '';

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) return;

    this._todos = todos;
    this.activeTodos = this._todos.filter((todo) => !todo.completed);
  }

  constructor(
    private todosService: TodosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.todosService.todos$.subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
      },
    });
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
