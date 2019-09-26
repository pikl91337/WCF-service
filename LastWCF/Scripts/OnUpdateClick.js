$("#update").click(function () {

    if ($("#firstname").val() != "" && $("#middlename").val() != "" && $("#lastname").val() != "" && $("#inn").val() != ""
        && $("#year").val() != "" && $("#month").val() != "" && $("#day").val() != "" && $("#gender").val() != ""
        && $("#phone").val() != "" && $("#id").val() != "") { 
        $("#load").show();


        var person_with_id = {
            "person":
            {
                "ID": parseInt($("#id").val()),
                "FirstName": $("#firstname").val(), "MiddleName": $("#middlename").val(), "LastName": $("#lastname").val(),
                "Inn": parseInt($("#inn").val()), "BirthdayDate": $("#year").val() + "/" + $("#month").val() + "/" + $("#day").val(),
                "Gender": $("#gender").val(), "PhoneNumber": $("#phone").val()
            }
        }

        $.ajax({
            type: "POST",
            url: "ContactService.svc/UpdateContact", // обращение к CreateContact
            data: JSON.stringify(person_with_id),
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
        alert("Заполните все поля");
    }
})