import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const todos = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
  { id: 3, title: 'Do laundry', completed: false },
  { id: 4, title: 'Finish homework', completed: true },
];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  editing = false;
  todos = todos;
  title = '';

  // handleTodoToggle(event: Event, todo: Todo) {
  //   todo.completed = (event.target as HTMLInputElement).checked;
  // }

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  addTodo() {
    if (this.title.trim().length === 0) {
      return;
    }

    const newTodo = {
      id: this.todos.length + 1,
      title: this.title,
      completed: false,
    };

    this.todos.push(newTodo);
    this.title = '';
  }
}
