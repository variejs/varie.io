<template>
    <div class="wrapper">
        <documentation-menu></documentation-menu>
        <documentation-content></documentation-content>
    </div>
</template>

<script>
import DocumentationMenu from './components/DocumentationMenu'
import DocumentationContent from './components/DocumentationContent'
  export default {
    components : {
      DocumentationMenu,
      DocumentationContent
    },
  }
</script>
