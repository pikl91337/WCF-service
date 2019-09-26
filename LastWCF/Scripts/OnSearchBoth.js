
$("#search_both").click(function () {
    if ($("#search_both_inp").val() != "") {
        $("#load").show();


        var fnCommaLN = {
            "fnCommaLN": $("#search_both_inp").val()
        }

        $.ajax({
            type: "POST",
            url: "ContactService.svc/GetContactsByBoth", // обращение к GetContacts
            data: JSON.stringify(fnCommaLN),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (datas) {
                $("#load").hide();
                if (datas.d[0].length > 0) {


                    $("#get_by_firstname").show();
                    $("#search_by_firstname").clearGridData();
                    $('#search_by_firstname').jqGrid('setGridParam', { data: datas.d[0] });
                    $('#search_by_firstname').trigger('reloadGrid');
                    $("#search_by_firstname").jqGrid(
                        {
                            datatype: 'local',
                            data: datas.d[0], // здесь вернется от сервиса список типа Contact

                            pager: "#gridpager1",
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
                    alert("Записей по FirstName не найдено");
                }
                if (datas.d[1].length > 0) {
                    $("#get_by_lastname").show();

                    $("#search_by_lastname").clearGridData();
                    $('#search_by_lastname').jqGrid('setGridParam', { data: datas.d[1] });
                    $('#search_by_lastname').trigger('reloadGrid');
                    $("#search_by_lastname").jqGrid(
                        {
                            datatype: 'local',
                            data: datas.d[1],

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
        alert("Заполните поле Both");
    }
})

