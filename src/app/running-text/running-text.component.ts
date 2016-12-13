import {Component, OnInit, ViewChild} from '@angular/core';
import {RendererComponent} from "../shared/components/renderer/renderer.component";

@Component({
  selector: 'app-running-text',
  templateUrl: './running-text.component.html',
  styleUrls: ['./running-text.component.css']
})
export class RunningTextComponent {

  private x: number = 0;
  private y: number = 0;

  private px: number = 0;
  private py: number = 0;

  @ViewChild("renderer")
  public renderer: RendererComponent;

  update(delta: number) {


    if((this.y >= 0 && this.y < 7) && this.x == 0) //Left wall
      this.y += 1;
    else if(this.y == 7 && (this.x >= 0 && this.x < 11)) //Bottom wall
      this.x += 1;
    else if((this.y > 0 && this.y <= 7) && this.x == 11) //Right wall
      this.y -= 1;
    else if(this.y == 0 && (this.x >= 0 && this.x <= 11)) //Top wall
      this.x -= 1;
    else
    {
      this.x == 0;
      this.y == 0;
    }

    console.log(this.px, this.py);
    console.log(this.x, this.y);

    this.renderer.setColor(this.px, this.py, { r: 255, g: 255, b: 255 });
    this.renderer.setColor(this.x, this.y, { r: 255, g: 0, b: 0 });

    this.px = this.x;
    this.py = this.y;
  }


}
