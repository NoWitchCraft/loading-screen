# Tips Guide - Loading Screen System

Complete guide to using and customizing tips in the Loading Screen System.

## Overview

Tips are helpful hints, reminders, or messages displayed during loading screens. They provide useful information while players wait for scenes to load.

## Built-in Tips

### English Tips (Default)

The module includes 15 default English tips:

1. "Double-click a token to open its character sheet"
2. "Hold Alt while dragging to snap to grid"
3. "Press T to toggle drawing tools"
4. "Use Ctrl+Z to undo your last action"
5. "Right-click a token for quick actions"
6. "Hold Shift to select multiple tokens"
7. "Press Space to ping your location"
8. "Use the mouse wheel to zoom in and out"
9. "Click and drag with the right mouse button to pan"
10. "Press F to toggle fullscreen mode"
11. "Use Ctrl+S to quickly save the world"
12. "The Scene Navigation bar at the top shows all available scenes"
13. "Press Delete to remove selected tokens"
14. "Use the Ruler tool (Ctrl+R) to measure distances"
15. "Check the chat log for important updates"

### German Tips (Deutsch)

15 matching German tips for German-language users:

1. "Doppelklick auf einen Token öffnet das Charakterblatt"
2. "Halte Alt beim Ziehen für Grid-Snapping"
3. "Drücke T für Zeichenwerkzeuge"
... (and 12 more)

### Automatic Language Detection

Tips automatically display in the user's Foundry language:
- English users → English tips
- German users → German tips
- Other languages → English tips (fallback)

## Custom Tips

### Creating Custom Tips

1. **Open Editor**
   - Navigate to **Module Settings** → **Loading Screen System**
   - Find "Custom Tips" section
   - Click **"Edit Tips"** button (or "Tipps bearbeiten" in German)

2. **Enter Your Tips**
   - Large text editor opens
   - Type one tip per line
   - Press Enter for new line
   - No special formatting needed

3. **Save**
   - Click **Save** button
   - Dialog closes automatically
   - Tips are active immediately

### Tip Format

**Simple Format:**
```
Remember to check for traps
Your wizard has 2 spell slots remaining
Don't forget about your inspiration
```

**With Prefixes:**
```
Tip: Stay hydrated during the session
Reminder: Check passive perception
Pro Tip: Use your bonus action
```

**Campaign-Specific:**
```
Session 5 is the big boss fight
The BBEG is vulnerable to fire damage
You have 3 health potions in inventory
The quest deadline is in 2 in-game days
```

### Best Practices

#### Length

**Good (Short & Clear):**
```
✅ Use Ctrl+S to save the world
✅ Check your spell slots
✅ The inn costs 5 gold per night
```

**Bad (Too Long):**
```
❌ In order to properly utilize the Foundry VTT interface, you should consider...
❌ Remember that according to the PHB page 192, you can use your bonus action to...
```

#### Clarity

**Good (Specific):**
```
✅ Double-click tokens to open sheets
✅ Press T for drawing tools
✅ Your next session is Friday 7pm
```

**Bad (Vague):**
```
❌ You can do that thing with those
❌ Remember about the stuff
❌ Don't forget what we talked about
```

#### Relevance

**Good (Useful):**
```
✅ Boss fight next session!
✅ Level up before next game
✅ Bring snacks - your turn
```

**Bad (Random):**
```
❌ The weather is nice today
❌ I like pizza
❌ Random text here
```

#### Variety

**Good (5-10 Different Tips):**
```
Tip 1: Campaign reminder
Tip 2: Mechanical hint
Tip 3: Story hook
Tip 4: Session logistics
Tip 5: Character reminder
... (5-10 total)
```

**Bad (1-2 Tips Only):**
```
Only one tip
(gets very repetitive)
```

## Tip Rotation

### How It Works

- Tips automatically rotate during long loading times
- Smooth fade-out/fade-in transition
- Random selection from available tips
- Continuous rotation until loading completes

### Rotation Speed

**Setting**: Module Settings → **Tip Rotation**

**Range**: 3-15 seconds  
**Default**: 5 seconds

**Recommendations**:

| Tip Length | Rotation Speed | Why |
|------------|---------------|-----|
| Short (< 40 chars) | 3-5 seconds | Quick read, variety |
| Medium (40-80 chars) | 5-8 seconds | Comfortable reading |
| Long (80+ chars) | 8-12 seconds | Enough time to read |
| Very Long (detailed) | 12-15 seconds | Full comprehension |

**Adjust via Settings:**
```
Settings → Module Settings → Loading Screen System
→ Tip Rotation → Slider (3-15 sec)
→ Save
```

### Animation

**Transition**: 
- Fade out: 300ms
- Content change: Instant
- Fade in: 300ms
- Total: 600ms transition

**CSS Classes**:
- `.fade-out-tip` - Applied during fade-out
- `.fade-in-tip` - Applied during fade-in

