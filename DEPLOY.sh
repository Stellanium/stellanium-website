#!/bin/bash
# Stellanium Website Deployment Script

cd /home/a/.claude/clients/stellanium/website

echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to: https://github.com/stellanium/stellanium-website"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Go to: https://app.netlify.com/start"
echo "2. Click 'Import from Git' → 'GitHub'"
echo "3. Authorize Netlify to access your GitHub"
echo "4. Select repository: stellanium/stellanium-website"
echo "5. Click 'Deploy site'"
echo ""
echo "⚡ After that, every git push will auto-deploy!"
