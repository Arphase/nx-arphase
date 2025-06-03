import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { AdditionalOption } from './additional-option.model';
import { OrderProduct } from './order-product.model';
import { Photo } from './photo.model';
import { PriceOption } from './price-option.model';
import { Subcategory } from './subcategory.model';

export interface Product {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  price: number;
  disclaimer?: string;
  description?: string;
  productComponents?: string[];
  position?: number;
  popularity?: number;
  hasActivePromotion?: boolean;
  promotionDiscount?: number;
  eventTypes?: EventType[];
  subcategoryId?: number;
  subcategory?: Subcategory;
  photos?: Photo[];
  additionalOptions?: AdditionalOption[];
  orderProducts?: OrderProduct[];
  priceOptions?: PriceOption[];
}

export function getProductCurrentPrice(product: Product) {
  if (!product) {
    return 0;
  }
  const { hasActivePromotion, promotionDiscount, price } = product;
  if (hasActivePromotion && promotionDiscount) {
    return Math.ceil(price * ((100 - promotionDiscount) / 100));
  } else {
    return price;
  }
}

export enum EventType {
  Anniversary = 'Anniversary',
  BachelorParty = 'Bachelor party',
  BaptismCommunion = 'Baptism / First Communion',
  CocktailParty = 'Cocktail party',
  CorporateEvent = 'Corporate event',
  Dinner = 'Dinner',
  Graduation = 'Graduation',
  PoolParty = 'Pool party / Ranch-style gathering',
  Posada = 'Posada',
  RingCeremony = 'Ring ceremony',
  SmallParty = 'Small party',
  Wedding = 'Wedding',
  XVBirthday = 'XVBirthday',
}

export const eventTypeLabels: Record<EventType, string> = {
  [EventType.Anniversary]: 'Aniversario',
  [EventType.BachelorParty]: 'Despedida de soltero',
  [EventType.BaptismCommunion]: 'Bautizo / Primera comunión',
  [EventType.CocktailParty]: 'Brindis / Cóctel',
  [EventType.CorporateEvent]: 'Evento empresarial',
  [EventType.Dinner]: 'Cena',
  [EventType.Graduation]: 'Graduación',
  [EventType.PoolParty]: 'Ranchada / Albercada',
  [EventType.Posada]: 'Posada',
  [EventType.RingCeremony]: 'Fiesta de anillo',
  [EventType.SmallParty]: 'Fiesta pequeña',
  [EventType.Wedding]: 'Boda',
  [EventType.XVBirthday]: 'XV años',
};

export const eventTypeOptions: NzSelectOptionInterface[] = [
  {
    label: eventTypeLabels[EventType.Anniversary],
    value: EventType.Anniversary,
  },
  {
    label: eventTypeLabels[EventType.BachelorParty],
    value: EventType.BachelorParty,
  },
  {
    label: eventTypeLabels[EventType.BaptismCommunion],
    value: EventType.BaptismCommunion,
  },
  {
    label: eventTypeLabels[EventType.CocktailParty],
    value: EventType.CocktailParty,
  },
  {
    label: eventTypeLabels[EventType.CorporateEvent],
    value: EventType.CorporateEvent,
  },
  {
    label: eventTypeLabels[EventType.Dinner],
    value: EventType.Dinner,
  },
  {
    label: eventTypeLabels[EventType.Graduation],
    value: EventType.Graduation,
  },
  {
    label: eventTypeLabels[EventType.PoolParty],
    value: EventType.PoolParty,
  },
  {
    label: eventTypeLabels[EventType.Posada],
    value: EventType.Posada,
  },
  {
    label: eventTypeLabels[EventType.RingCeremony],
    value: EventType.RingCeremony,
  },
  {
    label: eventTypeLabels[EventType.SmallParty],
    value: EventType.SmallParty,
  },
  {
    label: eventTypeLabels[EventType.Wedding],
    value: EventType.Wedding,
  },
  {
    label: eventTypeLabels[EventType.XVBirthday],
    value: EventType.XVBirthday,
  },
];
