const links = document.querySelectorAll(".nav li a");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("mouseover", function() {
    this.style.color = "lightblue";
  });
  links[i].addEventListener("mouseout", function() {
    this.style.color = "white";
  });
}

// Above is Navbar Hover Effect

const searchForm = document.querySelector('form');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

searchForm.addEventListener('submit', searchiTunes);
searchButton.addEventListener('click', searchiTunes);

async function searchiTunes(event) {
  event.preventDefault();

  const searchQuery = document.getElementById('search-bar').value;
  const durationFilter = document.getElementById('duration-filter').value;
  let explicitFilter = document.getElementById('explicit-filter').value;

  try {
    let response = await fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=song`);
    if(explicitFilter === "false")
    {
      response= await fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=song&explicit=no`);        
    }
    console.log(explicitFilter);
    console.log(response);
    const data = await response.json();

    let filteredResults = data.results;
    if( explicitFilter === "true")
    {
      filteredResults = filteredResults.filter(result => result.trackExplicitness === 'explicit');
    }

    // Apply duration filter
    if (durationFilter) {
      filteredResults = filteredResults.filter(result => {
        const durationInSec = result.trackTimeMillis / 1000;
        const durationInMin = durationInSec / 60;
        return durationInMin <= durationFilter;
      });
    }

    resultsDiv.innerHTML = '';

    if (filteredResults.length === 0) {
      resultsDiv.innerHTML = 'No results found';
      return;
    }

    for (let i = 0; i < filteredResults.length && i < 10 ; i++) {
        const result = filteredResults[i];
        const resultDiv = document.createElement('div');
        const audioElement = document.createElement('audio');
        resultDiv.classList.add('result');

        const albumImgDiv = document.createElement('div');
        albumImgDiv.classList.add('album-img');
        const albumImg = document.createElement('img');
        albumImg.src = result.artworkUrl100;
        albumImg.alt = 'Album Cover';
        albumImgDiv.appendChild(albumImg);

        const songArtistDiv = document.createElement('div');
        songArtistDiv.classList.add('song-artist');
        const nameP = document.createElement('p');
        nameP.classList.add('name');
        nameP.innerText = `${result.trackName}`;
        const artistP = document.createElement('p');
        artistP.classList.add('artist');
        artistP.innerText = `${result.artistName}`;
        songArtistDiv.appendChild(nameP);
        songArtistDiv.appendChild(artistP);

        const dateAdded = new Date(result.releaseDate).toLocaleDateString(); // Get date and format it
        const albumInfoDiv = document.createElement('div');
        albumInfoDiv.classList.add('album-info');
        const albumNameP = document.createElement('p');
        albumNameP.classList.add('album-name');
        albumNameP.innerText = `${result.collectionName}`;
        const albumDateP = document.createElement('p');
        albumDateP.classList.add('date-added');
        albumDateP.innerText = `Date added: ${dateAdded}`;
        albumInfoDiv.appendChild(albumNameP);
        albumInfoDiv.appendChild(albumDateP);

        const audioDiv = document.createElement('div');
        audioDiv.classList.add('.audio');
        if (result.kind === 'song' && result.previewUrl) {
            audioElement.src = result.previewUrl;
            audioElement.controls = true;
            audioDiv.appendChild(audioElement);
        }

        resultDiv.appendChild(albumImgDiv);
        resultDiv.appendChild(songArtistDiv);
        resultDiv.appendChild(albumInfoDiv); // Add album info
        resultDiv.appendChild(audioDiv);

        resultsDiv.appendChild(resultDiv);
    }
  } catch (error) {
    console.error(error);
  }
}


// Above is for search results

const durationFilter = document.querySelector('#duration-filter');
const explicitFilter = document.querySelector('#explicit-filter');
const clearFiltersButton = document.querySelector('.clear-filters-button');
clearFiltersButton.addEventListener('click', () => {
  durationFilter.value = '';
  explicitFilter.value = '';
});

const footer = document.querySelector('footer');
searchButton.addEventListener('click', function() {
  footer.style.position = 'relative';
});


var currentUrl = window.location.href;

var linkiss = document.querySelectorAll("nav a");

for (var i = 0; i < linkiss.length; i++) {
  if (linkiss[i].href === currentUrl) {
    linkiss[i].parentNode.classList.add("active");
  }
}
