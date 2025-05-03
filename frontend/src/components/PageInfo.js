import React from 'react';

const PageInfo = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif', marginTop: '20px'}}>
            <div className="page-info" style={{ textAlign: 'start'}}>
                <h2>How to download audio files from videos?</h2>
                <p>With Audioland.app you can download audio files of videos from Instagram, TikTok, Pinterest and YouTube platforms quickly and easily. And it's completely free!</p>
                <ul>
                    <b>To download audio files from videos, what you need to do is very simple:</b>
                    <li>Copy the link address of the video whose audio you want to download.</li>
                    <li>Paste the link you copied into the download tool on this site where it says "Paste video link here" and click the "Convert" button.</li>
                        <img src="/images/learndown.jpeg" alt="MP3 Downloader" width={"100%"}/><br/><br></br>
                    <li>After clicking the Convert button, a green "Download" button will appear below. Click the "Download" button to download the audio file.</li>
                        <img src="/images/learndown2.jpeg" alt="MP3 Downloader" width={"100%"}/>
                </ul>
            </div>
        </div>
    );
}

export default PageInfo;