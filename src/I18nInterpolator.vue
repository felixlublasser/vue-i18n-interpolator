<template>
  <span>
    <template v-for="fragment in fragments">
      <slot :name="fragment.name" v-bind="fragment">
        {{ fragment.text }}
      </slot>
    </template>
  </span>
</template>

<script>
export default {
  props: {
    string: {
      type: String,
      required: true
    }
  },
  computed: {
    fragments () {
      const regex = /#[a-zA-Z]+\{[^}]*\}/g
      var text = this.string.split(regex)
      var placeholders = this.string.match(regex)
      return text.reduce((fragments, text, i) => {
        if (text) {
          fragments.push({ name: 'text', text })
        }
        if (placeholders && placeholders.length > i && placeholders[i]) {
          fragments.push({
            name: placeholders[i].match(/#([a-zA-Z]+)\{/)[1],
            ...JSON.parse(placeholders[i]
              .replace(/#[a-zA-Z]+{/, '{') // remove slot name
              .replace(/(^{|:|,)\s/g, (_, p1) => p1) // remove whitespace
              .replace(/\s}$/g, '}') // remove more whitespace
              .replace(/(^{|(?:[^\\]"|[^\\]'),)'?([^,:'"]+)'?:/g, (_, p1, p2) => `${p1}"${p2}":`) // force "" around keys
              .replace(/:'((?:[^']|\\')+)'(,"|}$)/g, (_, p1, p2) => { // force "" around single quoted values
                return `:"${p1.replace(/"/g, '\\"').replace(/\\'/g, "'")}"${p2}` // inside them, replace \' with ' and " with \"
              })
            )
          })
        }
        return fragments
      }, [])
    }
  }
}
</script>
