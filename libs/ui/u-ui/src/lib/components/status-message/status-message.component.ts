import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export enum MessageStatus {
  normal,
  warning,
  error,
  success,
}

@Component({
  selector: 'ivt-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtStatusMessageComponent {
  @Input() status = MessageStatus.normal;
  @Input() message: string;
  messageStatus = MessageStatus;

  get normal(): boolean {
    return this.status === MessageStatus.normal;
  }

  get warning(): boolean {
    return this.status === MessageStatus.warning;
  }

  get error(): boolean {
    return this.status === MessageStatus.error;
  }

  get success(): boolean {
    return this.status === MessageStatus.success;
  }
}
