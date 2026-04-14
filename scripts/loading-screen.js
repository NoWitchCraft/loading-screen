/**
 * Loading Screen System für Foundry VTT
 */

import { tips_de } from "./tips-de.js";
import { tips_en } from "./tips-en.js";
import { LoadingScreenConfig, CustomTipsConfig } from "./config.js";
import { registerSceneConfigTab } from "./scene-config.js";
import { browseFolderApi } from "./compat.js";

class LoadingScreenManager {
  static ID = "loading-screen";
  static SETTINGS = {
    ENABLED: "enabled",
    IMAGE_FOLDER: "imageFolder",
    SCENE_FOLDERS: "sceneFolders",
    FOLDER_IMAGE_CACHE: "folderImageCache",
    SCENE_NAME_SOURCE: "sceneNameSource",
    BLOCK_NOTIFICATIONS: "blockNotifications",
    CUSTOM_TEXT: "customText",
    SHOW_PROGRESS: "showProgress",
    FADE_DURATION: "fadeDuration",
    SHOW_TIPS: "showTips",
    TIP_ROTATION: "tipRotation",
    CUSTOM_TIPS: "customTips",
    TEMPLATE: "template",
  };

  // Tipps aus separaten Dateien
  static DEFAULT_TIPS = {
    de: tips_de,
    en: tips_en,
  };

  static _tipRotationInterval = null;
  static _currentTips = [];
  static _currentTipIndex = 0;
  static _currentImages = [];
  static _currentImageIndex = 0;
  static _currentSceneId = null;

  static initialize() {
    this.registerSettings();
    this.setupHooks();
  }

  /**
   * Holt die Liste der Tipps (Custom oder Default)
   */
  static getTips() {
    const customTips = game.settings.get(this.ID, this.SETTINGS.CUSTOM_TIPS);
    const language = game.i18n.lang;

    console.log("Loading Screen | getTips called:", {
      customTipsRaw: customTips,
      hasCustomTips: !!(customTips && customTips.trim() !== ""),
      language,
    });

    if (customTips && customTips.trim() !== "") {
      // Parse custom tips (jede Zeile ist ein Tipp)
      const parsed = customTips.split("\n").filter((tip) => tip.trim() !== "");
      console.log("Loading Screen | Using custom tips:", parsed.length, "tips");
      return parsed;
    }

    // Verwende Default-Tipps basierend auf Sprache
    console.log("Loading Screen | Using default tips for language:", language);
    return this.DEFAULT_TIPS[language] || this.DEFAULT_TIPS.en;
  }

  static getFolderImageCache(folderPath) {
    if (!folderPath) return [];

    const cache = game.settings.get(this.ID, this.SETTINGS.FOLDER_IMAGE_CACHE) || {};
    return cache[folderPath] || [];
  }

  static async setFolderImageCache(folderPath, images) {
    if (!folderPath || !Array.isArray(images) || images.length === 0) return;

    const cache = game.settings.get(this.ID, this.SETTINGS.FOLDER_IMAGE_CACHE) || {};
    const existing = cache[folderPath] || [];
    const sameImages =
      existing.length === images.length &&
      existing.every((value, index) => value === images[index]);

    if (sameImages) return;

    cache[folderPath] = images;
    await game.settings.set(this.ID, this.SETTINGS.FOLDER_IMAGE_CACHE, cache);
  }

  static async clearFolderImageCache(folderPath) {
    if (!folderPath) return;

    const cache = game.settings.get(this.ID, this.SETTINGS.FOLDER_IMAGE_CACHE) || {};
    if (!(folderPath in cache)) return;

    delete cache[folderPath];
    await game.settings.set(this.ID, this.SETTINGS.FOLDER_IMAGE_CACHE, cache);
  }

  static async clearAllFolderImageCache() {
    await game.settings.set(this.ID, this.SETTINGS.FOLDER_IMAGE_CACHE, {});
  }

