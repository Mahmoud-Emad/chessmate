import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { inputValidation } from 'src/app/utils/types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() classStyle!: string;
  @Input() placeholder!: string;
  @Input() value!: string;
  @Input() inputName!: string;
  @Input() disabled!: boolean;
  @Input() validate!: (value: string) => inputValidation;
  @Output() onValueChange = new EventEmitter<string>();

  error: string = '';

  constructor() {}

  ngOnInit(): void {}

  onKey(event: any) {
    if (this.validate) {
      this.value = event.target.value;
      this.error = this.validate(this.value).errorMessage;

      if (this.error.length) {
        if (this.classStyle.includes('has-error')) {
          this.classStyle = this.classStyle.replace('is-success', 'has-error');
        } else {
          this.classStyle += ' has-error';
        }
      } else {
        this.classStyle = this.classStyle.replace('has-error', 'is-success');
      }
    }
  }
}
