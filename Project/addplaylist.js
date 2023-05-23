function addToPlaylist(event) {
    event.preventDefault();
  
    const form = event.target;
    const url = form.action;
    const data = {
      song_name: form.song_name.value,
      album_name: form.album_name.value,
      duration: form.duration.value,
      artist: form.artist.value
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Already In The Playlist');
      }
    })
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      alert(error.message);
    });
  }
  