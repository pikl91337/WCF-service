function OnSelectRow (row_id,THIS) {
                                var one_person = $(THIS).jqGrid("getLocalRow", row_id);
                                $("#firstname").val(one_person.FirstName);
                                $("#middlename").val(one_person.MiddleName);
                                $("#lastname").val(one_person.LastName);
                                $("#inn").val(one_person.Inn);
                                $("#phone").val(one_person.PhoneNumber);
                                $("#gender").val(one_person.Gender);
                                $("#id").val(one_person.ID);

                                var birthday = one_person.BirthdayDate;
                                var dt = new Date(birthday);
                                $("#year").val(dt.getFullYear());
                                $("#month").val(dt.getMonth() + 1);
                                $("#day").val(dt.getUTCDate() + 1);

                            }