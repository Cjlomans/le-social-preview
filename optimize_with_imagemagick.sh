#!/bin/bash

echo "Starting image optimization with ImageMagick..."

# Create backup of original images
cp -r dist/images/kits dist/images/kits_backup

# Function to optimize images in a directory
optimize_kit() {
    local kit_dir="$1"
    local kit_name=$(basename "$kit_dir")
    
    echo "Optimizing $kit_name kit images..."
    
    # Find and process all images in the kit directory
    find "$kit_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read img; do
        if [ -f "$img" ]; then
            local filename=$(basename "$img")
            local dir=$(dirname "$img")
            local name_without_ext="${filename%.*}"
            local webp_file="$dir/${name_without_ext}.webp"
            
            echo "Converting: $filename to WebP"
            
            # Convert to WebP with 85% quality and resize to max 1200px
            convert "$img" -resize 1200x1200\> -quality 85 "$webp_file"
            
            # Remove original if conversion was successful
            if [ -f "$webp_file" ]; then
                rm "$img"
                echo "✓ Converted and removed original: $filename"
            else
                echo "✗ Failed to convert: $filename"
            fi
        fi
    done
}

# Optimize all kit directories
for kit_dir in dist/images/kits/*/; do
    if [ -d "$kit_dir" ]; then
        optimize_kit "$kit_dir"
    fi
done

# Check results
echo ""
echo "Optimization complete! Results:"
echo "WebP files created: $(find dist/images/kits -name "*.webp" | wc -l)"
echo "Original files remaining: $(find dist/images/kits -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | wc -l)"

# Show size comparison
echo ""
echo "Size comparison:"
echo "Original backup: $(du -sh dist/images/kits_backup | cut -f1)"
echo "Optimized: $(du -sh dist/images/kits | cut -f1)"

