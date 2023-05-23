function deleteFromPlaylist(event) {
    event.preventDefault(); // prevent form from submitting
  
    let form = event.target;
    let songId = form.action.split("/").pop(); // get the song ID from the form's action attribute
  
    // make an HTTP DELETE request to the server
    fetch(`/delete_song/${songId}`, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          alert("Song deleted successfully");
          form.parentNode.parentNode.remove(); // remove the deleted row from the table
        } else {
          alert("Failed to delete song");
        }
      })
      .then(data => {
        window.location.reload()
      })
      .catch(error => {
        console.error(error);
        alert("Failed to delete song");
      });
  }

// function deleteFromPlaylist(event) {
//     event.preventDefault();
  
//     const form = event.target;
//     const url = form.action;
//     // const data = {
//     //   song_name: form.song_name.value,
//     //   album_name: form.album_name.value,
//     //   duration: form.duration.value,
//     //   artist: form.artist.value
//     // };
  
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Failed to Delete');
//       }
//     })
//     .then(data => {
//       alert(data.message);
//     })
//     .catch(error => {
//       alert(error.message);
//     });
//   }
  
// function deleteFromPlaylist(event) {
//     event.preventDefault(); // prevent form from submitting

//     let form = event.target;
//     let songId = form.action.split("/").pop(); // get the song ID from the form's action attribute

//     // make an HTTP DELETE request to the server
//     fetch(`/delete_song/${songId}`, { method: "DELETE" })
//         .then(response => {
//             if (response.status === 200) {
//                 alert("Song deleted successfully");
//                 form.parentNode.parentNode.remove(); // remove the deleted row from the table
//                 window.location.href = "playlistpage.html"; // redirect to playlist page
//             } else {
//                 response.json().then(data =>{
//                     alert("Failed to delete song");
//                 });
//             }
//         })
//         .catch(error => {
//             console.error(error);
//             alert("Failed to delete song");
//         });
// }

// function addToPlaylist(event) {
//     event.preventDefault();
  
//     const form = event.target;
//     const url = form.action;
//     const data = {
//       id: form.id.value,
//     };
  
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Already In The Playlist');
//       }
//     })
//     .then(data => {
//       alert(data.message);
//     })
//     .catch(error => {
//       alert(error.message);
//     });
//   }
  

