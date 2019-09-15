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
        if (playerObj === null || playerObj === null){
            return;
        }
        playerObj.hp -= defenderObj.cap;
        defenderObj.hp -= playerObj.ap;
        playerObj.ap += playerObj.ap;
        
        refreshWindow();
        /** Check if win or lose*/
        if ($("#enemy-grid").is(':empty')){
            //setWinning status
        }
        else if(playerObj.hp < 0){
            //setLosing stauts
        }

        /** Check if defender is defeated*/
        if (defenderObj.hp <= 0){
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
        


    }














});