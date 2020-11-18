import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Guarantee, IvtQueryParams } from '@ivt/c-data';
import { GuaranteeCollectionService } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService {

  constructor() { }
}
