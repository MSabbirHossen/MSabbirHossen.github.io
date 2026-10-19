import math
from PIL import Image, ImageDraw

def create_favicon(size=1024):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    s = size / 36.0

    # Draw rounded squircle
    radius = int(8.5 * s)
    rect = [int(1.5 * s), int(1.5 * s), int(34.5 * s), int(34.5 * s)]
    
    # Background fill: deep indigo-slate
    draw.rounded_rectangle(rect, radius=radius, fill=(11, 15, 25, 255))
    
    # Gradient border simulation (draw slightly inset border)
    border_width = max(2, int(1.5 * s))
    draw.rounded_rectangle(rect, radius=radius, outline=(99, 102, 241, 230), width=border_width)

    # Brackets '<' and '>'
    # Left bracket '<': (11, 11) -> (5, 18) -> (11, 25)
    bracket_width = max(3, int(2.5 * s))
    cyan = (6, 182, 212, 255)
    
    left_pts = [(11 * s, 11 * s), (5 * s, 18 * s), (11 * s, 25 * s)]
    draw.line(left_pts, fill=cyan, width=bracket_width, joint="round")
    
    # Right bracket '>': (25, 11) -> (31, 18) -> (25, 25)
    right_pts = [(25 * s, 11 * s), (31 * s, 18 * s), (25 * s, 25 * s)]
    draw.line(right_pts, fill=cyan, width=bracket_width, joint="round")

    # Center 'S' curve
    # Points approximating: (21.5, 13.5) -> (18, 12) -> (14, 15) -> (22, 21) -> (18, 24) -> (14.2, 22.2)
    s_pts = [
        (21.5 * s, 13.5 * s),
        (20.5 * s, 12.2 * s),
        (18.0 * s, 12.0 * s),
        (15.5 * s, 12.6 * s),
        (14.0 * s, 14.5 * s),
        (14.2 * s, 16.5 * s),
        (16.0 * s, 18.0 * s),
        (20.0 * s, 19.5 * s),
        (22.0 * s, 21.0 * s),
        (22.0 * s, 22.8 * s),
        (20.5 * s, 23.8 * s),
        (18.0 * s, 24.0 * s),
        (15.5 * s, 23.5 * s),
        (14.2 * s, 22.2 * s),
    ]
    indigo = (129, 140, 248, 255)
    s_width = max(3, int(2.75 * s))
    draw.line(s_pts, fill=indigo, width=s_width, joint="round")

    # Pulse center dot (18, 18)
    dot_r = 1.3 * s
    draw.ellipse([18 * s - dot_r, 18 * s - dot_r, 18 * s + dot_r, 18 * s + dot_r], fill=(103, 232, 249, 255))

    return img

master = create_favicon(1024)

# 1. Favicon 32x32
f32 = master.resize((32, 32), Image.Resampling.LANCZOS)
f32.save("public/favicon-32x32.png")

# 2. Favicon 16x16
f16 = master.resize((16, 16), Image.Resampling.LANCZOS)

# 3. Favicon 48x48
f48 = master.resize((48, 48), Image.Resampling.LANCZOS)

# 4. ICO with multiple sizes
f32.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

# 5. Apple Touch Icon 180x180
f180 = master.resize((180, 180), Image.Resampling.LANCZOS)
f180.save("public/apple-touch-icon.png")

# 6. Android/PWA 192x192 & 512x512
f192 = master.resize((192, 192), Image.Resampling.LANCZOS)
f192.save("public/favicon-192x192.png")

f512 = master.resize((512, 512), Image.Resampling.LANCZOS)
f512.save("public/favicon-512x512.png")

print("Favicons generated successfully!")
