function getCodeTitle(meta) {
  if (!meta) {
    return ''
  }

  const titleMatch = meta.match(/(?:^|\s)title=(?:"([^"]+)"|'([^']+)'|([^\s]+))/)
  return titleMatch?.[1] ?? titleMatch?.[2] ?? titleMatch?.[3] ?? ''
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function remarkCodeTitle() {
  return (tree) => {
    function visit(node) {
      if (!node || !Array.isArray(node.children)) {
        return
      }

      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index]

        if (child?.type === 'code') {
          const title = getCodeTitle(child.meta)

          if (title) {
            node.children.splice(index, 0, {
              type: 'html',
              value: `<span class="code-title-source" data-code-title="${escapeAttribute(title)}"></span>`,
            })
            index += 1
          }
        }

        visit(child)
      }
    }

    visit(tree)
  }
}
