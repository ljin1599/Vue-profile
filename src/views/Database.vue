<script lang="ts" setup>
  import { BoardListStore } from "@/stores/list";
  import { storeToRefs } from "pinia";

  import { onMounted } from "vue";

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
    <el-col :span="6">
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
<!----------------------------------------------------------------------------------->  
<div v-for="(item, i) of ListAll" :key="i">
<div v-if="item.front !== undefined">
  <el-descriptions title="skill" direction="vertical" :column="1" border>
    <template #extra>
      <router-link :to="{path:'/skill', name: 'skill', params: item}">
        <el-icon size="large" color="black"><Edit /></el-icon>
      </router-link>
    </template>
    <el-descriptions-item label="DataBase">
      {{ item.db }}
    </el-descriptions-item>
  </el-descriptions>
  </div>
  </div>
</template>

<style>
.btn {
  width:300px;
  margin:  auto;
} 

/* 프로필 icon, title style */
  .demo-basic .sub-title {
    margin-bottom: 20px;
    font-size: 30px;
    color: var(--el-text-color-secondary);
  }
  .demo-basic .demo-basic--circle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .demo-basic .block {
    margin-left : 10px;
  }
  .demo-basic .el-col:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
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
