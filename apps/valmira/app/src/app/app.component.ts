import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'vma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const loader = this.renderer.selectRootElement('#loader');
      if (loader.style.display != 'none') loader.style.display = 'none';
    }
  }
}
