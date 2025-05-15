import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ivt-contact-success',
    templateUrl: './contact-success.component.html',
    styleUrls: ['./contact-success.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ContactSuccessComponent {}
