"use strict"

// Validation
// Download Trial Version
var techName = $('input[name="techName"]'),
    techEmail = $('input[name="techEmail"]'),
    techRole = $('select[name="techRole"]'),
    techNumber = $('input[name="techNumber"]')

var orgName = $('input[name="orgName"]'),
    orgWebsite = $('input[name="orgWebsite"]'),
    Comments = $('textarea#Comments')

var dtvSubmit = $('input[name="dtvSubmit"]'),
    response = $('.edi-response')


dtvSubmit.on('click', function(e) {
e.preventDefault()

    // Change Appearance
    dtvSubmit.attr('disabled', 'true')
    dtvSubmit.val('Please Wait...')

    // Validate
    if(techName.val() && techEmail.val() && techNumber.val() && orgWebsite.val()) {
        // XHR Data
        var url = "https://sendcontact.azurewebsites.net/api/RequestEval"
        var data = JSON.stringify({

                // Technical
                'techName': techName.val(),
                'techEmail': techEmail.val(),
                'techRole': techRole.val(),
                'techNumber': techNumber.val(),

                //organisation
                'orgName': orgName.val(),
                'orgWebsite': orgWebsite.val(),
                'Comments': Comments.val()
        })
         //XHRequest
        
        $.ajax({

            type: 'POST',
            contentType: 'application/json',
            data: data,
            url: url,
            dataType: 'json',
            success: function(data) {

                // Change Appearance
                dtvSubmit.removeAttr('disabled')
                dtvSubmit.val('Submit')

                // Empty Fields
                techName.val(null)
                techEmail.val(null)
                techRole.val(null)
                techNumber.val(null)
                orgName.val(null)
                orgWebsite.val(null)
                Comments.val(null)

                // Create Success
                response.addClass('edi-response-show edi-response-success');
                response.html('Thanks! We\'ll be in touch shortly.');
                window.location = "/thank-you-page.html"
            },
            error: function(error) {

                // Change Appearance
                dtvSubmit.removeAttr('disabled')
                dtvSubmit.val('Submit')

                // Create Error
                response.addClass('edi-response-show edi-response-error');
                response.html('Oops! There was an error. Try again!');
                
            }

        })
    } else {
    // Change Appearance
    dtvSubmit.removeAttr('disabled')
    dtvSubmit.val('Submit')
    response.addClass('edi-response-show edi-response-error');
    response.html('Mandatory fields can not be blank, Try again!');
    }
    return false;

})
