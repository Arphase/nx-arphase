import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { runParallax } from '@valmira/ui/core';

@Component({
  selector: 'vma-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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
      this.themeWrapper.style.setProperty(`--${propertyName}`, theme[propertyName]),
    );
    runParallax();
  }
  ngOnDestroy() {
    const textColor = this.greenColor;
    const backgroundColor = this.beigeColor;
    const theme = {
      textColor,
      backgroundColor,
    };
    Object.keys(theme).forEach(propertyName =>
      this.themeWrapper.style.setProperty(`--${propertyName}`, theme[propertyName]),
    );
    window.removeEventListener('scroll', () => null);
  }
}
