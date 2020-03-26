import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';

const routes: Routes = [
  /*  {
    path: 'not-found',
    component: PagenotfoundComponent,
  },
  // !(Generic route) this route should be at the very last of all our routes
  { path: '**', redirectTo: '/not-found' }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
