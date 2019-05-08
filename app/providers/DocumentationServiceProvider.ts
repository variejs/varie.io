import { injectable } from "inversify";
import { ServiceProvider } from "varie";
import DocumentationService from "@app/services/DocumentationService";

/*
|--------------------------------------------------------------------------
| App Service Provider
|--------------------------------------------------------------------------
| You can bind various items to the app here, or can create other
| custom providers that bind the container
|
*/
@injectable()
export default class DocumentationServiceProvider extends ServiceProvider {
  public register() {
    this.app.singleton("DocumentationService", DocumentationService);
  }
}
