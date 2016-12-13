import { Injectable } from '@angular/core';
import {IRenderer} from "../models/renderer";

@Injectable()
export class TableService implements IRenderer {
  constructor() { }

  update(pixels: any[]) {
  }

}
