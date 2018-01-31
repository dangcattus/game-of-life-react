# Conway's Game of Life with React

Implementation of Conway's game of life using React. I followed a tutorial on youtube listed below.

## Getting Started

To run the program from terminal

```
npm run start
```

This will start the program in the browser.

From there, you can randomly seed the game, or click on individual squares to turn them on or off.

You can start and pause game from the GUI, as well as change the speeds and the grid size.

## Game of Life Rules

From wikipedia:

The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, or "populated" or "unpopulated". Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

### Acknowledgments

The tutorial I used to create this game was from @freeCodeCamp on Youtube.
https://www.youtube.com/watch?v=PM0_Er3SvFQ

Rules and explanation for Conway's Game of Life from wikipedia.
https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
