(() => {
    $(".viewOnOff").on("click", function() {
        $(this).toggleClass("turnOff");
    });
    const printUserList = (userList = []) => {

        userList.forEach(v => {
            $(".userTable .tableBox").append(
                `<div>
                    <p>${v.nickname}</p>
                    <p>${v.email}</p>
                    <p>${v.created}</p>
                    <div class="buttonBox">
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                </div>`
            );
        });
    };

    const getUserList = () => {
        $.ajax({
            url: "http://kkms4001.iptime.org:10096/game/get_user_list/",
            success: (data) => {
                printUserList(JSON.parse(data));
            }
        });
    };
    getUserList();
})();