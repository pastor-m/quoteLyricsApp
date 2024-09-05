import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GENIUS_API_TOKEN = process.env.GENIUS_API_TOKEN;

  app.get('/api/quote', async (req,res)=>{
    
    const { song } = req.query;
    
    if (!song){
      return res.status(400).json({ error: 'Song title is required' });
    }

    try {
      let geniusLyrics = []
      const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(song)}`;
      const searchResponse = await axios.get(searchUrl, {
        headers: {
          Authorization: `Bearer ${GENIUS_API_TOKEN}`,
        },
      });

      geniusLyrics = searchResponse.data.response.hits[0].result
      
      if (searchResponse.data.response.hits.length === 0){
        return res.status(404).json({ error: 'No lyrics found' });
      } else if(geniusLyrics){

        const songImage = searchResponse.data.response.hits[0].result.header_image_url;
        const songArtist = searchResponse.data.response.hits[0].result.artist_names;
        const songTitle = searchResponse.data.response.hits[0].result.title;
        const songReleaseDate = searchResponse.data.response.hits[0].result.release_date_for_display;
        
        console.log(songImage,songArtist,songTitle,songReleaseDate)
        return res.json({songImage,songArtist,songTitle,songReleaseDate})

      }

    } catch (err) {
    
      res.status(500).json({ error: 'An error occurred while fetching the song information' });
    }
  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });