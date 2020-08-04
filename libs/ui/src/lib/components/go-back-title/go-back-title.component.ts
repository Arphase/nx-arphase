import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ivt-go-back-title',
  templateUrl: './go-back-title.component.html',
  styleUrls: ['./go-back-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IvtGoBackTitleComponent {
  @Input() title: string;
  @Input() link: string[] = ['..'];
}
