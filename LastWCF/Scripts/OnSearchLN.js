$("#search_lastname").click(function () {
    SearchByLastname();
})


function SearchByLastname() {

    if ($("#lastname").val() != "") {

        $("#load").show();
        var lastname = {
            "lastname": $("#lastname").val(),
        }

        $.ajax({
            type: "POST",
            url: "ContactService.svc/GetContactsByLastName", // обращение к GetContacts
            data: JSON.stringify(lastname),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (datas) { 
                $("#load").hide();
                if (datas.d.length > 0) {
                    $("#get_by_lastname").show();

                    $("#search_by_lastname").clearGridData();
                    $('#search_by_lastname').jqGrid('setGridParam', { data: datas.d });
                    $('#search_by_lastname').trigger('reloadGrid');
                    $("#search_by_lastname").jqGrid(
                        {
                            datatype: 'local',
                            data: datas.d,

                            pager: "#gridpager2",
                            rowNum: 10,
                            colModel:
                                [
                                    { name: "ID" },
                                    { name: "FirstName" },
                                    { name: "MiddleName" },
                                    { name: "LastName" },
                                    { name: "Inn" },
                                    { name: "BirthdayDate" },
                                    { name: "Gender" },
                                    { name: "PhoneNumber" },
                                ],
                            onSelectRow: function (row_id) {
                                var THIS = this;
                                OnSelectRow(row_id, THIS);
                            }

                        })
                }
                else {

                    alert("Записей по LastName не найдено");
                }
            },
            error: function (e) {
                $("#load").hide();
                alert("Произошла какая-то ошибка. Обратитесь, пожалуйста, к пограмисту");
            }
        })
    }
    else {
        alert("Заполните поле Last Name");
    }
}

