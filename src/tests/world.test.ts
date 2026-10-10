import { expect, describe, it, beforeAll } from 'vitest';
import {
  Cell,
  generateOuterWall,
  generateSimpleMaze,
  MazeWorld,
} from '../world';

const getColumn = (world: MazeWorld, col: number) =>
  world.map((_, i) => world[i][col]);

const checkColOpen = (col: Cell[]) =>
  expect(col.every((value) => value === 'open')).toBe(true);

describe('World generation', () => {
  describe('Simple Maze', () => {
    let world: MazeWorld;
    beforeAll(() => {
      world = generateSimpleMaze();
    });
    it('Generated a 2D matrix', () => {
      expect(world.length).toBeGreaterThan(0);
      expect(world[0].length).toBeGreaterThan(0);
    });
    it('Only generates open | wall values', () => {
      world.forEach((row) => {
        row.forEach((value) => {
          expect(value).toBeOneOf(['open', 'wall']);
        });
      });
    });
    it('Generates a maze', () => {
      const firstCol = getColumn(world, 0);
      const secondCol = getColumn(world, 1);
      const thirdCol = getColumn(world, 2);
      const fourthCol = getColumn(world, 3);

      checkColOpen(firstCol);
      checkColOpen(thirdCol);

      expect(secondCol.at(-1)).toBe('open');
      expect(fourthCol.at(0)).toBe('open');
    });
  });
  describe('Outer Wall', () => {
    let world: MazeWorld;
    let innerWorld:MazeWorld
    beforeAll(() => {
      innerWorld = generateSimpleMaze();
      world = generateOuterWall(innerWorld);
    });
    it('Creates an outer wall', () => {
      expect(world[0].every((cell) => cell === 'wall')).toBe(true);
      expect(world[world.length - 1].every((cell) => cell === 'wall')).toBe(
        true,
      );
      world.
    });
  });
});
