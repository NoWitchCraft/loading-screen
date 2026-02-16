# Configuration Guide - Loading Screen System

Complete reference for all settings and configuration options.

## Table of Contents

1. [Global Settings](#global-settings)
2. [Scene Settings](#scene-settings)
3. [Advanced Configuration](#advanced-configuration)
4. [Configuration Files](#configuration-files)

## Global Settings

Access via: **Settings** → **Module Settings** → **Loading Screen System**

### Enable Loading Screen

**Type**: Boolean (Checkbox)  
**Default**: ✅ Enabled  
**Requires Reload**: Yes

**Description**: Master switch to enable/disable the loading screen system.

**Values**:

- ✅ Enabled: Loading screens appear when switching scenes
- ❌ Disabled: Default Foundry loading popup is used

**Usage**:

```
Disable temporarily: Uncheck → Save → Reload
Re-enable: Check → Save → Reload
```

**When to Disable**:

- Troubleshooting conflicts
- Testing other modules
- Performance debugging

---

### Loading Screen Design

**Type**: Dropdown (String)  
**Default**: `standard`  
**Requires Reload**: No

**Description**: Choose the visual template/theme for the loading screen.

**Options**:

- `standard` - Standard (Original)
- `minimalist` - Minimalist
- `cinematic` - Cinematic
- `fantasy` - Fantasy/RPG

**Usage**:

```
Select template → Save → Switch scene to see change
```

**Technical**:

```javascript
// Get current template
game.settings.get("loading-screen", "template");

// Set template programmatically
await game.settings.set("loading-screen", "template", "cinematic");
```

See [Template Guide](TEMPLATES.md) for template details.

---

### Default Image Folder

**Type**: String (Folder Picker)  
**Default**: Empty string `""`  
**Requires Reload**: No

**Description**: Default folder path for loading screen images. Used as fallback when scene has no specific folder.

**Format**:

```
worlds/my-world/images/loading
worlds/campaign-name/assets/loading-screens
modules/my-content/images/loading
```

**Path Types**:

- Relative: `worlds/my-world/images`
- Data path: `worlds/...` (recommended)

**Behavior**:

- **With images**: Random image selected from folder
- **Empty folder**: Uses scene background
- **Invalid path**: Uses scene background
- **Not set**: Uses scene background

**Usage**:

```
1. Click 📁 folder icon
2. Navigate to your folder
3. Select folder
4. Click OK
5. Save settings
```

**Technical**:

```javascript
// Get default folder
game.settings.get("loading-screen", "imageFolder");

// Set folder
await game.settings.set(
  "loading-screen",
  "imageFolder",
  "worlds/my-world/images/loading",
);
```

---

### Custom Text

**Type**: String (Text Input)  
**Default**: `"Loading New Scene"`  
**Requires Reload**: No

**Description**: Main text displayed during loading.

**Max Length**: Recommended 50 characters  
**Line Breaks**: Not supported  
**HTML**: Not supported

**Examples**:

```
"Loading..."
"Preparing Adventure"
"Entering Chapter 3"
"Please Wait..."
"Loading Campaign World"
```

**Localization**:

- Default is localized (EN/DE)
- Custom text overrides localization
- Use localization keys for multilingual

**Technical**:

```javascript
// Get custom text
game.settings.get("loading-screen", "customText");

// Set custom text
await game.settings.set("loading-screen", "customText", "Entering the Dungeon");
```

---

### Show Progress Bar

**Type**: Boolean (Checkbox)  
**Default**: ✅ Enabled  
**Requires Reload**: No

**Description**: Display animated progress bar during loading.

**Behavior**:

- ✅ Enabled: Progress bar animates from 0% to 90%
- ❌ Disabled: No progress bar shown

**Performance**:

- Minimal impact
- Pure CSS animation

**Template Support**:

- All templates have custom progress designs
- Automatically adapts to template

**Technical**:

```javascript
// Check if enabled
game.settings.get("loading-screen", "showProgress");

// Toggle
await game.settings.set("loading-screen", "showProgress", false);
```

---

### Fade Duration

**Type**: Number (Range Slider)  
**Range**: 0.1 - 3.0 seconds  
**Step**: 0.1  
**Default**: 0.5 seconds  
**Requires Reload**: No

**Description**: Duration of fade-in and fade-out animations.

**Values**:

- `0.1` - Very fast (instant)
- `0.5` - Default (smooth)
- `1.0` - Slow (cinematic)
- `3.0` - Very slow (dramatic)

**Affects**:

- Initial fade-in when loading starts
- Final fade-out when loading completes

**Recommendations**:

- Fast loads: 0.3s
- Normal: 0.5s
- Cinematic: 1.0-1.5s
- Horror: 1.5-3.0s

**Technical**:

```javascript
// Get fade duration
game.settings.get("loading-screen", "fadeDuration");

// Set fade duration
await game.settings.set("loading-screen", "fadeDuration", 1.0);
```

**CSS Variable**:

```css
--fade-duration: [value]s;
```

---

### Show Tips

**Type**: Boolean (Checkbox)  
**Default**: ✅ Enabled  
**Requires Reload**: No

**Description**: Display rotating tips during loading.

**Behavior**:

- ✅ Enabled: Tips shown and rotate
- ❌ Disabled: No tips shown

**Tip Source Priority**:

1. Custom tips (if set)
2. Default tips (language-based)

**Performance**: Minimal impact

**Technical**:

```javascript
// Check if enabled
game.settings.get("loading-screen", "showTips");

// Toggle
await game.settings.set("loading-screen", "showTips", false);
```

---

### Tip Rotation

**Type**: Number (Range Slider)  
**Range**: 3 - 15 seconds  
**Step**: 1  
**Default**: 5 seconds  
**Requires Reload**: No

**Description**: How often tips change during loading.

**Values**:

- `3` - Fast rotation (variety)
- `5` - Default (balanced)
- `10` - Slow rotation (readable)
- `15` - Very slow (detailed reading)

**Affects**: Only active during loading

**Recommendations**:

- Short tips: 3-5s
- Long tips: 8-12s
- Detailed tips: 12-15s

**Technical**:

```javascript
// Get rotation interval
game.settings.get("loading-screen", "tipRotation");

// Set rotation
await game.settings.set("loading-screen", "tipRotation", 8);
```

---

### Custom Tips

**Type**: Menu (Button → Dialog)  
**Storage**: String (Hidden Setting)  
**Default**: Empty string `""`  
**Requires Reload**: No

**Description**: Click button to open editor for custom tips.

**Format**:

```
One tip per line
Another tip here
Pro Tip: Use this feature
```

**Button**: "Edit Tips" / "Tipps bearbeiten"

**Behavior**:

- Empty: Uses default tips
- With content: Overrides default tips
- One tip per line
- Empty lines ignored

**Editor**:

- Large textarea (20 rows)
- Monospace font
- Resizable dialog
- Save button

**Technical**:

```javascript
// Get custom tips (raw string)
game.settings.get("loading-screen", "customTips");

// Set custom tips
await game.settings.set("loading-screen", "customTips", "Tip 1\nTip 2\nTip 3");

// Parse tips
const tips = game.settings
  .get("loading-screen", "customTips")
  .split("\n")
  .filter((tip) => tip.trim() !== "");
```

See [Tips Guide](TIPS.md) for details.

---

## Scene Settings

Access via: **Scene Config** → **Loading Screen** tab

### Scene Image Folder

**Type**: String (Folder Picker)  
**Default**: Empty string `""`  
**Scope**: Per-scene  
**Requires Reload**: No

**Description**: Override default folder for this specific scene.

**Storage**: Game Setting (not scene flags)

**Behavior**:

- **Set**: Uses this folder for the scene
- **Empty**: Falls back to default folder
- **Priority**: Scene folder > Default folder > Scene background

**Usage**:

```
1. Open Scene Config
2. Go to "Loading Screen" tab
3. Click 📁 folder icon
4. Select folder
5. Save scene
```

**Example Setup**:

```
Scene: "Dark Dungeon" → worlds/my-world/images/dungeon
Scene: "Sunny Town" → worlds/my-world/images/town
Scene: "Deep Forest" → worlds/my-world/images/forest
```

**Technical**:

```javascript
// Get scene folders object
const sceneFolders = game.settings.get("loading-screen", "sceneFolders");

// Get folder for specific scene
const folder = sceneFolders[sceneId];

// Set folder for scene
sceneFolders[sceneId] = "worlds/my-world/images/dungeon";
await game.settings.set("loading-screen", "sceneFolders", sceneFolders);
```

**Storage Format**:

```json
{
  "sceneId1": "worlds/my-world/images/dungeon",
  "sceneId2": "worlds/my-world/images/town",
  "sceneId3": "worlds/my-world/images/forest"
}
```

---

## Advanced Configuration

### Programmatic Access

**Get All Settings**:

```javascript
const settings = {
  enabled: game.settings.get("loading-screen", "enabled"),
  template: game.settings.get("loading-screen", "template"),
  imageFolder: game.settings.get("loading-screen", "imageFolder"),
  sceneFolders: game.settings.get("loading-screen", "sceneFolders"),
  customText: game.settings.get("loading-screen", "customText"),
  showProgress: game.settings.get("loading-screen", "showProgress"),
  fadeDuration: game.settings.get("loading-screen", "fadeDuration"),
  showTips: game.settings.get("loading-screen", "showTips"),
  tipRotation: game.settings.get("loading-screen", "tipRotation"),
  customTips: game.settings.get("loading-screen", "customTips"),
};
```

**Set Multiple Settings**:

```javascript
await game.settings.set("loading-screen", "template", "cinematic");
await game.settings.set("loading-screen", "fadeDuration", 1.5);
await game.settings.set(
  "loading-screen",
  "customText",
  "Entering the Darkness",
);
```

### Macro Integration

**Simple Scene-Specific Folder**:

```javascript
// Set folder for current scene
const sceneId = canvas.scene.id;
const sceneFolders = game.settings.get("loading-screen", "sceneFolders");
sceneFolders[sceneId] = "worlds/my-world/images/special";
await game.settings.set("loading-screen", "sceneFolders", sceneFolders);
ui.notifications.info("Loading screen folder updated!");
```

**Batch Set Scene Folders**:

```javascript
const config = {
  "Scene Name 1": "worlds/my-world/images/dungeon",
  "Scene Name 2": "worlds/my-world/images/town",
  "Scene Name 3": "worlds/my-world/images/forest",
};

const sceneFolders = game.settings.get("loading-screen", "sceneFolders");
for (const [name, folder] of Object.entries(config)) {
  const scene = game.scenes.getName(name);
  if (scene) sceneFolders[scene.id] = folder;
}
await game.settings.set("loading-screen", "sceneFolders", sceneFolders);
```

**Dynamic Custom Text**:

```javascript
// Set text based on time of day
const hour = new Date().getHours();
const text =
  hour < 12
    ? "Good Morning, Adventurers!"
    : hour < 18
      ? "Good Afternoon!"
      : "Good Evening!";
await game.settings.set("loading-screen", "customText", text);
```

### Reset to Defaults

**Single Setting**:

```javascript
await game.settings.set("loading-screen", "template", "standard");
```

**All Settings**:

```javascript
await game.settings.set("loading-screen", "enabled", true);
await game.settings.set("loading-screen", "template", "standard");
await game.settings.set("loading-screen", "imageFolder", "");
await game.settings.set("loading-screen", "sceneFolders", {});
await game.settings.set(
  "loading-screen",
  "customText",
  game.i18n.localize("LOADING_SCREEN.DefaultText"),
);
await game.settings.set("loading-screen", "showProgress", true);
await game.settings.set("loading-screen", "fadeDuration", 0.5);
await game.settings.set("loading-screen", "showTips", true);
await game.settings.set("loading-screen", "tipRotation", 5);
await game.settings.set("loading-screen", "customTips", "");
ui.notifications.info("Loading Screen reset to defaults!");
```

---

## Configuration Files

### Settings Storage

**Location**: World database (not files)  
**Format**: JSON  
**Scope**: World-level (not client)

**Export Settings** (Manual):

```javascript
const settings = {
  enabled: game.settings.get("loading-screen", "enabled"),
  template: game.settings.get("loading-screen", "template"),
  imageFolder: game.settings.get("loading-screen", "imageFolder"),
  sceneFolders: game.settings.get("loading-screen", "sceneFolders"),
  customText: game.settings.get("loading-screen", "customText"),
  showProgress: game.settings.get("loading-screen", "showProgress"),
  fadeDuration: game.settings.get("loading-screen", "fadeDuration"),
  showTips: game.settings.get("loading-screen", "showTips"),
  tipRotation: game.settings.get("loading-screen", "tipRotation"),
  customTips: game.settings.get("loading-screen", "customTips"),
};
console.log(JSON.stringify(settings, null, 2));
// Copy from console and save to file
```

**Import Settings** (Manual):

```javascript
const settings = {
  /* paste your exported settings */
};

for (const [key, value] of Object.entries(settings)) {
  await game.settings.set("loading-screen", key, value);
}
ui.notifications.info("Settings imported!");
```

### Localization Files

**Location**: `lang/`

- `en.json` - English
- `de.json` - German

**Structure**:

```json
{
  "LOADING_SCREEN": {
    "SettingName": "Display Name",
    "SettingNameHint": "Description text"
  }
}
```

**Adding Languages**:

1. Copy `en.json`
2. Translate all strings
3. Save as `[lang-code].json`
4. Update `module.json`

---

## Best Practices

### Setting Recommendations

**For Performance**:

```javascript
showProgress: true; // Minimal impact
showTips: false; // Slightly faster
fadeDuration: 0.3; // Quick
```

**For Immersion**:

```javascript
template: 'cinematic' or 'fantasy'
fadeDuration: 1.0-1.5
showTips: true
customText: Campaign-specific
```

**For Simplicity**:

```javascript
template: "minimalist";
showProgress: false;
showTips: false;
```

### Backup Strategy

**Before Major Changes**:

1. Export settings (console)
2. Save to file
3. Make changes
4. Test
5. Import backup if needed

**Scene Folders**:

- Document your folder structure
- Keep folder paths consistent
- Use relative paths

---

## Troubleshooting

### Settings Not Saving

**Problem**: Changes don't persist

**Solutions**:

1. Check permissions (must be GM)
2. Verify world is unlocked
3. Clear browser cache
4. Check console for errors

### Settings Not Applied

**Problem**: Changes don't take effect

**Solutions**:

1. Hard reload (Ctrl+F5)
2. Check "Enabled" is ✅
3. Switch scenes to trigger
4. Verify setting value in console

### Lost Settings

**Problem**: Settings reset to defaults

**Solutions**:

1. Check world database integrity
2. Restore from backup
3. Reimport saved settings
4. Contact support with console logs

---

## Reference Tables

### Setting Keys

| Display Name          | Key            | Type    | Default      |
| --------------------- | -------------- | ------- | ------------ |
| Enable Loading Screen | `enabled`      | Boolean | `true`       |
| Loading Screen Design | `template`     | String  | `'standard'` |
| Default Image Folder  | `imageFolder`  | String  | `''`         |
| Scene Folders         | `sceneFolders` | Object  | `{}`         |
| Custom Text           | `customText`   | String  | (localized)  |
| Show Progress Bar     | `showProgress` | Boolean | `true`       |
| Fade Duration         | `fadeDuration` | Number  | `0.5`        |
| Show Tips             | `showTips`     | Boolean | `true`       |
| Tip Rotation          | `tipRotation`  | Number  | `5`          |
| Custom Tips           | `customTips`   | String  | `''`         |

### Template Values

| Display             | Value          |
| ------------------- | -------------- |
| Standard (Original) | `'standard'`   |
| Minimalist          | `'minimalist'` |
| Cinematic           | `'cinematic'`  |
| Fantasy/RPG         | `'fantasy'`    |

---

**Need help?** See [Troubleshooting Guide](TROUBLESHOOTING.md) or open an [issue on GitHub](https://github.com/NoWitchCraft/loading-screen/issues).
