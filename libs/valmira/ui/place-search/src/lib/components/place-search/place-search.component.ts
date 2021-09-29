import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { ApsListComponent } from '@arphase/ui/core';
import { Place, PlaceCategories } from '@valmira/domain';

@Component({
  selector: 'vma-place-search',
  templateUrl: './place-search.component.html',
  styleUrls: ['./place-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceSearchComponent extends ApsListComponent<Place> /*implements AfterViewInit*/ {
  categories = [
    {
      value: 0,
      logo: 'assets/img/logo-all.svg',
      label: 'VER TODO',
    },
    {
      value: PlaceCategories.premium,
      logo: 'assets/img/logo-premium.svg',
      label: 'PREMIUM',
    },
    {
      value: PlaceCategories.couple,
      logo: 'assets/img/logo-couple.svg',
      label: 'PAREJAS',
    },
    {
      value: PlaceCategories.kids,
      logo: 'assets/img/logo-kids.svg',
      label: 'NIÑOS',
    },
  ];
  radioValue = this.categories[0].value;

  // constructor(private elementRef: ElementRef) {
  //   super();
  // }

  // ngAfterViewInit() {
  //   const scrolls = Array.from(
  //     this.elementRef.nativeElement.getElementsByClassName('image-scroll') as HTMLCollectionOf<HTMLElement>
  //   );
  //   window.addEventListener('scroll', event => {
  //     console.log(scrolls);
  //     const limit = Math.max(
  //       this.elementRef.nativeElement.body.scrollHeight,
  //       this.elementRef.nativeElement.body.offsetHeight,
  //       this.elementRef.nativeElement.documentElement.clientHeight,
  //       this.elementRef.nativeElement.documentElement.scrollHeight,
  //       this.elementRef.nativeElement.documentElement.offsetHeight
  //     );
  //     const value = (window.scrollY / limit) * 650;
  //     if (screen.width > 768) {
  //       console.log(scrolls);
  //       scrolls.forEach(scroll => {
  //         scroll.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${value}, 0, 1)`;
  //       });
  //     }
  //   });
  // }
}
