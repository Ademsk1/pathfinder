export type Point = { x: number; y: number };

export type Cell = 'unknown' | 'open' | 'wall';

export type Direction = 'N' | 'S' | 'W' | 'E';

export type Observation = {
  position: Point;
  surroundings: Record<Direction, Cell>;
};

export type MazeWorld = Cell[][];

export const SIZE = 10;

const generate2DNullSpace = (size: number): MazeWorld => {
  const world: MazeWorld = [];
  for (let i = 0; i < size; i++) {
    let row: Cell[] = [];
    for (let j = 0; j < size; j++) {
      row.push('open');
    }
    world.push(row);
  }
  return world;
};

// idea: use canvas to draw a maze maybe...
export const generateSimpleMaze = () => {
  const world = generate2DNullSpace(SIZE);
  for (let i = 1; i < SIZE; i += 2) {
    const offset = ((i - 1) / 2) % 2;
    for (let j = offset; j < SIZE - 1; j++) {
      world[j][i] = 'wall';
    }
  }
  return world;
};

export const generateOuterWall = (world: MazeWorld) => {
  const size = world.length + 2;
  const outerWorld = [];
  for (let i = 0; i < size; i++) {
    if (i === 0 || i === size - 1) {
      outerWorld.push(new Array(size).fill('wall'));
    } else {
      const sideWall = structuredClone(world[i - 1]);
      sideWall.unshift('wall');
      sideWall.push('wall');
      outerWorld.push(sideWall);
    }
  }
  return outerWorld;
};

export class World {
  private _map: MazeWorld;
  constructor(map?: MazeWorld) {
    this._map = generateSimpleMaze();
  }
  get map() {
    return this._map;
  }
  set map(map: MazeWorld) {
    this._map = map;
  }
  column(col: number) {
    return this._map.map((_, row) => this._map[row][col]);
  }
  row(row: number) {
    return this._map[row];
  }
  cell(row: number, col: number) {
    return this._map[row][col];
  }
}
