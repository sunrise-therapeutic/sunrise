from PyPDF2 import PdfReader
import sys

path = sys.argv[1] if len(sys.argv) > 1 else r"uploads/Donors-Sept1-Dec31-2025.pdf"
out = sys.argv[2] if len(sys.argv) > 2 else r"tools/donors_page1.txt"
reader = PdfReader(path)
if len(reader.pages) < 1:
    with open(out, 'w', encoding='utf-8') as f:
        f.write("PDF has no pages\n")
    sys.exit(1)
text = reader.pages[0].extract_text()
with open(out, 'w', encoding='utf-8') as f:
    if not text:
        f.write("(no text extracted)\n")
    else:
        f.write(text)
