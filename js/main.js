var position = jQuery(window).scrollTop();

jQuery(document).on("ready", function () {

    jQuery(window).on('scroll', function () {
        animateLogoBackground();
    });

    jQuery(".site-content").fitVids();

    var grid = jQuery('.grid').imagesLoaded(function () {
        grid.isotope({
            percentPosition: true,
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });

        jQuery('.filters-button-group').on('click', '.button', function () {
            var filterValue = jQuery(this).attr('data-filter');
            grid.isotope({filter: filterValue});
        });

        jQuery('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = jQuery(buttonGroup);
            $buttonGroup.on('click', '.button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                jQuery(this).addClass('is-checked');
            });
        });
    });
    jQuery('input, textarea').on('focus', function () {
        jQuery(this).data('placeholder', jQuery(this).attr('placeholder'));
        jQuery(this).attr('placeholder', '');
    });
    jQuery('input, textarea').on('blur', function () {
        jQuery(this).attr('placeholder', jQuery(this).data('placeholder'));
    });
    jQuery('.default-menu ul').addClass('main-menu sm sm-clean');

});



jQuery(window).on('load', function () {
    jQuery(".carousel-slider .carousel").each(function () {
        jQuery(this).flickity({
            contain: true,
            freeScroll: true,
            cellAlign: 'left',
            pageDots: false
        });
    });


    jQuery(".category-filter").on('click', function () {
        jQuery(".category-filter-list").slideToggle("fast");
    });
    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentItem: true
    });
    var $mainMenu = jQuery('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });
    jQuery('#toggle').on("click", multiClickFunctionStop);
    jQuery('.doc-loader').fadeOut();
});
var animateLogoBackground = function (e) {
    var scroll = jQuery(window).scrollTop();
    if (scroll > position) {
        jQuery('.welcome-image').css('top', '-=0.6');
    } else {
        jQuery('.welcome-image').css('top', '+=0.6');
    }
    position = scroll;
};
var multiClickFunctionStop = function (e) {
    e.preventDefault();
    jQuery('#toggle').off("click");
    jQuery('#toggle').toggleClass("on");
    jQuery('html, body, .sidebar, .menu-left-part, .menu-right-part, .site-content').toggleClass("open").delay(500).queue(function (next) {
        jQuery(this).toggleClass("done");
        next();
    });
    jQuery('#toggle').on("click", multiClickFunctionStop);
};

function is_touch_device() {
    return !!('ontouchstart' in window);
}
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
var SendMail = function () {
    var emailVal = jQuery('#contact-email').val();
    if (isValidEmailAddress(emailVal)) {
        var params = {
            'action': 'SendMessage',
            'name': jQuery('#name').val(),
            'email': jQuery('#contact-email').val(),
            'subject': jQuery('#subject').val(),
            'message': jQuery('#message').val()
        };
      
           
    } else
    {
        alert('Your email is not in valid format');
    }
};