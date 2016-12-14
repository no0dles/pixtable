import { Injectable } from '@angular/core';
import {IRenderer} from "../models/renderer";
import {IPixel} from "../models/pixel";
import {View} from "../models/view";

@Injectable()
export class CanvasService implements IRenderer {
  private static PIXEL_SIZE = 40;


  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() { }

  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = View.Width * CanvasService.PIXEL_SIZE;
    this.canvas.height = View.Height * CanvasService.PIXEL_SIZE;
    this.context = canvas.getContext("2d");
  }

  update(pixels: IPixel[]) {
    this.context.clearRect(0, 0, View.Width * CanvasService.PIXEL_SIZE, View.Height * CanvasService.PIXEL_SIZE);

    for(var pixel of pixels) {
      this.context.fillStyle = `rgba(${Math.min(255, pixel.c.r)}, ${Math.min(255, pixel.c.g)}, ${Math.min(255, pixel.c.b)}, ${pixel.b})`;
      this.context.fillRect(pixel.x * CanvasService.PIXEL_SIZE, pixel.y * CanvasService.PIXEL_SIZE, CanvasService.PIXEL_SIZE, CanvasService.PIXEL_SIZE);
    }
  }

}
