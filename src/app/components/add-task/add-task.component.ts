import { Subscription } from 'rxjs';
import { UiService } from './../../services/ui.service';
import { Task } from './../../Task';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.text) {
      alert('Please add a task!');
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    // @todo - emit event
    this.onAddTask.emit(newTask);
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
