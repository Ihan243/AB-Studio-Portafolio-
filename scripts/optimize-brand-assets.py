"""Generate compact responsive brand assets without changing the original files."""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
brand = root / "public" / "assets" / "brand"

with Image.open(brand / "logo.jpg") as original:
    logo = original.convert("RGB")
    logo = ImageOps.fit(logo, (96, 96), method=Image.Resampling.LANCZOS)
    logo.save(brand / "logo-96.webp", "WEBP", quality=79, method=6)

with Image.open(brand / "abstudio-bamboo-entry.webp") as original:
    # The entrance uses cover/center positioning on portrait phones.
    # Pre-crop and resample just once, keeping the desktop source unchanged.
    portrait = ImageOps.fit(
        original.convert("RGB"),
        (600, 1050),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.48),
    )
    portrait.save(brand / "abstudio-bamboo-entry-mobile.webp",
                  "WEBP", quality=73, method=6)

for filename in ["logo-96.webp", "abstudio-bamboo-entry-mobile.webp"]:
    p = brand / filename
    print(f"{filename}: {p.stat().st_size} bytes")
