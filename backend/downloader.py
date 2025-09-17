import yt_dlp
import os

def download_audio(url, output_file="audio.mp3"):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': "temp_audio.%(ext)s",  
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'quiet': False, 
        'no_warnings': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    temp_file = "temp_audio.mp3"
    if os.path.exists(temp_file):
        os.rename(temp_file, output_file)  

    if not os.path.exists(output_file):
        raise FileNotFoundError("Failed to download audio with yt_dlp/ffmpeg")

    return output_file
