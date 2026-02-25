import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add aria-hidden="true" to all <svg> that don't have it
    def add_aria_hidden(match):
        tag = match.group(0)
        if 'aria-hidden' not in tag:
            return tag.replace('<svg', '<svg aria-hidden="true"')
        return tag

    content = re.sub(r'<svg[^>]*>', add_aria_hidden, content)

    # 2. Find all sections and their first heading to add aria-labelledby
    # We will look for <section ...> ... <h1/h2/h3 ...>
    # Note: Regex parsing HTML is tricky but we have standard formatting here.
    
    sections = re.finditer(r'(<section[^>]*>)(.*?)(<h[1-6][^>]*>)(.*?)(</h[1-6]>)', content, re.DOTALL | re.IGNORECASE)
    
    # We'll do a two pass approach to avoid replacing wrong things
    # We will modify the HTML string explicitly
    offset = 0
    new_content = ""
    last_end = 0

    section_pattern = re.compile(r'(<section[^>]*>)(.*?)(<h[1-6][^>]*>)(.*?)(</h[1-6]>)', re.DOTALL | re.IGNORECASE)
    
    def process_sections(text, filename):
        parts = []
        last_index = 0
        section_idx = 0
        for m in section_pattern.finditer(text):
            section_tag = m.group(1)
            between = m.group(2)
            heading_tag_start = m.group(3)
            heading_content = m.group(4)
            heading_tag_end = m.group(5)
            
            # Generate an ID if heading doesn't have one
            heading_id_match = re.search(r'id=["\'](.*?)["\']', heading_tag_start, re.IGNORECASE)
            heading_id = ""
            new_heading_tag_start = heading_tag_start
            
            if heading_id_match:
                heading_id = heading_id_match.group(1)
            else:
                heading_id = f"heading-{filename.replace('.html', '')}-{section_idx}"
                # insert id into heading
                new_heading_tag_start = heading_tag_start.replace('<h', f'<h id="{heading_id}" ')
            
            # Add aria-labelledby to section if not present
            new_section_tag = section_tag
            if 'aria-labelledby' not in section_tag:
                new_section_tag = section_tag.replace('<section', f'<section aria-labelledby="{heading_id}"')
                
            parts.append(text[last_index:m.start()])
            parts.append(new_section_tag)
            parts.append(between)
            parts.append(new_heading_tag_start)
            parts.append(heading_content)
            parts.append(heading_tag_end)
            
            last_index = m.end()
            section_idx += 1
            
        parts.append(text[last_index:])
        return "".join(parts)

    content = process_sections(content, filepath)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Processed {filepath}")
