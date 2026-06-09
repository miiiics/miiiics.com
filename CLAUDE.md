# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static single-page website hosted on GitHub Pages at `miiiics.com` (configured via the `CNAME` file). There is no build step, no framework, and no package manager — the entire site is `index.html` plus assets.

## Deployment

Changes pushed to the `main` branch are automatically deployed by GitHub Pages. There is no CI pipeline or build process to run.

## Structure

- `index.html` — the entire site
- `assets/lemonke.png` — the main image displayed full-screen
- `assets/uhoh.mp3` — audio asset
- `assets/favicon_io/` — favicon files in various sizes plus `site.webmanifest`
- `CNAME` — GitHub Pages custom domain (`miiiics.com`)

## Development

Open `index.html` directly in a browser to preview. No server required — all paths are relative.
