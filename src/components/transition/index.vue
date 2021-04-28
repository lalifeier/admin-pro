<template>
  <transition
    v-if="!disabled"
    :enter-active-class="`animate__animated ${enterAnimate}`"
    :leave-active-class="`animate__animated ${leaveAnimate}`"
  >
    <slot></slot>
  </transition>
  <div v-else><slot></slot></div>
</template>

<script>
import { ANIMATES as animates } from '@/utils/constants'

export default {
  name: 'PageToggleTransition',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    animate: {
      type: String,
      validator(value) {
        return animates.findIndex((item) => item.value === value) !== -1
      },
      default: 'bounce',
    },
    direction: {
      type: String,
      validator(value) {
        return (
          [
            'x',
            'y',
            'left',
            'right',
            'up',
            'down',
            'downLeft',
            'upRight',
            'downRight',
            'upLeft',
            'downBig',
            'upBig',
            'downLeft',
            'downRight',
            'topRight',
            'bottomLeft',
            'topLeft',
            'bottomRight',
            'default',
          ].indexOf(value) > -1
        )
      },
      default: '',
    },
    reverse: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    enterAnimate() {
      return this.activeClass(false)
    },
    leaveAnimate() {
      return this.activeClass(true)
    },
  },
  methods: {
    activeClass(isLeave) {
      const animate = animates.find((item) => this.animate === item.value)
      if (animate === undefined) {
        return ''
      }
      let direction = ''
      if (this.direction === undefined) {
        direction = animate.directions[0]
      } else {
        direction = animate.directions.find((item) => item === this.direction)
      }
      direction = direction === undefined || direction === 'default' ? '' : direction
      if (direction !== '') {
        direction = isLeave && this.reverse ? this.reversePosition(direction, animate.directions) : direction
        direction = direction[0].toUpperCase() + direction.substring(1)
      }
      const t = isLeave ? 'Out' : 'In'
      return 'animate__' + this.animate + t + direction
    },
    reversePosition(direction, directions) {
      if (direction.length === 0 || direction === 'x' || direction === 'y') {
        return direction
      }
      let index = directions.indexOf(direction)
      index = index % 2 === 1 ? index - 1 : index + 1
      return directions[index]
    },
  },
}
</script>
