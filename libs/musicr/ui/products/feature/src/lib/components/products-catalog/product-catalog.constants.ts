import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export const sortOptions: NzSelectOptionInterface[] = [
  { label: 'Precio, menor a mayor', value: `product.price | ascend` },
  { label: 'Precio, mayor a menor', value: `product.price | descend` },
  { label: 'Popularidad, menor a mayor', value: `product.popularity | descend` },
  { label: 'Popularidad, mayor a mayor', value: `product.popularity | ascend` },
];
