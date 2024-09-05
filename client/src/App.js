import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [song, setSong] = useState('');
    const [songArtist, setSongArtist] = useState('');
    const [userLyrics, setUserLyrics] = useState('');
    const [songImage, setSongImage] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [songReleaseDate, setSongReleaseDate] = useState('');
    const [error, setError] = useState('');

    const searchSong = async () => {
        setError('');
        setSongImage('');
        setSongArtist('');
        setSongTitle('');
        setSongReleaseDate('');
      try {
        

        
        const { data } = await axios.get('http://localhost:5000/api/quote', {
          params: { song },
        })

        console.log({data})

        setSongImage(data.songImage);
        setSongArtist(data.songArtist);
        setSongTitle(data.songTitle);
        setSongReleaseDate(data.songReleaseDate);
        

        // return ((song) && (
        //     <div>
        //       <div className="container">
        //         <img src={songImage} alt='Thumbnail'></img>
        //         <div className="quote-text">
        //           <h3>"{userLyrics}"</h3>
        //         </div>
        //       </div>
        //       <div className="info-text">
        //         <p>{songTitle}, {songArtist}, {songReleaseDate}</p>
        //       </div>
        //     </div>
        // ))
        
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching the lyrics');
      }
    }

    const handleSearch = (e) => {
      e.preventDefault();
      if (song) {
        searchSong();
      }
    };

    return (
      <div className="App">
        <h1>Genius Lyrics Search</h1>
        <form onSubmit={handleSearch}>
          <input
            name='song'
            type="text"
            placeholder="Enter song title"
            value={song}
            onChange={(e) => setSong(e.target.value)}
          />
          <input
            name='quote'
            type="text"
            placeholder="Enter lyrics quote"
            value={userLyrics}
            onChange={(e) => setUserLyrics(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        
        {error && <p className="error">{error}</p>}

        {(song) && (
            <div>
              <div className="container">
                <img src={songImage} alt='Thumbnail'></img>
                <div className="quote-text">
                  <h3>"{userLyrics}"</h3>
                </div>
              </div>
              <div className="info-text">
                <p>{songTitle}, {songArtist}, {songReleaseDate}</p>
              </div>
            </div>
        )}
      </div>
    );
  
}

export default App;
