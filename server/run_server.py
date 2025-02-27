import subprocess
import sys

if __name__ == "__main__":
    # Asegúrate de tener los archivos de certificado y clave en el mismo directorio o proporciona la ruta absoluta.

    command = [
        sys.executable, "-m", "uvicorn", "app:app",
        "--reload",
        "--port", "8000",
    ]

    try:
        print("Starting FastAPI server with HTTPS...")
        subprocess.run(command)
    except KeyboardInterrupt:
        print("\nServer stopped by user.")
    except Exception as e:
        print(f"An error occurred: {e}")