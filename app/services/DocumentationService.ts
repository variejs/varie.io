import { inject, injectable } from "inversify";
import { VueRouter } from "vue-router/types/router";
import RouterInterface from "varie/lib/routing/RouterInterface";
import { DocumentationServiceInterface } from "@app/contracts/DocumentationServiceInterface";

@injectable()
export default class DocumentationService
  implements DocumentationServiceInterface {
  public $router: VueRouter;

  constructor(@inject("$router") router: RouterInterface) {
    this.$router = router.getRouter();
  }

  getVersions() {
    let versions = [];
    let versionDirectories = require.context(
      `@resources/docs/`,
      true,
      /menu.md/
    );
    versionDirectories.keys().forEach(versionDirectory => {
      versions.push(versionDirectory.replace("./", "").replace(/\/.*/, ""));
    });

    return versions;
  }

  menu(version) {
    try {
      return require(`@resources/docs/${version}/menu.md`)
        .replace(/<a/g, "<router-link")
        .replace(/a>/g, "router-link>")
        .replace(/href/g, "to")
        .replace(/%7B%7Bversion%7D%7D/g, version);
    } catch (err) {
      this.$router.push("/404");
    }
  }

  page(version: string, page: string) {
    try {
      return require(`@resources/docs/${version}/${page}.md`)


    } catch (err) {
      return false;
    }
  }
}
