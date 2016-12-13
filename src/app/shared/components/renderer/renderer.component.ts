import {Component, OnInit, NgZone, EventEmitter, Output} from '@angular/core';
import {IRenderer} from "../../models/renderer";
import {TableService} from "../../services/table.service";
import {CanvasService} from "../../services/canvas.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.css']
})
export class RendererComponent implements OnInit {
  private renderer: IRenderer;
  private lastUpdate: number;

  private pixels: any[] = [];

  @Output()
  public onUpdate: EventEmitter<number> = new EventEmitter<number>();

  constructor(private ngZone: NgZone,
              private route: ActivatedRoute,
              private tableService: TableService,
              private canvasService: CanvasService) {

  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      const renderer = res["renderer"];
      switch (renderer) {
        case "table":
          this.renderer = this.tableService;
          break;
        case "canvas":
          this.renderer = this.canvasService;
          break;
      }
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
    this.renderer.update(this.pixels);

    this.lastUpdate = currentUpdate;

    requestAnimationFrame(() => this.updateLoop());
  }

  public setColor(x: number, y: number, value: number) {

  }

  public setBrightness(x: number, y: number, value: number) {

  }
}
