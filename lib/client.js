'use strict';

var find = require('dom-select');

var collapsibleNodes = find.all('.collapsible');

console.log('her', collapsibleNodes);

Array.prototype.slice.call(collapsibleNodes).forEach( function(node) {

  var plus = document.createElement('span');
  var isOpen = false;
  var toggleBtn = find('div', node);
  var toggleList = find('ul', node);

  toggleList.style.height = '0px';
  toggleList.style.overflow = 'hidden';

  plus.innerHTML = ' +';
  toggleBtn.appendChild(plus);
  toggleBtn.style.cursor = 'pointer';

  toggleBtn.addEventListener('click', function() {

    if(!isOpen) {
      toggleList.style.height = 'auto';  
    } else {
      toggleList.style.height = '0px';
    }

    isOpen = !isOpen;
  });
});