var elements, first_player, diff, sizeTabu, max_elements = 0;

var token = function (dimx, x, y) {
    this.dimx = dimx;
    this.token = document.createElement('div');

    this.x = x;
    this.y = y;
}

function start_game() {

    sizeTabu = parseInt(document.getElementById('size_value').innerHTML);
    
    diff = parseInt(document.getElementById('difficulty_value').innerHTML);

    if (document.getElementById('human').checked)
    	first_player = "human";
    else
    	first_player = "pc";

    document.getElementById('configurations').style.display = 'none';
    create_board();
}

function changeColor(x, y) {
	for (var i = elements[x].length - 1; i >= y; i--)
    	elements[x][i].token.style.backgroundColor = "#B2B2AE";

    return;
}

function remakeColor(x, y) {
	for (var i = elements[x].length - 1; i >= y; i--)
    	elements[x][i].token.style.backgroundColor = "#060033";

    return;
}

function conceded() {
    if (first_player == "pc") {
        document.getElementById('interface').style.display = "none";
        document.getElementById('game_loss').style.display = "block";
    }

    if (first_player == "human") {
        document.getElementById('interface').style.display = "none";
        document.getElementById('game_victory').style.display = "block";
    }

    return;
}

function create_board() {
    max_elements = 0;

    var game_board = document.createElement('div');
    var interface = document.createElement('div');
    var text;
    var concede;

    document.getElementById('main').appendChild(interface);    
    interface.setAttribute('id','interface');
    game_board.setAttribute('id','board');
    
    var turn = document.createElement('turn');
    turn.setAttribute('id','turn');
    if (first_player == "human")
        text = document.createTextNode("Player 1's Turn");
    else
        text = document.createTextNode("Player 2's Turn");

    turn.appendChild(text);
    interface.appendChild(turn);
    document.getElementById('interface').appendChild(game_board);

    game_board.style.width = 300 + "px";
    game_board.style.height = 300 + "px";
    game_board.style.margin = "auto";
    game_board.style.marginTop = "2%";
    game_board.style.border = "1px solid black";
    interface.style.width = "100%";
    interface.style.textAlign = "center";

    var block = document.createElement('div');
    block.setAttribute("id","block");
    document.getElementById('board').appendChild(block);

   	block.style.display = "none";

    var column;

    var dim_token = 100/sizeTabu;
    var j = 1;
    
    elements = new Array(sizeTabu);

    for (var i = 0; i < sizeTabu; i++) {
        elements[i] = Array(j);
        j++;
    }

 	for (i = 0; i < sizeTabu; i++) {
        column = document.createElement('div');

        document.getElementById('board').appendChild(column);

        column.style.display = "inline-block";
        column.style.width = dim_token + "%"
        column.style.height = (dim_token * (i + 1)) + "%";
        
        for (j = i; j >= 0; j--) {
            elements[i][j] = new token(i, j);

            column.appendChild(elements[i][j].token);

            elements[i][j].token.style.backgroundColor = "#060033";
            elements[i][j].token.style.borderRadius = "50%";
            elements[i][j].token.style.width = 100 + "%";
            elements[i][j].token.style.height = (100 / (i + 1)) + "%";

            elements[i][j].token.addEventListener("click", function(col, row) {
            	return function() { remove(col, row); }
    		}(i, j));
    		elements[i][j].token.addEventListener("mouseover", function(col, row) {
    			return function() { changeColor(col, row); }
    		}(i, j));
    		elements[i][j].token.addEventListener("mouseout", function(col, row) {
    			return function() { remakeColor(col, row); }
    		}(i, j));

            max_elements++;
        }
    }

    concede = document.createElement('button');
    document.getElementById('interface').appendChild(concede);
    concede.innerHTML = "Give Up";
    concede.style.marginTop = "2%";
    concede.addEventListener("click", conceded);

    return;
}

function add_config() {
    document.getElementById('configurations').style.display = 'inline';

    return;
}

function returnToConfig() {
	//Ver esta parte

	var interface = document.getElementById('interface');
	var configs = document.getElementById('configurations');

	interface.parentNode.removeChild(interface);
    document.getElementById('game_loss').style.display = "none";
    document.getElementById('game_victory').style.display = "none";

    add_config();

	return;
}

function switchTurn() {
    var turn = document.getElementById('turn');

	if (first_player == 'human') {
		first_player = 'pc';
        turn.innerHTML= "Player 2's Turn";
        document.getElementById('block').style.display = "block";
    }
    else {
        first_player = 'human';
        turn.innerHTML= "Player 1's Turn";
        document.getElementById('block').style.display = "none";
    }

	return;
}

function remove(x, y) {
	for (var i = elements[x].length - 1; i >= y; i--)
		if (elements[x][i].token.style.visibility != "hidden") {
			elements[x][i].token.style.visibility = "hidden";
            max_elements--;
		}

    if (first_player == "pc" )
		if (max_elements == 0) {
			document.getElementById('interface').style.display = "none";
            document.getElementById('game_loss').style.display = "block";

			return;
		  }

	if (first_player == "human")
		if (max_elements == 0) {
			document.getElementById('interface').style.display = "none";
            document.getElementById('game_victory').style.display = "block";

			return;
		}
	
	switchTurn();

    return;
}

function selectedRemove(x,y) {
	for (var i = elements[x].length - 1; i >= y; i--)
		if (elements[x][i].token.style.visibility != "hidden")
			elements[x][i].token.style.backgroundColor = "#ffad33";

	setTimeout(function(){ remove(x, y) }, 700);
}