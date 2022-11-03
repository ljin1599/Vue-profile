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
          <router-link :to="{path:'/About', name: 'about'}">
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
    <div v-if="item.name !== undefined">
      <el-descriptions  title="about" :column="1" row border >
        <template #extra >
          <router-link :to="{path:'/about', name: 'about', params: item}">
            <el-icon size="large" color="black"><Edit /></el-icon>
          </router-link>
        </template>
        
        <!-- 이름 -->  
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><user /></el-icon>
              Username
            </div>
          </template >
          {{ item.name }}
        </el-descriptions-item>
        <!-- 생년월일 -->
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><Clock /></el-icon>
              Date of birth
            </div>
          </template>
          {{ item.date }}
        </el-descriptions-item>
        <!-- 성별 -->
        <el-descriptions-item>
          <template #label>
              <div class="cell-item"> 
                <el-icon><Male /></el-icon>
                Gender
              </div>
          </template>
          {{ item.gender }}
        </el-descriptions-item>
        <!-- 주소 -->    
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><Compass /></el-icon>
              Address
            </div>
          </template>
          {{ item.address }}
        </el-descriptions-item>
        <!-- 전화번호 -->    
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><iphone /></el-icon>
              Telephone
            </div>
          </template>
          {{ item.phnum }}
        </el-descriptions-item>
        <!-- 이메일 -->
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><ChromeFilled /></el-icon>
              Email
            </div>
          </template>
          {{ item.email }}
        </el-descriptions-item>
        <!-- 학력사항 -->  
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><School /></el-icon>
              Education
            </div>
          </template>
          {{ item.edu }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
