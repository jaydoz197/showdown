//
//  Smartypants Extension
//

(function(){
    // load typogr.js 
    if (typeof typogr == 'undefined' && typeof require !== 'undefined') {
      typogr = require('typogr');
    };
    var smartypants = function(converter) {        
        return [
          { type: 'output',
            filter: function(text) {
              return typogr(text).chain().amp().smartypants().value();
            }
          }
        ];
    };

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.smartypants = smartypants; }
    // Server-side export
    if (typeof module !== 'undefined') module.exports = smartypants;
}());
