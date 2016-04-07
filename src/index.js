const virtualDom = require("virtual-dom");
const diff = virtualDom.diff;
const patch = virtualDom.patch;
const VNode = require('virtual-dom/vnode/vnode');
const VText = require('virtual-dom/vnode/vtext');
const htmlToVdom = require('html-to-vdom')({ //supply the correct version of virtual-dom
    VNode: VNode,
    VText: VText
});
let words = require('./data/words').concat(require('./data/words')).concat(require('./data/words')).concat(require('./data/words')).concat(require('./data/words'));

$(function() {
    let startTime = new Date();
    addToDom(render(words));
    let result = `Initial render took ${new Date() - startTime} ms.`;
    addResult(result);

    setTimeout(() => {
        // shuffleArray(words);
        words[0] = 'normal';
        startTime = new Date();
        addToDom(render(words));
        result = `Normal re-render took ${new Date() - startTime} ms.`;
        addResult(result);

    }, 3000);

    setTimeout(() => {
        // shuffleArray(words);

        words[0] = 'virtual';
        const target = document.getElementById('target');
        const nextHtml = '<div id="target">' + render(words) + '</div>';
        const currentHtml = target.outerHTML;
        /** hand wave **/
        let vtree = htmlToVdom(currentHtml); // create the initial v. dom tree with the initial UI state
        let nextVtree = htmlToVdom(nextHtml); // create the next v.dom tree using the next UI state
        /** hand wave **/

        startTime = new Date();
        document.getElementById('target');
        '<div id="target">' + render(words) + '</div>';
        target.outerHTML;
        patchDom(target, vtree, nextVtree);
        result = `Virtual DOM re-render took ${new Date() - startTime} ms.`;
        addResult(result);
    }, 6000);

});

function render(data) {
    const templatePre = '<span class="mui-panel"><i class="icon-barcode"></i> '; // <i class="icon-barcode"></i>
    const templatePost = '<a class="share mui-button--secondary"><i class="icon-share"></i><span> Share it</span></a> </span>'; //<a class="share mui-button--secondary"><i class="icon-share"></i><span> Share it</span></a>
    const htmlString = data.reduce(function buildHTML(htmlString, item) {
        return htmlString + templatePre + item + templatePost;
    }, '');
    return htmlString;
}

function addToDom(nextHtml) {
    document.getElementById('target').innerHTML = nextHtml;
}

function patchDom(target, v1, v2) {
    let patches = diff(v1, v2); // compute any differeces and store them in a patch
    patch(target, patches); //apply the patch to the DOM
}

















/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * stolen from SO
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function addResult(text) {
    document.getElementById('results').appendChild($(`<li>${text}</li>`)[0]);
}
