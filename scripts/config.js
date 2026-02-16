/**
 * Konfigurationsformular für Scene-spezifische Bildordner
 */
export class LoadingScreenConfig extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: 'loading-screen-config',
      title: game.i18n.localize('LOADING_SCREEN.ConfigTitle'),
      template: 'modules/nwc-loadingscreen/templates/config.html',
      width: 600,
      height: 'auto',
      closeOnSubmit: true,
      tabs: [{navSelector: '.tabs', contentSelector: 'form', initial: 'scenes'}]
    });
  }

  getData() {
    const sceneFolders = game.settings.get('loading-screen', 'sceneFolders') || {};
    const scenes = game.scenes.map(scene => ({
      id: scene.id,
      name: scene.name,
      folder: sceneFolders[scene.id] || ''
    }));

    return {
      scenes: scenes,
      defaultFolder: game.settings.get('loading-screen', 'imageFolder')
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // File Picker für jede Szene
    html.find('.folder-picker').click(this._onFolderPicker.bind(this));
  }

  async _onFolderPicker(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const input = button.previousElementSibling;
    
    // V13 kompatible FilePicker
    const FilePicker = foundry.applications?.apps?.FilePicker?.implementation || window.FilePicker;
    new FilePicker({
      type: 'folder',
      current: input.value,
      callback: path => {
        input.value = path;
      }
    }).browse();
  }

  async _updateObject(event, formData) {
    const sceneFolders = {};
    
    // Sammle alle Scene-Ordner
    for (let key in formData) {
      if (key.startsWith('scene-')) {
        const sceneId = key.replace('scene-', '');
        const folder = formData[key];
        if (folder && folder.trim() !== '') {
          sceneFolders[sceneId] = folder.trim();
        }
      }
    }
    
    // Speichere Scene-Ordner
    await game.settings.set('loading-screen', 'sceneFolders', sceneFolders);
    
    ui.notifications.info(game.i18n.localize('LOADING_SCREEN.ConfigSaved'));
  }
}

/**
 * Konfigurationsformular für benutzerdefinierte Tipps
 * Als FormApplication für Settings Menu Integration
 */
export class CustomTipsConfig extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: 'custom-tips-config',
      title: game.i18n.localize('LOADING_SCREEN.CustomTipsTitle'),
      template: 'modules/nwc-loadingscreen/templates/custom-tips.html',
      width: 600,
      height: 500,
      closeOnSubmit: true,
      resizable: true
    });
  }

  getData() {
    const customTips = game.settings.get('loading-screen', 'customTips');
    return {
      customTips: customTips,
      placeholder: game.i18n.localize('LOADING_SCREEN.CustomTipsPlaceholder')
    };
  }

  async _updateObject(event, formData) {
    const tips = formData.customTips || '';
    await game.settings.set('loading-screen', 'customTips', tips);
    ui.notifications.info(game.i18n.localize('LOADING_SCREEN.CustomTipsSaved'));
  }
}