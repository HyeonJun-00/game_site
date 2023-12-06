
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
                        <button class="updateButton" value="${v.no}">수정</button>
                        <button class="deleteButton" value="${v.no}">삭제</button>
                    </div>
                </div>`
            );
        });
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
                url: `http://kkms4001.iptime.org:10096/user/${targetID}/`,
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
            <div>
                <p>${v.name}</p>
                <p>${v.tag}</p>
                <p>${v.created}</p>
                <div class="viewBox">
                    <div class="viewOnOff ${!v.view && "turnOff"}" data-id="${v.id}" data-view="${v.view}"></div>
                </div>
                <div class="buttonBox">
                    <button>설명</button>
                    <button value="${v.id}">수정</button>
                    <button class="gameDeleteButton" value="${v.id}">삭제</button>
                </div>
            </div>
            `);
        });
        $(".gameDeleteButton").on("click", (e) => this.deleteGame(e));
        $(".viewOnOff").on("click", (e) => this.patchView(e) );
    }
    patchView(e) {
        const targetID = $(e.target).attr("data-id");
        const targetView = $(e.target).attr("data-view") !== "true";
        $.ajax({
            url: `http://kkms4001.iptime.org:10096/game/${targetID}/${targetView}/`,
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
                url: `http://kkms4001.iptime.org:10096/game/${targetID}/`,
                type: "delete",
                success: (data) => {
                    this.getGameList();
                }
            });
        }
    }
}

(() => {
    // for (let i = 0; i < 10; i++) {
    //     $.ajax({
    //         url: "http://kkms4001.iptime.org:10096/user/",
    //         type: "post",
    //         data: {
    //             "nickname": "test" + i,
    //             "password": "test" + i,
    //             "email": "test" + i + "@test.com",
    //         },
    //     });
    // }
    // for (let i = 0; i < 10; i++) {
    //     $.ajax({
    //         url: "http://kkms4001.iptime.org:10096/game/",
    //         type: "post",
    //         data: {
    //             "name": "하이하이" + i,
    //             "description": "칼국수",
    //             "tag": "#요리",
    //         },
    //     });
    // }
    const userAdmin = new UserAdmin();
    const gameAdmin = new GameAdmin();
    userAdmin.getUserList();
    gameAdmin.getGameList();
})();