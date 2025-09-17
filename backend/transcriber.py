import whisper
import torch

def transcribe_audio(audio_file, model_name="base"):

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = whisper.load_model(model_name, device=device)
    result = model.transcribe(audio_file, fp16=(device == "cuda"))
    return result.get("text", "")
