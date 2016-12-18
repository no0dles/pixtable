import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TetrisComponent } from './tetris/tetris.component';
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routing";
import { AppsComponent } from './apps/apps.component';
import { MaterialModule } from '@angular/material';
import { CanvasService } from "./shared/services/canvas.service";
import { TableService } from "./shared/services/table.service";
import { RendererComponent } from './shared/components/renderer/renderer.component';
import { MapperService } from "./shared/services/mapper.service";
import { appConfig } from "./app.config";
import { RandomPixelComponent } from './random-pixel/random-pixel.component';
import { RandomSnakeComponent } from "./random-snake/random-snake.component";
import { ChristmasTreeComponent } from './christmas-tree/christmas-tree.component';
import { SnakeComponent } from "./snake/snake.component";

@NgModule({
  declarations: [
    AppComponent,
    TetrisComponent,
    AppsComponent,
    RendererComponent,
    RandomSnakeComponent,
    RandomPixelComponent,
    ChristmasTreeComponent,
    SnakeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TableService,
    CanvasService,
    MapperService,
    { provide: 'config', useValue: appConfig }
  ],
  exports: [
    AppsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
