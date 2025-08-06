#!/bin/bash

# Create a temporary directory for optimized images
mkdir -p dist/images/kits_optimized

# Function to optimize images in a directory
optimize_kit() {
    local kit_dir="$1"
    local kit_name=$(basename "$kit_dir")
    
    echo "Optimizing $kit_name kit images..."
    mkdir -p "dist/images/kits_optimized/$kit_name"
    
    # Process each image in the kit directory
    find "$kit_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read img; do
        if [ -f "$img" ]; then
            local filename=$(basename "$img")
            local name_without_ext="${filename%.*}"
            
            echo "Processing: $filename"
            # Convert to WebP with 85% quality and resize to max 1200px
            npx sharp -i "$img" -o "dist/images/kits_optimized/$kit_name" \
                resize 1200 1200 --fit inside --withoutEnlargement \
                webp --quality 85 --effort 6
        fi
    done
}

# Optimize all kit directories
for kit_dir in dist/images/kits/*/; do
    if [ -d "$kit_dir" ]; then
        optimize_kit "$kit_dir"
    fi
done

echo "Image optimization complete!"
