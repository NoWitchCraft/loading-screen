# User Guide - Loading Screen System

Complete guide for using the Loading Screen System module.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Configuration](#basic-configuration)
3. [Template Selection](#template-selection)
4. [Image Management](#image-management)
5. [Scene-Specific Settings](#scene-specific-settings)
6. [Custom Tips](#custom-tips)
7. [Advanced Usage](#advanced-usage)

## Getting Started

### First Time Setup

After installing and enabling the module:

1. **Open Module Settings**
   - Click ⚙️ (Settings)
   - Navigate to **Module Settings**
   - Find "Loading Screen System"

2. **Verify Module is Active**
   - Check "Enable Loading Screen" is ✅
   - Default settings should work out of the box

3. **Test It**
   - Switch to any scene
   - You should see the loading screen!

### What You'll See

The loading screen replaces Foundry's default loading popup with:
- Full-screen background image (scene background or custom)
- Custom loading text
- Animated progress bar
- Rotating tips (helpful hints)
- Beautiful fade-in/out animations

## Basic Configuration

### Module Settings Overview

Navigate to **Settings** → **Module Settings** → **Loading Screen System**

#### Enable Loading Screen
- **What it does**: Turns the module on/off
- **Default**: ✅ Enabled
- **Note**: Requires reload when changed

#### Loading Screen Design
- **What it does**: Choose your template/theme
- **Options**:
  - Standard (Original)
  - Minimalist
  - Cinematic
  - Fantasy/RPG
- **Default**: Standard
- See [Template Guide](TEMPLATES.md) for details

#### Default Image Folder
- **What it does**: Set the fallback folder for loading images
- **Format**: Path like `worlds/my-world/images/loading`
- **Default**: Empty (uses scene backgrounds)
- Click 📁 to browse for a folder

#### Custom Text
- **What it does**: Main text shown during loading
- **Default**: "Loading New Scene"
- **Examples**:
  - "Preparing Adventure..."
  - "Loading Chapter 3"
  - "Entering the Dungeon"

#### Show Progress Bar
- **What it does**: Display animated progress bar
- **Default**: ✅ Enabled
- **Tip**: Disable for minimal designs

#### Fade Duration
- **What it does**: How long fade-in/out lasts
- **Range**: 0.1 - 3.0 seconds
- **Default**: 0.5 seconds
- **Tip**: Lower = snappier, Higher = smoother

#### Show Tips
- **What it does**: Display rotating tips
- **Default**: ✅ Enabled
- **Note**: Tips change based on Tip Rotation setting

#### Tip Rotation
- **What it does**: How often tips change
- **Range**: 3 - 15 seconds
- **Default**: 5 seconds
- **Tip**: Lower for variety, Higher to read comfortably

## Template Selection

### Available Templates

#### 1. Standard (Default)
**Visual Style:**
- Full background image with blur
- Centered white text with glow
- Blue shimmer progress bar
- Tips in dark box with 💡 icon

**Best For:**
- Universal use
- All game systems
- First-time users

**Settings:**
```
Loading Screen Design → Standard (Original)
```

#### 2. Minimalist
**Visual Style:**
- Heavily dimmed grayscale background
- Large, thin typography
- Ultra-thin white progress line
- Minimal bottom tips

**Best For:**
- Modern systems
- Clean aesthetic
- Less distraction

**Settings:**
```
Loading Screen Design → Minimalist
```

#### 3. Cinematic
**Visual Style:**
- High contrast background
- Vignette edges
- Large glowing titles
- Dramatic overlays

**Best For:**
- Dark Fantasy (Warhammer, Symbaroum)
- Horror (Call of Cthulhu)
- Sci-Fi (Star Wars, Alien)
- Gritty settings

**Settings:**
```
Loading Screen Design → Cinematic
```

#### 4. Fantasy/RPG
**Visual Style:**
- Beige parchment scroll
- Brown/gold medieval accents
- Ornaments (⚔️ ◆ ✦)
- "Entering: [Location]" style

**Best For:**
- D&D 5e
- Pathfinder
- Medieval Fantasy
- Classic RPGs

**Settings:**
```
Loading Screen Design → Fantasy/RPG
```

### Changing Templates

1. **Module Settings** → **Loading Screen Design**
2. Select from dropdown
3. Click **Save**
4. Switch scenes to see the new design

**Tip**: Try different templates to find your favorite!

## Image Management

### Folder Structure

Recommended organization:

```
worlds/
└── my-world/
    └── images/
        └── loading/
            ├── default/        (General images)
            │   ├── loading1.jpg
            │   ├── loading2.jpg
            │   └── loading3.jpg
            ├── dungeon/        (Scene-specific)
            │   ├── dungeon1.jpg
            │   └── dungeon2.jpg
            ├── city/
            │   ├── city1.jpg
            │   └── city2.jpg
            └── wilderness/
                └── forest1.jpg
```

### Setting Default Folder

1. **Prepare Images**
   - Create folder in your world's data
   - Add images (JPG, PNG, WEBP, GIF)
   - Recommended: 1920x1080px or similar

2. **Configure in Settings**
   - **Module Settings** → **Default Image Folder**
   - Click 📁 folder icon
   - Navigate to your folder
   - Select it
   - Click **Save**

3. **Test**
   - Switch scenes
   - Random image from folder appears

### Image Selection Behavior

**Multiple Images:**
- Random image selected on each load
- Different image each time (when possible)
- Provides variety

**Single Image:**
- Same image always shown
- Consistent experience

**No Images:**
- Falls back to scene background
- Always has something to show

### Supported Formats

- ✅ JPEG/JPG
- ✅ PNG
- ✅ WEBP
- ✅ GIF (static frames)

### Image Tips

**Size:**
- Recommended: 1920x1080px (Full HD)
- Maximum: 4K (for performance)
- Minimum: 1280x720px

**Optimization:**
- Compress large files
- Use JPG for photos (smaller size)
- Use PNG for graphics with transparency
- Use WEBP for best compression

**Quantity:**
- 3-5 images per folder is ideal
- Too many = longer to pick random
- Too few = repetitive

## Scene-Specific Settings

### Accessing Scene Settings

**Method 1: Scene Config**
1. Right-click scene in Scenes sidebar
2. Click **Configure**
3. Navigate to **Loading Screen** tab

**Method 2: Scene Sheet**
1. Double-click scene
2. Click Configure (⚙️)
3. Go to **Loading Screen** tab

### Scene Loading Screen Tab

**Fields:**

#### Image Folder for this Scene
- **Purpose**: Override default folder for this scene
- **Format**: Path to folder
- **Leave Empty**: Uses default folder
- **Click 📁**: Browse for folder

**Example Setup:**
```
Scene: "Dark Dungeon"
Image Folder: worlds/my-world/images/loading/dungeon

Scene: "Bright City"
Image Folder: worlds/my-world/images/loading/city
```

### Workflow Example

**Setting up themed scenes:**

1. **Create Folders**
   ```
   loading/
   ├── dungeon/
   ├── city/
   └── forest/
   ```

2. **Add Appropriate Images**
   - dungeon/ → dark, stone, torch-lit images
   - city/ → buildings, streets, NPCs
   - forest/ → trees, nature, wildlife

3. **Configure Each Scene**
   - Dungeon scenes → dungeon folder
   - City scenes → city folder
   - Forest scenes → forest folder

4. **Result**
   - Scene changes feel thematic
   - Immersion maintained during loading
   - Professional presentation

## Custom Tips

### Editing Custom Tips

1. **Access Editor**
   - **Module Settings** → **Loading Screen System**
   - Find "Custom Tips"
   - Click **Edit Tips** button

2. **Enter Your Tips**
   - Large text area opens
   - One tip per line
   - Enter key = new line
   - Type naturally

3. **Save**
   - Click **Save** button
   - Dialog closes
   - Tips are active immediately

### Tip Format

**Simple Format:**
```
Tip: Remember to check for traps!
Tip: Your wizard has 2 spell slots left
Pro Tip: Use inspiration wisely
```

**One Per Line:**
```
Stay hydrated during the session
Check your passive perception score
Don't forget about your bonus action
```

**Campaign-Specific:**
```
The BBEG is weak against fire
Session 5 is the finale!
You have 3 healing potions in inventory
```

### Default Tips

**English:**
- Foundry VTT shortcuts
- Useful features
- General game tips
- 15 tips total

**German:**
- Same content, translated
- Automatically used for German users

### Tips Best Practices

**Length:**
- ✅ Short: "Use Ctrl+S to save"
- ❌ Too Long: "In order to properly utilize the functionality..."

**Clarity:**
- ✅ Clear: "Double-click tokens to open sheets"
- ❌ Vague: "That thing you can do with those"

**Relevance:**
- ✅ Useful: "Next session: Big boss fight!"
- ❌ Random: "The weather is nice today"

**Variety:**
- ✅ 5-10 different tips
- ❌ Just 1-2 tips (gets repetitive)

### Tip Rotation

Tips automatically rotate during long loads:
- Default: Every 5 seconds
- Configurable: 3-15 seconds
- Smooth fade transition
- Random selection

**Adjust Rotation Speed:**
```
Settings → Tip Rotation → Slider (3-15 sec)
```

## Advanced Usage

### Combining Features

**Example 1: Themed Campaign**
```
Settings:
- Template: Fantasy/RPG
- Default Folder: worlds/dnd/loading/general
- Custom Text: "Adventure Awaits"
- Show Tips: ✅
- Custom Tips: Campaign-specific hints

Scenes:
- Dungeon scenes: dungeon/ folder
- Town scenes: town/ folder
- Wilderness: forest/ folder
```

**Example 2: Minimalist Modern**
```
Settings:
- Template: Minimalist
- Default Folder: worlds/cyberpunk/loading
- Custom Text: "Loading..."
- Show Progress: ✅
- Show Tips: ❌ (clean look)
```

**Example 3: Horror Campaign**
```
Settings:
- Template: Cinematic
- Default Folder: worlds/cthulhu/loading
- Custom Text: "Entering the Unknown"
- Fade Duration: 1.5s (slow, ominous)
- Tips: Atmospheric hints only
```

### Performance Optimization

**For Large Worlds:**
- Use compressed images (WEBP)
- Limit folder size to 10-15 images
- Keep images under 2MB each

**For Slower Connections:**
- Use smaller images (1280x720)
- Fewer images per folder
- JPG over PNG

**For Fast Loads:**
- Lower fade duration (0.3s)
- Disable progress bar
- Disable tips

### Accessibility

**For Vision Impairment:**
- Use high contrast templates (Cinematic)
- Increase fade duration for reading time
- Use clear, simple custom text

**For Slow Reading:**
- Increase tip rotation (10-15s)
- Use shorter tips
- Focus on icons/visual cues

### Troubleshooting

See [Troubleshooting Guide](TROUBLESHOOTING.md) for:
- Common issues
- Error messages
- Performance problems
- Compatibility fixes

## Quick Reference

### Keyboard Shortcuts
- None (automatic on scene change)

### File Paths
```
Default Location: worlds/[world-name]/images/loading
Templates: modules/loading-screen/templates/loading-screens/
Config: Settings → Module Settings → Loading Screen System
```

### Common Tasks

| Task | Steps |
|------|-------|
| Change template | Settings → Loading Screen Design → Select → Save |
| Add images | Create folder → Add images → Settings → Set folder |
| Edit tips | Settings → Custom Tips → Edit Tips → Type → Save |
| Per-scene folder | Scene Config → Loading Screen tab → Set folder |
| Disable module | Settings → Enable Loading Screen → Uncheck |

## Next Steps

- **[Template Guide](TEMPLATES.md)** - Deep dive into templates
- **[Configuration](CONFIGURATION.md)** - All settings explained
- **[Tips Guide](TIPS.md)** - Advanced tips usage
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues

---

**Need help?** Check the [Troubleshooting Guide](TROUBLESHOOTING.md) or open an [issue on GitHub](https://github.com/yourusername/loading-screen/issues).