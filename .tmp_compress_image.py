from PIL import Image
from pathlib import Path

source = Path('support-us/celebrate-2026-alex-client.png')
out = Path('support-us/celebrate-2026-alex-client-compressed.png')
img = Image.open(source)
img.save(out, optimize=True, compress_level=9)
print(out)
print(out.stat().st_size)
