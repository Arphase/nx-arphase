import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'vma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private nzIconService: NzIconService
  ) {}

  ngOnInit() {
    this.nzIconService.changeAssetsSource('https://arphase-icons.s3.amazonaws.com');
  }

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