  static getSceneName(scene) {
    const source = game.settings.get(this.ID, this.SETTINGS.SCENE_NAME_SOURCE);
    const hiddenName = scene?.name;
    const navigationName = scene?.navigation?.name || scene?.navName || hiddenName;

    return source === "navigation" ? navigationName || hiddenName : hiddenName || navigationName;
  }

  /**
   * Holt die Bilder aus dem passenden Ordner für die Szene
   */
  static async getImagesForScene(scene) {
    const sceneFolders = game.settings.get(
      this.ID,
      this.SETTINGS.SCENE_FOLDERS,
    ) || {};
    let folderPath = sceneFolders[scene?.id];

    if (!folderPath || folderPath.trim() === "") {
      folderPath = game.settings.get(this.ID, this.SETTINGS.IMAGE_FOLDER);
    }

    folderPath = folderPath?.trim();
    const cachedImages = this.getFolderImageCache(folderPath);
    if (!game.user.isGM && cachedImages.length > 0) {
      return cachedImages;
    }

    if (!folderPath) {
      const sceneBackground = scene?.background?.src;
      return sceneBackground ? [sceneBackground] : ["icons/svg/clockwork.svg"];
    }

    try {
      const images = await this.browseFolder(folderPath);
      if (images.length > 0) {
        if (game.user.isGM) {
          this.setFolderImageCache(folderPath, images).catch((error) =>
            console.warn(
              "Loading Screen | Unable to cache folder images:",
              folderPath,
              error,
            ),
          );
        }
        return images;
      }

      if (cachedImages.length > 0) {
        return cachedImages;
      }

      const sceneBackground = scene?.background?.src;
      return sceneBackground ? [sceneBackground] : ["icons/svg/clockwork.svg"];
    } catch (error) {
      console.error("Loading Screen | Fehler beim Laden der Bilder:", error);
      if (cachedImages.length > 0) {
        return cachedImages;
      }
      return scene?.background?.src
        ? [scene.background.src]
        : ["icons/svg/clockwork.svg"];
    }
  }

  /**
   * Durchsucht einen Ordner nach Bildern
   */
  static async browseFolder(folderPath) {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

    try {
      const browse = await browseFolderApi(folderPath);
      if (!browse || !browse.files) {
        return [];
      }

      const images = browse.files
        .map((file) => {
          if (typeof file === "string") return file;
          if (file?.path) return file.path;
          if (file?.src) return file.src;
          if (file?.name) return `${folderPath}/${file.name}`;
          return null;
        })
        .filter((file) => typeof file === "string")
        .filter((file) => {
          const normalized = file.toLowerCase();
          const ext = normalized.slice(normalized.lastIndexOf("."));
          return imageExtensions.includes(ext);
        });

      return images;
    } catch (error) {
      console.warn(
        "Loading Screen | Konnte Ordner nicht durchsuchen:",
        folderPath,
        error,
      );
      return [];
    }
  }

