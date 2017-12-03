import { injectable } from 'inversify'
import { DocumentationServiceInterface } from '@app/contracts/DocumentationServiceInterface'

@injectable()
export default class DocumentationService implements DocumentationServiceInterface {

  getVersions() {
      let versions = [];
      let versionDirectories = require.context(`@resources/docs/`, true, /menu.md/);
      versionDirectories.keys().forEach((versionDirectory) => {
          versions.push(versionDirectory.replace('./', '').replace(/\/.*/, ''));
      });

      return versions;
  }

  menu(version) {
    return require(`@resources/docs/${version}/menu.md`)
        .replace(/<a/g, '<router-link')
        .replace(/a>/g, 'router-link>')
        .replace(/href/g, 'to')
        .replace(/{{version}}/g, version);
  }

  page(version :string , page : string) {
    return require(`@resources/docs/${version}/${page}.md`);
  }
}