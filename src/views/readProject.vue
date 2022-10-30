<script lang="ts" setup>
  import { computed, ref } from "vue"
  import { BoardListStore } from "@/stores/list";
  import { storeToRefs } from "pinia";

  import { onMounted } from "vue";

  import { reactive, toRefs } from 'vue';  // 프로필 icon, title
  
  const store:any = BoardListStore() // 저장소의 상태, 작업 가능
  const { ListAll } = storeToRefs(store) // 구조분해할당
  const { readprofile } = store // store에서 함수 받아오기

  const viewpage = 5  // 테이블에 표시 될 게시물 수

  const selectpage:any = ref(1) // pager 클릭시 page 값을 불러오는데 첫 페이지는 받지 못하기 때문에  첫 번째 페이지인 1을 기본값으로 설정 //ref = 반응형 상태 정의 

    // 페이지 수 계산 
    const totalpage = computed(() => {  // 전체 게시물 / 한 페이지 표시되는 게시물 수
      let page = (Math.floor((ListAll.value.length - 1) / viewpage) + 1) * 10;  // Math.floor는 소수값이 존재할 대 소수값을 버리는 역할
      return page
    })
    console.log(totalpage.value)

    // 게시물 번호
    const indexNum= computed(() => {
      const index = (selectpage.value-1) * viewpage + 1
      return index
    })

  const lists = computed(() => {
    console.log(ListAll.value.pname)
    return ListAll.value.pname
  })
  // 게시물 표시
    const tableData = computed(() => {
      if(ListAll.value.pname !== undefined) {
        const start = viewpage * (selectpage.value - 1),
          end = start + viewpage;
          console.log(start, end);
          console.log(ListAll.value);
        return ListAll.value.slice(start, end);  // 배열의 일부분을 반환(첫 번째 전달인자가 지정하는 위치부터 두 번재 전달인자가 지정하는 위치를 제외한 그 사이 배열 값)
    }})
    

  onMounted(() => { //구성 요소가 마운트된 후 호출될 콜백을 등록, 구성 요소가 초기 렌더링을 완료하고 코드 실행
    readprofile()
  })


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
          <router-link :to="{name: '/addproject', name: 'addproject'}">
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

  <!-------------------------------------- 프로젝트 -------------------------------------->
  <div v-for="item of ListAll" :key="item.id">
  <div v-if="item.pname !== undefined">
  <el-descriptions title="project" direction="vertical" :column="1" border >
    <template #extra>
      <router-link :to="{path:'/project', name: 'project', params: item}">
        <el-icon size="large" color="black"><Edit /></el-icon>
      </router-link>
    </template>
    <el-descriptions-item label="Project name">
      {{ item.pname }}
    </el-descriptions-item>
    <el-descriptions-item label="Project content">
      {{ item.pcontent}}
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
  
  .demo-basic--circle { /* 프로필 사진 */
    margin-left : 700px;
  }
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
