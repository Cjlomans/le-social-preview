#!/bin/bash

echo "🚀 Le Social GitHub Pages Deployment"
echo "===================================="
echo ""

# Check if credentials are provided as arguments
if [ "$#" -eq 2 ]; then
    export GITHUB_TOKEN="$1"
    export GH_USER="$2"
    echo "✅ Using provided credentials"
else
    echo "Usage: ./deploy-manual.sh <GITHUB_TOKEN> <GH_USER>"
    echo ""
    echo "Or set environment variables:"
    echo "export GITHUB_TOKEN='your_token'"
    echo "export GH_USER='your_username'"
    echo ""
    exit 1
fi

# Run the main deployment script
./github-deployment-script.sh
