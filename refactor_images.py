import re
import os
from PIL import Image

def process_html_files(base_dir):
    html_files = ["bonus.html", "index.html", "live.html", "register.html", "reviews.html", "slots.html"]
    
    img_tag_pattern = re.compile(r'<img\s+([^>]+)>', re.IGNORECASE | re.DOTALL)
    
    for file_name in html_files:
        file_path = os.path.join(base_dir, file_name)
        if not os.path.exists(file_path):
            continue
            
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # We need to ensure we don't nest <picture> tags if we run the script multiple times.
        # But assuming we only run it once and there are no <picture> tags initially.
        # It's better to just process <img> tags directly.
        # Actually to be safe, let's find all <img ...> and replace them via a function.
        
        def replace_img(match):
            img_str = match.group(0)
            attrs_str = match.group(1)
            
            # Extract src
            src_match = re.search(r'src=["\']([^"\']+)["\']', attrs_str)
            if not src_match:
                return img_str # Don't touch if no src
                
            src = src_match.group(1)
            
            # We only process if it is in images/ and is png or jpg
            if not src.startswith("images/") or not src.endswith((".png", ".jpg", ".jpeg")):
                # Wait, you might have images outside but they are mostly in images/.
                # If they are not png/jpg we don't put .webp source.
                pass
            
            webp_src = ""
            if src.endswith((".png", ".jpg", ".jpeg")):
                webp_src = src.rsplit(".", 1)[0] + ".webp"
                
            # Extract attributes cleanly
            attr_pattern = re.compile(r'([a-zA-Z0-9_-]+)(?:=["\']([^"\']*)["\'])?')
            attrs = {}
            for am in attr_pattern.finditer(attrs_str):
                attrs[am.group(1)] = am.group(2) if am.group(2) is not None else ""
                
            # Manage dimensions
            # Try to get size
            img_fs_path = os.path.join(base_dir, src)
            if os.path.exists(img_fs_path):
                try:
                    with Image.open(img_fs_path) as im:
                        width, height = im.size
                        attrs["width"] = str(width)
                        attrs["height"] = str(height)
                except:
                    pass
                    
            # Check lazy load condition
            # Убедиться, что на images/logo.png и images/hero-bg.png отсутствует loading="lazy" 
            # (так как они в первом экране), а на всех слотах ниже линии сгиба этот атрибут стоит.
            
            is_above_fold = src in ("images/logo.png", "images/hero-bg.png", "images/logo.jpg")
            
            if is_above_fold:
                if "loading" in attrs:
                    del attrs["loading"]
            else:
                attrs["loading"] = "lazy"
            
            # Reconstruct img tag
            new_img_attrs = []
            # Make sure src comes first, alt, class etc
            # keep an order for neatness
            order = ["src", "alt", "class", "width", "height", "loading"]
            # add others
            for o in order:
                if o in attrs:
                    new_img_attrs.append(f'{o}="{attrs[o]}"')
            for k, v in attrs.items():
                if k not in order:
                    if v == "":
                        new_img_attrs.append(k)
                    else:
                        new_img_attrs.append(f'{k}="{v}"')
                        
            new_img_tag = f'<img {" ".join(new_img_attrs)}>'
            
            if webp_src:
                return f'<picture>\n                        <source srcset="{webp_src}" type="image/webp">\n                        {new_img_tag}\n                    </picture>'
            else:
                return new_img_tag
                
        # To avoid replacing inside existing <picture> we could parse properly, but let's assume
        # there are no <picture> tags wrapper yet, or we simply process carefully.
        # Actually our replace_img handles it without stripping <picture> but adding it.
        # If it's already inside a <picture>, wait, there are none!
        new_content = img_tag_pattern.sub(replace_img, content)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Processed {file_name}")

if __name__ == "__main__":
    process_html_files('/Users/denis/Desktop/Project/Таргет/champion-slots')
