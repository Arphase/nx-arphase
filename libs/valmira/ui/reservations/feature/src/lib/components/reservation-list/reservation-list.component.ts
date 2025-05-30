import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Reservation, ReservationStatus } from '@valmira/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'vma-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ReservationListComponent extends ApsListComponent<Reservation> {
  columns: ApsColumns = [
    {
      label: 'Folio',
      prop: 'reservation.id',
      colSizes: {
        xs: 16,
        md: 3,
        lg: 2,
      },
    },
    {
      label: 'Alojamiento',
      prop: 'place.name',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Check in',
      prop: 'reservation.startDate',
      colSizes: {
        md: 4,
        lg: 3,
      },
    },
    {
      label: 'Checkout',
      prop: 'reservation.endDate',
      colSizes: {
        md: 4,
        lg: 3,
      },
    },
    {
      label: 'Reserva',
      prop: 'reservation.createdAt',
      colSizes: {
        lg: 3,
      },
    },
    {
      label: 'Importe',
      prop: 'reservation.total',
      colSizes: {
        md: 5,
        lg: 5,
      },
    },
    {
      label: 'Estatus',
      prop: 'reservation.status',
      colSizes: {
        xs: 8,
        md: 4,
        lg: 4,
      },
    },
  ];

  dateTypeOptions: NzSelectOptionInterface[] = [
    { label: 'Check in', value: 'startDate' },
    { label: 'Checkout', value: 'endDate' },
    { label: 'Reserva', value: 'createdAt' },
  ];

  statusOptions: NzSelectOptionInterface[] = [
    {
      label: 'Pagada',
      value: ReservationStatus[ReservationStatus.paid],
    },
    {
      label: 'Creada',
      value: ReservationStatus[ReservationStatus.created],
    },
    {
      label: 'Cancelada',
      value: ReservationStatus[ReservationStatus.cancelled],
    },
  ];

  colorMaps: Record<ReservationStatus, string> = {
    [ReservationStatus.paid]: 'success',
    [ReservationStatus.created]: 'warning',
    [ReservationStatus.cancelled]: 'error',
  };

  iconMaps: Record<ReservationStatus, string> = {
    [ReservationStatus.paid]: 'check-circle',
    [ReservationStatus.created]: 'exclamation-circle',
    [ReservationStatus.cancelled]: 'close-circle',
  };

  reservationStatusLabels: Record<string, string> = {
    [ReservationStatus[ReservationStatus.cancelled]]: 'Cancelada',
    [ReservationStatus[ReservationStatus.created]]: 'Creada',
    [ReservationStatus[ReservationStatus.paid]]: 'Pagada',
  };

  reservationsStatus = ReservationStatus;

  onChangeStatus(id: number, status: ReservationStatus): void {
    this.edit.emit({ id, status });
  }
}
