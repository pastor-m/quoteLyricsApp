import React, { useEffect, useState } from 'react';
import axios from 'axios';
import generateImage from './utils/imgToHtml.js';
import createImage from './utils/imgCreator.js';
import './App.css';

const fetchImageThroughProxy = async (imageUrl) => {
  try {
    const proxyUrl = `http://localhost:5000/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
    const response = await fetch(proxyUrl);
    const blob = await response.blob();
    const imageObjectUrl = URL.createObjectURL(blob);
    return imageObjectUrl
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

const App = () => {
    
    const [song, setSong] = useState('');
    const [songArtist, setSongArtist] = useState('');
    const [userLyrics, setUserLyrics] = useState('');
    const [songImage, setSongImage] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [songReleaseDate, setSongReleaseDate] = useState('');
    const [error, setError] = useState('');
    const [imageReady, setImageReady] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const searchSong = async () => {
        setError('');
        setSongImage('');
        setSongArtist('');
        setSongTitle('');
        setSongReleaseDate('');
        setImageReady(false);
        setImageLoaded(false);
      try {
        const { data } = await axios.get('http://localhost:5000/api/quote', {
          params: { song },
        })

        const imageUrl = await fetchImageThroughProxy(data.songImage)

        setSongImage(imageUrl);
        setSongArtist(data.songArtist);
        setSongTitle(data.songTitle);
        setSongReleaseDate(data.songReleaseDate);
        setImageReady(true);
        
        
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching the lyrics');
      }
    }

    const handleSearch = (e) => {
      e.preventDefault();
      if (song) {
        console.log('figura1')
        searchSong();
      }
    };

    useEffect(()=>{
      if(imageReady && imageLoaded){
        generateImage('card');
        console.log('figura2')
      }
    },[imageReady, imageLoaded])


    return (
      
      <div className="App" id='searchBox'>
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

          {songTitle && (
              <div>
                <div id='card'>
                  <div className="container">
                      <img 
                      src={songImage} 
                      alt='Thumbnail'
                      onLoad={()=> setImageLoaded(true)}
                      onError={()=> setError('Failed to load song image')}>
                      </img>
                      <div className="quote-text">
                        <h3>"{userLyrics}"</h3>
                      </div>
                    </div>
                    <div className="info-text">
                      <p>{songTitle}, {songArtist}, {songReleaseDate}</p>
                    </div>
                    
                </div>
              </div>
          )}
      </div>
    );
  
}

export default App;
