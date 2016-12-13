import { Injectable } from '@angular/core';
import {IRenderer} from "../models/renderer";
import {IPixel} from "../models/pixel";
import {MapperService} from "./mapper.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class TableService implements IRenderer {
  private static LedCount = 384;
  private static BufferOffset = 4;

  private socket: WebSocket;
  private frame: Uint8ClampedArray;

  constructor(private mapper: MapperService) {
    this.socket = new WebSocket(environment.socketUrl);
    this.socket.onopen = () => {
      console.log("connected to socket");
    };

    this.frame = new Uint8ClampedArray(TableService.BufferOffset + TableService.LedCount * 3);
  }

  update(pixels: IPixel[]) {
    for(let pixel of pixels) {
      let mapping = this.mapper.resolve(pixel.x, pixel.y);
      for(let i = 0; i < mapping.range; i++) {
        this.frame[TableService.BufferOffset + mapping.index*3 + i*3] = pixel.c.r;
        this.frame[TableService.BufferOffset + mapping.index*3 + i*3 + 1] = pixel.c.g;
        this.frame[TableService.BufferOffset + mapping.index*3 + i*3 + 2] = pixel.c.b;
      }
    }

    this.transmit();
  }

  transmit() {
    if(this.socket.readyState != 1) {
      return;
    }

    if(this.socket.bufferedAmount > this.frame.length) {
      console.log("lagging");
      return;
    }

    this.socket.send(this.frame.buffer);
  }
}
