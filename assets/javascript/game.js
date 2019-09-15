$(document).ready(function () {
    //create images for each characters
    function startGame() {
    }

    var playerObj = null; 
    var defenderObj = null; 
    var playerDiv = null;
    var defenderDiv = null;
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
        else if($("#defender-grid").is(':empty') && this.id !== playerObj.id){
            pickDefender(this);
            // defenderDiv = this;
            // for (var i = 0; i < characters.length; i++) {
            //     if (characters[i].id === defenderDiv.id) {
            //         $("#defender-grid").append(defenderDiv);
            //         defenderObj = characters[i];
            //     }
            // }
        }
    });

    $("#btn-attack").on("click", function(){
        if (playerObj === null || defenderObj === null){
            return;
        }
        playerObj.hp -= defenderObj.cap;
        defenderObj.hp -= playerObj.ap;
        playerObj.ap += playerObj.ap;
        
        refreshWindow();
        /** check if won*/
        if ($("#enemy-grid").is(':empty')){
            var p1 = $("<p>");
            p1.text("You Won!!! GAME OVER!!!");
            $("#info-grid").append(p1);
            var btn_Restart = $("<button>");
            btn_Restart.text("Restart");
            btn_Restart.attr("id","btn-restart");
            $("#restart-grid").append(btn_Restart);
            defenderObj = null;
            playerObj = null;
        }
        /** check if lost */
        else if(playerObj.hp < 0){
            var p1 = $("<p>");
            p1.text("You've been defeated...GAME OVER!!!");
            $("#info-grid").append(p1);
            var btn_Restart = $("<button>");
            btn_Restart.text("Restart");
            btn_Restart.attr("id","btn-restart");
            $("#restart-grid").append(btn_Restart);
            defenderObj = null;
            playerObj = null;
        }

        /** Check if defender is defeated*/
        else if (defenderObj.hp < 0){
            var p1 = $("<p>");
            p1.text("You have defeated " + defenderObj.name + ", you can choose to finght another enemy.");
            defenderObj = null;
            $("#defender-grid").empty();
        }

    });

    /** set defenderObj from the selected div */
    function pickDefender(div){
        for(var i = 0; i < characters.length; i++){
            if (characters[i].id === div.id){
                defenderDiv = div;
                $("#defender-grid").append(defenderDiv);
                defenderDiv.classList.add("defender-group");
                defenderObj = characters[i];
            }
        }
    }

    function refreshWindow(){
        /** update playerDiv and defenderDiv according to object new property value */
        for (var i = 0; i < playerDiv.childNodes.length; i++){
            if(typeof playerDiv.childNodes[i].classList !== "undefined" && 
            playerDiv.childNodes[i].classList.contains("hp-value")){
                var playerHp = playerDiv.childNodes[i];
                playerHp.textContent = playerObj.hp;
                break;
            }
        }

        for (var i = 0; i < defenderDiv.childNodes.length; i++){
            if (typeof defenderDiv.childNodes[i].classList !== "undefined" &&
            defenderDiv.childNodes[i].classList.contains("hp-value")){
                var defenderHp = defenderDiv.childNodes[i];
                defenderHp.textContent = defenderObj.hp;
            }
        }
        
        /** update the explanation paragraph */
        $("#info-grid").empty();
        var p1 = $("<p>");
        p1.text("You attacked " + defenderObj.name + " for " + playerObj.ap + " damages.");
        var p2 = $("<p>"); 
        p2.text(defenderObj.name + " attacked you back for " + defenderObj.cap + " damage. ");
        $("#info-grid").append(p1);
        $("#info-grid").append(p2);

    }














});