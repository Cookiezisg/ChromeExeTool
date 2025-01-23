# Pin Workflow Initializer

A powerful Chrome extension that helps you instantly organize your workspace by managing pinned tabs across windows with a single click or keyboard shortcut.

## 🎯 Purpose

Perfect for professionals who:

- Need quick access to multiple essential websites daily
- Want to maintain a clean and organized browser workspace
- Prefer a consistent tab layout across browser sessions
- Work with multiple Chrome windows but want centralized tab management

## ✨ Key Features

- **One-Click Initialization**: Instantly set up your workspace via icon click or keyboard shortcut
- **Smart Window Management**: Automatically consolidates all tabs into your active window
- **Customizable Workflow**: Fully configurable list of pinned websites
- **Cross-Device Sync**: Settings sync across all your Chrome instances
- **Clean Slate Start**: Efficiently cleans up existing tabs before initialization
- **Keyboard First**: Quick access via Alt+Shift+C (customizable)

## 🚀 Installation

1. Open Chrome Extensions page (`chrome://extensions/`)
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `pin_workflow_initializer` directory

## 💡 Usage

### Quick Start

- **Click Method**: Click the extension icon in your toolbar
- **Keyboard Method**: Press `Alt+Shift+C`

Either method will:

1. Close all other Chrome windows
2. Clean up tabs in your active window
3. Initialize your pinned websites
4. Open a fresh new tab

### Customize Your Workflow

1. Right-click the extension icon
2. Select "Options"
3. In the configuration page, you can:
   - Add/remove websites
   - Reorder websites using arrows
   - Save your configuration

### Customize Keyboard Shortcut

1. Visit `chrome://extensions/shortcuts`
2. Find "Pin Workflow Initializer"
3. Click the input box next to "Initialize Workflow"
4. Press your desired key combination
5. The change saves automatically

## 📌 Default Configuration

The extension comes pre-configured with essential productivity tools:

- Gmail - Email communication
- Google Calendar - Schedule management
- Google Drive - Document access

## 🔧 Technical Details

- Built with Chrome Extension Manifest V3
- Uses Chrome Storage Sync API for settings persistence
- Implements Chrome Commands API for keyboard shortcuts
- Utilizes Chrome Windows and Tabs APIs for window management
- Zero external dependencies

## 💪 Best Practices

- **Window Management**: Always operates from your currently active window
- **Tab Order**: Maintains consistent order of pinned tabs as configured
- **Clean Workspace**: Automatically removes existing tabs to prevent clutter
- **Quick Access**: New tab always opens after pinned tabs for easy navigation

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

[MIT License](LICENSE)

---

Sun, Weilin
