import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_artwork():
    # 2400 x 3200 High-Res Museum Canvas (3:4 ratio, 300 DPI equivalent)
    W, H = 2400, 3200
    canvas = Image.new("RGBA", (W, H), (11, 11, 12, 255)) # #0B0B0C
    
    # 1. Radiant Ambient Glow Layer (Honey Amber #F2A516 & Solar Gold #F7BA4A)
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Off-axis main amber glow
    cx, cy = int(W * 0.58), int(H * 0.46)
    r1 = 700
    glow_draw.ellipse([cx - r1, cy - r1, cx + r1, cy + r1], fill=(242, 165, 22, 55))
    
    # Core gold specular hotspot
    r2 = 320
    glow_draw.ellipse([cx - r2, cy - r2, cx + r2, cy + r2], fill=(247, 186, 74, 85))
    
    # Secondary top-left ambient drift
    r3 = 450
    glow_draw.ellipse([int(W * 0.25) - r3, int(H * 0.28) - r3, int(W * 0.25) + r3, int(H * 0.28) + r3], fill=(242, 165, 22, 25))
    
    # Deep gaussian blur to create luminous photographic glow
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(140))
    canvas = Image.alpha_composite(canvas, glow_layer)
    
    # 2. Vector & Geometric Line Layer
    vector_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(vector_layer)
    
    # Margins and Boundary Rulers (Clean Margins)
    m = 120
    d.rectangle([m, m, W - m, H - m], outline=(255, 255, 255, 30), width=2)
    d.rectangle([m + 24, m + 24, W - m - 24, H - m - 24], outline=(242, 165, 22, 45), width=1)
    
    # Corner registration brackets
    bracket_len = 50
    corners = [(m, m), (W - m, m), (m, H - m), (W - m, H - m)]
    for (x, y) in corners:
        dx = 1 if x == m else -1
        dy = 1 if y == m else -1
        d.line([(x, y), (x + dx * bracket_len, y)], fill=(242, 165, 22, 200), width=3)
        d.line([(x, y), (x, y + dy * bracket_len)], fill=(242, 165, 22, 200), width=3)
    
    # Subtle Background Architectural Coordinate Grid
    grid_step = 160
    for gx in range(m + 40, W - m, grid_step):
        d.line([(gx, m + 24), (gx, H - m - 24)], fill=(255, 255, 255, 12), width=1)
        # Small tick marks
        d.line([(gx, m + 20), (gx, m + 28)], fill=(255, 255, 255, 60), width=1)
    for gy in range(m + 40, H - m, grid_step):
        d.line([(m + 24, gy), (W - m - 24, gy)], fill=(255, 255, 255, 12), width=1)
        d.line([(m + 20, gy), (m + 28, gy)], fill=(255, 255, 255, 60), width=1)
        
    # Isometric Hexagonal Lattice (Viral Bee Brand Core)
    def hex_vertices(center_x, center_y, radius, rotation=0):
        points = []
        for i in range(6):
            angle = math.radians(60 * i + rotation)
            px = center_x + radius * math.cos(angle)
            py = center_y + radius * math.sin(angle)
            points.append((px, py))
        return points

    # Central Hive Prismatic Motif (Multiple Nested Hexagons)
    radii = [520, 440, 360, 280, 200, 130, 70]
    for idx, r in enumerate(radii):
        pts = hex_vertices(cx, cy, r, rotation=30)
        alpha = int(220 - idx * 24)
        stroke_w = 3 if idx in [0, 2, 4] else 1
        
        # Draw hexagon perimeter
        for i in range(6):
            p1 = pts[i]
            p2 = pts[(i + 1) % 6]
            d.line([p1, p2], fill=(242, 165, 22, alpha), width=stroke_w)
            
            # Subtle radial spokes from inner to outer
            if idx == 0:
                d.line([(cx, cy), p1], fill=(247, 186, 74, 50), width=1)
                # Outer marker circles
                d.ellipse([p1[0] - 6, p1[1] - 6, p1[0] + 6, p1[1] + 6], fill=(247, 186, 74, 240))
                
    # Isometric Facet Shading on Core Hexagon
    pts_core = hex_vertices(cx, cy, 200, rotation=30)
    # Shaded top facet
    d.polygon([(cx, cy), pts_core[0], pts_core[1]], fill=(242, 165, 22, 40))
    d.polygon([(cx, cy), pts_core[2], pts_core[3]], fill=(247, 186, 74, 60))
    d.polygon([(cx, cy), pts_core[4], pts_core[5]], fill=(146, 64, 14, 45))
    
    # Golden Ratio Logarithmic Radial Rays (Propagation of Virality)
    for deg in range(0, 360, 15):
        rad = math.radians(deg)
        x_start = cx + 560 * math.cos(rad)
        y_start = cy + 560 * math.sin(rad)
        ray_len = 280 if deg % 30 == 0 else 140
        x_end = x_start + ray_len * math.cos(rad)
        y_end = y_start + ray_len * math.sin(rad)
        alpha_ray = 120 if deg % 30 == 0 else 50
        d.line([(x_start, y_start), (x_end, y_end)], fill=(247, 186, 74, alpha_ray), width=1 if deg % 30 != 0 else 2)
        if deg % 45 == 0:
            d.ellipse([x_end - 4, y_end - 4, x_end + 4, y_end + 4], fill=(255, 255, 255, 180))

    # Satellite Hexagons (The Hive Network)
    satellite_offsets = [
        (-480, -320, 110),
        (520, -380, 95),
        (-560, 340, 130),
        (460, 420, 120),
        (-260, 520, 80),
        (220, -520, 90)
    ]
    for ox, oy, s_rad in satellite_offsets:
        sx, sy = cx + ox, cy + oy
        s_pts = hex_vertices(sx, sy, s_rad, rotation=30)
        for i in range(6):
            d.line([s_pts[i], s_pts[(i + 1) % 6]], fill=(255, 255, 255, 75), width=1)
        d.ellipse([sx - 4, sy - 4, sx + 4, sy + 4], fill=(242, 165, 22, 190))
        # Connection vectors back to core
        d.line([(cx, cy), (sx, sy)], fill=(242, 165, 22, 35), width=1)

    canvas = Image.alpha_composite(canvas, vector_layer)
    
    # 3. Typographic Architectural Layer
    text_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    td = ImageDraw.Draw(text_layer)
    
    # Load High-Quality System Fonts
    font_bold_path = "C:/Windows/Fonts/arialbd.ttf"
    font_reg_path = "C:/Windows/Fonts/arial.ttf"
    font_serif_path = "C:/Windows/Fonts/georgia.ttf"
    font_light_path = "C:/Windows/Fonts/segoeuil.ttf"
    
    f_brand = ImageFont.truetype(font_bold_path, 108) if os.path.exists(font_bold_path) else ImageFont.load_default()
    f_sub = ImageFont.truetype(font_reg_path, 34) if os.path.exists(font_reg_path) else ImageFont.load_default()
    f_serif = ImageFont.truetype(font_serif_path, 48) if os.path.exists(font_serif_path) else ImageFont.load_default()
    f_meta = ImageFont.truetype(font_light_path, 22) if os.path.exists(font_light_path) else ImageFont.load_default()
    f_micro = ImageFont.truetype(font_reg_path, 18) if os.path.exists(font_reg_path) else ImageFont.load_default()
    
    # Top Header Telemetry
    td.text((m + 40, m + 40), "VIRAL BEE // VISUAL DESIGN SYSTEM", fill=(255, 255, 255, 140), font=f_meta)
    td.text((m + 40, m + 72), "PHILOSOPHY: LUMINESCENT TESSELLATION", fill=(242, 165, 22, 220), font=f_sub)
    
    header_r = "SPEC: MMXXVI • ARTWORK NO. 001"
    td.text((W - m - 400, m + 40), header_r, fill=(255, 255, 255, 140), font=f_meta)
    td.text((W - m - 400, m + 72), "CANVAS RATIO 3:4 • 300 DPI", fill=(255, 255, 255, 90), font=f_meta)
    
    # Monumental Brand Typographic Statement (Bottom Left)
    td.text((m + 40, H - m - 360), "VIRAL BEE", fill=(255, 255, 255, 250), font=f_brand)
    td.text((m + 44, H - m - 235), "The Mathematical Architecture of Virality.", fill=(247, 186, 74, 235), font=f_serif)
    
    statement = "DISCOVERY  •  CREATIVE  •  PERFORMANCE  •  CONVERSION"
    td.text((m + 44, H - m - 165), statement, fill=(255, 255, 255, 160), font=f_sub)
    
    # Metadata Footnote Block (Bottom Right)
    coord_block = [
        "GEOLOCATION: 28.6304° N • 77.2774° E (NEW DELHI)",
        "PALETTE: NOIR (#0B0B0C) • HONEY AMBER (#F2A516) • SOLAR GOLD (#F7BA4A)",
        "SCALING FACTOR: ROAS 4.8x • 20M+ VIEWS • 1:1.618 GOLDEN RATIO",
        "COPYRIGHT © 2026 VIRAL BEE DIGITAL AGENCY. ALL RIGHTS RESERVED."
    ]
    for idx, line in enumerate(coord_block):
        td.text((W - m - 740, H - m - 240 + idx * 30), line, fill=(255, 255, 255, 120), font=f_micro)

    # Architectural Micro-Annotations Floating near Focal Geometry
    td.text((cx + 240, cy - 280), "RADIUS: φ^2 = 2.618", fill=(242, 165, 22, 180), font=f_micro)
    td.line([(cx + 230, cy - 270), (cx + 170, cy - 220)], fill=(242, 165, 22, 120), width=1)
    
    td.text((cx - 440, cy + 240), "VECTOR: 120° TESSELLATION", fill=(255, 255, 255, 160), font=f_micro)
    td.line([(cx - 320, cy + 230), (cx - 260, cy + 180)], fill=(255, 255, 255, 100), width=1)

    canvas = Image.alpha_composite(canvas, text_layer)
    
    # Convert RGBA -> RGB for crisp output
    final_rgb = canvas.convert("RGB")
    
    out_dir = "design"
    os.makedirs(out_dir, exist_ok=True)
    
    png_path = os.path.join(out_dir, "viral-bee-brand-artwork.png")
    pdf_path = os.path.join(out_dir, "viral-bee-brand-artwork.pdf")
    
    final_rgb.save(png_path, format="PNG", optimize=True)
    final_rgb.save(pdf_path, format="PDF", resolution=300.0)
    
    print(f"Artwork PNG successfully created: {png_path} ({os.path.getsize(png_path)} bytes)")
    print(f"Artwork PDF successfully created: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")

if __name__ == "__main__":
    create_artwork()
