$("#delete").click(function () {
    if ($("#id").val() != "") {
        $("#load").show();
        var id = {
            "id": parseInt($("#id").val()),
        }

        $.ajax({
            type: "POST",
            url: "ContactService.svc/DeleteContact", // обращение к CreateContact
            data: JSON.stringify(id),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                ValAndHide();
            },
            error: function (e) {
                $("#load").hide();
                alert("Произошла какая-то ошибка. Обратитесь, пожалуйста, к пограмисту");
            }
        })

    }
    else {
        alert("Заполните поле ID");
    }
})