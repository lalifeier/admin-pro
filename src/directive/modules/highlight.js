export default {
  bind (el, binding) {
    highlight(el, binding)
  },

  update (el, binding) {
    highlight(el, binding)
  }
}

function highlight (el, binding) {
  const info = binding.value.info || []
  if (info.length === 0) {
    return
  }
  const word = el.innerText
  // for (const item of info) {
  // const { label, keyword_id } = item
  // const color = keyword_id ? 'red' : 'blue'
  // const light = `<span style ="color:${color};">\$1</span>`
  // const reg = new RegExp('(\\b' + (label || '').trim() + '\\b)', 'ig')
  // word = word.replace(reg, light)
  // }
  el.innerHTML = word
}
