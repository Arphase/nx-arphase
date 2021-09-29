import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'vma-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManifestComponent implements OnInit, OnDestroy {
  readonly greenColor = '#1d2b15';
  readonly beigeColor = '#eae1d3';
  themeWrapper = document.querySelector('body');

  ngOnInit() {
    const textColor = this.beigeColor;
    const backgroundColor = this.greenColor;
    const theme = { textColor, backgroundColor };
    Object.keys(theme).forEach(propertyName =>
      this.themeWrapper.style.setProperty(`--${propertyName}`, theme[propertyName])
    );
    const scrolls = Array.from(document.getElementsByClassName('image-scroll') as HTMLCollectionOf<HTMLElement>);
    window.addEventListener('scroll', () => {
      const limit = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const value = (window.scrollY / limit) * 650;
      if (screen.width > 768) {
        scrolls.forEach(scroll => {
          scroll.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${value}, 0, 1)`;
        });
      }
    });
  }
  ngOnDestroy() {
    const textColor = this.greenColor;
    const backgroundColor = this.beigeColor;
    const theme = {
      textColor,
      backgroundColor,
    };
    Object.keys(theme).forEach(propertyName =>
      this.themeWrapper.style.setProperty(`--${propertyName}`, theme[propertyName])
    );
    window.removeEventListener('scroll', () => null);
  }
}
