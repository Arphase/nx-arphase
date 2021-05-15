export interface ProductForm {
  id?: number;
  name: string;
  price: number;
  logo: string;
  yearValidations: {
    minYear: number;
    maxYear: number;
  };
  hpValidations: {
    minHp: number;
    maxHp: number;
  };
  template: string;
}
