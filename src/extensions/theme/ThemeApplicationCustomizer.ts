import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderProvider, PlaceholderName, PlaceholderContent
} from '@microsoft/sp-application-base';
import styles from './Theme.module.scss';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IThemeApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ThemeApplicationCustomizer
  extends BaseApplicationCustomizer<IThemeApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    return Promise.resolve();
  }

  @override
  public onPlaceholdersChanged(placeholderProvider: PlaceholderProvider): void {
    // Only render once
    if (!this._topPlaceholder) {
      this._topPlaceholder = placeholderProvider.tryCreateContent(PlaceholderName.Top);
      const themeElement = document.createElement("div");
      themeElement.classList.add(styles.themeContainer);
      this._topPlaceholder.domElement.appendChild(themeElement);
    }
  }
}
