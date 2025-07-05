// Get the modal and buttons
const modal = document.getElementById("resumeModal");
const btn = document.getElementById("resumeModalBtn");
const span = document.getElementsByClassName("close-modal")[0];

// When user clicks the button, open modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When user clicks on (x), close modal
span.onclick = function() {
  modal.style.display = "none";
}

// When user clicks anywhere outside modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}