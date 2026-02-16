# Changelog

All notable changes to the Loading Screen System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2024-02-16

### Added

- **Template System**: 4 professional loading screen templates
  - Standard (Original) - Classic design
  - Minimalist - Clean, modern aesthetic
  - Cinematic - Dramatic, film-inspired
  - Fantasy/RPG - Parchment scroll with medieval ornaments
- Template selection dropdown in Module Settings
- Template-specific CSS styles for each design
- Handlebars-based template rendering system
- Template fallback to Standard on error
- Comprehensive template documentation

### Changed

- Loading screen now renders from templates instead of hardcoded HTML
- Improved code organization with template separation
- Updated documentation with template guides

### Technical

- Added `SETTINGS.TEMPLATE` setting key
- New template files in `templates/loading-screens/`
- Template rendering via `getTemplate()` API
- CSS classes per template (`.loading-template-[name]`)

## [2.2.1] - 2024-02-16

### Fixed

- Custom Tips now uses FormApplication instead of problematic approaches
- Custom Tips dialog properly displays as button in Settings
- Fixed tips saving and loading functionality
- Added debug logging to `getTips()` method

### Changed

- Reverted to `registerMenu` for Custom Tips (V11/V12/V13 compatible)
- Custom Tips editor back to proper template-based dialog
- Removed experimental button replacement approach

### Technical

- FormApplication for `CustomTipsConfig` class
- Template: `custom-tips.html` re-activated
- Removed `renderSettingsConfig` hook

## [2.2.0] - 2024-02-15

### Added

- **lib-wrapper Integration**: Scene Config tab integration using lib-wrapper
- Scene Config tab directly in Scene Configuration window
- lib-wrapper shim included (no external dependency required)
- Scene-specific folder configuration via tab instead of dialog
- Comprehensive lib-wrapper-based approach

### Changed

- Scene configuration moved from Context Menu to Config Tab
- Context menu approach removed in favor of tab integration
- Improved compatibility with other modules via lib-wrapper
- Better user experience with integrated tab

### Fixed

- Scene Config tab now appears in V13
- FilePicker works correctly in Scene Config
- Scene folder settings save properly

### Technical

- Added `scripts/lib/lib-wrapper-shim.js`
- Added `scripts/scene-config.js` for tab integration
- Added `templates/scene-config-tab.html`
- lib-wrapper MIXED and WRAPPER modes for hooks
- `_preparePartContext`, `_processSubmitData`, `_onRender` overrides

## [2.1.3] - 2024-02-15

### Fixed

- Custom Tips form submission now works correctly
- Custom Tips FormApplication replaced problematic ApplicationV2
- Scene Directory context menu hook corrected
- Added debug logging for context menu

### Changed

- `getSceneDirectoryEntryContext` hook instead of `getSceneNavigationContext`
- Scene folder configuration via context menu
- Improved error handling in custom tips dialog

### Technical

- FormApplication with proper `_updateObject` method
- Correct DOM navigation for V13 Scene Directory
- Context menu condition and callback logic fixed

## [2.1.1] - 2024-02-15

### Fixed

- FilePicker now uses V13-compatible API
- Settings registration uses i18n keys instead of localized strings
- Scene Config rendering for V13
- jQuery compatibility check for V13 hooks

### Changed

- All FilePicker calls updated to `foundry.applications.apps.FilePicker.implementation`
- Settings now use raw i18n keys for V13 auto-grouping
- `requiresReload` instead of `onChange` for enabled setting

### Technical

- V13 API compatibility throughout
- Proper fallback for V11/V12 FilePicker
- Settings grouped by module ID in V13

## [2.1.0] - 2024-02-14

### Added

- Scene-specific image folders
- Random image selection from folders
- FilePicker integration for folder selection
- Scene Config integration (menu button)
- Scene folder configuration dialog
- Comprehensive help system in config

### Changed

- Image system now supports multiple images
- Fallback chain: Scene folder → Default folder → Scene bg → Fallback icon
- Tips now in separate files (tips-de.js, tips-en.js)

### Technical

- `getImagesForScene()` async method
- `browseFolder()` for FilePicker API
- `SCENE_FOLDERS` setting (JSON object)
- Scene Config menu registration

## [1.0.0] - 2024-02-12

### Added

- Initial release
- Custom loading screen overlay
- Background image support
- Custom loading text
- Animated progress bar
- Rotating tips system
- Fade in/out animations
- English and German localization
- Module settings configuration

### Features

- Replaces default Foundry loading popup
- Fully customizable text and styling
- Progress bar with shimmer animation
- Tips rotation every 5 seconds
- Smooth fade transitions

---

## Upgrade Notes

### Upgrading to 2.3.0

- ✅ All existing settings preserved
- ✅ No breaking changes
- ✅ New template setting added (defaults to 'standard')
- ✅ Existing loading screens work as before

### Upgrading to 2.2.0

- ✅ All settings preserved
- ✅ Scene Config tab automatically available
- ✅ Old dialog approach replaced

### Upgrading from 1.x to 2.x

- ⚠️ Manual migration of custom tips may be needed
- ✅ Scene folders is new feature (optional)
- ✅ All other settings preserved

---
