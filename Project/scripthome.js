const links = document.querySelectorAll(".nav li a");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("mouseover", function() {
    this.style.color = "yellow";
  });
  links[i].addEventListener("mouseout", function() {
    this.style.color = "white";
  });
}

// Above is Navbar Hover Effect

const typingText = document.getElementsByClassName("quaver")[0];
const textToType = "Q U A V E R";
let index = 0;
function typeText() {
  typingText.textContent += textToType[index];
  index++;
  if (index >= textToType.length) {
    clearInterval(typingInterval);
    typingText.classList.add("typing-done");
  }
}
const typingInterval = setInterval(typeText, 100);

// Above is Typing Effect on Heading

var currentUrl = window.location.href;

var linkiss = document.querySelectorAll("nav a");

for (var i = 0; i < linkiss.length; i++) {
  if (linkiss[i].href === currentUrl) {
    linkiss[i].parentNode.classList.add("active");
  }
}