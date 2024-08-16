<script setup lang="ts">
import AppEditor from '../components/AppEditor.vue'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CSSWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HTMLWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') return new JSONWorker()

    if (label === 'css') return new CSSWorker()

    if (label === 'html') return new HTMLWorker()

    if (label === 'typescript' || label === 'javascript') return new TSWorker()

    return new EditorWorker()
  }
}
</script>

<template>
  <h3>Editor</h3>
  <AppEditor language="javascript" />
</template>

<style scoped>
h3 {
  margin: 0;
  padding: 0;
  padding: 10px 0;
}
</style>
