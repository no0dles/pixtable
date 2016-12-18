import { Component, OnInit, ViewChild } from '@angular/core';
import {RendererComponent} from "../shared/components/renderer/renderer.component";

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
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css'],
  host: {
    '(document:keydown)': 'keyPress($event)'
  }
})
export class SnakeComponent implements OnInit{


  private startSnakeLength = 3;

  private snake: Point[];

  private guetzli: Point;

  private fats: Point[];

  private gameOver: boolean = false;

  private direction: Direction = Direction.Right;
  private directionBefore: Direction = Direction.Right;
  private time = 0;
  private timeout = 0;
  private resultTime = 0;

  private static UpdateInterval = 200;
  private static GameOverTimeOut = 4000;
  private static ResultTimer = 4000;

  @ViewChild("renderer")
  public renderer: RendererComponent;

  constructor() {
    this.fats = [];
  }

  turnLeft() {
    if(this.directionBefore !== Direction.Right) {
      this.direction = Direction.Left;
    }
  }

  turnRight() {
    if(this.directionBefore !== Direction.Left) {
      this.direction = Direction.Right;
    }
  }

  turnUp() {
    if(this.directionBefore !== Direction.Down) {
      this.direction = Direction.Up;
    }
  }

  turnDown() {
    if(this.directionBefore !== Direction.Up) {
      this.direction = Direction.Down;
    }
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
    this.gameOver = false;
    this.direction = Direction.Right;
  }

  initSnake() {
    this.snake = [];

    for (let i = 0; i < this.startSnakeLength; i++) {
      this.snake.push(new Point(i, 5));
    }
  }

  getRandom(no: number) {
    return Math.ceil(Math.random() * no);
  }

  initGuetzli() {

    let p = this.getRandomPoint();
    while(!this.isThereSnake(p)){
      p = this.getRandomPoint();
    }

    this.guetzli = p;
  }

  getRandomPoint() {
    return new Point(this.getRandom(11), this.getRandom(7));
  }

  update(delta: number) {
    this.time += delta;

    if(!this.gameOver) {
      if (this.time > SnakeComponent.UpdateInterval) {
        this.time = 0;
        this.updateSnake();
      }
    } else {

      this.timeout += delta;
      if(this.timeout > SnakeComponent.GameOverTimeOut) {

        this.resultTime += delta;

        this.gameOverScreen();

        if(this.resultTime > SnakeComponent.ResultTimer) {

          this.timeout = 0;
          this.resultTime = 0;
          this.ngOnInit();
        }

      }
    }
  }

  updateSnake() {
    this.directionBefore = this.direction;
    this.moveSnake();
    this.paintSnake();
  }

  gameOverScreen() {

    for(let i = 0; i < 12; i++)
      for(let k = 0; k < 8; k++)
        this.renderer.setColor(i, k, {r: 0, g: 0, b: 0});

    console.log(this.snake.length);


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
      this.fats.push(new Point(this.guetzli.x, this.guetzli.y));
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


    let burnCalories = [];
    for(let fat = 0; fat < this.fats.length; fat++) {
      let fatHasPlace = true;

      for(let item of this.snake) {
        if(item.x === this.fats[fat].x && item.y === this.fats[fat].y) {
          fatHasPlace = false;
          continue;
        }
      }

      if(fatHasPlace) {
        this.snake.splice(0, 0,this.fats[fat]);
        burnCalories.push(fat);
      }
    }

    for(let index of burnCalories)
      this.fats.splice(index, 1);

    //paint all snake fields
    for (let snakePart of this.snake) {
      this.renderer.setColor(snakePart.x, snakePart.y, {r: 0, g: 150, b: 150});
    }

    //make first brighter
    this.renderer.setColor(this.snake[this.snake.length -1].x,
      this.snake[this.snake.length -1].y, {r: 0, g: 255, b: 255});

    //paint guetzli
    this.renderer.setColor(this.guetzli.x, this.guetzli.y, {r: 255, g: 255, b: 0});

    this.paintCollisions();
  }

  paintCollisions()
  {
    //Count collisions
    let tmpSnake = this.snake;
    let collisions = [];
    for (let item of this.snake) {
      let count = 0;
      for (let tmpItem of tmpSnake) {
        if (item.x === tmpItem.x && item.y === tmpItem.y)
          count++;
      }
      if (count > 1)
        collisions.push(item);
    }

    if (collisions.length > 0) {
      this.gameOver = true;

      for (let item of collisions)
        this.renderer.setColor(item.x, item.y, {r: 255, g: 0, b: 0});
    }
  }
}
