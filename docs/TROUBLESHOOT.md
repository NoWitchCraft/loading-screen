# Troubleshooting Guide - Loading Screen System

Solutions to common problems and issues.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Loading Screen Not Appearing](#loading-screen-not-appearing)
3. [Images Not Loading](#images-not-loading)
4. [Template Issues](#template-issues)
5. [Tips Problems](#tips-problems)
6. [Performance Issues](#performance-issues)
7. [Compatibility Problems](#compatibility-problems)
8. [Error Messages](#error-messages)

## Installation Issues

### Module Not Appearing in List

**Symptoms**: Can't find module in Add-on Modules list

**Solutions**:

1. **Verify Installation**

   ```
   Data/modules/loading-screen/
   └── module.json exists?
   ```

2. **Check Manifest URL**
   - Correct: `https://...module.json`
   - Contains `module.json` at end

3. **Restart Foundry**
   - Close Foundry completely
   - Restart
   - Check again

4. **Manual Installation**
   - Download latest release
   - Extract to `Data/modules/`
   - Folder must be named `loading-screen`

### Module Won't Enable

**Symptoms**: Error when trying to enable module

**Solutions**:

1. **Check Foundry Version**

   ```
   Module requires: V11+
   Your version: Settings → About
   ```

2. **Check for Corruption**
   - Delete module folder
   - Reinstall fresh

3. **Check Dependencies**
   - No dependencies required
   - Should work standalone

4. **Console Errors**
   - Press F12
   - Check Console tab
   - Share errors in GitHub issue

## Loading Screen Not Appearing

### Default Popup Still Shows

**Symptoms**: Old Foundry loading popup instead of module

**Check**:

1. **Module Enabled?**

   ```
   Settings → Manage Modules
   → Loading Screen System ✅
   ```

2. **Setting Enabled?**

   ```
   Settings → Module Settings
   → Loading Screen System
   → Enable Loading Screen ✅
   ```

3. **Reload Required**
   - Some changes need reload
   - Press F5
   - Or reload world

**Solutions**:

```javascript
// Force enable in console
await game.settings.set("loading-screen", "enabled", true);
// Then reload (F5)
```

### Loading Screen Appears Then Disappears

**Symptoms**: Flash of loading screen, then gone

**Possible Causes**:

1. **Very Fast Load**
   - Scene loads instantly
   - Loading screen too brief to see
   - Not actually a problem

2. **Fade Duration Too Fast**

   ```
   Settings → Fade Duration → Increase to 1.0s
   ```

3. **CSS Conflict**
   - Another module hiding it
   - Check console for errors
   - Disable other UI modules to test

### Black Screen Instead of Loading Screen

**Symptoms**: Just black screen during load

**Solutions**:

1. **Check Template**

   ```
   Settings → Loading Screen Design
   → Try "Standard"
   ```

2. **Clear Browser Cache**
   - Ctrl+Shift+Delete
   - Clear cached images and files
   - Hard reload (Ctrl+F5)

3. **Check Console**
   ```
   F12 → Console
   Look for CSS/template errors
   ```

## Images Not Loading

### No Background Image

**Symptoms**: Loading screen appears but no background

**Check**:

1. **Default Folder Set?**

   ```
   Settings → Module Settings
   → Default Image Folder
   → Is it set?
   ```

2. **Folder Has Images?**

   ```
   Navigate to folder in file browser
   Check: JPG, PNG, WEBP, GIF present?
   ```

3. **Folder Path Correct?**

   ```
   Example: worlds/my-world/images/loading
   Not: C:\Users\...\Data\worlds\... (wrong)
   ```

4. **Fallback Working?**
   - Empty folder → uses scene background
   - Scene has background image?

**Solutions**:

```javascript
// Check current folder setting
console.log(game.settings.get("loading-screen", "imageFolder"));

// Check scene folders
console.log(game.settings.get("loading-screen", "sceneFolders"));

// Test with known good path
await game.settings.set(
  "loading-screen",
  "imageFolder",
  "worlds/my-world/images",
);
```

### Wrong Images Loading

**Symptoms**: Images from wrong folder appear

**Check Priority**:

1. Scene-specific folder (highest priority)
2. Default folder
3. Scene background image
4. Fallback clockwork icon (lowest priority)

**Debug**:

```javascript
// Check what's set for current scene
const sceneId = canvas.scene.id;
const sceneFolders = game.settings.get("loading-screen", "sceneFolders");
console.log("Scene folder:", sceneFolders[sceneId]);
console.log(
  "Default folder:",
  game.settings.get("loading-screen", "imageFolder"),
);
```

**Solutions**:

- Clear scene-specific folder if not wanted
- Set correct default folder
- Verify folder paths

### Images Not Randomizing

**Symptoms**: Same image every time

**Causes**:

1. **Only One Image in Folder**
   - Expected behavior
   - Add more images

2. **Caching**
   - Browser caching images
   - Clear cache
   - Hard reload

**Solutions**:

```javascript
// Verify multiple images detected
// (after switching scene, check console logs)
```

## Template Issues

### Template Not Changing

**Symptoms**: Selected new template but still see old one

**Solutions**:

1. **Hard Reload**

   ```
   Ctrl+F5 (Windows/Linux)
   Cmd+Shift+R (Mac)
   ```

2. **Verify Saved**

   ```
   Settings → Module Settings
   → Loading Screen Design
   → Verify selection
   → Save again
   ```

3. **Clear Browser Cache**

   ```
   Ctrl+Shift+Delete
   → Clear cache
   → Reload
   ```

4. **Check Console**
   ```javascript
   // Verify template setting
   console.log(game.settings.get("loading-screen", "template"));
   // Should show: 'standard', 'minimalist', 'cinematic', or 'fantasy'
   ```

### Template Looks Broken

**Symptoms**: Missing elements, wrong colors, broken layout

**Solutions**:

1. **Verify Module Version**

   ```
   Manage Modules → Loading Screen System
   → Check version (should be 2.3.0+)
   ```

2. **Reinstall Module**
   - Backup settings first
   - Delete module folder
   - Reinstall
   - Restore settings

3. **Check for Conflicts**
   - Disable other UI modules
   - Test if problem persists
   - Re-enable one by one

4. **CSS Conflicts**
   ```
   F12 → Elements tab
   → Inspect loading screen
   → Check applied styles
   ```

### Template Won't Load

**Symptoms**: Error in console about template

**Solutions**:

```javascript
// Force template reset
await game.settings.set("loading-screen", "template", "standard");
```

**Manual Fix**:

1. Navigate to `modules/loading-screen/templates/loading-screens/`
2. Verify all template files exist:
   - standard.html
   - minimalist.html
   - cinematic.html
   - fantasy.html

## Tips Problems

### Tips Not Showing

**Symptoms**: No tips visible during loading

**Check**:

1. **Tips Enabled?**

   ```
   Settings → Module Settings
   → Show Tips ✅
   ```

2. **Template Supports Tips?**
   - All templates support tips
   - Should work with any template

3. **Tips Exist?**
   ```javascript
   // Check custom tips
   console.log(game.settings.get("loading-screen", "customTips"));
   // Should show tips or empty string
   ```

**Solutions**:

```javascript
// Reset to default tips
await game.settings.set("loading-screen", "customTips", "");
await game.settings.set("loading-screen", "showTips", true);
```

### Tips Not Rotating

**Symptoms**: Same tip always shown, never changes

**Causes**:

1. **Only One Tip**
   - Need at least 2 tips
   - Add more tips

2. **Load Too Fast**
   - Scene loads before rotation
   - Increase scene complexity to test

3. **Rotation Interval High**
   - Set to 15s but load completes faster
   - Lower interval to test

**Solutions**:

```javascript
// Set multiple test tips
await game.settings.set(
  "loading-screen",
  "customTips",
  "Test Tip 1\nTest Tip 2\nTest Tip 3\nTest Tip 4",
);

// Lower rotation interval
await game.settings.set("loading-screen", "tipRotation", 3);
```

### Custom Tips Not Saving

**Symptoms**: Tips reset after saving

**Solutions**:

1. **Verify GM Permissions**
   - Must be GM to edit
   - Check user role

2. **Check for Empty Lines**
   - Remove blank lines
   - Ensure actual content

3. **Try Console Method**
   ```javascript
   await game.settings.set(
     "loading-screen",
     "customTips",
     "Tip 1\nTip 2\nTip 3",
   );
   // Then verify
   console.log(game.settings.get("loading-screen", "customTips"));
   ```

## Performance Issues

### Slow Loading

**Symptoms**: Loading takes longer than before

**Causes**:

1. **Large Images**
   - 4K+ images take time to load
   - Multiple large images in folder

2. **Too Many Images**
   - 50+ images = longer to pick random
   - Network latency

3. **Fade Duration**
   - Set to 3.0s = intentionally slow
   - Increase perceived load time

**Solutions**:

1. **Optimize Images**

   ```
   Recommended: 1920x1080px
   Format: WEBP or JPG
   Size: Under 500KB each
   ```

2. **Reduce Image Count**

   ```
   Optimal: 5-10 images per folder
   Maximum: 20 images
   ```

3. **Lower Fade Duration**

   ```
   Settings → Fade Duration → 0.3s
   ```

4. **Disable Progress Bar**
   ```
   Settings → Show Progress Bar → ❌
   (minimal impact but helps)
   ```

### Stuttering Animation

**Symptoms**: Progress bar or fade animations stutter

**Solutions**:

1. **Hardware Acceleration**

   ```
   Browser → Settings
   → Enable hardware acceleration
   ```

2. **Close Other Tabs**
   - Free up browser resources
   - Close unused tabs

3. **Update Graphics Drivers**
   - Outdated drivers cause issues
   - Update to latest

4. **Simplify Template**
   ```
   Use Minimalist template
   → Fewer visual effects
   ```

### Memory Issues

**Symptoms**: Browser crashes or freezes

**Solutions**:

1. **Reduce Image Sizes**
   - Compress images
   - Lower resolution

2. **Clear Cache Regularly**

   ```
   Ctrl+Shift+Delete
   → Clear regularly
   ```

3. **Close Unused Foundry Worlds**
   - Don't run multiple worlds
   - Close when not in use

## Compatibility Problems

### Conflict with Another Module

**Symptoms**: Loading screen breaks when other module enabled

**Identify Conflicting Module**:

1. Disable all modules except Loading Screen
2. Test - works?
3. Enable modules one by one
4. Find which causes conflict
5. Report to both module authors

**Common Conflicts**:

- Custom loading animations modules
- UI replacement modules
- Performance optimization modules

**Workaround**:

```
Disable conflicting module temporarily
Or use one or the other
```

### lib-wrapper Issues

**Symptoms**: Warnings about lib-wrapper

**Note**: Module includes lib-wrapper shim

**If lib-wrapper installed**:

- Module automatically uses it
- Shim is ignored
- No issues

**If lib-wrapper NOT installed**:

- Module uses built-in shim
- Works fine
- No issues

**Solutions**:

- No action needed
- System handles automatically

### Foundry Version Issues

**V11 Users**: Fully supported ✅  
**V12 Users**: Fully supported ✅  
**V13 Users**: Fully supported ✅  
**V10 and below**: Not supported ❌

**Upgrading**:

- Backup world first
- Update Foundry
- Update module
- Test thoroughly

## Error Messages

### "Template not found"

**Error**: `Template 'xyz' not found, falling back to standard`

**Cause**: Template file missing or corrupted

**Solutions**:

1. Reinstall module
2. Force standard template:
   ```javascript
   await game.settings.set("loading-screen", "template", "standard");
   ```

### "Cannot read properties of null"

**Error**: Various "null" errors in console

**Cause**: Module loaded before Foundry ready

**Solutions**:

1. Hard reload (Ctrl+F5)
2. Clear cache
3. If persists, reinstall module

### "ENOENT: no such file or directory"

**Error**: File not found error

**Cause**: Missing template or image file

**Solutions**:

1. Check file path spelling
2. Verify file exists
3. Use relative paths (worlds/...)
4. Not absolute paths (C:\...)

### "Permission denied"

**Error**: Cannot save settings

**Cause**: Not GM or world locked

**Solutions**:

1. Verify GM role
2. Unlock world if in safe mode
3. Check file permissions (hosting)

## Advanced Debugging

### Enable Debug Logging

**In Console**:

```javascript
// Module includes debug logs
// Check console during scene change
// Look for "Loading Screen |" messages
```

### Inspect Element

**Check Applied Styles**:

```
F12 → Elements
→ Find #loading-screen-overlay
→ Check computed styles
→ Look for conflicts
```

### Export Settings

**Backup Current Settings**:

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
```

### Reset to Defaults

**Nuclear Option**:

```javascript
// Reset all settings
await game.settings.set("loading-screen", "enabled", true);
await game.settings.set("loading-screen", "template", "standard");
await game.settings.set("loading-screen", "imageFolder", "");
await game.settings.set("loading-screen", "sceneFolders", {});
await game.settings.set("loading-screen", "customText", "Loading New Scene");
await game.settings.set("loading-screen", "showProgress", true);
await game.settings.set("loading-screen", "fadeDuration", 0.5);
await game.settings.set("loading-screen", "showTips", true);
await game.settings.set("loading-screen", "tipRotation", 5);
await game.settings.set("loading-screen", "customTips", "");
ui.notifications.info("Settings reset! Reload page (F5)");
```

## Getting Help

### Before Reporting an Issue

**Collect Information**:

1. **Foundry Version**

   ```
   Settings → About
   → Copy version number
   ```

2. **Module Version**

   ```
   Manage Modules
   → Loading Screen System
   → Copy version number
   ```

3. **Console Errors**

   ```
   F12 → Console
   → Screenshot any red errors
   ```

4. **Enabled Modules**

   ```
   List of other enabled modules
   → Especially UI-related ones
   ```

5. **Steps to Reproduce**
   ```
   1. Do this...
   2. Then this...
   3. Error occurs
   ```

### Reporting Bugs

**GitHub Issues**: [Create Issue](https://github.com/NoWitchCraft/loading-screen/issues)

**Include**:

- ✅ Foundry version
- ✅ Module version
- ✅ Console errors (screenshot)
- ✅ Steps to reproduce
- ✅ Expected vs actual behavior
- ✅ Screenshots if visual issue
- ✅ List of other modules

**Template**:

```markdown
**Foundry Version**: 11.315
**Module Version**: 2.3.0
**Browser**: Chrome 120

**Issue**: Loading screen not appearing

**Steps**:

1. Enable module
2. Switch to scene "Test Scene"
3. Old popup appears instead

**Console Errors**:
[paste errors or "none"]

**Other Modules**:

- Module A v1.0
- Module B v2.0

**Screenshots**:
[attach if relevant]
```

### Community Support

**Foundry Discord**:

- #modules channel
- Ask for help
- Share screenshots

**Reddit**:

- r/FoundryVTT
- Include details
- Mark as solved when fixed

## Quick Reference

### Common Fixes

| Problem          | Quick Fix             |
| ---------------- | --------------------- |
| Not appearing    | Check enabled, reload |
| Wrong template   | Hard reload (Ctrl+F5) |
| No images        | Check folder path     |
| Tips missing     | Enable in settings    |
| Slow performance | Optimize images       |
| Errors           | Check console (F12)   |

### Emergency Commands

```javascript
// Force enable
await game.settings.set("loading-screen", "enabled", true);

// Reset template
await game.settings.set("loading-screen", "template", "standard");

// Clear custom content
await game.settings.set("loading-screen", "customTips", "");
await game.settings.set("loading-screen", "imageFolder", "");
await game.settings.set("loading-screen", "sceneFolders", {});
```

---

**Still having issues?** Open a [GitHub issue](https://github.com/NoWitchCraft/loading-screen/issues) with details!
