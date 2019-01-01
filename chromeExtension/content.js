function Article() {}

Article.prototype.getClickedWord = function (event) {
    var range = document.caretRangeFromPoint(event.x, event.y);
    var node = range.startContainer;

    if (!node || !node.nodeValue) {
        return false;
    }

    var start_offset = range.startOffset;
    var end_offset = start_offset;

    while (start_offset > 0) {
        start_offset--;
        range.setStart(node, start_offset);
        if (/^\s/.test(range.toString())) {
            range.setStart(node, start_offset += 1);
            break;
        }
    }

    while (end_offset < node.nodeValue.length) {
        end_offset++;
        range.setEnd(node, end_offset);
        if (/\s$/.test(range.toString())) {
            range.setEnd(node, end_offset -= 1);
            break;
        }
    }

    return range.toString();
};

var article = new Article();

document.addEventListener('click', function(e) {
    console.log(article.getClickedWord(e));
}, false);

