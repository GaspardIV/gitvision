<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";


const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="switch-container">
    <input
      type="checkbox"
      id="theme-toggle"
      :checked="isDark"
      @click="toggleDark()"
    />
    <label for="theme-toggle">
      <span><img src="@/assets/sun-solid.svg" alt="theme" /></span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.switch-container {
  margin-right: 10px;
  background-size: 90% 90%;
  border: 0;
  bottom: 0;
  cursor: pointer;
  min-width: 58px;
  min-height: 34px;
  //padding-right: 0;
  //padding-top: 0;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  transition: background-color .05s ease;
  -webkit-transition: background-color .05s ease;
  z-index: 9999;
  border-radius: 8px;
  touch-action: manipulation;
}

#theme-toggle {
  display: none;

  & + label {
    display: flex;
    height: 1.5em;
    width: 3em;
    border-radius: 1em;
    background-color: var(--vt-c-sand);
    border: 0.125em solid hsl(207, 30%, 95%);

    span {
      border-radius: 50%;
      height: 1.1em;
      width: 1.1em;
      transition: 0.2s;
      cursor: pointer;
      margin-left: 0.2em;
    }
  }

  &:checked {
    & + label {
      border-color: hsl(207, 30%, 50%);
      background: transparent;

      img {
        display: none;
      }

      span {
        transform: translateX(1.2em);
        box-shadow: inset -0.1675em -0.1875em 0 0 #fbe7ef,
        inset -0.3625em -0.2625em 0 0 #fffff7;
      }
    }
  }
}
</style>
