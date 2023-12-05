
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
            url: "http://kkms4001.iptime.org:10096/game/user/",
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
                url: `http://kkms4001.iptime.org:10096/game/user/${targetID}/`,
                type: "delete",
                success: (data) => {
                    this.getUserList();
                }
            });
        }
    }
}

(() => {
    // for (let i = 0; i < 10; i++) {
    //     $.ajax({
    //         url: "http://kkms4001.iptime.org:10096/game/user/",
    //         type: "post",
    //         data: {
    //             "nickname": "test" + i,
    //             "password": "test" + i,
    //             "email": "test" + i + "@test.com",
    //         },
    //     });
    // }
    const userAdmin = new UserAdmin();
    $(".viewOnOff").on("click", function() {$(this).toggleClass("turnOff");});
    userAdmin.getUserList();
})();