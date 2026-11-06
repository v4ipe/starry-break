Starry Break ✦
A clean, modern web interface with a monochrome cyber-anime vibe, built for PlayStation 4 consoles running firmware 13.52 and 14.00.

Fully redesigned and customized by Nasro Ben Ayad, based on the original Afterglow Web project.


✦ Features
- Monochrome Cyber-Anime Design: A bold black-and-white look with a custom anime background and glowing logo, complete with a smooth pulsing animation.
- Full Arabic RTL Support: A fully right-to-left interface using carefully selected Arabic fonts — Tajawal and Cairo for the UI, with Amiri and Aref Ruqaa for decorative headings. Fallback fonts are included for offline use.
- Interactive 5-Second Countdown: A circular SVG countdown that displays Arabic-Indic numerals (٥، ٤، ٣، ٢، ١). Once it finishes, you'll see the message "No limits. Just enjoy." along with an instant launch button.
- Glassmorphism Credits Window: A clean, glass-style popup with detailed credits, licenses, developer information, and open-source acknowledgments.
- Referrer Protection: Stops the PS4 browser from accidentally triggering the exploit again when restoring a previous browsing session.
- Offline Support: Uses HTML5 AppCache to store the entire page in the PS4 browser after the first visit, so you can access it later without an internet connection.
- Original Exploit Files Preserved: The original kernel and exploit files remain untouched, keeping the underlying memory handling and Memory Grooming routines intact.

✦ Compatibility
Supported consoles:
- PlayStation 4 FAT
- PlayStation 4 Slim
- PlayStation 4 Pro
Supported firmware versions:
- 13.52
- 14.00
Supported payloads:
- GoldHEN by SiSTRo — default option
- PS4-HEN

✦ Project Structure
starry/
├── img/
│   ├── logo.jpg           # Anime logo (Image 1)
│   └── bg.jpg             # Dark background image (Image 2)
├── index.html             # Main page and interactive Arabic RTL interface
├── style.css              # Cyber-anime styling and visual effects
├── launch.js               # Handles the countdown, caching, and page transitions
├── jb.html                 # Styled exploit and console page
├── jb.js                   # Host launcher (raw13g host primitive)
├── core.js                 # Low-level memory utilities (slopkit)
├── mem.js                  # Memory management and address reading
├── int64.js                # 64-bit address calculations
├── ps4_offsets.js          # Firmware-specific offsets
├── afterglow.js            # Kernel exploit code
├── patchset-1352.bin       # Kernel patches for firmware 13.52
├── patchset-1400.bin       # Kernel patches for firmware 14.00
├── goldhen.bin             # GoldHEN payload
├── hen.bin                 # PS4-HEN payload
├── cache.appcache          # Offline cache manifest for the PS4 browser
├── make-manifest.sh        # Rebuilds the AppCache manifest on Linux/macOS
├── make_manifest.py        # Rebuilds the AppCache manifest on Windows and other platforms
├── CREDITS.md              # Legal notices, licenses, and contributor credits
└── README.md               # Project documentation



✦ Hosting the Project
There are two ways to host Starry Break.
1. Run a Local Server
Use this option if your computer and PS4 are connected to the same network.

With Python:
python -m http.server 8080


Or on Linux/macOS:
./serve.sh


Once the server is running, open the PS4 browser and enter your computer's local IP address. For example:

http://192.168.1.50:8080
2. Host It for Free with GitHub Pages
You can also host the project online using GitHub Pages:
1. Upload the project files to your own GitHub repository.
2. Open Settings → Pages.
3. Set the deployment source to either the main or gh-pages branch.
4. Open your GitHub Pages link in the PS4 browser.
The browser will then cache the page automatically for offline access.

✦ Updating the Offline Cache (cache.appcache)
Whenever you make changes to the interface files — such as index.html, style.css, launch.js, or anything inside the img/ folder — you'll need to rebuild cache.appcache.

Otherwise, the PS4 browser may keep loading the old cached version instead of your latest changes.

On Windows (using Python):
python make_manifest.py


On Linux/macOS (using Bash):
chmod +x make-manifest.sh
./make-manifest.sh



✦ Credits & Licenses
- Starry Break was redesigned and customized by Nasro Ben Ayad.
- Based on the original Afterglow Web project by researchers well0nez and m0zz.
- The kernel code and patch sets are licensed under the GNU AGPLv3.
- The original host files written by raw13g are licensed under the MIT License.
- All original work remains credited to its respective authors. For the full list of credits and license details, check CREDITS.md.
