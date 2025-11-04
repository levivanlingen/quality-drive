#!/bin/bash

# Quality Drive - Image Optimization Script
# Converteert alle PNG/JPG naar WebP en AVIF voor betere performance

echo "🖼️  Quality Drive Image Optimizer"
echo "=================================="

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp not found. Installing..."
    sudo apt-get update && sudo apt-get install -y webp
fi

# Check if avifenc is installed
if ! command -v avifenc &> /dev/null; then
    echo "⚠️  avifenc not found. Skipping AVIF conversion."
    echo "   Install with: sudo apt-get install libavif-bin"
    SKIP_AVIF=true
fi

cd public/uploads || exit

echo ""
echo "📊 Analyzing current images..."
TOTAL_SIZE_BEFORE=$(du -sh . | awk '{print $1}')
echo "Total size before: $TOTAL_SIZE_BEFORE"

echo ""
echo "🔄 Converting images..."

# Convert PNG to WebP
echo "Converting PNG files..."
find . -name "*.png" | while read -r file; do
    output="${file%.png}.webp"
    if [ ! -f "$output" ]; then
        cwebp -q 85 "$file" -o "$output" 2>/dev/null
        if [ $? -eq 0 ]; then
            original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
            webp_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output")
            savings=$((100 - (webp_size * 100 / original_size)))
            echo "  ✅ $(basename "$file") → $(basename "$output") (-${savings}%)"
        fi
    fi
done

# Convert JPG/JPEG to WebP
echo ""
echo "Converting JPG/JPEG files..."
find . \( -name "*.jpg" -o -name "*.jpeg" \) | while read -r file; do
    output="${file%.*}.webp"
    if [ ! -f "$output" ]; then
        cwebp -q 85 "$file" -o "$output" 2>/dev/null
        if [ $? -eq 0 ]; then
            original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
            webp_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output")
            savings=$((100 - (webp_size * 100 / original_size)))
            echo "  ✅ $(basename "$file") → $(basename "$output") (-${savings}%)"
        fi
    fi
done

# Convert to AVIF if available
if [ -z "$SKIP_AVIF" ]; then
    echo ""
    echo "Converting to AVIF (best compression)..."
    find . \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read -r file; do
        output="${file%.*}.avif"
        if [ ! -f "$output" ]; then
            avifenc -s 6 "$file" "$output" 2>/dev/null
            if [ $? -eq 0 ]; then
                original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
                avif_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output")
                savings=$((100 - (avif_size * 100 / original_size)))
                echo "  ✅ $(basename "$file") → $(basename "$output") (-${savings}%)"
            fi
        fi
    done
fi

echo ""
echo "📊 Results:"
WEBP_COUNT=$(find . -name "*.webp" | wc -l)
AVIF_COUNT=$(find . -name "*.avif" | wc -l)
echo "WebP files created: $WEBP_COUNT"
echo "AVIF files created: $AVIF_COUNT"

echo ""
echo "✅ Optimization complete!"
echo ""
echo "💡 Next steps:"
echo "1. Update Image components to use WebP/AVIF with fallbacks"
echo "2. Deploy to Railway"
echo "3. Images will be 60-80% smaller!"
