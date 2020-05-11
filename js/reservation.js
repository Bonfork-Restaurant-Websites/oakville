$(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    $('#date').attr('min', maxDate);
});


let telInput = $("#phone");

// initialize
telInput.intlTelInput({
    initialCountry: 'auto',
    separateDialCode: true,
    hiddenInput: "Full Phone",
    preferredCountries: ['us', 'gb', 'br', 'ru', 'cn', 'es', 'it'],
    autoPlaceholder: 'aggressive',
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js",
    geoIpLookup: function (callback) {
        fetch('https://api.ipdata.co/?api-key=a86af3a7a4a375bfa71f9259b5404149d1eabb74adcc275e4faf9dfe', {
            cache: 'reload'
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Failed: ' + response.status)
        }).then(ipjson => {
            callback(ipjson.country_code)
        }).catch(e => {
            callback('us')
        })
    }
});


// Helper function to get form data in the supported format
// function getFormDataString(formEl) {
//     var formData = new FormData(formEl),
//         data = [];

//     for (var keyValue of formData) {
//         data.push(encodeURIComponent(keyValue[0]) + "=" + encodeURIComponent(keyValue[1]));
//     }

//     return data.join("&");
// }

// // Fetch the form element
// var formEl = document.getElementById("reservation-form");

// // Override the submit event
// formEl.addEventListener("submit", function (e) {
//     e.preventDefault();

//     var request = new XMLHttpRequest();

//     request.addEventListener("load", function () {
//         if (request.status === 302) { // CloudCannon redirects on success
//             // It worked
//         }
//     });

//     request.open(formEl.method, formEl.action);
//     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     request.send(getFormDataString(formEl));
//     formEl.style.display = 'none';
//     document.getElementById('alert').style.display = 'block';
// });



// Reservation form with PHP
if ($('#reservation-form').length) {
    $('#reservation-form').each(function(){
        $(this).validate({
            errorClass: 'error wobble-error',
            submitHandler: function(form){
                $.ajax({
                    type: "POST",
                    url:"mail.php",
                    data: $(form).serialize(),
                    success: function() {
                        document.getElementById('alert-success').style.display = 'block';
                    },

                    error: function(){
                        document.getElementById('alert-error').style.display = 'block';
                       
                    }
                });
            }
        });
    });
}