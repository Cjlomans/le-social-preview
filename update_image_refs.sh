#!/bin/bash

echo "Updating image references from JPG/PNG to WebP..."

# Update kitImages.js
sed -i 's/\.jpg/.webp/g' src/utils/kitImages.js
sed -i 's/\.JPG/.webp/g' src/utils/kitImages.js
sed -i 's/\.jpeg/.webp/g' src/utils/kitImages.js
sed -i 's/\.png/.webp/g' src/utils/kitImages.js

# Update other component files
find src -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | while read file; do
    if [ "$file" != "src/utils/kitImages.js" ]; then
        sed -i 's/\.jpg/.webp/g' "$file"
        sed -i 's/\.JPG/.webp/g' "$file"
        sed -i 's/\.jpeg/.webp/g' "$file"
        sed -i 's/\.png/.webp/g' "$file"
    fi
done

# Update banner.html if it exists
if [ -f "dist/banner.html" ]; then
    sed -i 's/\.jpg/.webp/g' dist/banner.html
    sed -i 's/\.JPG/.webp/g' dist/banner.html
    sed -i 's/\.jpeg/.webp/g' dist/banner.html
    sed -i 's/\.png/.webp/g' dist/banner.html
fi

echo "Image references updated to WebP format!"
