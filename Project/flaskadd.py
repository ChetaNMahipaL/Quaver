import sqlite3
import os
from flask import Flask, request, jsonify, render_template, redirect, send_file, url_for
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__, static_folder='static/')
CORS(app) 
db_path = 'playlist.db'

# create database table if it doesn't exist
def create_table():
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS playlist
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 song_name TEXT NOT NULL,
                 album_name TEXT NOT NULL,
                 duration TEXT NOT NULL,
                 artist TEXT NOT NULL)''')
    conn.commit()
    conn.close()

create_table()

@app.route('/')
def index():
    return 'Welcome to my playlist app!'

@app.route('/add_song', methods=['POST'])
def add_song():
    data = request.get_json()
    song_name = data['song_name']
    album_name = data['album_name']
    duration = data['duration']
    artist = data['artist']

    # check if song already exists in playlist
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("SELECT id FROM playlist WHERE song_name=? AND album_name=? AND duration=? AND artist=?", 
              (song_name, album_name, duration, artist))
    result = c.fetchone()
    if result:
        return jsonify({'message': 'Song already exists in playlist'}), 400

    # insert new song into playlist
    c.execute("INSERT INTO playlist (song_name, album_name, duration, artist) VALUES (?, ?, ?, ?)", 
              (song_name, album_name, duration, artist))
    conn.commit()
    conn.close()

        # Connect to the database
    conn = sqlite3.connect(db_path)

    # Retrieve the data
    c = conn.cursor()
    c.execute("SELECT * FROM playlist")
    result = c.fetchall()

    # Generate HTML code
    html = """<!DOCTYPE html>
    <html lang="en">
    <head>
    <link rel="stylesheet" href="playlist.css" />
    <title>PlaylistPage</title>
    </head>"""
    html += """<body>
    <nav class="navbar">
      <div class="container">
        <div class="logo"><img class="logo-img" src="logo.png" width="65" height="65" ALT="align box" ALIGN=CENTER>   Quaver</div>
        <ul class="nav">
          <li>
            <a href="index.html#">Home</a>
          </li>
          <li>
            <a href="artist.html#">Artists</a>
          </li>
          <li>
            <a href="search.html">Search</a>
          </li>
          <li>
            <a href="spotlight.html">Artist Spotlight</a>
          </li>
          <li>
            <a href="playlistpage.html" class="element">Playlist</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="heading">
        Playlist Page
    </div>
    """
    html += "<table>"
    for row in result:
        html += "<tr>"
        for idx,col in enumerate(row):
            if idx==0:
                continue
            html += "<td>" + str(col) + "</td>"
        html += f"""<td>
                <form onclick="sendDeleteRequest(event, {row[0]})">
                <button type="submit" class="delete-song">Delete Song</button>
                </form></td>"""
        html += "</tr>"
    html += "</table>"


    html += """<footer>
        <p>&copy; 2023 My Website. All rights reserved. | Website developed by AC Coders | <a href="about.html">About Us</a></p>
        </footer>
        <script src="scripthome.js"></script> 
        <script src="deleteplaylist.js"></script>
        <script>
          function sendDeleteRequest(event, row_id) {
            event.preventDefault()
            var id = row_id;
            var data = { id: id }

            fetch('http://127.0.0.1:5000/delete_song', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            .then(response => {
              if (true) {
                alert("Sond Deleted!");
                location.reload();
              } else {
                throw new Error('Already In The Playlist');
              }
            })
            .then(data => data.json)
            .catch(error => {
              alert(error.message);
            });
          }
        </script>
        </body>
        </html>"""
    
    path = 'playlistpage.html'  # Replace with the path to your file
    if os.path.isfile(path):
        with open(path, 'w') as f:
            f.write(html)


    return jsonify({'message': 'Song added to playlist'}), 200

@app.route('/delete_song', methods=['POST'])
def delete_song():
    data = request.get_json()
    song_id = data['id']
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("DELETE FROM playlist WHERE id=?", (song_id,))
    conn.commit()
    conn.close()
        # Connect to the database
    conn = sqlite3.connect(db_path)

    # Retrieve the data
    c = conn.cursor()
    c.execute("SELECT * FROM playlist")
    result = c.fetchall()

    # Generate HTML code
    html = """<!DOCTYPE html>
    <html lang="en">
    <head>
    <link rel="stylesheet" href="playlist.css" />
    <title>PlaylistPage</title>
    </head>"""
    html += """<body>
    <nav class="navbar">
      <div class="container">
        <div class="logo"><img class="logo-img" src="logo.png" width="65" height="65" ALT="align box" ALIGN=CENTER>   Quaver</div>
        <ul class="nav">
          <li>
            <a href="index.html#">Home</a>
          </li>
          <li>
            <a href="artist.html#">Artists</a>
          </li>
          <li>
            <a href="search.html">Search</a>
          </li>
          <li>
            <a href="spotlight.html">Artist Spotlight</a>
          </li>
          <li>
            <a href="playlistpage.html" class="element">Playlist</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="heading">
        Playlist Page
    </div>
    """
    html += "<table>"
    for row in result:
        html += "<tr>"
        for idx,col in enumerate(row):
            if idx==0:
                continue
            html += "<td>" + str(col) + "</td>"
        html += f"""<td>
                <form onclick="sendDeleteRequest(event, {row[0]})">
                <button type="submit" class="delete-song">Delete Song</button>
                </form></td>"""
        html += "</tr>"
    html += "</table>"


    html += """<footer>
        <p>&copy; 2023 My Website. All rights reserved. | Website developed by AC Coders | <a href="about.html">About Us</a></p>
        </footer>
        <script src="scripthome.js"></script> 
        <script src="deleteplaylist.js"></script>
        <script>
          function sendDeleteRequest(event, row_id) {
            event.preventDefault()
            var id = row_id;
            var data = { id: id }

            fetch('http://127.0.0.1:5000/delete_song', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            .then(response => {
              if (true) {
                alert("Sond Deleted!");
                location.reload();
              } else {
                throw new Error('Already In The Playlist');
              }
            })
            .then(data => data.json)
            .catch(error => {
              alert(error.message);
            });
          }
        </script>
        </body>
        </html>"""
    
    path = 'playlistpage.html'  # Replace with the path to your file
    if os.path.isfile(path):
        with open(path, 'w') as f:
            f.write(html)
        # with open(path, 'r') as f:
        #     htmle = f.read()
    # pathe = 'file://' + os.path.abspath('playlistpage.html') 
    # print(htmle)
    # response = {'success': True, 'message': 'Song Deleted ok'}
    # return json.dumps(response), 200

    conn.commit()
    conn.close()

    directory = os.path.dirname(os.getcwd())
    req = directory + '/project_phase_3/playlistpage.html'
    print(req)

    return jsonify({'status': 'success'})
    # return redirect('file:///home/abhinav/gitabh/project_phase_3/playlistpage.html')
    # return jsonify(success=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

