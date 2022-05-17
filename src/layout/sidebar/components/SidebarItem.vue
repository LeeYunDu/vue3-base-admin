<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="isChild">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          style="
            white-space: pre-wrap;
            line-height: 24px !important;
            padding: 13px 28px 13px 0px;
            height: auto !important;
          "
        >
          <!-- child -->
          <el-badge :hidden="!badgeNum" :value="badgeNum" :max="badgeMax">
            <span>{{ onlyOneChild.meta.title }}</span>
          </el-badge>
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title>
        <!-- parent -->
        <el-badge :hidden="!badgeNum" :value="badgeNum" :max="badgeMax">
          <span>{{ item.meta.title }}</span>
        </el-badge>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.code"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>
<script lang='ts'>
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  toRefs
} from 'vue'
import AppLink from './Link.vue'

import { RouteRecordRaw, useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import path from 'path'
import { isExternal } from '@/utils/regular'
import store from '@/store'

export default defineComponent({
  components: {
    SidebarItem,
    AppLink
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { item } = toRefs(props)
    const router = useRouter()
    const navTo = (path) => {
      router.push({ path: `${props.basePath}/${path}` })
    }
    const onlyOneChild = ref({})
    const hasOneShowingChild = (children = [], parent) => {
      const showingChildren = children.filter((item) => {
        if ((item as any).hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }

    const resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return `/${routePath}`
      }
      return path.resolve(props.basePath, routePath)
    }

    const isChild = computed(
      () =>
        hasOneShowingChild(item.value.children, item.value) &&
        (!(onlyOneChild.value as any).children ||
          (onlyOneChild.value as any).noShowingChildren) &&
        !item.value.alwaysShow
    )

    const badgeNum = computed(() => store.getters['badge/badgeNumMap'][item.value.name] || 0)
    const badgeMax = computed(() => store.getters['badge/badgeMax'])
    return {
      navTo,
      hasOneShowingChild,
      onlyOneChild,
      resolvePath,
      isChild,
      badgeNum,
      badgeMax
    }
  }
})
</script>
<style lang="scss">
.menu-item-box {
  display: flex;
  align-items: center;
}
.el-scrollbar__view > .el-menu > .menu-wrapper {
  .el-sub-menu .el-sub-menu__title {
    padding: 13px 28px 13px 20px;
    white-space: pre-wrap;
    line-height: 24px !important;
    height: auto !important;
    min-width: 153px;
  }
  .el-badge {
    line-height: 24px !important;
  }
  .el-badge__content.is-fixed {
    right: 5px;
  }

  &:first-child {
    .el-menu-item {
      // font-size: 18px;
      // font-weight: 600;

      .svg-icon {
        display: none;
      }
    }
  }
}
</style>
