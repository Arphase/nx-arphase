import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'vma-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManifestComponent implements OnInit, OnDestroy {
  readonly defaultColor = '#1d2b15';
  readonly overrideColor = '#1d2b15';
  themeWrapper = document.querySelector('body');
  ngOnInit() {
    const textColor = this.overrideColor;
    const backgroundColor = this.overrideColor;
    const theme = {
      textColor,
      backgroundColor,
    };
    Object.keys(theme).forEach(propertyName =>
      this.themeWrapper.style.setProperty(`--${propertyName}`, theme[propertyName])
    );
    let scrolls = Array.from(document.getElementsByClassName('image-scroll') as HTMLCollectionOf<HTMLElement>);
    window.addEventListener('scroll', event => {
      let limit = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      let value = (window.scrollY / limit) * 650;
      if (screen.width > 768) {
        scrolls.forEach(scroll => {
          scroll.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${value}, 0, 1)`;
        });
      }
    });
  }
  ngOnDestroy() {
    const textColor = this.defaultColor;
    const backgroundColor = this.defaultColor;
    const theme = {
      textColor,
      backgroundColor,
    };
    Object.keys(theme).forEach(propertyName =>
      this.themeWrapper.style.setProperty(`--${propertyName}`, theme[propertyName])
    );
    window.removeEventListener('scroll', event => {});
  }
}
