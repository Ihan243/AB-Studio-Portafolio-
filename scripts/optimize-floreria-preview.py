"""Create an appropriately sized responsive preview without altering the original."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / "public" / "assets" / "portfolio"
source = assets / "floreria-muniz.webp"
destination = assets / "floreria-muniz-480.webp"
with Image.open(source) as image:
    image = image.convert("RGB")
    width = 480
    height = round(image.height * width / image.width)
    image = image.resize((width, height), Image.Resampling.LANCZOS)
    image.save(destination, "WEBP", quality=78, method=6)
print(destination.name, destination.stat().st_size, "bytes")
