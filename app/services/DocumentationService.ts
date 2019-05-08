import { inject, injectable } from "inversify";
import { VueRouter } from "vue-router/types/router";
import RouterInterface from "varie/lib/routing/RouterInterface";

@injectable()
export default class DocumentationService {
  public $router: VueRouter;

  constructor(@inject("RouterService") router: RouterInterface) {
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

      // ADDING MOBILE SEARCH TO MENU
      return `<div><ul class="search-area"><li><input id="menu-search" type="text" placeholder="Search" name="search"></li></ul>${menuTemplate}</div>`;
    } catch (err) {
      console.info(err);
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

  pageMenu(version: string, page: string) {
    let markdownPage = require(`@resources/docs/${version}/${page}.md`);

    let menu = `<h1 class="text-capitalize">${page.replace(
      "-",
      " ",
    )}</h1>`;

    let matches = markdownPage.match(/<h(1|2|3).*/g);

    if (matches) {
      matches.forEach((menuItem) => {
        menu += menuItem.replace(
          /<h(\d) id="(.*)">(.*)<.*>/,
          "<li class='documentation__content__links__level--$1'><a href=\"#$2\">$3</a></li>\n",
        );
      });
    }

    menu = this._renderRouterLinks(menu, version);

    return `<ul class="documentation__content__links">${menu}</ul>`;
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
      .replace(/<li(.*)>(<a.*)<\/li>/g, "<li $1>$2</li>")
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
