import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit {
  title = 'Error';
  hidden = true;
  message = '';
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message$
    .subscribe((text) => {
      this.message = text;
      this.hidden = false;
    });
  }
}
