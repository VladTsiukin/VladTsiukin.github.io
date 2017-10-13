document.getElementById("btnTest").addEventListener("click", function( event ) {
    // display the current click count inside the clicked div
    event.target.textContent = "click count: " + event.detail;
  }, false);
