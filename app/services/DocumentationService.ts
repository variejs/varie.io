import { injectable } from 'inversify'
import { DocumentationServiceInterface } from '@app/contracts/DocumentationServiceInterface'

@injectable()
export default class DocumentationService implements DocumentationServiceInterface {

  menu(version) {
    return require(`@resources/docs/${version}/menu.md`);
  }

  page(version :string , page : string) {
    return require(`@resources/docs/${version}/${page}.md`);
  }
}