import {Routes} from "@angular/router";
import {TetrisComponent} from "./tetris/tetris.component";
import {AppsComponent} from "./apps/apps.component";
import {RandomPixelComponent} from "./random-pixel/random-pixel.component";
import {SnakeRandomComponent} from "./snake-random/snake-random.component";
import {ChristmasTreeComponent} from "./christmas-tree/christmas-tree.component";
import {CircleComponent} from "./circle/circle.component";

export const appRoutes: Routes = [
  { path: 'tetris', component: TetrisComponent },
  { path: '', component: AppsComponent },
  { path: 'random-pixel', component: RandomPixelComponent },
  { path: 'snake-random', component: SnakeRandomComponent },
  { path: 'christmas-tree', component: ChristmasTreeComponent },
  { path: 'circle', component: CircleComponent }
  //{ path: '**', component: PageNotFoundComponent }
];
