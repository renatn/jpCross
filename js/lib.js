function addClass(el, cls) { 
  var c = el.className.split(' ');
  for(var i=0; i<c.length; i++) {
    if (c[i] == cls) return;
  }
  c.push(cls);
  el.className = c.join(' ');
}

function removeClass(el, cls) {
  var c = el.className.split(' ');
  for(var i=0; i<c.length; i++) {
    if (c[i] == cls) c.splice(i--, 1);
  }

  el.className = c.join(' ');
}

function hasClass(el, cls) {
  for(var c = el.className.split(' '),i=c.length-1; i>=0; i--) {
    if (c[i] == cls) return true;
  }
  return false;
}
