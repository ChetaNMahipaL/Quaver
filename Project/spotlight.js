const llinks = document.querySelectorAll(".nav li a");

for (let i = 0; i < llinks.length; i++) {
  llinks[i].addEventListener("mouseover", function() {
    this.style.color = "lightblue";
  });
  llinks[i].addEventListener("mouseout", function() {
    this.style.color = "white";
  });
}

// Above is Navbar Hover Effect

var image = document.getElementById("zoomImage");
    var scale = 1;
    var zoomInterval;

    function zoomInOut() {
      if (scale == 1.1) 
      {
        scale = 1;
      } 
      else 
      {
        scale = 1.1;
      }
      image.style.transform = "scale(" + scale + ")";
      image.style.transition = "transform 1s";
      
    }

    function startZoomAnimation() {
      zoomInterval = setInterval(zoomInOut, 1000); 
    }

    function stopZoomAnimation() {
      clearInterval(zoomInterval);
    }

    startZoomAnimation();




  var releaseDate = new Date('July 7, 2023 00:00:00').getTime();
  var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = releaseDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
    
  }, 1000);

 
  var reviews = [];

  function addReview() {
    var name = document.getElementById("name").value;
    var rating = document.querySelector('input[name="rating"]:checked').value;
    var review = document.getElementById("review").value;

    var newReview = {
      name: name,
      rating: rating,
      review: review
    };

    reviews.push(newReview);

    document.getElementById("name").value = "";
    document.querySelector('input[name="rating"]:checked').checked = false;
    document.getElementById("review").value = "";

    updateTable();
  }

  function updateTable() {
    var table = document.getElementById("reviewTable");

    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    for (var i = 0; i < reviews.length; i++) {
      var row = table.insertRow(-1);
      var nameCell = row.insertCell(0);
      var ratingCell = row.insertCell(1);
      var reviewCell = row.insertCell(2);

      nameCell.innerHTML = reviews[i].name;
      ratingCell.innerHTML = reviews[i].rating;
      reviewCell.innerHTML = reviews[i].review;
    }
  }


var currentUrl = window.location.href;

var links = document.querySelectorAll("nav a");

for (var i = 0; i < links.length; i++) {
  if (links[i].href === currentUrl) {
    links[i].parentNode.classList.add("active");
  }
}
