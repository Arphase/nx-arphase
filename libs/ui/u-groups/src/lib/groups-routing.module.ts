import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupFormsContainerComponent } from './containers/group-forms-container/group-forms-container.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';


import { GroupsComponent } from './groups/groups.component';
import { GroupFormCompaniesComponent } from './components/group-form-companies/group-form-companies.component';
import { GroupsResolverService } from './resolvers/groups-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      {
        path: '',
        component: GroupListContainerComponent,
        resolve: { resolvedGroups: GroupsResolverService },
      },
      {
        path: 'new',
        component: GroupFormsContainerComponent,
        resolve: { resolvedGroup: GroupsResolverService },
        children: [
          {
            path: '',
            component: GroupFormsContainerComponent,
            resolve: { resolvedGroup: GroupsResolverService },
          },
          {
            path: 'company',
            component: GroupFormCompaniesComponent,
            resolve: { resolvedGroup: GroupsResolverService },
          }
        ]
      },
    ],
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule { }
