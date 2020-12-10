// $("#edit-form").validate({
//     rules: {
//         time: {
//             required: true,
//             date: true
//         }
//     },
//     errorElement: 'span',
//     errorPlacement: function(error, element) {
//         error.addClass('invalid-feedback');
//         element.closest('.form-group').append(error);
//     },
//     highlight: function(element, errorClass, validClass) {
//         $(element).addClass('is-invalid');
//     },
//     unhighlight: function(element, errorClass, validClass) {
//         $(element).removeClass('is-invalid');
//     }
// });
//index
function checkbox_is_checked() {
    if ($(".check-all:checked").length > 0) {
        $("#bulk-delete").show();
    } else {
        $("#bulk-delete").hide();
    }
}

function resetform() {
    document.getElementById('searchform').reset();
    document.getElementById('idemployee').value = null;
    document.getElementById('name').value = null;
    document.getElementById('startday').value = null;
    document.getElementById('endday').value = null;
    return false;
}
const onClickDelete = (id) => {
    const deleteForm = document.getElementById('delete-form');
    deleteForm.action = '/workingtimes/' + id;
};

function printDiv() {
    window.frames["print_frame"].document.body.innerHTML = document.getElementById("table").innerHTML;
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
}

function submitdelete() {
    deleteForm.submit();
}

function insertParam(key, value) {
    key = escape(key);
    value = escape(value);
    var kvp = document.location.search.substr(1).split('&'); // return array ['record=50']
    if (kvp == '') {
        document.location.search = '?' + key + '=' + value;
    } else if (length.kvp == 1) {
        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('='); // page,2

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    } else {
        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('='); // page,2

            if (x[0] == 'page') {
                x[1] = 1;
                kvp[i] = x.join('=');
            }
            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    }
}
$("document").ready(function() {
    setTimeout(function() {
        $("div.alert").remove();
    }, 1000);
});