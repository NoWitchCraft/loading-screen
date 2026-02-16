# Loading Screen System

A professional, customizable loading screen system for Foundry VTT that replaces the default loading popup with beautiful, themed loading screens.

![Foundry VTT](https://img.shields.io/badge/Foundry%20VTT-11%2B-green)
![Version](https://img.shields.io/badge/version-2.3.0-blue)
![License](https://img.shields.io/badge/license-Apache%202.0-orange)

## ✨ Features

### 🎨 **Multiple Professional Templates**

Choose from 4 beautiful pre-designed templates:

- **Standard** - Classic design with shimmer effects
- **Minimalist** - Clean, modern aesthetic
- **Cinematic** - Dramatic, film-inspired design
- **Fantasy/RPG** - Parchment scroll with medieval ornaments

### 🖼️ **Scene-Specific Image Folders**

- Set different image folders for each scene
- Random image selection from folders
- Automatic fallback to default folder
- Support for multiple images with rotation

### 💡 **Smart Tips System**

- Rotating tips during loading
- Customizable tip rotation interval (3-15 seconds)
- Built-in tips in English and German
- Add your own custom tips easily

### 📊 **Animated Progress Bar**

- Beautiful shimmer animation
- Smooth progress indication
- Template-specific designs
- Optional (can be disabled)

### ⚙️ **Highly Customizable**

- Custom loading text
- Adjustable fade duration
- Scene-specific configurations
- Template selection per preference

### 🌍 **Multilingual**

- English
- German (Deutsch)
- Easy to add more languages

### 🔧 **Technical Excellence**

- lib-wrapper integration for compatibility
- Scene Config tab integration
- Clean, modular code structure
- Foundry VTT V11-V13 compatible

## 📦 Installation

### Method 1: Manifest URL

1. In Foundry VTT, go to **Add-on Modules**
2. Click **Install Module**
3. Paste the Manifest URL:

```
https://github.com/NoWitchCraft/loading-screen/releases/latest/download/module.json
```

4. Click **Install**

### Method 2: Manual Installation

1. Download the latest release from [Releases](https://github.com/yourusername/loading-screen/releases)
2. Extract the zip file to your `Data/modules` folder
3. Restart Foundry VTT
4. Enable the module in your world

## 🚀 Quick Start

### 1. Basic Setup (30 seconds)

1. Enable the module in your world
2. Go to **Module Settings** → **Loading Screen System**
3. Choose your favorite template
4. Done! Loading screens now appear when switching scenes

### 2. Add Custom Images (2 minutes)

1. Create a folder: `worlds/your-world/images/loading/`
2. Add some images (JPG, PNG, WEBP, GIF)
3. **Module Settings** → **Default Image Folder**
4. Select your folder
5. Switch scenes to see your images!

### 3. Scene-Specific Images (Optional)

1. Open a scene: **Right-click** → **Configure**
2. Go to **Loading Screen** tab
3. Set a custom folder for this scene
4. Save

See the [Documentation](docs/USER-GUIDE.md) for detailed instructions.

## 📚 Documentation

- **[User Guide](docs/USER-GUIDE.md)** - Complete usage instructions
- **[Template Guide](docs/TEMPLATES.md)** - Template system documentation
- **[Configuration](docs/CONFIGURATION.md)** - Settings reference
- **[Tips Guide](docs/TIPS.md)** - Custom tips instructions
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🎨 Templates Preview

### Standard Template

Classic design with full background image, centered text, and shimmer progress bar.

- Best for: Universal use, all game systems

### Minimalist Template

Reduced to essentials with grayscale background and thin progress line.

- Best for: Modern, clean game systems

### Cinematic Template

Dramatic design with vignette effects and glowing elements.

- Best for: Dark Fantasy, Horror, Sci-Fi, Star Wars

### Fantasy/RPG Template

Parchment scroll with medieval ornaments and decorations.

- Best for: D&D, Pathfinder, Medieval Fantasy

## 🔧 Configuration

### Global Settings

Navigate to **Module Settings** → **Loading Screen System**:

| Setting               | Description                   | Default             |
| --------------------- | ----------------------------- | ------------------- |
| Enable Loading Screen | Turn the module on/off        | ✅ On               |
| Loading Screen Design | Choose template               | Standard            |
| Default Image Folder  | Fallback image folder         | (empty)             |
| Custom Text           | Main loading text             | "Loading New Scene" |
| Show Progress Bar     | Display progress              | ✅ On               |
| Fade Duration         | Animation speed (seconds)     | 0.5                 |
| Show Tips             | Display tips                  | ✅ On               |
| Tip Rotation          | Tip change interval (seconds) | 5                   |

### Scene-Specific Settings

Configure per scene: **Scene Config** → **Loading Screen** tab:

- **Image Folder**: Custom folder for this scene
- Overrides the default folder when set

### Custom Tips

Click **"Edit Tips"** button in Module Settings:

- One tip per line
- Leave empty to use default tips
- Supports multilingual tips

## 💻 Technical Details

### Requirements

- **Foundry VTT**: Version 11 or higher
- **Verified**: V11, V12, V13

### Dependencies

- None! (includes lib-wrapper shim)

### File Structure

```
loading-screen/
├── scripts/
│   ├── lib/
│   │   └── lib-wrapper-shim.js
│   ├── loading-screen.js      (Main module)
│   ├── scene-config.js        (Scene tab integration)
│   ├── config.js              (Settings dialogs)
│   ├── tips-de.js             (German tips)
│   └── tips-en.js             (English tips)
├── templates/
│   ├── loading-screens/       (Template HTML files)
│   ├── scene-config-tab.html  (Scene config UI)
│   ├── config.html            (Scene folder config)
│   └── custom-tips.html       (Tips editor)
├── styles/
│   └── loading-screen.css     (All styles)
└── lang/
    ├── en.json                (English)
    └── de.json                (German)
```

### lib-wrapper Integration

Uses lib-wrapper for safe Scene Config integration:

- Automatic detection of lib-wrapper
- Built-in shim for standalone use
- No conflicts with other modules

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Adding Translations

1. Copy `lang/en.json`
2. Translate all strings
3. Submit as pull request

### Creating Templates

See [Template Guide](docs/TEMPLATES.md) for instructions on creating custom templates.

## 🐛 Bug Reports

Found a bug? Please report it:

1. Check [existing issues](https://github.com/NoWitchCraft/loading-screen/issues)
2. Create a new issue with:
   - Foundry VTT version
   - Module version
   - Steps to reproduce
   - Console errors (F12)
   - Screenshots if applicable

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

### Latest (v2.3.0)

- ✨ Template system with 4 professional designs
- 🎨 Standard, Minimalist, Cinematic, and Fantasy templates
- 🔧 Improved template selection in settings
- 📚 Complete documentation overhaul

## 📜 License

This module is licensed under the [Apache License 2.0](LICENSE).

## 🙏 Credits

### Inspiration

- **Material Foundry's LockView** - Scene Config integration pattern
- **Foundry VTT Community** - Feedback and testing

### Tools & Libraries

- lib-wrapper shim (LGPL-3.0)
- Foundry VTT API

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/NoWitchCraft/loading-screen/issues)

## 🌟 Show Your Support

If you enjoy this module:

- ⭐ Star this repository
- 🐛 Report bugs and suggest features
- 💬 Share with the community

---

**Made with ❤️ for the Foundry VTT Community**

[Report Bug](https://github.com/NoWitchCraft/loading-screen/issues) • [Request Feature](https://github.com/NoWitchCraft/loading-screen/issues) • [Documentation](docs/)
