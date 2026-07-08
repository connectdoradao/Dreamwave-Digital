#!/usr/bin/env python3
"""
Rewrites .png/.jpg/.jpeg -> .webp in:
  - import statements from "@/assets/..."
  - string literals that point at local public paths (start with "/")
Leaves full external URLs (http://, https://) untouched.

Usage: python3 scripts/update-image-refs.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXTS = (".ts", ".tsx")

# quote, then "@/assets/..." or "/...", ending in png|jpg|jpeg, same quote
PATTERN = re.compile(r"""(['"])((?:@/assets/|/)[^'"]+?)\.(png|jpe?g)\1""")

def replace(match):
    quote, path, ext = match.groups()
    return f"{quote}{path}.webp{quote}"

def main():
    changed_files = 0
    changed_refs = 0
    for dirpath, _, filenames in os.walk(os.path.join(ROOT, "src")):
        for fname in filenames:
            if not fname.endswith(EXTS):
                continue
            fpath = os.path.join(dirpath, fname)
            with open(fpath, "r", encoding="utf-8") as f:
                content = f.read()
            new_content, n = PATTERN.subn(replace, content)
            if n > 0:
                with open(fpath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                changed_files += 1
                changed_refs += n
                print(f"{os.path.relpath(fpath, ROOT)}: {n} reference(s) updated")

    print(f"\nDone. {changed_refs} reference(s) updated across {changed_files} file(s).")

if __name__ == "__main__":
    main()
