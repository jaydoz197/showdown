//
//  Footnotes Extension
//

(function(){    
    var footnotes = function(converter) {
        return [
            { type: 'lang', 
              filter: function(text) {
                // find footnote links and render them,
                // store footnote data in an array for later use
                var count = 0,
                    notes = [],
                    note = {};
                text = text.replace(/\[\^([^\s]*)\](?!:)|\^\[([^\]]*)\](?!:)/g, function(match, id, notetext) {
                  count += 1;
                  notes.push({'id': id, 'fn': count, 'text': notetext});
                  return '<sup><a href="#fn' + count + '" class="footnoteRef" id="fnref' + count + '">' + count + '</a></sup>';
                });
                
                // find footnotes and add their data to the `notes` array,
                // remove original notes from text as they will be rebuilt
                // from scratch in the next step
                text = text.replace(/\[\^([^\]]*)\]:\s*([^]+?)(?=\n{2,})/g, function(match, id, notetext) {
                  if (id && notetext) {
                    for (var i=0, len=notes.length; i < len; i++) {
                      note = notes[i];
                      if (note.id == id) {
                        // remove indentation spaces
                        note.text = notetext.replace(/\n(\s*)/, '');
                      }
                    }
                  }
                  return '';
                });
                
                // build footnotes ordered list from `notes` array
                var notesOutput = ['<div class="footnotes">', '<hr />', '<ol>'];
                for (var i=0, len=notes.length; i < len; i++) {
                  note = notes[i];
                  notesOutput.push('<li id="fn' + note.fn + '"><p>' + note.text + '<a href="#fnref' + note.fn + '">&#8617;</a></p></li>');
                }
                notesOutput.push('</ol>');
                notesOutput.push('</div>');
                return text += notesOutput.join('');
              }
            }
        ];
    };

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.footnotes = footnotes; }
    // Server-side export
    if (typeof module !== 'undefined') module.exports = footnotes;
}());
