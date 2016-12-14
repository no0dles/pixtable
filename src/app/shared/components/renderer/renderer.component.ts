import {Component, OnInit, NgZone, EventEmitter, Output, ViewChild} from '@angular/core';
import {IRenderer} from "../../models/renderer";
import {TableService} from "../../services/table.service";
import {CanvasService} from "../../services/canvas.service";
import {ActivatedRoute} from "@angular/router";
import {IPixel} from "../../models/pixel";
import {IColor} from "../../models/color";
import {View} from "../../models/view";

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.css']
})
export class RendererComponent implements OnInit {
  private renderers: IRenderer[];
  private lastUpdate: number;

  private pixels: IPixel[] = [];

  @ViewChild("canvas")
  public canvas: any;

  @Output()
  public onUpdate: EventEmitter<number> = new EventEmitter<number>();

  constructor(private ngZone: NgZone,
              private route: ActivatedRoute,
              private tableService: TableService,
              private canvasService: CanvasService) {
    this.renderers = [];

    this.clear({ r: 255, g: 255, b: 255 }, 1);

  }

  public ngOnInit(): void {
    this.canvasService.init(this.canvas.nativeElement);

    this.route.queryParams.subscribe(res => {
      const renderer = res["renderer"];

      switch (renderer) {
        case "table":
          this.renderers.push(this.tableService);
          break;
      }

      this.renderers.push(this.canvasService);
    });

    this.ngZone.runOutsideAngular(() => {
      this.lastUpdate = new Date().getTime();

      requestAnimationFrame(() => {
        this.updateLoop();
      });
    });
  }

  private updateLoop(): void {
    const currentUpdate = new Date().getTime();

    this.onUpdate.emit(currentUpdate - this.lastUpdate);

    for(let renderer of this.renderers)
      renderer.update(this.pixels);

    this.lastUpdate = currentUpdate;

    requestAnimationFrame(() => this.updateLoop());
  }

  public clear(color: IColor, brightness: number) {
    for(let x = 0; x < View.Width; x++) {
      for(let y = 0; y < View.Height; y++) {
        this.setColor(x, y, color, brightness);
      }
    }
  }

  public setColor(x: number, y: number, color: IColor, brightness: number = undefined) {
    const index = x+y*View.Width;
    this.pixels[index] = {
      x: x,
      y: y,
      c: color,
      b: brightness || this.pixels[index].b
    };
  }

  public setBrightness(x: number, y: number, brightness: number) {
    this.get(x, y).b = brightness;
  }

  public get(x: number, y: number) {
    return this.pixels[x + y * View.Width];
  }
}
