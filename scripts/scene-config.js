import { libWrapper } from './lib/lib-wrapper-shim.js';

export function registerSceneConfigTab() {
  const moduleName = 'loading-screen';
  
  /**
   * Add Loading Screen tab to scene config (wie LockView)
   */
  let sceneConfig = foundry.applications.sheets.SceneConfig;
  
  // Füge das PART für unseren Tab hinzu
  sceneConfig.PARTS.loadingScreen = { 
    template: 'modules/nwc-loadingscreen/templates/scene-config-tab.html', 
    scrollable: [""]
  };
  
  // Füge den Tab hinzu
  foundry.applications.sheets.SceneConfig.TABS.sheet.tabs.push({
    id: 'loadingScreen',
    icon: 'fas fa-image',
    label: 'LOADING_SCREEN.SceneTab'
  });

  /**
   * Prepare context für unseren Tab
   */
  libWrapper.register(moduleName, "foundry.applications.sheets.SceneConfig.prototype._preparePartContext", async function (wrapped, ...args) {
    if (args[0] === 'loadingScreen') {
      let context = args[1];
      
      // Hole aktuellen Ordner aus Settings
      const sceneFolders = game.settings.get(moduleName, 'sceneFolders') || {};
      const currentFolder = sceneFolders[context.document._id] || '';
      const defaultFolder = game.settings.get(moduleName, 'imageFolder');

      return {
        sceneId: context.document._id,
        tab: context.tabs[args[0]],
        currentFolder: currentFolder,
        defaultFolder: defaultFolder,
        placeholder: game.i18n.localize('LOADING_SCREEN.UseDefaultFolder')
      };
    }
    else {
      return wrapped(...args);
    }
  }, "MIXED");

  /**
   * Handle submit für unseren Tab
   */
  libWrapper.register(moduleName, "foundry.applications.sheets.SceneConfig.prototype._processSubmitData", async function (wrapped, ...args) {
    const formElement = args[1];
    
    // Hole Folder-Input
    const folderInput = formElement.querySelector('input[name="loadingScreen.imageFolder"]');
    if (folderInput) {
      const folder = folderInput.value;
      const sceneId = this.document._id;
      
      // Speichere in Settings
      const sceneFolders = game.settings.get(moduleName, 'sceneFolders') || {};
      
      if (folder && folder.trim() !== '') {
        sceneFolders[sceneId] = folder.trim();
      } else {
        delete sceneFolders[sceneId];
      }
      
      await game.settings.set(moduleName, 'sceneFolders', sceneFolders);
      console.log('Loading Screen | Scene folder saved:', { sceneId, folder });
    }
    
    return wrapped(...args);
  }, "WRAPPER");

  /**
   * Add event listeners für unseren Tab
   */
  libWrapper.register(moduleName, "foundry.applications.sheets.SceneConfig.prototype._onRender", function (wrapped, ...args) {
    const result = wrapped(...args);
    
    // FilePicker für den Ordner
    const folderPickerBtn = this.element.querySelector('button[name="loadingScreen.folderPicker"]');
    if (folderPickerBtn) {
      folderPickerBtn.addEventListener('click', () => {
        const input = this.element.querySelector('input[name="loadingScreen.imageFolder"]');
        const FilePicker = foundry.applications?.apps?.FilePicker?.implementation || window.FilePicker;
        
        new FilePicker({
          type: 'folder',
          current: input.value,
          callback: path => {
            input.value = path;
          }
        }).browse();
      });
    }
    
    return result;
  }, "WRAPPER");
}