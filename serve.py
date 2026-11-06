#!/usr/bin/env python3
"""
Starry Break - Dedicated Local Server
Properly serves .appcache as text/cache-manifest and applies optimal caching headers.
Usage:
    python serve.py
    python serve.py 8080
"""

import sys
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class StarryHTTPHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".bin": "application/octet-stream",
        ".appcache": "text/cache-manifest; charset=utf-8",
    }

    CACHEABLE = (".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico")

    def end_headers(self):
        p = self.path.split("?")[0].lower()
        if p.endswith(self.CACHEABLE):
            self.send_header("Cache-Control", "public, max-age=604800")
        else:
            self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):
        try:
            sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))
        except Exception:
            pass

def main():
    server = ThreadingHTTPServer(("0.0.0.0", PORT), partial(StarryHTTPHandler, directory=BASE_DIR))
    print(f"\nStarry Break Server running at http://0.0.0.0:{PORT}/")
    print(f"PS4 Browser URL: http://<YOUR_PC_IP>:{PORT}/")
    print("Press Ctrl+C to stop.\n", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == "__main__":
    main()
