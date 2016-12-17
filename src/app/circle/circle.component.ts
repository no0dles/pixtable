import { Component, OnInit, ViewChild } from '@angular/core';
import {RendererComponent} from "../shared/components/renderer/renderer.component";
import {View} from "../shared/models/view";

export class Point {
  constructor(public x: number, public y: number) {}
}

export enum Direction {
  Left = 1,
  Up = 2,
  Right = 3,
  Down = 4
}

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
  host: {
    '(document:keydown)': 'keyPress($event)'
  }
})
export class CircleComponent implements OnInit{


  private startSnakeLength = 3;

  private snake: Point[];

  private guetzli: Point;

  private gameOver: boolean = false;

  private direction: Direction = Direction.Left;
  private time = 0;

  private static UpdateInterval = 200;

  @ViewChild("renderer")
  public renderer: RendererComponent;

  constructor() {

  }

  turnLeft() {
    if(this.direction !== Direction.Right)
      this.direction = Direction.Left;
  }

  turnRight() {
    if(this.direction !== Direction.Left)
      this.direction = Direction.Right;
  }

  turnUp() {
    if(this.direction !== Direction.Down)
      this.direction = Direction.Up;
  }

  turnDown() {
    if(this.direction !== Direction.Up)
      this.direction = Direction.Down;
  }

  keyPress(event: KeyboardEvent) {
    if(event.keyCode === 37)
      this.turnLeft();

    if(event.keyCode === 39)
      this.turnRight();

    if(event.keyCode === 38)
      this.turnUp();

    if(event.keyCode === 40)
      this.turnDown();
  }

  ngOnInit(): void {
    this.initSnake();
    this.initGuetzli();
  }

  initSnake() {
    this.snake = [];

    for (let i = 0; i < this.startSnakeLength; i++) {
      this.snake.push(new Point(5, 5));
    }
  }

  getRandom(no: number) {
    return Math.ceil(Math.random() * no);
  }

  initGuetzli() {
    this.guetzli = new Point(this.getRandom(11), this.getRandom(7));
  }

  update(delta: number) {
    this.time += delta;

    if(this.time > CircleComponent.UpdateInterval) {
      this.time = 0;
      this.updateSnake();
    }
  }

  updateSnake() {
    this.moveSnake();
    this.paintSnake();
  }



  moveSnake() {
    for(let i = 0; i < this.snake.length - 1; i++) {
      this.snake[i].x = this.snake[i+1].x;
      this.snake[i].y = this.snake[i+1].y;
    }

    if(this.direction == Direction.Left) {
      if(this.snake[this.snake.length - 1].x != 0)
        this.snake[this.snake.length - 1].x -= 1;
      else
        this.snake[this.snake.length - 1].x = 11;
    }

    if(this.direction == Direction.Up) {
      if(this.snake[this.snake.length - 1].y != 0)
        this.snake[this.snake.length - 1].y -= 1;
      else
        this.snake[this.snake.length - 1].y = 7;
    }

    if(this.direction == Direction.Right) {
      if(this.snake[this.snake.length - 1].x != 11)
        this.snake[this.snake.length - 1].x += 1;
      else
        this.snake[this.snake.length - 1].x = 0;
    }

    if(this.direction == Direction.Down) {
      if(this.snake[this.snake.length - 1].y != 7)
        this.snake[this.snake.length - 1].y += 1;
      else
        this.snake[this.snake.length - 1].y = 0;
    }

    if(this.snake[this.snake.length - 1].x === this.guetzli.x
    && this.snake[this.snake.length - 1].y === this.guetzli.y) {
      this.snake.push(new Point(this.guetzli.x, this.guetzli.y));
      this.initGuetzli();

    }

  }



  isThereSnake(point:Point) {
    for(let item of this.snake) {
      if(item.x == point.x && item.y == point.y)
        return false;
    }

    return true;
  }

  paintSnake() {
    //clear field
    this.renderer.clear({r: 0, g: 0, b: 0}, 1);

    //paint all snake fields
    for (let snakePart of this.snake) {
      this.renderer.setColor(snakePart.x, snakePart.y, {r: 0, g: 150, b: 150});
    }

    //make first brighter
    this.renderer.setColor(this.snake[this.snake.length -1].x,
      this.snake[this.snake.length -1].y, {r: 0, g: 255, b: 255});

    //paint guetzli
    this.renderer.setColor(this.guetzli.x, this.guetzli.y, {r: 255, g: 255, b: 0});

    //Count collisions
    let tmpSnake = this.snake;
    let collisions = [];
    for(let item of this.snake) {
      let count = 0;
      for(let tmpItem of tmpSnake) {
        if(item.x === tmpItem.x && item.y === tmpItem.y)
          count++;
      }
      if(count > 1)
        collisions.push(item);
    }

    if(collisions.length > 0) {
      this.gameOver = true;

      for(let item of collisions)
        this.renderer.setColor(item.x, item.y, {r: 255, g: 0, b: 0});
    }

  }
}
