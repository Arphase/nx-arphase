import { Client, Guarantee, PersonTypes } from '@innovatech/common/domain';
import { omit } from 'lodash';

import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';

export function omitInfo(guarantee: Guarantee | CreateGuaranteeDto | UpdateGuaranteeDto): Guarantee {
  const personType = guarantee.client?.personType;
  const guaranteeCopy: Guarantee = { ...(guarantee as Guarantee) };
  if (personType === PersonTypes.physical) {
    guaranteeCopy.client = omit(guaranteeCopy.client, 'moralInfo') as Client;
  } else if (personType === PersonTypes.moral) {
    guaranteeCopy.client = omit(guaranteeCopy.client, 'physicalInfo') as Client;
  }
  return guaranteeCopy;
}
