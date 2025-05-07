#!/bin/bash

# Simple script to start the complete Dadson website with blog functionality
# This script starts both PayloadCMS and Next.js concurrently

# Set up colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Dadson Website with Blog Stack${NC}"

# Change to project root directory
cd "$(dirname "$0")"

# First check for port conflicts and MongoDB
echo -e "\n${YELLOW}Checking environment...${NC}"
node check-ports.js

# Check if MongoDB is running
if ! brew services list | grep -q "mongodb.*started"; then
  echo -e "\n${YELLOW}Starting MongoDB...${NC}"
  brew services start mongodb/brew/mongodb-community
fi

# Function to create a new tmux window and run a command
create_window() {
  local name=$1
  local command=$2
  local dir=$3
  
  # Create a new window running the command
  cd "$dir" && $command
}

# Check if we're in a terminal that supports multiple windows
if [ -t 1 ]; then
  echo -e "\n${GREEN}Starting services in separate windows:${NC}"
  
  # Start PayloadCMS in one window
  echo -e "\n${YELLOW}Starting PayloadCMS...${NC}"
  osascript -e 'tell app "Terminal" to do script "cd '$PWD'/payload/dadson-blog && npm run dev:simple"'
  
  # Start Next.js in another window
  echo -e "\n${YELLOW}Starting Next.js...${NC}"
  osascript -e 'tell app "Terminal" to do script "cd '$PWD' && npm run dev"'
  
  echo -e "\n${GREEN}Services are starting in separate Terminal windows${NC}"
  echo -e "PayloadCMS will be available at: ${YELLOW}http://localhost:3001/admin${NC}"
  echo -e "Next.js will be available at: ${YELLOW}http://localhost:3000${NC}"
else
  # Fallback to concurrent execution in the same terminal
  echo -e "\n${YELLOW}Starting services concurrently...${NC}"
  echo -e "You can access:"
  echo -e "PayloadCMS: ${YELLOW}http://localhost:3001/admin${NC}"
  echo -e "Next.js: ${YELLOW}http://localhost:3000${NC}"
  
  # Start both services
  cd payload/dadson-blog && npm run dev:simple & 
  cd "$PWD" && npm run dev
fi