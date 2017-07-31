(function ($) {

    $.fn.set_aspect_ratio = function(options) {
        // Defaults.
        var settings = $.extend({
            'aspect': 0.75,  // Aspect ratio.
            'base_width': this.parent().width(),
            'css': null,     // Can be a CSS object.
            'trim': 0        // Amount to be subtracted from the width;
                             // compensation for canals, x-axis margins
        }, options);

        // We won't accept negative aspect and trim values.
        if (settings.aspect < 0) throw 'aspect must be a positive number';
        if (settings.trim < 0) throw 'trim must be a positive number';

        // If we were given a base_width between 0 and 1, treat it as the
        // percentage of the parent's width and not as an absolute pixel value.
        if (settings.base_width > 0 && settings.base_width < 1) {
            var pct = settings.base_width;
            settings.base_width = this.parent().width() * pct;
        }

        if (settings.aspect > 1.0) {
            var new_height = settings.base_width / settings.aspect;
        } else {
            var new_height = settings.base_width * settings.aspect;
        }

        var styling = {
            'height': new_height + 'px',
            'width': settings.base_width + 'px'
        };
        if (settings.css) {
            // Include any styling passed via the css option.
            // Ref: https://stackoverflow.com/a/684692 
            for (var key in settings.css) {
                if (settings.css.hasOwnProperty(key)) {
                    styling[key] = settings.css[key];
                }
            }
        }

        return this.css(styling);
    };

}(jQuery));
