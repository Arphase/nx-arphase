import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'vma-additional-services-container',
  templateUrl: './additional-services-container.component.html',
  styleUrls: ['./additional-services-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServicesContainerComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  submit(payload): void {
    this.router.navigate(['..', 'personal-data'], { relativeTo: this.route });
  }
}
