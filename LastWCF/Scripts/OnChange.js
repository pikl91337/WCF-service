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

                return '1px solid #f00';
            }
            else {
                if (parseInt(text) == 0) {
                    $("#id").val("");

                    return '1px solid #f00';
                }

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

                return '1px solid #f00';
            }
            else {
                if (parseInt(text) == 0) {
                    $("#id_to_delete").val("");
                    return '1px solid #f00';
                }
                return '1px solid #DCDCDC';
            }
        })

    });

$("#search_both_inp")
    .change(function () {
        var text = $("#search_both_inp").val();
        var commapos = text.indexOf(",");
        text = text.replace(/\s+/g, '');
        $(this).css('border', function () {
            if (text.indexOf(",") == -1 || text.length -1 == text.indexOf(",") || text[0]==",") {

                $("#search_both_inp").val("");

                return '1px solid #f00';
            }
            else {
                return '1px solid #DCDCDC';
            }
        })
    })