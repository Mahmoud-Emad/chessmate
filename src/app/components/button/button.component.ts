import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;
  @Input() type: string = 'button';
  @Input() classStyle!: string;
  @Input() disabled!: boolean;

  constructor() {}

  onClick() {
    this.btnClick.emit();
  }
}
