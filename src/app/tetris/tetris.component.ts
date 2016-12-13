import {Component, ViewChild} from '@angular/core';
import {RendererComponent} from "../shared/components/renderer/renderer.component";

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent {
  private x: number = 0;
  private y: number = 0;

  private dx: number = 0.02;
  private dy: number = 0;

  @ViewChild("renderer")
  public renderer: RendererComponent;

  update(delta: number) {
    let cx = this.x + this.dx * delta;
    let cy = this.y + this.dy * delta;

    if(cx < 0 || cx > 11) {
      this.dx *= -1;
      cx += this.dx;
    }

    this.renderer.setColor(Math.round(this.x), Math.round(this.y), { r: 255, g: 255, b: 255 });
    this.renderer.setColor(Math.round(cx), Math.round(cy), { r: 255, g: 0, b: 0 });

    this.x = cx;
    this.y = cy;
  }
}
