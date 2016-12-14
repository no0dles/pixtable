import {Component, OnInit, ViewChild} from '@angular/core';
import {RendererComponent} from "../shared/components/renderer/renderer.component";

@Component({
  selector: 'app-christmas-tree',
  templateUrl: './christmas-tree.component.html',
  styleUrls: ['./christmas-tree.component.css']
})
export class ChristmasTreeComponent {

  @ViewChild("renderer")
  public renderer: RendererComponent;

  private time = 0;
  private updateTime = 400;

  private brightness = 0.0;
  private step = 0.0;

  private treeColor = { r: 0, g: 255, b: 0};
  private woodColor = { r: 160, g: 104, b: 40};

  private x = 8;

  private treeCords = [
    {x : this.x, y: 3 },
    {x : this.x, y: 4 },
    {x : this.x-1, y: 3 },
    {x : this.x-1, y: 4 },
    {x : this.x-2, y: 2 },
    {x : this.x-2, y: 3 },
    {x : this.x-2, y: 4 },
    {x : this.x-2, y: 5 },
    {x : this.x-3, y: 2 },
    {x : this.x-3, y: 3 },
    {x : this.x-3, y: 4 },
    {x : this.x-3, y: 5 },
    {x : this.x-4, y: 1 },
    {x : this.x-4, y: 2 },
    {x : this.x-4, y: 3 },
    {x : this.x-4, y: 4 },
    {x : this.x-4, y: 5 },
    {x : this.x-4, y: 6 }
  ];

  private woodCords = [
    {x : this.x-5, y: 3 },
    {x : this.x-5, y: 4 },
    {x : this.x-6, y: 3 },
    {x : this.x-6, y: 4 }
  ];

  private flocks = [
    { y: 1, x: 17 },
    { y: 6, x: 11 }
  ];

  update(delta: number) {
    this.time += delta;

    if(this.time < this.updateTime)
      return;

    this.time = 0;


    this.renderer.clear({ r: 0, g: 0, b: 100}, 1);

    for(var treeCord of this.treeCords) {
      this.renderer.setColor(treeCord.x, treeCord.y, this.treeColor);
    }

    for(var wordCord of this.woodCords) {
      this.renderer.setColor(wordCord.x, wordCord.y, this.woodColor);
    }

    for(var sx = 0; sx < 2; sx++) {
      for(var y = 0; y < 8; y++) {
        this.renderer.setColor(sx, y, { r: 255, g: 255, b: 255});
      }
    }

    for(var flock of this.flocks) {
      flock.x--;

      if(flock.x < 2) {
        flock.y = Math.floor(Math.random()*8);
        flock.x = 13;
      }
      if(flock.x < 11) {
        this.renderer.setColor(flock.x, flock.y, { r: 255, g: 255, b: 255 });
      }
    }

    this.renderer.setColor(this.x-6, 5, { r: 255, g: 0, b: 0 });
    this.renderer.setColor(this.x-6, 1, { r: 255, g: 165, b: 0 });

    this.brightness += this.step;

    if(this.brightness < 0) {
      this.brightness = 0;
      this.step *= -1;
    } else if(this.brightness > 1) {
      this.brightness = 1;
      this.step *= -1;
    }
  }
}
