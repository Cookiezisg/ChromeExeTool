# Pin Workflow Initializer

A Chrome extension that helps you instantly initialize your daily workflow by setting up your essential pinned websites with a single keyboard shortcut.

## Purpose

Designed for professionals who:

- Start their day with the same set of essential websites
- Want these sites consistently pinned and organized
- Need quick access to their daily tools and resources
- Value a clean and organized browser workspace

## Features

- Initialize your workflow with a single shortcut (Alt+Shift+C)
- Customize your essential pinned websites
- Maintain consistent website order
- Clean slate start - removes existing tabs
- Configurable through an easy-to-use interface
- Settings sync across your devices

## Installation

1. Open Chrome Extensions page (`chrome://extensions/`)
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `pin_workflow_initializer` directory

## Usage

### Quick Workflow Initialization

1. Press `Alt+Shift+C` to:
   - Clear your current browser state
   - Initialize your essential pinned websites
   - Open a fresh new tab

### Configure Your Workflow

1. Right-click the extension icon
2. Select "Options"
3. In the configuration page, you can:
   - Add essential websites to your workflow
   - Remove websites from the workflow
   - Reorder websites using arrows
   - Save your configuration

### Configure Keyboard Shortcut

1. Go to Chrome Extensions page (`chrome://extensions/`)
2. Click "Keyboard shortcuts" at the bottom of the page
3. Find "Pin Workflow Initializer"
4. Set the shortcut for "Initialize Workflow" (default is Alt+Shift+C)
   - Click the input box
   - Press your desired key combination
   - Click "OK" to save

## Default Workflow

The extension comes pre-configured with these essential tools:

- Gmail (Communication)
- Google Calendar (Schedule)
- Google Drive (Documents)
- Confluence (Documentation)
- Datasuite Studio (Data Analysis)
- Datasuite Datamap (Data Management)

Customize this list to match your daily workflow needs.

## Technical Details

- Chrome Storage Sync API for cross-device workflow persistence
- Chrome Commands API for quick initialization
- Built with Manifest V3
- No external dependencies

## Tips

- Your workflow configuration syncs with your Google account
- Changes take effect immediately
- The order in configuration determines the pinned tab order
- Add only essential websites that you need daily
- Keep your workflow focused and efficient
