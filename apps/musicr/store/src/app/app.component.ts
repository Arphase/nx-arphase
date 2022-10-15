import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
import { ApsCollectionResponse } from '@arphase/common';
import { Category } from '@musicr/domain';
import { NzIconService } from 'ng-zorro-antd/icon';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'mrl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  showComponents$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => !event.url.includes('/contact-success'))
  );
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private nzIconService: NzIconService,
    private http: HttpClient
  ) {
    this.nzIconService.changeAssetsSource('https://arphase-icons.s3.amazonaws.com');
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.http
        .get<ApsCollectionResponse<Category>>(`/mrlApi/categories`)
        .pipe(take(1))
        .subscribe(({ results }) => this.categoriesSubject.next(results));

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
