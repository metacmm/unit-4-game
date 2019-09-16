$(document).ready(function () {

    /** variables for the game objects, use object.id to find the html elements */
    var characterToSelect = [];
    var playerObj = null; //player object
    var defenderObj = null; //defender object
    var enemies = []; //remaining enemies object array

    function startGame() {
        characterToSelect = characters;
        status = "start";
        refreshWindow(status);
    }

    /** event handler of figure clicking */
    $(".character-group").on("click", function () {
        /** if you character is empty, select character*/
        if ($("#player-grid").is(':empty')) {
            playerDiv = this;
            for (var i = 0; i < characters.length; i++) {
                /** move the clicked player div to player grid */
                if (characters[i].id === playerDiv.id) {
                    $("#player-grid").append(playerDiv);
                    playerObj = characters[i];
                }
                /** move the rest of the character div to enemy grid */
                else {
                    var enemyDiv = $("#" + characters[i].id);
                    $("#enemy-grid").append(enemyDiv);
                    enemyDiv.addClass("enemy-group");
                    console.log(enemyDiv);
                }
            }
        }
        /** choose defender from the enemy class figures*/
        else if ($("#defender-grid").is(':empty') && this.id !== playerObj.id) {
            pickDefender(this);
        }
    });

    $("#btn-attack").on("click", function () {
        if (playerObj === null || defenderObj === null) {
            return;
        }
        playerObj.hp -= defenderObj.cap;
        defenderObj.hp -= playerObj.ap;
        playerObj.ap += playerObj.ap;

        refreshWindow();
        /** check if won*/
        if ($("#enemy-grid").is(':empty')) {
            setInfoGrid("You Won!!! GAME OVER!!!");
            setRestartButton();
            defenderObj = null;
            playerObj = null;
        }
        /** check if lost */
        else if (playerObj.hp < 0) {
            setInfoGrid("You've been defeated...GAME OVER!!!");
            setRestartButton();
            defenderObj = null;
            playerObj = null;
        }
        /** Check if defender is defeated*/
        else if (defenderObj.hp < 0) {
            setInfoGrid("You have defeated " + defenderObj.name + ", you can choose to finght another enemy.");
            defenderObj = null;
            $("#defender-grid").empty();
        }

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
                var figToSelect = $("#" + characterToSelect[i].id);
                figToSelect.addClass("character-group");
                $("#character-grid").append(figToSelect);
            }
            $("player-grid").empty();
            $("enemy-grid").empty();
            $("defender-grid").empty();
            infoText = null;
            isRestartButton = false;
        }
        else if (status === "ready") {
            var playerDiv = $("#" + playerObj.id);
            $("#player-grid").append(playerDiv);
            var defenderDiv = $("#" + defenderObj.id);
            $("#defender-grid").append(defenderDiv);
            defenderDiv.addClass("defender-group");

            enemies.forEach(element => {
                var enemyDiv = $("#" + element.id);
                $("enemy-grid").append(enemyDiv);
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
        else if (statuts === "defeated") {
            updateHP(playerObj);
            updateHP(defenderObj);
            $("#defender-grid").empty();
            infoText = "You have defeated " + defenderObj.name + ", you can choose to finght another enemy.";
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
        var text = "You attacked " + defenderObj.name + " for " + playerObj.ap + " damages. " +
            defenderObj.name + " attacked you back for " + defenderObj.cap + " damage.";
        setInfoGrid(text);
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
        $("#restart-grid").empty();
        if (isAvailable) {
            var btn_Restart = $("<button>");
            btn_Restart.text("Restart");
            btn_Restart.attr("id", "btn-restart");
            $("#restart-grid").append(btn_Restart);
        }
    }


    /** set defenderObj from the selected div */
    function pickDefender(div) {
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].id === div.id) {
                defenderDiv = div;
                $("#defender-grid").append(defenderDiv);
                defenderDiv.classList.add("defender-group");
                defenderObj = characters[i];
            }
        }
    }

    function updateHP(obj) {
        var div = $("#" + obj.id);
        for (var i = 0; i < div.childNodes.length; i++) {
            if (typeof div.childNodes[i].classList !== "undefined" &&
                div.childNodes[i].classList.contains("hp-value")) {
                var hpElement = playerDiv.childNodes[i];
                hpElement.textContent = obj.hp;
                break;
            }
        }
    }
    














});