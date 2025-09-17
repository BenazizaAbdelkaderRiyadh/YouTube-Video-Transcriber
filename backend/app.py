from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from downloader import download_audio
from transcriber import transcribe_audio
from exporter import create_pdf, create_docx 

app = Flask(__name__)
CORS(app)
latest_transcript = ""

@app.route("/api/process", methods=["POST"])
def process():
    global latest_transcript
    try:
        data = request.get_json()
        url = data.get("url")
        if not url:
            return jsonify({"error": "No URL provided"}), 400

        audio_path = "audio.mp3"
        if os.path.exists(audio_path):
            os.remove(audio_path)
        download_audio(url, output_file=audio_path)

        transcript = transcribe_audio(audio_path)
        if not transcript.strip():
            return jsonify({"error": "Transcript is empty"}), 500

        latest_transcript = transcript 
        return jsonify({
            "transcript": transcript,
            "download_pdf": "/api/download/pdf",
            "download_docx": "/api/download/docx"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/download/pdf", methods=["GET"])
def download_pdf():
    global latest_transcript
    if not latest_transcript:
        return jsonify({"error": "No transcript available"}), 400

    file_path = create_pdf(latest_transcript)
    return send_file(file_path, as_attachment=True)


@app.route("/api/download/docx", methods=["GET"])
def download_docx():
    global latest_transcript
    if not latest_transcript:
        return jsonify({"error": "No transcript available"}), 400

    file_path = create_docx(latest_transcript)
    return send_file(file_path, as_attachment=True)


@app.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "backend running"})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
