# run_django_server.py
import os
import sys
from daphne.cli import CommandLineInterface

def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")

    # Define Daphne arguments
    sys.argv = [
        "daphne",                    # command
        "-p", "8000",                # port
        "api.asgi:application",      # ASGI application path
    ]

    # Run Daphne CLI
    CommandLineInterface.entrypoint()

if __name__ == "__main__":
    main()
