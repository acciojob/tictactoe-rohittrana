//your JS code here. If required.
let player1;
let player2;
let currentPlayer = 1;

let board = ["", "", "", "", "", "", "", "", ""];

document.getElementById("submit").addEventListener("click", function () {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    if (player1 === "" || player2 === "") {
        return;
    }

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    document.querySelector(".message").textContent =
        player1 + ", you're up";
});

document.querySelectorAll(".cell").forEach(function (cell) {
    cell.addEventListener("click", function () {

        let id = parseInt(cell.id);

        // Don't allow already filled cells
        if (board[id] !== "") {
            return;
        }

        if (currentPlayer === 1) {
            board[id] = "x";
            cell.textContent = "x";
        } else {
            board[id] = "o";
            cell.textContent = "o";
        }

        if (checkWinner()) {
            let winner = currentPlayer === 1 ? player1 : player2;

            document.querySelector(".message").textContent =
                winner + ", congratulations you won!";

            return;
        }

        // Change player
        if (currentPlayer === 1) {
            currentPlayer = 2;
            document.querySelector(".message").textContent =
                player2 + ", you're up";
        } else {
            currentPlayer = 1;
            document.querySelector(".message").textContent =
                player1 + ", you're up";
        }
    });
});


function checkWinner() {
    let winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for (let combination of winningCombinations) {
        let a = combination[0];
        let b = combination[1];
        let c = combination[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return true;
        }
    }

    return false;
}