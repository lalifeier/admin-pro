export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'

export const PALETTES = ['#1890ff', '#f5222d', '#fa541c', '#fadb14', '#3eaf7c', '#13c2c2', '#722ed1', '#eb2f96']

// export const palettes = Object.freeze({

// })

const direct_s = ['left', 'right']
const direct_1 = ['left', 'right', 'down', 'up']
const direct_1_b = ['downBig', 'upBig', 'leftBig', 'rightBig']
const direct_2 = ['topLeft', 'bottomRight', 'topRight', 'bottomLeft']
const direct_3 = ['downLeft', 'upRight', 'downRight', 'upLeft']

export const ANIMATES = [
  { value: 'back', label: '渐近', directions: direct_1 },
  { value: 'bounce', label: '弹跳', directions: direct_1.concat('default') },
  { value: 'fade', label: '淡化', directions: direct_1.concat(direct_1_b).concat(direct_2).concat('default') },
  { value: 'flip', label: '翻转', directions: ['x', 'y'] },
  { value: 'lightSpeed', label: '光速', directions: direct_s },
  { value: 'rotate', label: '旋转', directions: direct_3.concat('default') },
  { value: 'roll', label: '翻滚', directions: ['default'] },
  { value: 'zoom', label: '缩放', directions: direct_1.concat('default') },
  { value: 'slide', label: '滑动', directions: direct_1 }
]
