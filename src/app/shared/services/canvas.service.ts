import { Injectable } from '@angular/core';
import {IRenderer} from "../models/renderer";

@Injectable()
export class CanvasService implements IRenderer {

  constructor() { }

  update(pixels: any[]) {
  }

}
