import { Directive, Input, OnChanges, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { GtagService } from './gtag.service';

@Directive({
  selector: '[apsGtag]',
})
export class GtagDirective implements OnChanges {
  @Input() gtag: string;
  @Input() path: string;
  @Input() location: string;

  constructor(private gtagService: GtagService, @Optional() private router: Router) {}

  ngOnChanges() {
    this.gtagService.pageView(this.gtag, this.path, this.location || (this.router && this.router.url));
  }
}