  /**
   * Wählt ein zufälliges Bild aus der Liste
   */
  static getRandomImage(images) {
    if (!images || images.length === 0) {
      return "icons/svg/clockwork.svg";
    }

    if (images.length === 1) {
      return images[0];
    }

    // Zufälliges Bild, aber nicht das gleiche wie vorher
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * images.length);
    } while (newIndex === this._currentImageIndex && images.length > 1);

    this._currentImageIndex = newIndex;
    return images[newIndex];
  }

  /**
   * Registriert alle Module-Einstellungen
   */
  static registerSettings() {
    // Namespace für V13 Settings-Gruppierung
    const namespace = this.ID;

    // Aktivieren/Deaktivieren
    game.settings.register(namespace, this.SETTINGS.ENABLED, {
      name: "LOADING_SCREEN.SettingEnabled",
      hint: "LOADING_SCREEN.SettingEnabledHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
      requiresReload: true,
    });

    // Standard Bilder-Ordner
    game.settings.register(namespace, this.SETTINGS.IMAGE_FOLDER, {
      name: "LOADING_SCREEN.SettingImageFolder",
      hint: "LOADING_SCREEN.SettingImageFolderHint",
      scope: "world",
      config: true,
      type: String,
      default: "",
      filePicker: "folder",
      onChange: async () => {
        if (!game.user?.isGM) return;
        await this.clearAllFolderImageCache();
      },
    });

    // Scene-spezifische Ordner (gespeichert als JSON)
    game.settings.register(namespace, this.SETTINGS.SCENE_FOLDERS, {
      scope: "world",
      config: false,
      type: Object,
      default: {},
      onChange: async () => {
        if (!game.user?.isGM) return;
        await this.clearAllFolderImageCache();
      },
    });

    // Cache für gefundene Bilder in Ordnern, damit Spieler auch darauf zugreifen können
    game.settings.register(namespace, this.SETTINGS.FOLDER_IMAGE_CACHE, {
      scope: "world",
      config: false,
      type: Object,
      default: {},
    });

    // Custom Text
    game.settings.register(namespace, this.SETTINGS.CUSTOM_TEXT, {
      name: "LOADING_SCREEN.SettingCustomText",
      hint: "LOADING_SCREEN.SettingCustomTextHint",
      scope: "world",
      config: true,
      type: String,
      default: game.i18n.localize("LOADING_SCREEN.DefaultText"),
    });

    // Fortschrittsbalken anzeigen
    game.settings.register(namespace, this.SETTINGS.SHOW_PROGRESS, {
      name: "LOADING_SCREEN.SettingShowProgress",
      hint: "LOADING_SCREEN.SettingShowProgressHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    // Fade-Dauer
    game.settings.register(namespace, this.SETTINGS.FADE_DURATION, {
      name: "LOADING_SCREEN.SettingFadeDuration",
      hint: "LOADING_SCREEN.SettingFadeDurationHint",
      scope: "world",
      config: true,
      type: Number,
      range: {
        min: 0.1,
        max: 3,
        step: 0.1,
      },
      default: 0.5,
    });

    // Tipps anzeigen
    game.settings.register(namespace, this.SETTINGS.SHOW_TIPS, {
      name: "LOADING_SCREEN.SettingShowTips",
      hint: "LOADING_SCREEN.SettingShowTipsHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    // Template Auswahl
    game.settings.register(namespace, this.SETTINGS.TEMPLATE, {
      name: "LOADING_SCREEN.SettingTemplate",
      hint: "LOADING_SCREEN.SettingTemplateHint",
      scope: "world",
      config: true,
      type: String,
      default: "standard",
      choices: {
        standard: "LOADING_SCREEN.TemplateStandard",
        minimalist: "LOADING_SCREEN.TemplateMinimalist",
        cinematic: "LOADING_SCREEN.TemplateCinematic",
        fantasy: "LOADING_SCREEN.TemplateFantasy",
      },
    });

    // Notifications während des Ladens blocken
    game.settings.register(namespace, this.SETTINGS.BLOCK_NOTIFICATIONS, {
      name: "LOADING_SCREEN.SettingBlockNotifications",
      hint: "LOADING_SCREEN.SettingBlockNotificationsHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    // Angezeigter Szenenname
    game.settings.register(namespace, this.SETTINGS.SCENE_NAME_SOURCE, {
      name: "LOADING_SCREEN.SettingSceneNameSource",
      hint: "LOADING_SCREEN.SettingSceneNameSourceHint",
      scope: "world",
      config: true,
      type: String,
      default: "hidden",
      choices: {
        hidden: "LOADING_SCREEN.SceneNameHidden",
        navigation: "LOADING_SCREEN.SceneNameNavigation",
      },
    });

    // Tipp-Rotation (Sekunden)
    game.settings.register(namespace, this.SETTINGS.TIP_ROTATION, {
      name: "LOADING_SCREEN.SettingTipRotation",
      hint: "LOADING_SCREEN.SettingTipRotationHint",
      scope: "world",
      config: true,
      type: Number,
      range: {
        min: 3,
        max: 15,
        step: 1,
      },
      default: 5,
    });

    // Benutzerdefinierte Tipps - Button/Menu
    game.settings.registerMenu(namespace, "customTipsMenu", {
      name: "LOADING_SCREEN.SettingCustomTips",
      hint: "LOADING_SCREEN.SettingCustomTipsHint",
      label: "LOADING_SCREEN.EditCustomTips",
      icon: "fas fa-edit",
      type: CustomTipsConfig,
      restricted: true,
    });

    // Speicher für Custom Tipps
    game.settings.register(namespace, this.SETTINGS.CUSTOM_TIPS, {
      scope: "world",
      config: false,
      type: String,
      default: "",
    });
  }

  /**
   * Richtet die Foundry Hooks ein
   */
  static setupHooks() {
    // Hook für Scene-Wechsel
    Hooks.on("canvasInit", (canvas) => {
      if (!game.settings.get(this.ID, this.SETTINGS.ENABLED)) return;
      this.showLoadingScreen(canvas.scene);
    });

    // Hook für Scene-Rendering abgeschlossen
    Hooks.on("canvasReady", (canvas) => {
      if (!game.settings.get(this.ID, this.SETTINGS.ENABLED)) return;
      if (canvas?.scene?.id !== this._currentSceneId) return;
      this.hideLoadingScreen();
    });

    // Standard-Loading-Dialog unterdrücken
    Hooks.on("renderSceneNavigation", () => {
      if (!game.settings.get(this.ID, this.SETTINGS.ENABLED)) return;
      const blockNotifications = game.settings.get(
        this.ID,
        this.SETTINGS.BLOCK_NOTIFICATIONS,
      );
      if (blockNotifications) {
        this.hideDefaultLoading();
      }
    });
  }

  /**
   * Zeigt den Loading Screen an
   */
  static async showLoadingScreen(scene) {
    // Entferne alten Loading Screen falls vorhanden
    this.hideLoadingScreen();

    // Lade Bilder für diese Szene
    this._currentImages = await this.getImagesForScene(scene);
    const backgroundImage = this.getRandomImage(this._currentImages);

    const customText = game.settings.get(this.ID, this.SETTINGS.CUSTOM_TEXT);
    const showProgress = game.settings.get(
      this.ID,
      this.SETTINGS.SHOW_PROGRESS,
    );
    const showTips = game.settings.get(this.ID, this.SETTINGS.SHOW_TIPS);
    const fadeDuration = game.settings.get(
      this.ID,
      this.SETTINGS.FADE_DURATION,
    );
    const template = game.settings.get(this.ID, this.SETTINGS.TEMPLATE);
    const sceneName =
      this.getSceneName(scene) || game.i18n.localize("LOADING_SCREEN.Loading");

    this._currentSceneId = scene?.id;

    // Bereite Tipps vor
    let currentTip = "";
    if (showTips) {
      this._currentTips = this.getTips();
      this._currentTipIndex = Math.floor(
        Math.random() * this._currentTips.length,
      );
      currentTip = this._currentTips[this._currentTipIndex];
    }

    const blockNotifications = game.settings.get(
      this.ID,
      this.SETTINGS.BLOCK_NOTIFICATIONS,
    );

    // Template-Daten vorbereiten
    const templateData = {
      backgroundImage,
      customText,
      sceneName,
      showProgress,
      showTips,
      fadeDuration,
      currentTip,
    };

    // Lade und rendere Template
    const loadingHTML = await this.renderTemplate(template, templateData);
    $("body").append(loadingHTML);

    if (blockNotifications) {
      this.hideDefaultLoading();
    }

    // Simuliere Fortschritt (optional)
    if (showProgress) {
      this.animateProgress();
    }

    // Starte Tipp-Rotation
    if (showTips) {
      this.startTipRotation();
    }
  }

  /**
   * Rendert das gewählte Template
   */
  static async renderTemplate(templateName, data) {
    const templatePath = `modules/loading-screen/templates/loading-screens/${templateName}.html`;

    try {
      const template = await getTemplate(templatePath);
      return template(data);
    } catch (error) {
      console.error(
        `Loading Screen | Template '${templateName}' not found, falling back to standard`,
        error,
      );
      // Fallback zu Standard-Template
      const standardTemplate = await getTemplate(
        "modules/loading-screen/templates/loading-screens/standard.html",
      );
      return standardTemplate(data);
    }
  }

  /**
   * Versteckt den Loading Screen
   */
  static hideLoadingScreen() {
    // Stoppe Tipp-Rotation
    this.stopTipRotation();

    if (this._progressInterval) {
      clearInterval(this._progressInterval);
      this._progressInterval = null;
    }

    const progressFill = document.getElementById("loading-progress-fill");
    if (progressFill) {
      progressFill.style.width = "100%";
    }

    const overlay = $("#loading-screen-overlay");
    if (overlay.length) {
      overlay.addClass("fade-out");
      setTimeout(
        () => {
          overlay.remove();
        },
        game.settings.get(this.ID, this.SETTINGS.FADE_DURATION) * 1000,
      );
    }

    const existingStyle = document.getElementById(
      "loading-screen-hide-default",
    );
    if (existingStyle) {
      existingStyle.remove();
    }
  }

  /**
   * Versteckt das Standard Foundry Loading-Popup
   */
  static hideDefaultLoading() {
    // Verstecke das Standard-Loading-Interface und optional alle Info-Notifications
    const blockNotifications = game.settings.get(
      this.ID,
      this.SETTINGS.BLOCK_NOTIFICATIONS,
    );

    const style = document.createElement("style");
    style.id = "loading-screen-hide-default";
    style.textContent = `
      #loading-bar {
        display: none !important;
      }
      ${blockNotifications ? ".notification.info { display: none !important; }" : ""}
    `;
    if (!document.getElementById("loading-screen-hide-default")) {
      document.head.appendChild(style);
    }
  }

  /**
   * Animiert den Fortschrittsbalken
   */
  static animateProgress() {
    const progressFill = document.getElementById("loading-progress-fill");
    if (!progressFill) return;

    if (this._progressInterval) {
      clearInterval(this._progressInterval);
      this._progressInterval = null;
    }

    let progress = 0;
    progressFill.style.width = "0%";

    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 98) {
        progress = 98;
      }
      progressFill.style.width = `${progress}%`;
    }, 100);

    this._progressInterval = interval;
  }

  /**
   * Startet die automatische Tipp-Rotation
   */
  static startTipRotation() {
    const rotationInterval = game.settings.get(
      this.ID,
      this.SETTINGS.TIP_ROTATION,
    );

    this._tipRotationInterval = setInterval(() => {
      this.rotateTip();
    }, rotationInterval * 1000);
  }

  /**
   * Stoppt die Tipp-Rotation
   */
  static stopTipRotation() {
    if (this._tipRotationInterval) {
      clearInterval(this._tipRotationInterval);
      this._tipRotationInterval = null;
    }
  }

  /**
   * Wechselt zum nächsten Tipp mit Animation
   */
  static rotateTip() {
    const tipElement = document.getElementById("loading-tip-text");
    if (!tipElement || this._currentTips.length === 0) return;

    // Fade out
    tipElement.classList.add("fade-out-tip");

    setTimeout(() => {
      // Wechsle zum nächsten Tipp
      this._currentTipIndex =
        (this._currentTipIndex + 1) % this._currentTips.length;
      tipElement.textContent = this._currentTips[this._currentTipIndex];

      // Fade in
      tipElement.classList.remove("fade-out-tip");
      tipElement.classList.add("fade-in-tip");

      setTimeout(() => {
        tipElement.classList.remove("fade-in-tip");
      }, 300);
    }, 300);
  }
}

// Initialisierung beim Foundry-Start
Hooks.once("init", () => {
  console.log("Loading Screen System | Initialisierung");
  LoadingScreenManager.initialize();

  // Registriere Scene Config Tab mit lib-wrapper
  registerSceneConfigTab();
});

Hooks.once("ready", () => {
  console.log("Loading Screen System | Bereit");
});
