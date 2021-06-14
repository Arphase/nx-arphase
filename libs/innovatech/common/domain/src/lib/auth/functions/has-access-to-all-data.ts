import { UserRoles } from '../../users/enums/user-roles.enum';

export function hasAccessToAllData(role: UserRoles | string): boolean {
  return [UserRoles.superAdmin, UserRoles.repairman].includes(UserRoles[role]);
}
