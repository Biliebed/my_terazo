#!/bin/bash

# My Terazo - Quick Deploy Commands
# Copy-paste commands ini ke terminal kamu

echo "=========================================="
echo "MY TERAZO - DEPLOY COMMANDS"
echo "=========================================="
echo ""

# Warna untuk output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📍 Current Status:${NC}"
cd ~/my_terazo
git status
echo ""

echo -e "${YELLOW}⚠️  NEXT STEPS:${NC}"
echo ""
echo "1️⃣  Buat repository di GitHub:"
echo "    https://github.com/new"
echo ""
echo "2️⃣  Copy URL repository (contoh):"
echo "    https://github.com/username/my_terazo.git"
echo ""
echo "3️⃣  Jalankan command ini (ganti YOUR_GITHUB_URL):"
echo ""
echo -e "${GREEN}cd ~/my_terazo${NC}"
echo -e "${GREEN}git remote add origin YOUR_GITHUB_URL${NC}"
echo -e "${GREEN}git push -u origin main${NC}"
echo ""
echo "4️⃣  Deploy di Vercel:"
echo "    https://vercel.com/new"
echo "    → Import repository 'my_terazo'"
echo "    → Klik Deploy"
echo ""
echo "=========================================="
echo ""

# Check if remote already exists
if git remote -v | grep -q "origin"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' sudah ada:${NC}"
    git remote -v
    echo ""
    echo "Jika mau ganti, jalankan:"
    echo "  git remote remove origin"
    echo "  git remote add origin YOUR_NEW_URL"
fi
