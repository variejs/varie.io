import { inject, injectable } from "inversify";
import { VueRouter } from "vue-router/types/router";
import RouterInterface from "varie/lib/routing/RouterInterface";
import { DocumentationServiceInterface } from "@app/contracts/DocumentationServiceInterface";

@injectable()
export default class DocumentationService
  implements DocumentationServiceInterface {
  public $router: VueRouter;

  constructor(@inject("routerService") router: RouterInterface) {
    this.$router = router.getRouter();
  }

  getVersions() {
    let versions = [];
    let versionDirectories = require.context(
      `@resources/docs/`,
      true,
      /menu.md/,
    );
    versionDirectories.keys().forEach((versionDirectory) => {
      versions.push(versionDirectory.replace("./", "").replace(/\/.*/, ""));
    });

    return versions;
  }

  menu(version) {
    try {
      let menuTemplate = require(`@resources/docs/${version}/menu.md`)
        .replace(/<a/g, "<router-link")
        .replace(/a>/g, "router-link>")
        .replace(/href/g, "to")
        .replace(/%7B%7Bversion%7D%7D/g, version);

      // ADDING MOBILE MENU
      return `<div><ul><li><input id="menu-search" type="text" placeholder="Search" name="search"></li></ul>${menuTemplate}</div>`;
    } catch (err) {
      this.$router.push("/404");
    }
  }

  page(version: string, page: string) {
    try {
      let markdownPage = require(`@resources/docs/${version}/${page}.md`).replace();

      markdownPage = this._renderRouterLinks(markdownPage, version);
      markdownPage = this._renderCustomClasses(markdownPage);
      markdownPage = this._removeVueRenderings(markdownPage);

      markdownPage = `<div>${markdownPage}</div>`;

      return markdownPage;
    } catch (err) {
      return false;
    }
  }

  private _renderRouterLinks(html, version) {
    let routeName = this.$router.currentRoute.name;
    let routeParams = Object.assign({}, this.$router.currentRoute.params, {
      replaced: false,
    });

    return html
      .replace(
        /href="#(.*)"/g,
        `:to='{
            name : "${routeName}",
            params : ${JSON.stringify(routeParams)},
            hash : "#$1"
          }'`.replace(/\r?\n|\r/g, ""),
      )
      .replace(/<li>(<a.*)<\/li>/g, '<li class="has-link">$1</li>')
      .replace(/<a (:to.*)>(.*)<.*\/a>/g, "<router-link $1>$2</router-link>")
      .replace(/%7B%7Bversion%7D%7D/g, version);
  }

  private _renderCustomClasses(html) {
    return html.replace(/\[{\.(.*)}(.*)\]/g, '<div class="$1">$2</div>');
  }

  private _removeVueRenderings(html) {
    return html
      .replace(/{{/g, "<span>&#123;&#123;</span>")
      .replace(/}}/g, "<span>&#125;&#125;</span>");
  }
}
