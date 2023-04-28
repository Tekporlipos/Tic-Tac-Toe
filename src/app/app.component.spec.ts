import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty board', () => {
    expect(component.board.flat().every(cell => cell === 0)).toBeTrue();
  });

  it('should alternate between X and O on each turn', () => {
    component.cellClicked(0, 0);
    expect(component.board[0][0]).toBe(1);
    expect(component.currentPlayer).toBe(2);

    component.cellClicked(1, 0);
    expect(component.board[1][0]).toBe(2);
    expect(component.currentPlayer).toBe(1);

    component.cellClicked(2, 2);
    expect(component.board[2][2]).toBe(1);
    expect(component.currentPlayer).toBe(2);
  });

  it('should not allow a cell to be clicked twice', () => {
    component.cellClicked(0, 0);
    expect(component.board[0][0]).toBe(1);

    component.cellClicked(0, 0);
    expect(component.board[0][0]).toBe(1);
  });

  it('should declare a winner when a player gets three in a row', () => {
    component.cellClicked(0, 0);
    component.cellClicked(1, 0);
    component.cellClicked(0, 1);
    component.cellClicked(1, 1);
    component.cellClicked(0, 2);
    expect(component.gameOver).toBeTrue();
    expect(component.players[0].wins).toBe(1);
  });

  it('should declare a tie when the board is full', () => {
    component.cellClicked(0, 0);
    component.cellClicked(0, 1);
    component.cellClicked(0, 2);
    component.cellClicked(1, 1);
    component.cellClicked(1, 0);
    component.cellClicked(1, 2);
    component.cellClicked(2, 1);
    component.cellClicked(2, 0);
    component.cellClicked(2, 2);
    expect(component.gameOver).toBeTrue();
  });

  it('should reset the board and game state when resetGame is called', () => {
    component.cellClicked(0, 0);
    component.resetGame();
    expect(component.board.flat().every(cell => cell === 0)).toBeTrue();
    expect(component.currentPlayer).toBe(1);
    expect(component.gameOver).toBeFalse();
  });
});
