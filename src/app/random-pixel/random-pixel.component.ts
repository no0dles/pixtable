import {Component, OnInit, ViewChild} from '@angular/core';
import {RendererComponent} from "../shared/components/renderer/renderer.component";
import {View} from "../shared/models/view";

@Component({
  selector: 'app-random-pixel',
  templateUrl: './random-pixel.component.html',
  styleUrls: ['./random-pixel.component.css']
})
export class RandomPixelComponent {
  brightness: number[];

  step = 0.0005;
  popupTime = 20;

  time = 0;

  @ViewChild("renderer")
  public renderer: RendererComponent;

  constructor() {
    this.brightness = [];
    for(let x = 0; x < View.Width; x++) {
      for(let y = 0; y < View.Width; y++) {
        this.brightness[x+y*View.Width] = 0;
      }
    }
  }

  update(delta: number) {
    this.time += delta;

    if(this.time > this.popupTime) {
      var x = Math.floor(Math.random() * View.Width);
      var y = Math.floor(Math.random() * View.Height);

      this.brightness[x + y * View.Width] = 1;
      this.time = 0;
    }

    for(let x = 0; x < View.Width; x++) {
      for(let y = 0; y < View.Height; y++) {
        const index = x + y * View.Width;
        const brightness = this.brightness[index];
        this.renderer.setColor(x, y, { r: Math.floor(255 * brightness), g: Math.floor(0 * brightness), b: Math.floor(0 * brightness) });
        this.brightness[index] = Math.max(0, brightness - this.step * delta);
      }
    }
  }
}
