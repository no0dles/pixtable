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
      { name: "Christmas Tree", path: "christmas-tree", description: "Animation" },
      { name: "Tetris", path: "tetris", description: "Game" },
      { name: "Random Snake", path: "random-snake", description: "Animation" },
      { name: "Paint", path: "paint", description: "Application" },
      { name: "Random Pixel", path: "random-pixel", description: "Animation" },
      { name: "Snake", path: "snake", description: "Game" }
    ];
  }


  open(app: any, renderer: string) {
    this.router.navigate([app.path], { queryParams: { 'renderer': renderer }});
  }
}
