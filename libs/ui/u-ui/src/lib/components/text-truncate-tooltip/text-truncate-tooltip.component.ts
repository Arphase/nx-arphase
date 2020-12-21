import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ivt-text-truncate-tooltip',
  templateUrl: './text-truncate-tooltip.component.html',
  styleUrls: ['./text-truncate-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtTextTruncateTooltipComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('labelElement') labelElement: ElementRef;
  @ContentChild(TemplateRef) template: TemplateRef<null>;
  @Input() label: string;
  @Input() className: string;
  @Input() disabled = false;
  disabledTooltip: boolean;

  ngAfterViewInit() {
    setTimeout(() => this.onResize(), 0);
  }

  onResize(): void {
    this.disabledTooltip =
      this.container.nativeElement.clientWidth >= this.labelElement.nativeElement.offsetWidth * 1.1;
  }
}
