function PrintContactsFromDB() { // работает при загрузке страницы


    /*var oneperson = {
        "FirstName": "sfnsdfj", "MiddleName": "asddfss", "LastName": "sdbfshd",
        "Inn": 21321, "BirthdayDate": new Date(2015, 0, 1, 0, 0, 0, 0), "Gender": "js", "PhoneNumber": "fdsfdsfsd"
    }*/

    $.ajax({
        type: "GET",
        url: "Service1.svc/GetContacts", // обращение к GetContacts
        //data: JSON.stringify(oneperson), // не нужно, входных параметров у GetContacts нет
        processData: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (datas) {
            $("#showContacts").jqGrid(
                {
                    datatype: 'local',
                    data: datas.d, // здесь вернется от сервиса список типа Contact

                    //pager: 'gridpager', //НЕ РАБОТАЕТ
                    rowNum: 10,
                    colModel:
                        [
                            { name: "FirstName" },
                            { name: "MiddleName" },
                            { name: "LastName" },
                            { name: "Inn" },
                            { name: "BirthdayDate" },
                            { name: "Gender" },
                            { name: "PhoneNumber" },
                        ],
                    onSelectRow: function (row_id) {
                        var one_person = $(this).jqGrid("getLocalRow", row_id);
                        $("#firstname").val(one_person.FirstName);
                        $("#middlename").val(one_person.MiddleName);
                        $("#lastname").val(one_person.LastName);
                        $("#inn").val(one_person.Inn);
                        $("#phone").val(one_person.PhoneNumber);
                        $("#gender").val(one_person.Gender);


                        var birthday = one_person.BirthdayDate;
                        var dt = new Date(birthday);
                        $("#year").val(dt.getFullYear());
                        $("#month").val(dt.getMonth()+1);
                        $("#day").val(dt.getUTCDate()+1);

                        //alert("q");
                    }

                })
        }
    })
}
document.addEventListener("DOMContentLoaded", PrintContactsFromDB());


$("#inn")
    .change(function () {
        var text = $("#inn").val();

        $(this).css('border', function () {
            if (isNaN(parseInt(text))) {
                $("#inn").val("");
                return '1px solid #f00';
            }
            else {
                return '1px solid #DCDCDC';
            }

        })

    });

$("#day")
    .change(function () {
        var text = $("#day").val();

        $(this).css('border', function () {
            if (isNaN(parseInt(text))) {

                $("#day").val("");
                return '1px solid #f00';
            }
            else {
                if (parseInt(text) > 31 || parseInt(text) == 0) {
                    $("#day").val("");
                    return '1px solid #f00';
                }
                return '1px solid #DCDCDC';
            }
        })

    });

$("#month")
    .change(function () {
        var text = $("#month").val();

        $(this).css('border', function () {
            if (isNaN(parseInt(text))) {

                $("#month").val("");
                return '1px solid #f00';
            }
            else {
                if (parseInt(text) > 12 || parseInt(text) == 0) {
                    $("#month").val("");
                    return '1px solid #f00';
                }
                return '1px solid #DCDCDC';
            }
        })

    });

$("#year")
    .change(function () {
        var text = $("#year").val();

        $(this).css('border', function () {
            if (isNaN(parseInt(text))) {

                $("#year").val("");
                return '1px solid #f00';
            }
            else {
                if (parseInt(text) > 2019 || parseInt(text) < 1900) {
                    $("#year").val("");
                    return '1px solid #f00';
                }
                return '1px solid #DCDCDC';
            }
        })

    });

$("#id")
    .change(function () {
        var text = $("#id").val();

        $(this).css('border', function () {
            if (isNaN(parseInt(text))) {

                $("#id").val("");
                $("#update").hide();
                $("#get_to_update").hide();
                return '1px solid #f00';
            }
            else {
                if (parseInt(text) == 0) {
                    $("#id").val("");
                    $("#update").hide();
                    $("#get_to_update").hide();
                    return '1px solid #f00';
                }
                $("#update").show();
                $("#get_to_update").show();
                return '1px solid #DCDCDC';
            }
        })

    });

$("#id_to_delete")
    .change(function () {
        var text = $("#id_to_delete").val();

        $(this).css('border', function () {
            if (isNaN(parseInt(text))) {

                $("#id_to_delete").val("");
                $("#delete_contact").hide();
                return '1px solid #f00';
            }
            else {
                if (parseInt(text) == 0) {
                    $("#id_to_delete").val("");
                    $("#delete_contact").hide();
                    return '1px solid #f00';
                }
                $("#delete_contact").show();
                return '1px solid #DCDCDC';
            }
        })

    });

$("#create").click(function () {
    var person = {
        "person":
        {
            "FirstName": $("#firstname").val(), "MiddleName": $("#middlename").val(), "LastName": $("#lastname").val(),
            "Inn": parseInt($("#inn").val()), "BirthdayDate": $("#year").val() + "/" + $("#month").val() + "/" + $("#day").val(),
            "Gender": $("#gender").val(), "PhoneNumber": $("#phone").val()
        }
    }

    if ($("#firstname").val() != "" && $("#middlename").val() != "" && $("#lastname").val() != "" && $("#inn").val() != ""
        && $("#year").val() != "" && $("#month").val() != "" && $("#day").val() != "" && $("#gender").val() != "" && $("#phone").val() != "") {


        $.ajax({
            type: "POST",
            url: "Service1.svc/CreateContact", // обращение к CreateContact
            data: JSON.stringify(person),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (datas) {
                $("#firstname").val("");
                $("#middlename").val("");
                $("#lastname").val("");
                $("#inn").val("");
                $("#phone").val("");
                $("#day").val("");
                $("#month").val("");
                $("#year").val("");
                $("#gender").val("");
            },
            error: function (e) {
                console.log(e);
            }
        })
    }
    else {
        alert("Заполните все поля");
    }
})

$("#update").click(function () {
    var person_with_id = {
        "person":
        {
            "FirstName": $("#firstname").val(), "MiddleName": $("#middlename").val(), "LastName": $("#lastname").val(),
            "Inn": parseInt($("#inn").val()), "BirthdayDate": $("#year").val() + "/" + $("#month").val() + "/" + $("#day").val(),
            "Gender": $("#gender").val(), "PhoneNumber": $("#phone").val()
        },
        "id": parseInt($("#id").val())
    }
    if ($("#firstname").val() != "" && $("#middlename").val() != "" && $("#lastname").val() != "" && $("#inn").val() != ""
        && $("#year").val() != "" && $("#month").val() != "" && $("#day").val() != "" && $("#gender").val() != ""
        && $("#phone").val() != "" && $("#id").val() != "") {
        $.ajax({
            type: "POST",
            url: "Service1.svc/UpdateContact", // обращение к CreateContact
            data: JSON.stringify(person_with_id),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                $("#firstname").val("");
                $("#middlename").val("");
                $("#lastname").val("");
                $("#inn").val("");
                $("#phone").val("");
                $("#day").val("");
                $("#month").val("");
                $("#year").val("");
                $("#gender").val("");
                $("#id").val("");
            }
        })
    }
})

$("#show").click(function () {
    PrintContactsFromDB();
})


function GetContactToUpdate() {
    $.ajax({
        type: "POST",
        url: "", // обращение к CreateContact
        data: JSON.stringify(parseInt($("id").val())),
        processData: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (datas) {
            // сделать проверку на null. Если все null, то не помещать данные в инпуты и выдать алерт. 
            $("#firstname").val(datas['FirstName']); //что то типа того, но не уверен, нужно смотреть уже на то, какой ответ придет
            // написать такое для всех инпутов
        }
    })

}


