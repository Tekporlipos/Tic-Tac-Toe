import { Component } from '@angular/core';

enum Cell {
  Empty,
  X,
  O
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  player1Name = '';
  player2Name = '';
  currentPlayer = Cell.X;
  board: Cell[][] = [[Cell.Empty, Cell.Empty, Cell.Empty], [Cell.Empty, Cell.Empty, Cell.Empty], [Cell.Empty, Cell.Empty, Cell.Empty]];
  gameOver = false;
  players = [
    { name: '', wins: 0 },
    { name: '', wins: 0 }
  ];
  gameStarted = false;
  winner: number = 0;

  get currentPlayerName(): string {
    return this.currentPlayer === Cell.X ? this.player1Name : this.player2Name;
  }
  getSymbol(value: number): string {
    if (value === 1) {
      return 'X';
    } else if (value === 2) {
      return 'O';
    } else {
      return '';
    }
  }
  startGame(): void {
    this.players[0].name = this.player1Name;
    this.players[1].name = this.player2Name;
    this.gameStarted = true;
  }

  cellClicked(row: number, col: number): void {
    if (this.board[row][col] !== Cell.Empty || this.gameOver) {
      return;
    }

    this.board[row][col] = this.currentPlayer;

    if (this.checkForWinner()) {
      this.gameOver = true;
      this.players[this.currentPlayer - 1].wins++;
    } else if (this.isBoardFull()) {
      this.gameOver = true;
    } else {
      this.currentPlayer = this.currentPlayer === Cell.X ? Cell.O : Cell.X;
    }
  }

  checkForWinner(): boolean {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] !== Cell.Empty && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] !== Cell.Empty && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
        return true;
      }
    }

    // Check diagonals
    if (this.board[0][0] !== Cell.Empty && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      return true;
    }
    if (this.board[2][0] !== Cell.Empty && this.board[2][0] === this.board[1][1] && this.board[1][1] === this.board[0][2]) {
      return true;
    }

    return false;
  }

  isBoardFull(): boolean {
    for (let row of this.board) {
      for (let cell of row) {
        if (cell === Cell.Empty) {
          return false;
        }
      }
    }

    return true;
  }

  resetGame(): void {
    this.board = [[Cell.Empty, Cell.Empty, Cell.Empty], [Cell.Empty, Cell.Empty, Cell.Empty], [Cell.Empty, Cell.Empty, Cell.Empty]];
    this.currentPlayer = Cell.X;
    this.gameOver = false;
  }
}
