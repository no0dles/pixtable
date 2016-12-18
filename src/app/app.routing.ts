import {Routes} from "@angular/router";
import {TetrisComponent} from "./tetris/tetris.component";
import {AppsComponent} from "./apps/apps.component";
import {RandomPixelComponent} from "./random-pixel/random-pixel.component";
import {RandomSnakeComponent} from "./random-snake/random-snake.component";
import {ChristmasTreeComponent} from "./christmas-tree/christmas-tree.component";
import {SnakeComponent} from "./snake/snake.component";

export const appRoutes: Routes = [
  { path: 'tetris', component: TetrisComponent },
  { path: '', component: AppsComponent },
  { path: 'random-pixel', component: RandomPixelComponent },
  { path: 'random-snake', component: RandomSnakeComponent },
  { path: 'christmas-tree', component: ChristmasTreeComponent },
  { path: 'snake', component: SnakeComponent }
  //{ path: '**', component: PageNotFoundComponent }
];
