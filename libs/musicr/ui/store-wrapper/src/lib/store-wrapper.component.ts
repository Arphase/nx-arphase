import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CoreService } from '@musicr/ui/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'mrl-store-wrapper',
  templateUrl: './store-wrapper.component.html',
  styleUrls: ['./store-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreWrapperComponent implements AfterViewInit {
  categories$ = this.coreService.categories$;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private nzIconService: NzIconService,
    private coreService: CoreService
  ) {
    this.nzIconService.changeAssetsSource('https://arphase-icons.s3.amazonaws.com');
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.coreService.getCategories();

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
