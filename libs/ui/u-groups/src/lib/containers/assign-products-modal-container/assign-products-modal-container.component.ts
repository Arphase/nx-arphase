import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ProductCollectionService } from '@ivt/u-state';

import { AssignProductsModalComponent } from '../../components/assign-products-modal/assign-products-modal.component';

@Component({
  selector: 'ivt-assign-products-modal-container',
  templateUrl: './assign-products-modal-container.component.html',
  styleUrls: ['./assign-products-modal-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignProductsModalContainerComponent implements OnInit {
  @ViewChild('form', { static: false }) formComponent: AssignProductsModalComponent;

  constructor(private productCollectionService: ProductCollectionService) {}

  ngOnInit(): void {
    this.productCollectionService.getWithQuery({});
  }

  submitChild(): boolean {
    this.formComponent.submit();
    return false;
  }
}
