<script lang="ts" setup>
  import { BoardListStore } from "@/stores/list";
  import { storeToRefs } from "pinia";

  import { computed, onMounted, ref } from "vue";

  import { reactive, toRefs } from 'vue';  // 프로필 icon, title

  import { Iphone, Location, OfficeBuilding, Tickets, User } from '@element-plus/icons-vue';  // icon image
  
  onMounted(() => { //구성 요소가 마운트된 후 호출될 콜백을 등록, 구성 요소가 초기 렌더링을 완료하고 코드 실행
    readprofile()
  })

  const store:any = BoardListStore() // 저장소의 상태, 작업 가능
  const { ListAll } = storeToRefs(store) // 구조분해할당
  const { readprofile } = store // store에서 함수 받아오기

  const state = reactive({
    circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  })

  const { circleUrl } = toRefs(state)
    
</script>

<template>
<!----------------------------------------------------------------------------------->
  <el-row class="demo-avatar demo-basic">
    <el-col :span="3">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="70" :src="circleUrl" />
        </div>
        <div class="sub-title" v-for="(item, i) of ListAll" :key="i">
          {{ item.name }}
        </div>
      </div>
    </el-col>
  </el-row>
  <div style="margin: 20px 0"></div>
<!----------------------------------------------------------------------------------->
  <el-descriptions title="About" :column="3" border>
    <template  #extra>
      <router-link :to="{path:'/readabout', name: 'readabout', params: ListAll}">
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
      </template>
      <div v-for="(item, i) of ListAll" :key="i">
        {{ item.name }}
      </div>
    </el-descriptions-item>
    <!-- 생년월일 -->
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><Clock /></el-icon>
          Date of birth
        </div>
      </template>
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.date }}
      </div>
    </el-descriptions-item>
    <!-- 성별 -->
    <el-descriptions-item>
      <template #label>
          <div class="cell-item"> 
            <el-icon><Male /></el-icon>
            Gender
          </div>
      </template>
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.gender }}
      </div>
    </el-descriptions-item>
    <!-- 주소 -->    
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><Compass /></el-icon>
          Address
        </div>
      </template>
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.address }}
      </div>
    </el-descriptions-item>
<!-- 전화번호 -->    
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><iphone /></el-icon>
          Telephone
        </div>
      </template>
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.phnum }}
      </div>
    </el-descriptions-item>
<!-- 이메일 -->
<el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><ChromeFilled /></el-icon>
          Email
        </div>
      </template>
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.email }}
      </div>
    </el-descriptions-item>
<!-- 학력사항 -->  
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><School /></el-icon>
          Education
        </div>
      </template>
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.edu }}
      </div>
    </el-descriptions-item>

  </el-descriptions>
  <div style="margin: 20px 0"></div>
<!-------------------------------------- 기술 사항 -------------------------------------->  
  <el-descriptions title="Skill" direction="vertical" :column="1" border>
    <template #extra>
      <router-link :to="{path:'/readskill', name: 'readskill', params: ListAll}">
        <el-icon size="large" color="black"><Edit /></el-icon>
      </router-link>
    </template>
    <el-descriptions-item label="Front-end">
      <div v-for="(item, i) of ListAll" :key="i">
        {{ item.front }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Back-end">
      <div v-for="(item, i) of ListAll" :key="i">
        {{ item.back }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="DataBase">
      <div v-for="(item, i) of ListAll" :key="i">
        {{ item.db }}
        </div>
    </el-descriptions-item>
  </el-descriptions>
  <div style="margin: 20px 0"></div>
  <!-------------------------------------- 프로젝트 -------------------------------------->
  <el-descriptions title="Project" direction="vertical" :column="3" border >
    <template #extra>
      <router-link :to="{path:'/readproject', name: 'readproject', params: ListAll}">
        <el-icon size="large" color="black"><Edit /></el-icon>
      </router-link>
    </template>   
    <el-descriptions-item label="Project name">
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.pname }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Project content">
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.pcontent }}
      </div>
    </el-descriptions-item>
  </el-descriptions>
  <div style="margin: 20px 0"></div>
  <!-------------------------------------- 경력 사항 -------------------------------------->
  <el-descriptions title="Career" direction="vertical" :column="3" border >
    <template #extra>
      <router-link :to="{path:'/readCareer', name: 'readcareer', params: ListAll}">
        <el-icon size="large" color="black"><Edit /></el-icon>
      </router-link>
    </template>   
    <el-descriptions-item label="Company">
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.company }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Period ">
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.period }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Remark">
      <div v-for="(item, i) of ListAll" :key="i">
      {{ item.remark}}
      </div>
      </el-descriptions-item>
  </el-descriptions>
</template>

<style>
.editbtn {
  float: right;
  margin-right: 1px;
}

.projecttitle {
  float: left;
  margin-top: 0px;
  margin-bottom: 8px;
}

.btn {
  width:300px;
  margin:  auto;
} 

/* 프로필 icon, title style */
  .demo-basic--circle { /* 프로필 사진 */
    margin-left : 700px;
  }

  .demo-basic .sub-title {
    margin-top: 15px;
    font-size: 30px;
    color: var(--el-text-color-secondary);
  }
  .demo-basic .demo-basic--circle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .demo-basic .el-col:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
    margin-left: 100px;
  }
/* 프로젝트 카드 style */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: 14px;
  }

  .box-card {
    margin-left: 50px;
    width: 500px;
  }
  .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}


</style>
