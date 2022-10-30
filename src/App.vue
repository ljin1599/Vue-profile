<script setup lang="ts">
  import {
    Document,
  } from '@element-plus/icons-vue'

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header style="text-align: left; font-size: 12px">
      </el-header>
      <el-container>
        <el-aside width="200px">
        <el-row>
    <el-col :span="24">
      <el-menu
        default-active="2"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><document /></el-icon>
            <router-link to="/"><span>Main</span></router-link>
          </template>
            <router-link to="/readabout"><el-menu-item index="1-2">About</el-menu-item></router-link>
            <el-sub-menu index="1-3">
              <template #title>
                <router-link to="/readskill"><span>Skill</span></router-link>
                </template>
                  <router-link to="/frontend"><el-menu-item index="1-3-1">Frontend</el-menu-item></router-link>
                  <router-link to="/backend"><el-menu-item index="1-3-2">Backend</el-menu-item></router-link>
                  <router-link to="/database"><el-menu-item index="1-3-3">Database</el-menu-item></router-link>
            </el-sub-menu>
            <router-link to="/readproject"><el-menu-item index="1-4">Project</el-menu-item></router-link>
            <router-link to="/readcareer"><el-menu-item index="1-5">Career</el-menu-item></router-link>
        </el-sub-menu>
      <div v-for="i in 12" :key="i">
        <el-menu-item disabled></el-menu-item>
      </div>
      </el-menu>
    </el-col>
  </el-row>
        </el-aside>
        <el-main>
          <router-view name="a"></router-view>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style >
.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-success);
}

.el-main {
  padding: 10px;
}


</style>
