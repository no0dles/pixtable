import {Component, ViewChild} from '@angular/core';
import {RendererComponent} from "../shared/components/renderer/renderer.component";

export class Point {
  constructor(public x: number, public y: number) {}
}

export class Direction {
  constructor(public left: boolean, public top: boolean, public right: boolean, public bottom: boolean) {}
}

@Component({
  selector: 'app-snake-random',
  templateUrl: './snake-random.component.html',
  styleUrls: ['./snake-random.component.css']
})
export class SnakeRandomComponent {

  private snake: Point[];

  private pascals: number = 10;
  private time = 0;

  private static UpdateInterval = 100;

  @ViewChild("renderer")
  public renderer: RendererComponent;

  constructor() {
    this.initSnake();
  }

  initSnake() {
    this.snake = [];

    for (let i = 0; i < this.pascals; i++) {
      this.snake.push(new Point(0, 0));
    }
  }

  updateSnake() {

    this.renderer.clear({r: 0, g: 0, b: 0}, 1);

    let direction = this.getPossibleDirections();


    let possibleDirections = this.countPossibleDirections(direction);

    let index = Math.ceil(Math.random() * possibleDirections);

    let directionToTake = this.getDirectionToTake(index, direction);

    //1 = left, 2 = top, 3 = right, 4 = bottom
    this.moveSnake(directionToTake);

    this.paintSnake();
  }

  update(delta: number) {
    this.time += delta;

    if(this.time > SnakeRandomComponent.UpdateInterval) {
      this.time = 0;
      this.updateSnake();
    }
  }

  getPossibleDirections() {
    let lastPascal = this.snake[this.snake.length - 1];

    let left = true;
    let top = true;
    let right = true;
    let bottom = true;

    if(lastPascal.x == 0)
      left = false;

    if(lastPascal.y == 0)
      top = false;

    if(lastPascal.x == 11)
      right = false;

    if(lastPascal.y == 7)
      bottom = false;

    if(left)
      left = this.isThereSnake(lastPascal.x - 1, lastPascal.y);

    if(top)
      top = this.isThereSnake(lastPascal.x, lastPascal.y - 1);

    if(right)
      right = this.isThereSnake(lastPascal.x + 1, lastPascal.y);

    if(bottom)
      bottom = this.isThereSnake(lastPascal.x, lastPascal.y + 1);

    return new Direction(left, top, right, bottom);
  }

  isThereSnake(x:number, y:number) {
    for(let pascal of this.snake) {
      if(pascal.x == x && pascal.y == y)
        return false;
    }

    return true;
  }

  countPossibleDirections(direction:Direction) {
    let count = 0;

    if(direction.left)
      count++;

    if(direction.top)
      count++;

    if(direction.right)
      count++;

    if(direction.bottom)
      count++;

    return count;
  }

  getDirectionToTake(index:number, direction: Direction) {
    let count = 0;

    if(direction.left)
    {
      count++;

      if(count == index)
        return 1;
    }

    if(direction.top)
    {
      count++;

      if(count == index)
        return 2;
    }

    if(direction.right)
    {
      count++;

      if(count == index)
        return 3;
    }

    if(direction.bottom)
    {
      count++;

      if(count == index)
        return 4;
    }
  }

  moveSnake(direction:number) {
    for(let i = 0; i < this.snake.length - 1; i++) {
      this.snake[i].x = this.snake[i+1].x;
      this.snake[i].y = this.snake[i+1].y;
    }

    if(direction == 0)
      this.initSnake();

    if(direction == 1)
      this.snake[this.snake.length - 1].x -= 1;

    if(direction == 2)
      this.snake[this.snake.length - 1].y -= 1;

    if(direction == 3)
      this.snake[this.snake.length - 1].x += 1;

    if(direction == 4)
      this.snake[this.snake.length - 1].y += 1;

    console.log(this.snake[this.snake.length-1].x, this.snake[this.snake.length-1].y);

  }

  paintSnake() {
    for (let snakePart of this.snake) {
      this.renderer.setColor(snakePart.x, snakePart.y, {r: 0, g: 128, b: 128});
    }
  }
}
