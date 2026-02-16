# Template Guide - Loading Screen System

Complete guide to templates in the Loading Screen System.

## Overview

Templates are pre-designed loading screen themes that change the visual appearance of your loading screen. Each template has its own style, color scheme, and animations.

## Available Templates

### 1. Standard Template

**File**: `templates/loading-screens/standard.html`

**Visual Design:**

- Full background image with blur effect (2px)
- Background brightness reduced to 60%
- Centered white text with pulse animation
- Scene name below main text
- Blue gradient shimmer progress bar
- Tips in dark box with 💡 icon and glow effect
- Backdrop blur on tip box

**Color Scheme:**

- Text: White (#ffffff)
- Progress: Blue gradient (#4a90e2 → #63b3ed)
- Tips Box: Dark semi-transparent (rgba(0,0,0,0.6))

**Animations:**

- Fade in/out: Configurable duration
- Text pulse: 2s infinite
- Progress shimmer: 2s infinite sliding gradient
- Tip icon glow: 2s infinite

**Best Used For:**

- General purpose
- All game systems
- Default choice
- First-time setup

**CSS Class**: `.loading-template-standard`

---

### 2. Minimalist Template

**File**: `templates/loading-screens/minimalist.html`

**Visual Design:**

- Background: Heavily dimmed (opacity 30%)
- Grayscale filter (50%)
- Strong blur (5px)
- Large, thin typography (font-weight 300)
- Uppercase text with letter-spacing (0.2em)
- Ultra-thin progress line (2px)
- Bottom-placed tips
- Overall dark theme (rgba(0,0,0,0.95))

**Color Scheme:**

- Background: Near-black
- Text: White, semi-transparent
- Progress: Pure white line
- Tips: Light gray (rgba(255,255,255,0.7))

**Animations:**

- Simple fade in/out
- No text effects
- Clean progress transition

**Best Used For:**

- Modern game systems
- Clean aesthetics
- Less visual distraction
- Professional presentations

**CSS Class**: `.loading-template-minimalist`

---

### 3. Cinematic Template

**File**: `templates/loading-screens/cinematic.html`

**Visual Design:**

- High contrast background
- Brightness reduced (40%), contrast increased (120%)
- Gradient overlay (top/bottom dark)
- Vignette effect (box-shadow inset)
- Large glowing titles (3.5rem)
- Subtitle with uppercase styling
- Glowing white progress bar
- Dramatic tip presentation

**Color Scheme:**

- Background: Pure black (#000)
- Text: White with glow effects
- Progress: White with glow shadow
- Overlays: Multiple dark gradients

**Animations:**

- Dramatic fade in/out
- Text glow effects
- Progress bar glow

**Effects:**

- Vignette: `box-shadow: inset 0 0 150px 50px rgba(0,0,0,0.8)`
- Text shadow: `0 0 20px rgba(255,255,255,0.5)`
- Gradient overlay: Top/bottom fade to black

**Best Used For:**

- Dark Fantasy (Warhammer, Symbaroum)
- Horror (Call of Cthulhu, Alien)
- Sci-Fi (Star Wars, Cyberpunk)
- Dramatic campaigns
- Film-inspired aesthetics

**CSS Class**: `.loading-template-cinematic`

---

### 4. Fantasy/RPG Template

**File**: `templates/loading-screens/fantasy.html`

**Visual Design:**

- Sepia-toned background (30%)
- Beige parchment scroll center piece
- Brown decorative borders
- Medieval ornaments (⚔️ ◆ ✦)
- "Entering: [Location]" format
- Serif fonts (Palatino Linotype)
- Paper texture effects
- Decorative corners on progress bar

**Color Scheme:**

- Background: Dark brown (#1a0f0a)
- Scroll: Beige parchment (rgba(245,235,210,0.95))
- Accents: Brown (#8b4513)
- Text: Dark brown (#4a2511, #2c1810)
- Progress: Brown-gold gradient

**Special Elements:**

- Border: Gradient brown frame
- Ornaments: ⚔️ at header
- Progress corners: ◆ symbols
- Tips header: ✦ Wisdom ✦
- Paper texture: Repeating line pattern

**Animations:**

- Classic fade in/out
- No modern effects
- Traditional presentation

**Best Used For:**

- D&D 5e
- Pathfinder 1e/2e
- Old School Renaissance (OSR)
- Medieval Fantasy settings
- Classic tabletop RPG feel

**CSS Class**: `.loading-template-fantasy`

## Template Selection

### In Module Settings

1. Navigate to **Settings** → **Module Settings**
2. Find "Loading Screen System"
3. Locate "Loading Screen Design" dropdown
4. Select your preferred template:
   - Standard (Original)
   - Minimalist
   - Cinematic
   - Fantasy/RPG
5. Click **Save**
6. Switch scenes to see the new template

### Testing Templates

**Quick Test:**

1. Select template in settings
2. Switch to any scene
3. Observe loading screen
4. Switch back and try another

**Comparison:**
Try each template with the same images to see which fits best.

## Template Recommendations

### By Game System

| System             | Recommended Template | Alternative |
| ------------------ | -------------------- | ----------- |
| D&D 5e             | Fantasy/RPG          | Standard    |
| Pathfinder 1e/2e   | Fantasy/RPG          | Standard    |
| Call of Cthulhu    | Cinematic            | Standard    |
| Alien RPG          | Cinematic            | Minimalist  |
| Warhammer 40K      | Cinematic            | Standard    |
| Cyberpunk RED      | Minimalist           | Cinematic   |
| Star Wars          | Cinematic            | Standard    |
| Blades in the Dark | Minimalist           | Cinematic   |
| OSR Games          | Fantasy/RPG          | Standard    |
| Fate Core          | Minimalist           | Standard    |

### By Campaign Tone

| Tone          | Template    | Why                     |
| ------------- | ----------- | ----------------------- |
| Epic Fantasy  | Fantasy/RPG | Matches genre perfectly |
| Dark & Gritty | Cinematic   | Dramatic atmosphere     |
| Horror        | Cinematic   | Ominous presentation    |
| Modern        | Minimalist  | Clean, professional     |
| Sci-Fi        | Cinematic   | Futuristic feel         |
| Light-Hearted | Standard    | Friendly, approachable  |
| Historical    | Fantasy/RPG | Classic presentation    |
| Mystery       | Cinematic   | Suspenseful             |

### By Visual Preference

**Want Clean & Simple:**
→ Minimalist

**Want Dramatic & Atmospheric:**
→ Cinematic

**Want Traditional RPG Feel:**
→ Fantasy/RPG

**Want Versatile & Friendly:**
→ Standard

## Technical Details

### Template Variables

All templates use the same Handlebars variables:

```handlebars
{{backgroundImage}}
- URL of the background image
{{customText}}
- Custom loading text from settings
{{sceneName}}
- Name of the scene being loaded
{{fadeDuration}}
- Fade animation duration (seconds)
{{currentTip}}
- Current tip text
{{showProgress}}
- Boolean: show progress bar?
{{showTips}}
- Boolean: show tips?
```

### Template Structure

**Basic Structure:**

```html
<div id="loading-screen-overlay" class="loading-template-[name]">
  <div
    class="loading-screen-background"
    style="background-image: url('{{backgroundImage}}');"
  ></div>
  <div class="loading-screen-content">
    <!-- Template-specific content -->
  </div>
</div>
```

**Required Elements:**

- `id="loading-screen-overlay"` - Main container
- `.loading-screen-background` - Background image container
- `#loading-progress-fill` - Progress bar (if showProgress)
- `#loading-tip-text` - Tip text element (if showTips)

### CSS Architecture

**Template CSS:**

```css
/* Template-specific styles */
.loading-template-[name] {
  /* Base template styles */
}

/* Child elements */
.loading-template-[name] .specific-element {
  /* Element-specific styles */
}
```

**Common Classes:**

```css
#loading-screen-overlay      - Main overlay
.loading-screen-background   - Background container
.loading-screen-content      - Content wrapper
#loading-progress-fill       - Progress bar fill
#loading-tip-text           - Tip text
```

## Customization

### Adjusting Existing Templates

**Via CSS (Advanced):**

Create a custom CSS file in your world:

```css
/* Override standard template */
.loading-template-standard .loading-screen-text h1 {
  color: gold !important;
  font-size: 4rem !important;
}
```

**Note**: Advanced users only. Not officially supported.

### Creating Custom Templates

**Coming in v2.4:**

- Custom template upload
- Template editor
- Community template library

**Current Workaround:**

1. Copy existing template
2. Modify HTML/CSS
3. Register in code (requires module edit)

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

## Troubleshooting

### Template Not Changing

**Problem**: Selected new template but still see old one

**Solutions**:

1. ✅ Hard reload browser (Ctrl+F5)
2. ✅ Verify selection saved
3. ✅ Clear browser cache
4. ✅ Check console for errors

### Template Looks Broken

**Problem**: Template displays incorrectly

**Solutions**:

1. ✅ Verify module version (2.3.0+)
2. ✅ Check for conflicting CSS modules
3. ✅ Hard reload browser
4. ✅ Try different template to test

### Missing Elements

**Problem**: Progress bar or tips not showing

**Solutions**:

1. ✅ Check "Show Progress Bar" setting
2. ✅ Check "Show Tips" setting
3. ✅ Verify template file exists
4. ✅ Check console for errors

### Template Fallback

If a template fails to load:

- Module automatically falls back to Standard
- Error logged in console
- Loading screen still works

## Performance

### Template Performance

All templates are optimized:

- ✅ Lazy loaded (only active template)
- ✅ CSS minimal and efficient
- ✅ No external dependencies
- ✅ No performance impact

**Template Sizes:**

- Standard: ~2KB HTML, ~3KB CSS
- Minimalist: ~1.5KB HTML, ~2KB CSS
- Cinematic: ~2KB HTML, ~4KB CSS
- Fantasy: ~2.5KB HTML, ~5KB CSS

## Best Practices

### Template Selection

**Do:**

- ✅ Choose template that matches your game
- ✅ Test with your actual images
- ✅ Consider your players' preferences
- ✅ Adjust fade duration to match template

**Don't:**

- ❌ Change template mid-session
- ❌ Use templates that clash with your world
- ❌ Overcomplicate with too many elements

### Image Compatibility

**Standard:** Works with all images

**Minimalist:**

- Best with simple, bold images
- High contrast works well

**Cinematic:**

- Best with dramatic images
- Dark images enhance effect

**Fantasy:**

- Best with fantasy/medieval images
- Warm-toned images preferred

## FAQ

**Q: Can I use different templates for different scenes?**
A: Not yet. Coming in v2.4.

**Q: Can I create my own template?**
A: Advanced users can modify code. Official support in v2.4.

**Q: Which template is fastest?**
A: All are equally fast. Minimalist appears faster due to less visual complexity.

**Q: Can I disable certain elements in a template?**
A: Use Settings to disable progress bar or tips globally.

**Q: Do templates work with all image formats?**
A: Yes, all templates work with JPG, PNG, WEBP, GIF.

## Next Steps

- **[User Guide](USER-GUIDE.md)** - Complete usage guide
- **[Configuration](CONFIGURATION.md)** - All settings
- **[Tips Guide](TIPS.md)** - Custom tips guide

---

**Questions?** Open an [issue on GitHub](https://github.com/NoWitchCraft/loading-screen/issues).
