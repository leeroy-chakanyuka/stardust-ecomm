"""Background removal service — no UI, no runtime cost.
Reads product shots from img_cleaned/raw/, writes transparent PNGs to
img_cleaned/processed/. Run on demand:

    npm run clean-images            # process new/changed files only
    npm run clean-images -- --force # redo everything

First run downloads the u2net model (~176MB) to ~/.u2net, then works offline.
"""
import sys
from pathlib import Path

from rembg import new_session, remove

HERE = Path(__file__).resolve().parent
RAW = HERE / "../src/assets/img_cleaned/raw"
OUT = HERE / "../src/assets/img_cleaned/processed"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}
FORCE = "--force" in sys.argv

OUT.mkdir(parents=True, exist_ok=True)
files = sorted(p for p in RAW.iterdir() if p.suffix.lower() in EXTS)

if not files:
    print("raw/ is empty — drop product shots in and rerun.")
    sys.exit(0)

session = new_session("u2net")
failed = 0
for src in files:
    dest = OUT / f"{src.stem}.transparent.png"
    if (
        not FORCE
        and dest.exists()
        and dest.stat().st_mtime >= src.stat().st_mtime
    ):
        print(f"skip  {src.name} (up to date)")
        continue
    print(f"work  {src.name} ...", flush=True)
    try:
        dest.write_bytes(remove(src.read_bytes(), session=session))
        print(f"done  {src.name} -> processed/{dest.name}")
    except Exception as err:  # keep originals untouched, report and move on
        failed += 1
        print(f"FAIL  {src.name}: {err}")

if failed:
    print(f"{failed} file(s) failed — originals untouched.")
    sys.exit(1)
print("all clean.")
