#!/bin/bash

set -e

if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  export NODE_ENV=development&& cd ./mira && npm run dev &
  export NODE_ENV=development&& cd ./frontend && npm run dev;
else
  echo "Please, write a bash code for your system"
fi