## Use Cases

### General Foundry Tips

**Keyboard Shortcuts:**
```
Press T to toggle drawing tools
Use Ctrl+Z to undo
Press Space to ping
Hold Shift to multi-select
Press F for fullscreen
```

**Mouse Actions:**
```
Double-click tokens to open sheets
Right-click for context menus
Mouse wheel to zoom
Right-drag to pan
Alt+drag for grid snap
```

### Campaign Reminders

**Story Hooks:**
```
You're searching for the Lost Crown
The dragon was last seen in the mountains
Lord Blackwood offered 500 gold for the quest
Three days until the festival
```

**NPC Information:**
```
The innkeeper knows about the secret passage
Guard Captain Marcus is suspicious
The mysterious stranger wears a blue cloak
```

**World Details:**
```
Magic is banned in this city
The river is too dangerous to cross
All shops close at sunset
The temple offers healing for donations
```

### Session Logistics

**Scheduling:**
```
Next session: Friday, November 15th at 7pm
Session starts in 30 minutes
We're playing 4 hours today
Remember to bring snacks
```

**Preparation:**
```
Level up your character before next session
Update your character sheet
Prepare spell lists for tomorrow
Review last session's notes
```

**Housekeeping:**
```
Please mute when not speaking
Take breaks every 2 hours
Post session notes in Discord
Vote on next campaign after this one
```

### Character Reminders

**Resources:**
```
You have 2 spell slots remaining
3 charges left on your magic item
Remember your Bardic Inspiration
You still have your Second Wind
```

**Abilities:**
```
You can use your Channel Divinity
Rage is available again
Sneak Attack on your turn
Don't forget your Cunning Action
```

**Inventory:**
```
You have 3 healing potions
The magic sword is in your backpack
Check your rations (5 days left)
You're carrying 45/150 pounds
```

### System-Specific Tips

**D&D 5e:**
```
Check if you have advantage
Remember concentration checks
You can only cast one leveled spell per turn
Short rest recovers some HP and abilities
```

**Pathfinder:**
```
Don't forget your free action
Check your action economy
Remember flat-footed AC
Five-foot step doesn't provoke
```

**Call of Cthulhu:**
```
Push rolls can be dangerous
Failing rolls increases Cthulhu Mythos
Keep your Sanity above 0
Luck points refresh each session
```

## Advanced Tips

### Conditional Tips (Manual)

While the module doesn't support conditional logic natively, you can manually update tips for different situations:

**Before Boss Fight:**
```javascript
await game.settings.set('loading-screen', 'customTips', 
  'The boss is immune to poison\nFocus fire on the minions first\nSave your big spells\nHealing potions are in the chest'
);
```

**During Investigation:**
```javascript
await game.settings.set('loading-screen', 'customTips',
  'Look for clues in the study\nThe butler knows something\nCheck the fireplace\nThe diary is important'
);
```

**Between Sessions:**
```javascript
await game.settings.set('loading-screen', 'customTips',
  'Next session: Boss fight!\nLevel up your character\nBring snacks (your turn)\nReview combat rules'
);
```

### Multilingual Tips

**Same Tips in Multiple Languages:**

```
Tip: Save often (EN) | Tipp: Oft speichern (DE)
Tip: Check inventory | Tipp: Inventar prüfen
Tip: Next session Friday | Tipp: Nächste Session Freitag
```

**Language-Specific Tips:**

Create separate tip sets and switch based on language:

```javascript
const language = game.i18n.lang;
const tipSets = {
  en: 'English tip 1\nEnglish tip 2\nEnglish tip 3',
  de: 'Deutscher Tipp 1\nDeutscher Tipp 2\nDeutscher Tipp 3',
  es: 'Consejo español 1\nConsejo español 2\nConsejo español 3'
};

await game.settings.set('loading-screen', 'customTips', 
  tipSets[language] || tipSets.en
);
```

### Dynamic Tips (Macro)

**Update Tips from Macro:**

```javascript
// Campaign-specific tips macro
const tips = [
  'Current quest: Find the Lost Crown',
  'Party gold: 1,547 gp',
  'Days until festival: 3',
  `Session date: ${new Date().toLocaleDateString()}`
];

await game.settings.set('loading-screen', 'customTips', tips.join('\n'));
ui.notifications.info('Tips updated!');
```

**Time-Based Tips:**

```javascript
const hour = new Date().getHours();
let tips;

if (hour < 12) {
  tips = 'Good morning!\nRemember breakfast\nCheck your spell list';
} else if (hour < 18) {
  tips = 'Good afternoon!\nStay focused\nTake breaks';
} else {
  tips = 'Good evening!\nWrap up by midnight\nNo late-night decisions';
}

await game.settings.set('loading-screen', 'customTips', tips);
```

## Tips Management

### Organizing Tips

**By Category (Manual):**

