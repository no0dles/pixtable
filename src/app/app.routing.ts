import {Routes} from "@angular/router";
import {TetrisComponent} from "./tetris/tetris.component";
import {AppsComponent} from "./apps/apps.component";
import {RandomPixelComponent} from "./random-pixel/random-pixel.component";
import {RunningTextComponent} from "./running-text/running-text.component";

export const appRoutes: Routes = [
  { path: 'tetris', component: TetrisComponent },
  { path: '', component: AppsComponent },
  { path: 'random-pixel', component: RandomPixelComponent },
  { path: 'running-text', component: RunningTextComponent },
  //{ path: '**', component: PageNotFoundComponent }
];
