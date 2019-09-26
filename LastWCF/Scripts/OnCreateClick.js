$("#create").click(function () {
    if ($("#firstname").val() != "" && $("#middlename").val() != "" && $("#lastname").val() != "" && $("#inn").val() != ""
        && $("#year").val() != "" && $("#month").val() != "" && $("#day").val() != "" && $("#gender").val() != "" && $("#phone").val() != "") {

        $("#load").show();
        var person = {
            "person":
            {
                "FirstName": $("#firstname").val(), "MiddleName": $("#middlename").val(), "LastName": $("#lastname").val(),
                "Inn": parseInt($("#inn").val()), "BirthdayDate": $("#year").val() + "/" + $("#month").val() + "/" + $("#day").val(),
                "Gender": $("#gender").val(), "PhoneNumber": $("#phone").val()
            }
        }

        $.ajax({
            type: "POST",
            url: "ContactService.svc/CreateContact", // обращение к CreateContact
            data: JSON.stringify(person),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (datas) {
                ValAndHide();
                ReloadGrid();
            },
            error: function (e) {
                $("#load").hide();
                alert("Произошла какая-то ошибка. Обратитесь, пожалуйста, к пограмисту");
            }
        })
    }
    else {
        alert("Заполните все поля");
    }
})