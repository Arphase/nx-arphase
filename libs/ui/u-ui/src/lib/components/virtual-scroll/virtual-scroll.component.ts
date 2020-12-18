import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  TrackByFunction,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ivt-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtVirtualScrollComponent<T> {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ContentChild(TemplateRef) _rowTemplate: TemplateRef<null>;
  @Input() rowTemplate: TemplateRef<null>;
  @Input() height = '50vh';
  @Input() itemSize = 48;
  @Input() maxBufferPx = 96;
  @Input() minBufferPx = 48;
  @Input() ignoreNextBatch: boolean;
  @Input() list: T[] = [];
  @Input() templateCacheSize = 20;
  @Input() trackBy: TrackByFunction<T>;
  @Output() nextBatchEmitter = new EventEmitter<void>();

  nextBatch(): void {
    if (this.ignoreNextBatch) {
      return;
    }

    const { end } = this.viewport.getRenderedRange();
    const total = this.viewport.getDataLength();

    if (end === total && end > 0 && total > 0) {
      this.nextBatchEmitter.emit();
    }
  }
}
