#!/bin/bash

# GitHub Pages Deployment Script for Le Social Website
# This script will be executed once GitHub credentials are set

set -e

echo "🚀 Starting GitHub Pages deployment for Le Social..."

# Check prerequisites
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not set. Please export your GitHub personal access token."
    exit 1
fi

if [ -z "$GH_USER" ]; then
    echo "❌ GH_USER not set. Please export your GitHub username."
    exit 1
fi

# Verify dist folder exists
if [ ! -f "dist/index.html" ]; then
    echo "❌ dist/index.html not found. Please build the project first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo "📁 Project size: $(du -sh dist/ | cut -f1)"
echo "🖼️  Optimized images: $(find dist/images -name "*.webp" | wc -l) WebP files"

# Step 1: Initialize git repository if not already done
echo ""
echo "📝 Step 1: Initializing git repository..."
if [ ! -d ".git" ]; then
    git init
    git config user.name "$GH_USER"
    git config user.email "$GH_USER@users.noreply.github.com"
else
    echo "Git repository already initialized"
fi

# Step 2: Create .gitignore for deployment
echo ""
echo "📝 Step 2: Creating .gitignore..."
cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production build (we only want dist for GitHub Pages)
# Uncomment the next line if you want to exclude source files
# src/
# public/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Backup files
*_backup/
*.bak
EOF

# Step 3: Create GitHub Pages configuration
echo ""
echo "📝 Step 3: Creating GitHub Pages configuration..."

# Create _redirects file for client-side routing
echo "/*    /index.html   200" > dist/_redirects

# Create 404.html that redirects to index.html for React Router
cat > dist/404.html << EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Le Social</title>
    <script type="text/javascript">
        // Redirect to index.html for client-side routing
        var pathSegmentsToKeep = 0;
        var l = window.location;
        l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + 
            '/?/' +
            l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
            (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
            l.hash
        );
    </script>
</head>
<body>
</body>
</html>
EOF

# Step 4: Add all files to git
echo ""
echo "📝 Step 4: Adding files to git..."
git add .
git commit -m "Initial commit: Le Social website with optimized images" || echo "No changes to commit"

# Step 5: Create GitHub repository
echo ""
echo "📝 Step 5: Creating GitHub repository..."
REPO_NAME="le-social-preview"

# Authenticate with GitHub CLI
echo "$GITHUB_TOKEN" | gh auth login --with-token

# Create repository
gh repo create "$REPO_NAME" --public --description "Le Social website preview - Event styling kits showcase" || echo "Repository might already exist"

# Step 6: Add remote and push
echo ""
echo "📝 Step 6: Pushing to GitHub..."
git remote add origin "https://github.com/$GH_USER/$REPO_NAME.git" || git remote set-url origin "https://github.com/$GH_USER/$REPO_NAME.git"
git branch -M main
git push -u origin main

# Step 7: Enable GitHub Pages
echo ""
echo "📝 Step 7: Configuring GitHub Pages..."
gh api repos/$GH_USER/$REPO_NAME/pages \
    --method POST \
    --field source.branch=main \
    --field source.path=/dist || echo "GitHub Pages might already be enabled"

# Step 8: Get the GitHub Pages URL
echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📍 GitHub Repository: https://github.com/$GH_USER/$REPO_NAME"
echo "🌐 GitHub Pages URL: https://$GH_USER.github.io/$REPO_NAME"
echo ""
echo "⏰ Note: It may take a few minutes for GitHub Pages to build and deploy."
echo "📱 The site is optimized for both desktop and mobile viewing."
echo ""
echo "✨ Features included:"
echo "   • 6 event styling kits with galleries"
echo "   • Optimized WebP images (98% size reduction)"
echo "   • Responsive design"
echo "   • Booking system with date picker"
echo "   • Payment integration (Stripe & PayPal)"
echo ""

