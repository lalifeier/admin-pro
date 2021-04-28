import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'

export function changeColor(val) {
  const options = {
    newColors: forElementUI.getElementUISeries(val),
  }
  return client.changer.changeColor(options, Promise).then(() => {
    console.log('Theme colors changed!')
  })
}
