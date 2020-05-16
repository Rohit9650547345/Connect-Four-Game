var player1 = prompt("Player One:Enter your Name, you will be Blue: ")
var player2 = prompt("Player Two:Enter your Name, you will be Red: ")

var player1Color = 'rgb(86, 151, 255)';
var player2Color = 'rgb(237, 45, 73)';

var table = $("tr")

function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  // var colorReport = returnColor(5, colIndex);
  for(var row = 5; row >= 0; row--) {
    var colorReport = returnColor(row, colIndex)
    if (colorReport === "rgb(128, 128, 128)") {
      return row;
    }
  }
}

function reportWin(rowIndex, colIndex) {
  console.log("You won starting at this row, col");
  console.log(rowIndex);
  console.log(colIndex);
}

function colorMatch(one, two, three, four) {
  return (one === two && one === three && one === four && one !=='rgb(128, 128, 128)' && one !== undefined );
}

function horizontalCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatch(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))) {
        console.log("Horizontal");
        reportWin(row, col);
        return true;
      }
    }
  }
}

function verticalCheck() {
  for (var col = 0; col < 7; col++) {
    for ( var row = 0; row < 4; row++) {
      if (colorMatch(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))) {
        console.log("Vertical");
        reportWin(row, col);
        return true;
      }
    }
  }
}

function diagonalCheck() {
  for (var row = 0; row < 7; row++) {
    for (var col = 0; col < 7; col++) {
      if (colorMatch(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))) {
        console.log("Diagonal right");
        reportWin(row, col);
        return true;
      }
      if (colorMatch(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3))) {
        console.log("Diagonal left");
        reportWin(row, col);
        return true;
      }
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;
var game = true;


$("h3").text(player1 + " it is your turn, pick a column to drop in!")

$('button').on('click', function () {

  if (game) {
    var col = $(this).closest('td').index()

    var bottomAvail = checkBottom(col)

    changeColor(bottomAvail, col, currentColor)

    if (horizontalCheck() || verticalCheck() || diagonalCheck()) {
      $('h1').text(currentName + ", You have won!");
      $('h2').fadeOut('fast')
      $('h3').fadeOut('fast')
      game = false;
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1) {
      currentName = player1;
      $('h3').text(currentName + " it is your turn");
      currentColor = player1Color;
    } else {
      currentName = player2;
      $('h3').text(currentName + " it is your turn");
      currentColor = player2Color;
    }
  }else {
    $('h1').text('Game up! Refresh the page!');
  }
})
