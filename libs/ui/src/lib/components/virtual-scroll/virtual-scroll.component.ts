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
export class IvtVirtualScrollComponent<T = any> {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ContentChild(TemplateRef) _rowTemplate: TemplateRef<any>;

  @Input() rowTemplate: TemplateRef<any>;
  @Input() height = '50vh';
  @Input() itemSize = 64;
  @Input() maxBufferPx = 128;
  @Input() minBufferPx = 64;
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
