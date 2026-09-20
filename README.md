# Slash to N Remapper

A Chrome extension that remaps the `/` key to `n`/`N`, optimized for Discord and other rich text editors.

## Features
- Remaps `/` to `n` (or `N` when Shift or CapsLock is active).
- Optimized for Discord and rich text editors using `stopImmediatePropagation()`.
- Supports standard input/textarea controls and contentEditable elements.

## Installation (Unpacked)
1. Open Google Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** in the top right.
3. Click **Load unpacked** in the top left.
4. Select this directory.

## GitHub Actions & Downloading Extension Zip
The included GitHub Actions workflow automatically builds `extension.zip` on push or pull request.
To download the compiled extension zip:
1. Go to the **Actions** tab in the GitHub repository.
2. Select the latest workflow run.
3. Scroll down to **Artifacts** and download `extension-zip`.
