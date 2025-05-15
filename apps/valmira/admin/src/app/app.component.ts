import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'vma-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppComponent {}
