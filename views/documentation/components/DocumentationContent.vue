<template>
  <keep-alive>
    <div
      class="content documentation__content"
      ref="content"
      id="documentation"
    >
      <component
        :is="pageMenu"
        v-if="pageMenu && pageMenu.template"
      ></component>
      <component :is="content" v-if="content && content.template"></component>
      <not-found v-if="!content"></not-found>
    </div>
  </keep-alive>
</template>

<script>
import Prism from "prismjs";
import throttle from "lodash.throttle";
import VersionMixin from "@views/documentation/mixins/VersionMixin";
import goToDocumentationHash from "@app/helpers/goToDocumentationHash";

export default {
  mixins: [VersionMixin],
  $inject: ["DocumentationService"],
  mounted() {
    if (this.$route.hash) {
      this.goToHash();
    }
    this.$refs.content.addEventListener("scroll", this.onScroll);
  },
  watch: {
    content() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    },
  },
  methods: {
    goToHash() {
      this.$nextTick(() => {
        goToDocumentationHash(this.$route.hash);
      });
    },
    onScroll: throttle(function() {
      this.setActiveHash();
    }, 100),
    setActiveHash() {
      const anchors = [].slice.call(
        document.querySelectorAll(
          ".documentation__content h2[id], .documentation__content h3[id]",
        ),
      );

      let currentScroll = this.$refs.content.scrollTop;

      for (let i = 0; i < anchors.length; i++) {
        if (currentScroll === 0) {
          this.setHash();
          return;
        }

        const currentAnchor = anchors[i];
        const nextAnchor = anchors[i + 1];

        if (
          !nextAnchor ||
          (currentAnchor.offsetTop >= currentScroll &&
            currentAnchor.offsetTop < nextAnchor.offsetTop &&
            this.$route.hash !== currentAnchor.hash)
        ) {
          this.setHash(currentAnchor.id);
          return;
        }
      }
    },
    setHash(id) {
      history.replaceState(
        undefined,
        undefined,
        `${this.$route.path}${id ? `#${id}` : ""}`,
      );
    },
  },
  computed: {
    page() {
      return (
        this.$route.params.page || $config.get("documentation.defaultPage")
      );
    },
    content() {
      return {
        template: this.documentationService.page(this.version, this.page),
      };
    },
    pageMenu() {
      return {
        template: this.documentationService.pageMenu(this.version, this.page),
      };
    },
  },
  beforeDestroy() {
    this.$refs.content.removeEventListener("scroll", this.onScroll);
  },
};
</script>
