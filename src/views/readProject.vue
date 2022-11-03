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
    <el-col :span="3">
      <div class="demo-basic--circle">
        <div class="block">
          <router-link :to="{path: '/Project', name: 'project'}">
          <el-avatar :size="70" :src="circleUrl" />
          </router-link>
        </div>
        <div class="sub-title" v-for="(item, i) of ListAll" :key="i">
          {{ item.name }}
        </div>
      </div>
    </el-col>
  </el-row>

  <div style="margin: 20px 0"></div>
  
  <div v-for="item of ListAll" :key="item.id">
    <div v-if="item.pname !== undefined">
      <el-descriptions title="project" direction="vertical" :column="1" border >
        <template #extra>
          <router-link :to="{path:'/project', name: 'project', params: item}">
            <el-icon size="large" color="black"><Edit /></el-icon>
          </router-link>
        </template>
        
        <!-- 프로젝트 이름 --> 
        <el-descriptions-item label="Project name">
          {{ item.pname }}
        </el-descriptions-item>
        <!-- 프로젝트 내용 및 기간 --> 
        <el-descriptions-item label="Project content">
          {{ item.pcontent}}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
