"use strict"

// Validation
// General Information
var giName = $('input[name="giName"]'),
    giEmail = $('input[name="giEmail"]'),
    giSubject = $('input[name="giSubject"]'),
    giMessage = $('textarea[name="giMessage"]'),
    giSubmit = $('input[name="giSubmit"]'),
    response = $('.edi-response')

giSubmit.on('click', function(e) {
e.preventDefault()

    // Change Appearance
    giSubmit.attr('disabled', 'true')
    giSubmit.val('Please Wait...')

    // Validate
    
        if(giName.val() && giEmail.val() && giSubject.val() && giMessage.val()) {
        // XHR Data
        var url = "https://sendcontact.azurewebsites.net/api/ContactUs"
        var data = JSON.stringify({

            'name': giName.val(),
            'email': giEmail.val(),
            'subject': giSubject.val(),
            'message': giMessage.val()

        })

        // XHRequest
        $.ajax({

            type: 'POST',
            contentType: 'application/json',
            data: data,
            url: url,
            dataType: 'json',
            success: function(data) {

                // Change Appearance
                giSubmit.removeAttr('disabled')
                giSubmit.val('Submit')

                // Empty Fields
                giName.val(null)
                giEmail.val(null)
                giSubject.val(null)
                giMessage.val(null)

                // Create Success
                response.addClass('edi-response-show edi-response-success');
                response.html('Thanks! We\'ll be in touch shortly.');
                window.location = "/thank-you-page.html";

            },
            error: function(error) {

                // Change Appearance
                giSubmit.removeAttr('disabled')
                giSubmit.val('Submit')

                // Create Error
                response.addClass('edi-response-show edi-response-error');
                response.html('Oops! There was an error. Try again!');

            }

        })


    } else {
    // Change Appearance
    giSubmit.removeAttr('disabled')
    giSubmit.val('Send Information')

    // Create Error
    response.addClass('edi-response-show edi-response-error');
    response.html('All Fields are mandatory, Fill up the mandatory field and Try again!');
    }
    return false;
    

})
