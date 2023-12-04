
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
                        <button class="updateButton" value="${v.nickname}">수정</button>
                        <button class="deleteButton" value="${v.nickname}">삭제</button>
                    </div>
                </div>`
            );
        });
        $(".deleteButton").on("click", (e) => this.deleteUser(e));
    }
    getUserList() {
        $.ajax({
            url: "http://kkms4001.iptime.org:10096/game/get_user_list/",
            success: (data) => {
                this.printUserList(JSON.parse(data));
            }
        });
    }
    deleteUser(e) {
        const targetNickname = $(e.target).val();
        if (confirm(targetNickname + "을 삭제 하겠습니까?")) {
            $.ajax({
                url: "http://kkms4001.iptime.org:10096/game/delete_user/",
                data: {
                    nickname: targetNickname,
                },
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
    //         url: "http://kkms4001.iptime.org:10096/game/create_user/",
    //         data: {
    //             "nickname": "test" + i,
    //             "password": "test" + i,
    //             "email": "test" + i + "@test.com",
    //         },
    //         success: (data) => {
    //         }
    //     });
    // }
    const userAdmin = new UserAdmin();
    $(".viewOnOff").on("click", function() {$(this).toggleClass("turnOff");});
    userAdmin.getUserList();
})();