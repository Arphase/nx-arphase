import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export enum MessageStatus {
  info = 'info',
  warning = 'warning',
  error = 'error',
  success = 'success',
}

@Component({
    selector: 'aps-status-message',
    templateUrl: './status-message.component.html',
    styleUrls: ['./status-message.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ApsStatusMessageComponent {
  @Input() status = MessageStatus.warning;
  @Input() message: string;
  messageStatus = MessageStatus;
}