```
--- COMBAT ---
Remember your bonus action
Check if you have advantage
Use cover when possible

--- EXPLORATION ---
Check for traps
Look for secret doors
Talk to NPCs

--- ROLEPLAY ---
Stay in character
Ask questions
Take notes
```

**Note**: Categories are just for organization in your editor. They'll appear as regular tips in-game.

### Backup & Restore

**Export Tips:**
```javascript
const tips = game.settings.get('loading-screen', 'customTips');
console.log('BACKUP:', tips);
// Copy from console and save to file
```

**Import Tips:**
```javascript
const tips = `Your tip 1
Your tip 2
Your tip 3`;

await game.settings.set('loading-screen', 'customTips', tips);
ui.notifications.info('Tips imported!');
```

### Sharing Tips

**With Your Group:**
1. Export your tips (see above)
2. Share the text file
3. Other GMs import via console

**With Community:**
1. Create a nice formatted list
2. Post in Foundry Discord or Reddit
3. Include category/system tags

## Troubleshooting

### Tips Not Showing

**Problem**: Tips section is blank

**Check**:
1. ✅ "Show Tips" is enabled in settings
2. ✅ Template supports tips (all do)
3. ✅ Custom tips aren't just empty lines
4. ✅ Browser console for errors

**Solutions**:
```javascript
// Verify tips are set
console.log(game.settings.get('loading-screen', 'customTips'));

// Verify tips are enabled
console.log(game.settings.get('loading-screen', 'showTips'));

// Test with simple tips
await game.settings.set('loading-screen', 'customTips', 'Test Tip 1\nTest Tip 2');
```

### Tips Not Rotating

**Problem**: Same tip always shown

**Check**:
1. ✅ Multiple tips exist
2. ✅ Loading takes long enough
3. ✅ Rotation interval reasonable

**Solutions**:
- Add more tips (need at least 2)
- Increase scene complexity (longer load)
- Lower rotation interval to 3s

### Tips in Wrong Language

**Problem**: English tips for German user

**Check**:
1. ✅ Foundry language setting
2. ✅ Custom tips override language
3. ✅ Module has language files

**Solutions**:
- Clear custom tips (use defaults)
- Set custom tips in correct language
- Verify `game.i18n.lang` shows correct language

### Empty Line Issues

**Problem**: Blank tips or gaps

**Solution**: Remove empty lines in custom tips

**Before (Bad):**
```
Tip 1

Tip 2


Tip 3
```

**After (Good):**
```
Tip 1
Tip 2
Tip 3
```

## FAQ

**Q: How many tips should I have?**  
A: 5-10 is ideal. Less = repetitive, More = diluted.

**Q: Can tips be different per scene?**  
A: Not currently. Coming in future update.

**Q: Can tips include HTML?**  
A: No, plain text only.

**Q: Can tips be images?**  
A: No, text only.

**Q: Do tips need "Tip:" prefix?**  
A: No, but it looks nice and is clear.

**Q: Can tips be randomized each load?**  
A: Yes, they already are! Random tip shown first.

**Q: Can I disable tips temporarily?**  
A: Yes, uncheck "Show Tips" in settings.

**Q: Are tips stored per world?**  
A: Yes, each world has its own tips.

**Q: Can players set tips?**  
A: No, only GMs can edit tips.

**Q: What's the tip character limit?**  
A: No hard limit, but keep under 100 chars for readability.

## Examples Collection

### Starter Set (5 Tips)
```
Double-click tokens to open sheets
Right-click for quick actions
Use mouse wheel to zoom
Press T for drawing tools
Check the chat for updates
```

### D&D Campaign (10 Tips)
```
You're level 5 with 2,340 XP
Current quest: Rescue the prince
The dragon is weak against cold
Party gold: 847 gold pieces
Next session: Friday 7pm
Remember to use your Action Surge
Check if you have Inspiration
Healing potions: 3 remaining
The BBEG knows you're coming
Don't split the party!
```

### Horror Campaign (8 Tips)
```
Your sanity is at 52/90
Trust no one
The cult symbol is a red spiral
Check your ammunition count
Save your light sources
Listen carefully for sounds
Run when you must
Some things are better left unknown
```

### Quick Reference (12 Tips)
```
Ctrl+Z to undo
Ctrl+S to save
Hold Alt to snap to grid
Hold Shift to multi-select
Press Space to ping
Press T for tools
Press F for fullscreen
Double-click for sheets
Right-click for menus
Mouse wheel to zoom
Right-drag to pan
Press Delete to remove
```

## Next Steps

- **[User Guide](USER-GUIDE.md)** - Complete usage guide
- **[Configuration](CONFIGURATION.md)** - All settings explained
- **[Template Guide](TEMPLATES.md)** - Template details

---

**Questions?** Open an [issue on GitHub](https://github.com/yourusername/loading-screen/issues).