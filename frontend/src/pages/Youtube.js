import React, { useState } from 'react';
import { Link,  } from 'react-router-dom';

function Youtube() {
  const [link, setLink] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setError(null);
    setAudioUrl(null);
    setIsLoading(true);

    if (!link.includes("youtube.com") && !link.includes ("youtu.be")) {
      setError("The link is incorrect. Please enter a valid Youtube URL.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }),
      });

      const data = await response.json();
      setAudioUrl(data.downloadUrl);
      setLink(""); 

      if (data.error) {
        setError(data.error);
      } else {
        setAudioUrl(data.audioUrl);
        
      }
    } catch (err) {
      setError("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card" style={{ background: '#c50000' }}>
        <h1>Youtube MP3 Downloader</h1>

        <input className='inputLink'
          type="text"
          placeholder="Paste video link here..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        
        {isLoading ? (
          <button disabled>Loading...</button>
        ) : (
          <button translate='no' onClick={handleDownload}>Convert</button>
        )}

          <p className="warning" style={{ color: '#ffffff', fontSize: '12px', fontWeight:'200' }}>
            By using our site, you agree to our <Link to={"/privacy-policy"} style={{ color: 'rgb(255, 255, 255)' , margin:'3px'}}>Privacy Policy</Link> and <Link to={"/terms"} style={{ color: '#fff', margin:'3px' }}>Terms of Service.</Link></p>
   
      <div className='audio-container'>
        {error && <p style={{ color: 'white', fontSize:'13px' }}>{error}</p>}

        {audioUrl && (
          <div style={{ width:'100%' }}>
            <audio controls src={audioUrl} /><br/>

            <Link href="#" className="download-link" 
                onClick={(e) => {
                e.preventDefault();
                const a = document.createElement('a');
                a.href = audioUrl;
                a.download = 'audio.mp3';
                a.click();
              }}
            >
              ► MP3 Download ◄
            </Link>
          </div>
        )}
      </div>
    </div>

      <p className="warning-mobile" >By using our site, you agree to our 
        <Link to={"/privacy-policy"}>Privacy Policy</Link> 
          and 
        <Link to={"/terms"}>Terms.</Link>
      </p>

      <div className="adsCard"></div>

    </div>
  );
}

export default Youtube;