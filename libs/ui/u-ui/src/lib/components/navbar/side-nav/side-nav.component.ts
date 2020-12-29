import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItem } from '@ivt/c-data';

@Component({
  selector: 'ivt-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtSideNavComponent implements OnChanges, OnDestroy {
  @ViewChild('snav') sidenav: MatSidenav;
  @Input() opened = true;
  @Input() menuItems: MenuItem[] = [];
  @Output() openMenu = new EventEmitter<void>();
  @Output() closeMenu = new EventEmitter<void>();
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 769px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  onOpenMenu(): void {
    this.openMenu.emit();
  }

  onCloseMenu(): void {
    this.closeMenu.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.opened && this.sidenav && this.mobileQuery.matches) {
      this.opened ? this.sidenav.open() : this.sidenav.close();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
