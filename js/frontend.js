
/* for textarea to fit to text body height */
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

function auto_grow200(element) {
    element.style.height = "202px";
    element.style.height = (element.scrollHeight)+"px";
}

/* for smooth scrolling to top */
function scrollToTop() {
  var timeOut;
  if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
      window.scrollBy(0,-50);
      timeOut=setTimeout('scrollToTop()', 1);
    }
    else clearTimeout(timeOut);
}

/* keep sidebar static */
function staticBar(elementName, topOffset) {
  $(elementName).affix({offset: {top: topOffset}});
}

function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = mm+'/'+dd+'/'+yyyy;
  return today;
}
