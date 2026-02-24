import os
import re

directory = '/Users/denis/Desktop/Project/Таргет/champion-slots'
target_url = "https://cass-championslots.bet/go/6Ll?p83780p311049pb6a1"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def replacer(match):
        a_tag = match.group(0)
        # Check if it has our target URL in href
        if f'href="{target_url}"' in a_tag:
            # Add target="_blank" if it doesn't have it
            if 'target="_blank"' not in a_tag:
                # Add it before the closing >
                a_tag = re.sub(r'(\s*)(>)$', r' target="_blank"\2', a_tag)
        return a_tag

    # Find all <a> tags with contents up to >
    new_content = re.sub(r'<a\s+[^>]*>', replacer, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))
