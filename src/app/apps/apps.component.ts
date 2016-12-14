import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  title = 'Pixtable';
  apps: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.apps = [
      { name: "Christmas Tree", path: "christmas-tree", description: "" },
      { name: "Tetris", path: "tetris", description: "" },
      { name: "Snake Random", path: "snake-random", description: "" },
      { name: "Paint", path: "paint", description: "" },
      { name: "Random Pixel", path: "random-pixel", description: "" }
    ];
  }

  open(app: any, renderer: string) {
    this.router.navigate([app.path], { queryParams: { 'renderer': renderer }});
  }
}
