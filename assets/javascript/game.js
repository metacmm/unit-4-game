$(document).ready(function () {

    /** variables for the game objects, use object.id to find the html elements */
    var characterToSelect;      //deep copy of characters array for this game session
    var playerObj;              //player object
    var defenderObj;            //defender object
    var enemies;                //remaining enemies object array
    var status;                 //track the game status

    startGame();

    function startGame() {
        defenderObj = null;
        playerObj = null;
        characterToSelect = JSON.parse(JSON.stringify(characters));
        enemies = [];
        status = "start";
        refreshWindow(status);
    }

    /** event handler of figure clicking */
    $(".character-group").on("click", function () {
        /** if you character is empty, select character*/
        if (playerObj === null) {
            for (var i = 0; i < characterToSelect.length; i++) {
                /** move the clicked player div to player grid */
                if (characterToSelect[i].id === this.id) {
                    playerObj = characterToSelect[i];
                }
                /** move the rest of the character div to enemy grid */
                else {
                    enemies.push(characterToSelect[i]);
                }
            }
            refreshWindow("ready"); //game status is not ready yet, just use this status to refresh window
        }
        /** choose defender from the enemy class figures*/
        else if (defenderObj === null && this.id !== playerObj.id) {
            for (var i = 0; i < enemies.length; i++) {
                if (this.id === enemies[i].id) {
                    defenderObj = enemies[i];
                    enemies.splice(i, 1); //remove this object from enemies array
                }
            }
            status = "ready";
            refreshWindow(status);
        }

    });

    $("#btn-attack").on("click", function () {
        if (status === "ready" || status === "inprogress") {
            playerObj.hp -= defenderObj.cap;
            defenderObj.hp -= playerObj.ap;
            playerObj.ap += playerObj.ap;
            status = "inprogress";

            refreshWindow(status);
            /** Check if defender is defeated*/
            if (defenderObj.hp <= 0) {   
                status = "defeated";
                refreshWindow(status);
                defenderObj = null;
            }
            
            /** check if won*/
            if (enemies.length === 0 && defenderObj === null) {
                status = "won";
                refreshWindow(status);
            }
            /** check if lost */
            else if (playerObj.hp <= 0) {
                status = "lost";
                refreshWindow(status);
            }
        }
    });

    $("#btn-restart").on("click", function () {
        startGame();
    });

    /** totally six status ["start", "ready", "inprogress", "lost", "defeated", "won"] to control the screen refresh
     *  start - new game started, waiting to select the characters
     *  ready - player and defender characters are selected
     *  inprogress - player attacked defender and no one loses yet
     *  lost - player hp is less than 0
     *  defeated - current defender hp is less than 0
     *  won - enemy array is empty
    */
    function refreshWindow(status) {
        var infoText;
        var isRestartButton;
        if (status === "start") {
            for (var i = 0; i < characterToSelect.length; i++) {
                var figToSelect = createFigure(characterToSelect[i]);
                $("#character-grid").append(figToSelect);
            }
            $("#player-grid").empty();
            $("#enemy-grid").empty();
            $("#defender-grid").empty();
            infoText = null;
            isRestartButton = false;
        }
        else if (status === "ready") {
            var playerDiv = $("#" + playerObj.id);
            $("#player-grid").append(playerDiv);
            if (defenderObj !== null) {
                var defenderDiv = $("#" + defenderObj.id);
                $("#defender-grid").append(defenderDiv);
                defenderDiv.addClass("defender-group");
            }
            enemies.forEach(element => {
                var enemyDiv = $("#" + element.id);
                $("#enemy-grid").append(enemyDiv);
                enemyDiv.addClass("enemy-group");
            });
            infoText = null;
            isRestartButton = false;

        }
        else if (status === "inprogress") {
            updateHP(playerObj);
            updateHP(defenderObj);
            infoText = "You attacked " + defenderObj.name + " for " + playerObj.ap + " damages. " +
                defenderObj.name + " attacked you back for " + defenderObj.cap + " damage.";
            isRestartButton = false;
        }
        else if (status === "defeated") {
            updateHP(playerObj);
            updateHP(defenderObj);
            $("#defender-grid").empty();
            infoText = "You have defeated " + defenderObj.name + ", you can choose to fight another enemy.";
            isRestartButton = false;
        }
        else if (status === "lost") {
            infoText = "You've been defeated...GAME OVER!!!";
            isRestartButton = true;
        }
        else if (status === "won") {
            infoText = "You Won!!! GAME OVER!!!";
            isRestartButton = true;
        }

        /** update the explanation paragraph */
        setInfoGrid(infoText);
        setRestartButton(isRestartButton);
    }

    /** create figure div */
    function createFigure(obj){
        var div = $("<div>");
        div.addClass("character-group");
        div.attr("id", obj.id);

        var p1 = $("<p>").addClass("text-center figure-caption my-0");
        p1.text(obj.name);
        div.append(p1);

        var img = $("<img>").addClass("w-100 h-75 m-0 figure-img img-fluid");
        img.attr("src", obj.imageUrl);
        div.append(img);

        var p2 = $("<p>").addClass("hp-value text-center figure-caption");
        p2.text(obj.hp);
        div.append(p2);

        return div;
    }

    /** set info-grid */
    function setInfoGrid(text) {
        $("#info-grid").empty();
        if (text !== null) {
            var p1 = $("<p>");
            p1.text(text);
            $("#info-grid").append(p1);
        }
    }

    /** set restart button */
    function setRestartButton(isAvailable) {
        //$("#restart-grid").empty();
        if (isAvailable) {
            // var btn_Restart = $("<button>");
            // btn_Restart.text("Restart");
            // btn_Restart.addClass("btn-restart");
            // btn_Restart.attr("type","button");
            // $("#restart-grid").append(btn_Restart);
            $("#btn-restart").css("visibility", "visible");
        }
        else{
            $("#btn-restart").css("visibility", "hidden");
        }
    }

    function updateHP(obj) {
        var div = $("#" + obj.id);
        for (var i = 0; i < div[0].childNodes.length; i++) {
            if (typeof div[0].childNodes[i].classList !== "undefined" &&
                div[0].childNodes[i].classList.contains("hp-value")) {
                var hpElement = div[0].childNodes[i];
                hpElement.textContent = obj.hp;
                break;
            }
        }
    }















});