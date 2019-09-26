function PrintContactsFromDB() { // bind -в названии
    $.ajax({
        type: "GET",
        url: "ContactService.svc/GetContacts", // обращение к GetContacts
        //data: JSON.stringify(oneperson), // не нужно, входных параметров у GetContacts нет
        processData: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (datas) {
            $("#load").hide();
            $("#get_contacts_grid").show();

            $("#showContacts").clearGridData();
            $('#showContacts').jqGrid('setGridParam', { data: datas.d });
            $('#showContacts').trigger('reloadGrid');
            $("#showContacts").jqGrid(
                {
                    datatype: 'local',
                    data: datas.d, // здесь вернется от сервиса список типа Contact

                    pager: 'gridpager', //НЕ РАБОТАЕТ
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
            
        },
        error: function (e) {
            $("#load").hide();
            alert("Произошла какая-то ошибка. Обратитесь, пожалуйста, к пограмисту");
        }
    })
}
document.addEventListener("DOMContentLoaded", PrintContactsFromDB());