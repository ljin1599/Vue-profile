<script lang="ts" setup>
  import { BoardListStore } from "@/stores/list";
  import { storeToRefs } from "pinia";

  import { onMounted } from "vue";

  import { reactive, toRefs } from 'vue';  // 프로필 icon, title

  const store:any = BoardListStore() // 저장소의 상태, 작업 가능
  const { ListAll } = storeToRefs(store) // 구조분해할당
  const { readprofile } = store // store에서 함수 받아오기

  const state = reactive({
    circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  })

  const { circleUrl } = toRefs(state)

  onMounted(() => { //구성 요소가 마운트된 후 호출될 콜백을 등록, 구성 요소가 초기 렌더링을 완료하고 코드 실행
    readprofile()
  })
</script>

<template>
  <el-row class="demo-avatar demo-basic">
    <el-col :span="6">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="70" :src="circleUrl" />
        </div>
        <div class="sub-title" v-for="(item, i) of ListAll" :key="i">{{ item.name }}</div>
      </div>
    </el-col>
  </el-row>

  <div v-for="(item, i) of ListAll" :key="i">
    <div v-if="item.front !== undefined">
      <el-descriptions title="skill" direction="vertical" :column="1" border>
        <template #extra>
          <router-link :to="{path:'/skill', name: 'skill', params: item}">
            <el-icon size="large" color="black"><Edit /></el-icon>
          </router-link>
        </template>
        <!-- Database -->
        <el-descriptions-item label="DataBase">
          {{ item.db }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
