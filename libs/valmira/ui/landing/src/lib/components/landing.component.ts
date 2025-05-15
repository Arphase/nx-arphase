import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Place } from '@valmira/domain';
import { runParallax } from '@valmira/ui/core';

@Component({
    selector: 'vma-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LandingComponent implements OnInit, OnDestroy {
  @Input() places: Place[] = [];

  ngOnInit() {
    runParallax();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => null);
  }
}
