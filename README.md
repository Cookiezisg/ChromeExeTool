# Tab Manager Pro

A Chrome extension that helps you quickly reset and organize your browser tabs with a customizable layout.

## Features

- Reset all tabs with a single keyboard shortcut (Alt+Shift+C)
- Customize which websites to pin and their order
- Maintain consistent tab organization across browser sessions
- Easy-to-use configuration interface
- Settings sync across devices

## Installation

1. Open Chrome Extensions page (`chrome://extensions/`)
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the extension directory

## Usage

### Quick Reset

1. Press `Alt+Shift+C` to:
   - Clear all current tabs
   - Open your configured websites as pinned tabs
   - Open a new tab at the end

### Configure Websites

1. Right-click the extension icon
2. Select "Options"
3. In the configuration page, you can:
   - Add new websites
   - Remove websites
   - Reorder websites using up/down arrows
   - Save your changes

## Default Configuration

The extension comes pre-configured with these websites:

- Gmail
- Google Calendar
- Google Drive
- Confluence
- Datasuite Studio
- Datasuite Datamap

You can modify this list in the options page to match your needs.

## Technical Details

- Uses Chrome Storage Sync API for settings persistence
- Implements Chrome Commands API for keyboard shortcuts
- Built with Manifest V3
- No external dependencies

## Tips

- Your settings are synced with your Google account
- Changes take effect immediately after saving
- You can add as many websites as needed
- The order in the configuration determines the order of pinned tabs
