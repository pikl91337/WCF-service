$("#search_firstname").click(function () {
    SearchByFirstname();  
})
function SearchByFirstname() {

    if ($("#firstname").val() != "") {

        $("#load").show();
        var firstname = {
            "firstname": $("#firstname").val(),
        }

        $.ajax({
            type: "POST",
            url: "ContactService.svc/GetContactsByFirstName", // обращение к GetContacts
            data: JSON.stringify(firstname),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (datas) {

                $("#load").hide();
                if (datas.d.length > 0) {

                    $("#search_by_firstname").clearGridData();
                    $('#search_by_firstname').jqGrid('setGridParam', { data: datas.d });
                    $('#search_by_firstname').trigger('reloadGrid');
                    $("#get_by_firstname").show();
                    $("#search_by_firstname").jqGrid(
                        {
                            datatype: 'local',
                            data: datas.d, // здесь вернется от сервиса список типа Contact

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
                                OnSelectRow(row_id,THIS);
                                
                            }

                        })
                }
                else {
                    alert("Записей по FirstName не найдено");
                }
            },
            error: function (e) {
                $("#load").hide();

                alert("Произошла какая-то ошибка. Обратитесь, пожалуйста, к пограмисту");
            }
        })
    }
    else {
        alert("Заполните поле Firstname");
    }
}

