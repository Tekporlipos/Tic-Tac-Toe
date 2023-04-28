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

  get currentPlayerName(): string {
    return this.currentPlayer === Cell.X ? this.player1Name : this.player2Name;
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
      this.players[this.currentPlayer].wins++;
    } else if (this.isBoardFull()) {
      this.gameOver = true;
    } else {
      this.currentPlayer = this.currentPlayer === Cell.X ? Cell.O : Cell.X;
    }
  }

  checkForWinner(): boolean {
    for (let i = 0; i < 3;
