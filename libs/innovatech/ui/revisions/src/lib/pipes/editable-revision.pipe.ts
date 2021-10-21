import { Pipe, PipeTransform } from '@angular/core';
import { Revision } from '@innovatech/common/domain';
import dayjs from 'dayjs';

export function isRevisionEditable(revision: Revision): boolean {
  return dayjs(revision.createdAt).isAfter(dayjs().subtract(3, 'months'));
}

@Pipe({ name: 'editableRevision' })
export class EditableRevisionPipe implements PipeTransform {
  transform(revision: Revision): boolean {
    return isRevisionEditable(revision);
  }
}
