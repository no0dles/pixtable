import {Component, ViewChild} from '@angular/core';
import {RendererComponent} from "../shared/components/renderer/renderer.component";

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent {

  @ViewChild("renderer")
  public renderer: RendererComponent;

  update(delta: number) {
    this.renderer.setColor(0, 0, 12);
    this.renderer.setBrightness(0, 0, 100);
  }
}
