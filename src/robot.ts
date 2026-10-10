import { Direction, Observation, Point, World } from './world';

export class Robot {
  observation: Observation;
  position: Point;
  directions: Record<Direction, Point> = {
    N: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    W: { x: -1, y: 0 },
  };
  constructor(start: Point) {
    this.position = start;
    this.observation = {
      position: this.position,
      surroundings: { N: 'unknown', S: 'unknown', E: 'unknown', W: 'unknown' },
    };
  }
  sense(world: World) {
    const worldIndices = Object.entries(this.directions).reduce(
      (acc, [direction, point]) => {
        acc[direction as Direction] = {
          x: point.x + this.position.x,
          y: point.y + this.position.y,
        };
        return acc;
      },
      {} as Record<Direction, Point>,
    );
  }
}
