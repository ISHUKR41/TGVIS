"""
TGVIS — Image Copy Utility
===========================
This script copies newly generated images from the artifacts directory
to the appropriate website asset directories.

Run this script once after generating new images to deploy them into
the website's image structure.
"""

import shutil
import os

# Source directory (where generated images are saved)
artifacts_dir = r"C:\Users\MR.ROBOT\.gemini\antigravity-ide\brain\01f1d967-afaf-4b54-aaf5-1385072356bf"

# Destination directories
logo_dir = r"g:\TGVIS\assets\images\logo"
hero_dir = r"g:\TGVIS\assets\images\hero"

# Ensure destination directories exist
os.makedirs(logo_dir, exist_ok=True)
os.makedirs(hero_dir, exist_ok=True)

# Copy logo
logo_src = os.path.join(artifacts_dir, "tgvis_logo_1786419821082.png")
logo_dst = os.path.join(logo_dir, "tgvis-logo-new.png")
if os.path.exists(logo_src):
    shutil.copy2(logo_src, logo_dst)
    print(f"Copied logo to {logo_dst}")
else:
    print(f"Logo source not found: {logo_src}")

# Copy hero background
hero_src = os.path.join(artifacts_dir, "tgvis_hero_bg_1786419847306.png")
hero_dst = os.path.join(hero_dir, "campus-hero-new.png")
if os.path.exists(hero_src):
    shutil.copy2(hero_src, hero_dst)
    print(f"Copied hero to {hero_dst}")
else:
    print(f"Hero source not found: {hero_src}")

print("\nDone! Images copied to website assets.")
