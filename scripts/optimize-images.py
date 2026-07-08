#!/usr/bin/env python3
"""
Converts all PNG/JPG/JPEG images in src/assets and public to compressed WebP.
Resizes based on how large the image actually needs to be for the web
(avatars/logos get downscaled hard, hero/banner images keep more resolution).

Usage: python3 scripts/optimize-images.py
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (path-substring-match, max_dimension, quality)
# checked top to bottom, first match wins
RULES = [
    ("src/assets/speakers/", 480, 75),
    ("src/assets/community-partners/", 600, 78),
    ("src/assets/sponsors/", 600, 78),
    ("public/programs/", 1600, 78),
    ("doradao1/hero.jpg", 1600, 78),
    ("public/doradao1/", 1200, 78),
    ("public/peek/", 1400, 78),
]
DEFAULT_MAX_DIM = 1400
DEFAULT_QUALITY = 78

SCAN_DIRS = ["src/assets", "public"]
EXTS = (".png", ".jpg", ".jpeg")

def pick_rule(rel_path):
    for match, max_dim, quality in RULES:
        if match in rel_path:
            return max_dim, quality
    return DEFAULT_MAX_DIM, DEFAULT_QUALITY

def main():
    total_before = 0
    total_after = 0
    report = []

    for scan_dir in SCAN_DIRS:
        base = os.path.join(ROOT, scan_dir)
        for dirpath, _, filenames in os.walk(base):
            for fname in filenames:
                if not fname.lower().endswith(EXTS):
                    continue
                src_path = os.path.join(dirpath, fname)
                rel_path = os.path.relpath(src_path, ROOT)
                max_dim, quality = pick_rule(rel_path)

                before_size = os.path.getsize(src_path)
                im = Image.open(src_path)
                if im.mode not in ("RGB", "RGBA"):
                    im = im.convert("RGBA" if "A" in im.mode else "RGB")

                w, h = im.size
                scale = min(1.0, max_dim / max(w, h))
                if scale < 1.0:
                    im = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)

                webp_path = os.path.splitext(src_path)[0] + ".webp"
                im.save(webp_path, "WEBP", quality=quality, method=6)
                after_size = os.path.getsize(webp_path)

                os.remove(src_path)

                total_before += before_size
                total_after += after_size
                report.append((rel_path, before_size, after_size))

    report.sort(key=lambda r: -r[1])
    print(f"{'file':70} {'before':>10} {'after':>10}")
    for rel_path, b, a in report:
        print(f"{rel_path:70} {b/1024:>8.0f}K {a/1024:>8.0f}K")

    print()
    print(f"TOTAL: {total_before/1024/1024:.2f} MB -> {total_after/1024/1024:.2f} MB "
          f"({(1 - total_after/total_before)*100:.1f}% reduction, {len(report)} files)")

if __name__ == "__main__":
    main()
