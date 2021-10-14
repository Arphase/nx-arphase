import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'mrl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const loader = this.renderer.selectRootElement('#loader');
      if (loader.style.display != 'none') loader.style.display = 'none';

      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          debounceTime(500)
        )
        .subscribe(() => {
          window.scrollTo(0, 0);
          this.cdr.detectChanges();
        });
    }
  }
}
