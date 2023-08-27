#!/usr/bin/env bash
cd "$(dirname "$0")"
git pull --rebase
npm install
npm stop
npm start
