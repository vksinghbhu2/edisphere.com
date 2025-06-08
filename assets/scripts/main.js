$(document).ready(function() {

    // Configure Lightbox
    lightbox.option({

        'alwaysShowNavOnTouchDevices': true,
        'disableScrolling': false,
        'fadeDuration': 300,
        'fitImagesInViewport': true,
        'imageFadeDuration': 300,
        'resizeDuration': 300,
        'showImageNumberLabel': true

    });

    // Tabs
    var tab = $('.edi-tab');
    var tabTrigger = $('.tiles .block .read-more');
    tabTrigger.on('click', function(e) {
    e.preventDefault();

        // Get Step ID
        var stepid = $(this).data('tab');

        // Remove Active class from other
        // buttons and add it to the target
        tabTrigger.removeClass('active');
        $(this).addClass('active');

            // Remove Visible Class from all Tabs
            tab.removeClass('visible');

        // Add Visible Class to the tab whose
        // id matches the target's "tabid"
        $('#tab' + stepid).addClass('visible');

    });

});
