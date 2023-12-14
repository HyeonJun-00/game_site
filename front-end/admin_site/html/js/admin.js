const euc = target => encodeURIComponent(target);

class UserAdmin {
    printUserList(userList = []) {
        $(".userTable .tableBox").html("");
        userList.forEach(v => {
            $(".userTable .tableBox").append(
                `<div>
                    <p>${v.nickname}</p>
                    <p>${v.email}</p>
                    <p>${v.created}</p>
                    <div class="buttonBox">
                        <button class="deleteButton" value="${v.no}">삭제</button>
                    </div>
                </div>`
            );
        });
        //<button class="updateButton" value="${v.no}">수정</button>
        $(".deleteButton").on("click", (e) => this.deleteUser(e));
    }
    getUserList() {
        $.ajax({
            url: "http://kkms4001.iptime.org:10096/user/",
            type: "get",
            success: (data) => {
                this.printUserList(JSON.parse(data));
            }
        });
    }
    deleteUser(e) {
        const targetID = $(e.target).val();

        if (confirm("정말 삭제 하겠습니까?")) {
            $.ajax({
                url: `http://kkms4001.iptime.org:10096/user/${euc(targetID)}/`,
                type: "delete",
                success: (data) => {
                    this.getUserList();
                }
            });
        }
    }
}

class GameAdmin {
    printGameList(userList = []) {
        $(".gameTable .tableBox").html("");
        userList.forEach(v => {
            console.log(v.view === true);
            $(".gameTable .tableBox").append(`
            <div class="gameContent">
                <p class="thisGameName">${v.name}</p>
                <p class="thisGameTag">${v.tag}</p>
                <p>${v.created}</p>
                <div class="viewBox">
                    <div class="viewOnOff ${!v.view && "turnOff"}" data-id="${v.id}" data-view="${v.view}"></div>
                </div>
                <div class="buttonBox">
                    <div>${v.description}</div>
                    <button class="descriptionButton">설명</button>
                    <button class="gameEditButton" value="${v.id}">수정</button>
                    <button class="gameDeleteButton" value="${v.id}">삭제</button>
                </div>
            </div>
            `);
        });

        $(".gameDeleteButton").on("click", (e) => this.deleteGame(e));
        $(".viewOnOff").on("click", (e) => this.patchView(e) );
        $(".descriptionButton").on("click", (e) => {
            $("#gameDescription").text($(e.target).prev().text());
            $("#descriptionBox").addClass("displayFlag");
        });
        $(".gameEditButton").on("click", (e) => {
            const targetGame = $(e.target).closest('.gameContent');
            const gameName = targetGame.find(".thisGameName").text();
            const gameTag = targetGame.find(".thisGameTag").text();
            const gameDescription = targetGame.find(".buttonBox > div").text();

            $("#gameEditBox").attr("data-id", e.target.value);
            $("#gameEditBox > .gameNameBox > input").val(gameName);
            $("#gameEditBox > .gameTagBox > input").val(gameTag);
            $("#gameEditBox > .gameDescriptionBox > textarea").val(gameDescription);
            $("#gameEditBox").addClass("displayFlag");
        });
    }
    createGame() {
        const gameName = $("#gameAddBox .gameNameBox > input").val();
        const gameTag = $("#gameAddBox .gameTagBox > input").val();
        const gameDescription = $("#gameAddBox .gameDescriptionBox > textarea").val();

        if (gameName.trim() === "" || gameTag.trim() === "" || gameDescription.trim() === "") {return ;}
        $.ajax({
            url: "http://kkms4001.iptime.org:10096/game/",
            type: "post",
            data: {
                "name": euc(gameName),
                "tag": euc(gameTag),
                "description": euc(gameDescription),
            },
            success: (data) => {
                this.getGameList();
            }
        });
    }
    updateGame(e) {
        const gameName = $("#gameEditBox .gameNameBox > input").val();
        const gameTag = $("#gameEditBox .gameTagBox > input").val();
        const gameDescription = $("#gameEditBox .gameDescriptionBox > textarea").val();
        const gameID = $("#gameEditBox").attr("data-id");

        if (gameName.trim() === "" || gameTag.trim() === "" || gameDescription.trim() === "") {return ;}
        $.ajax({
            url: `http://kkms4001.iptime.org:10096/game/${euc(gameID)}/${euc(gameName)}/${euc(gameTag)}/${euc(gameDescription)}/`,
            type: "put",
            success: (data) => {
                this.getGameList();
            }
        });
    }
    patchView(e) {
        const targetID = $(e.target).attr("data-id");
        const targetView = $(e.target).attr("data-view") !== "true";

        $.ajax({
            url: `http://kkms4001.iptime.org:10096/game/${euc(targetID)}/${euc(targetView)}/`,
            type: "patch",
            success: (data) => {
                $(e.target).attr("data-view", `${targetView}`);
                $(e.target).toggleClass("turnOff");
            }
        });
    }
    getGameList() {
        $.ajax({
            url: "http://kkms4001.iptime.org:10096/game/",
            type: "get",
            success: (data) => {
                this.printGameList(JSON.parse(data));
            }
        });
    }
    deleteGame(e) {
        const targetID = $(e.target).val();
        if (confirm("정말 삭제 하겠습니까?")) {
            $.ajax({
                url: `http://kkms4001.iptime.org:10096/game/${euc(targetID)}/`,
                type: "delete",
                success: (data) => {
                    this.getGameList();
                }
            });
        }
    }
}

(() => {
    const turnOffGameModal = () => {
        $("#gameAddBox").removeClass("displayFlag");
        $("#gameEditBox").removeClass("displayFlag");
    }
    const userAdmin = new UserAdmin();
    const gameAdmin = new GameAdmin();
    userAdmin.getUserList();
    gameAdmin.getGameList();
 
    $("#descriptionBox button").on("click", (e) => $("#descriptionBox").removeClass("displayFlag"));
    $("#addGameButton").on("click", () => $("#gameAddBox").addClass("displayFlag"));
    $(".gameCancelButton").on("click", turnOffGameModal);
    $("#gameCreateButton").on("click", () => {gameAdmin.createGame(), turnOffGameModal()});
    $("#gameEditButton").on("click", () => {gameAdmin.updateGame(), turnOffGameModal()});

})();