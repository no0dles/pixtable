import {Routes} from "@angular/router";
import {TetrisComponent} from "./tetris/tetris.component";
import {AppsComponent} from "./apps/apps.component";
import {RunningTextComponent} from "./running-text/running-text.component";

export const appRoutes: Routes = [
  { path: 'tetris', component: TetrisComponent },
  { path: '', component: AppsComponent },
  { path: 'running-text', component: RunningTextComponent }
  //{ path: '**', component: PageNotFoundComponent }
];
