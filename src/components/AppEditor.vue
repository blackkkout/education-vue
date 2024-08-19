<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import * as monaco from 'monaco-editor'
import { useCodeStore } from '@/store/code'

const { language } = defineProps<{
  language: string
}>()

const editorContainer = ref(null)
let editor: monaco.editor.IStandaloneCodeEditor
const output = ref('')

const codeStore = useCodeStore()
const { code } = storeToRefs(codeStore)
const { setCode } = codeStore

const initializeEditor = () => {
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: '',
      language,
      theme: 'vs-dark'
    })

    if (code.value) {
      editor.setValue(code.value)
    }

    editor.onDidChangeModelContent(
      useDebounceFn(() => {
        setCode(editor.getValue())
      }, 500)
    )
  }
}

const runCode = () => {
  if (editor) {
    const code = editor.getValue()
    output.value = ''

    const originalLog = console.log
    console.log = (...args) => {
      output.value += args.join(' ') + '\n'
    }

    try {
      eval(code)
    } catch (error) {
      output.value = 'Error'
    } finally {
      console.log = originalLog
    }
  }
}

onMounted(() => {
  initializeEditor()
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})
</script>

<template>
  <div ref="editorContainer" class="editor-container"></div>
  <button @click="runCode">Run</button>
  <div>
    <h4>Result</h4>
    <div class="output">{{ output }}</div>
  </div>
</template>

<style scoped>
.editor-container {
  width: 100%;
  height: 400px;
}

.output {
  height: 200px;
  overflow: auto;
  background-color: #1e1e1e;
}
</style>
