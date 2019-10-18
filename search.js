/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/

class WordSearch {
  constructor(grid, word) {
    this.grid = grid;
    this.rows = grid.length;
    this.columns = grid[0].length;
    this.word = word;
    this.firstLetter;
    this.nextLetter;
    this.lastTraversed;
  }

  traverse(direction) {
    if (direction(this.lastTraversed)) {
      this.traverse(direction);
    }

    return false;
  }

  search() {
    if (this.word.length > this.rows || this.word.length > this.columns) {
      return false;
    }

    if (!this.findFirstLetter()) {
      return false;
    }

    for (let w = 1; w < this.word.length; w++) {
      this.nextLetter = this.word[w];

      if (this.up(this.lastTraversed)) {
        console.log("going up");
      } else if (this.down(this.lastTraversed)) {
        console.log("going down");
      } else if (this.left(this.lastTraversed)) {
        console.log("going left");
      } else if (this.right(this.lastTraversed)) {
        console.log("going right");
      } else if (this.upDiagonalRight(this.lastTraversed)) {
        console.log("going upDiagonalRight");
      } else if (this.upDiagonalLeft(this.lastTraversed)) {
        console.log("going upDiagonalLeft");
      } else if (this.downDiagonalRight(this.lastTraversed)) {
        console.log("going downDiagonalRight");
      } else if (this.downDiagonalLeft(this.lastTraversed)) {
        console.log("going downDiagonalLeft");
      } else {
        return false;
      }
    }

    return true;
  }

  findFirstLetter() {
    for (let row = 0; row < this.rows; row++) {
      // See if there is more than one instance of the first letter

      // for (let column = 0; column < this.grid[row].length; column++) {
      //   const element = array[column];
      // }

      const column = this.grid[row].findIndex(
        x => x.toUpperCase() === this.word[0].toUpperCase()
      );

      if (column !== -1) {
        return (this.lastTraversed = { row, column });
      }
    }

    return false;
  }

  upDiagonalRight({ row, column }) {
    if (row === 0 || column === this.columns - 1) {
      return false;
    }

    if (
      this.grid[row - 1][column + 1].toUpperCase() ===
      this.nextLetter.toUpperCase()
    ) {
      this.lastTraversed = { row: row - 1, column: column + 1 };

      return true;
    }

    return false;
  }

  upDiagonalLeft({ row, column }) {
    if (row === 0 || column === 0) {
      return false;
    }

    if (
      this.grid[row - 1][column - 1].toUpperCase() ===
      this.nextLetter.toUpperCase()
    ) {
      this.lastTraversed = { row: row - 1, column: column - 1 };

      return true;
    }

    return false;
  }

  downDiagonalRight({ row, column }) {
    if (row === this.rows - 1 || column === this.columns - 1) {
      return false;
    }

    if (
      this.grid[row + 1][column + 1].toUpperCase() ===
      this.nextLetter.toUpperCase()
    ) {
      this.lastTraversed = { row: row + 1, column: column + 1 };

      return true;
    }

    return false;
  }

  downDiagonalLeft({ row, column }) {
    if (row === this.rows - 1 || column === 0) {
      return false;
    }

    if (
      this.grid[row + 1][column - 1].toUpperCase() ===
      this.nextLetter.toUpperCase()
    ) {
      this.lastTraversed = { row: row + 1, column: column - 1 };

      return true;
    }

    return false;
  }

  up({ row, column }) {
    if (row === 0) {
      return false;
    }

    if (
      this.grid[row - 1][column].toUpperCase() === this.nextLetter.toUpperCase()
    ) {
      this.lastTraversed = { row: row - 1, column };

      return true;
    }

    return false;
  }

  down({ row, column }) {
    if (row === this.rows - 1) {
      return false;
    }

    if (
      this.grid[row + 1][column].toUpperCase() === this.nextLetter.toUpperCase()
    ) {
      this.lastTraversed = { row: row + 1, column };

      return true;
    }

    return false;
  }

  left({ row, column }) {
    if (column === 0) {
      return false;
    }

    if (
      this.grid[row][column - 1].toUpperCase() === this.nextLetter.toUpperCase()
    ) {
      this.lastTraversed = { row, column: column - 1 };

      return true;
    }

    return false;
  }

  right({ row, column }) {
    if (column === this.columns - 1) {
      return false;
    }

    if (
      this.grid[row][column + 1].toUpperCase() === this.nextLetter.toUpperCase()
    ) {
      this.lastTraversed = { row, column: column + 1 };

      return true;
    }

    return false;
  }
}

module.exports = function search(grid, wordList) {
  return wordList.filter(word => new WordSearch(grid, word).search());
};

// write a generic search
// track where you've searched (optimization)
// track where the letter was found

// change the shap