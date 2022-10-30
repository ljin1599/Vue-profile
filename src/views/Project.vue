<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { BoardListStore } from "@/stores/list"; // 저장소

  const store:any = BoardListStore() // 저장소의 상태, 작업 가능
  const { upreadprofile } = store // store에서 함수 받아오기

  function addobj(list:any) { // input 창의 제목, 내용을 store안에 addboard 함수에 값을 넘겨준다.
      store.addprofile(list);
      console.log(list)
  }

  function updateobj(list:any) {
    store.updateprofile(list);
    console.log(list)
  }
//--------------------------------------------------------------------------
 const ruleFormRef = ref<FormInstance>() 

   interface Props {
        id: any,
        pname: any,
        pcontent: any,
    }

    const update = defineProps<Props>()

    const ruleForm = reactive({ // 반응형 상태 선언
      id: update.id,
      pname: update.pname,
      pcontent: update.pcontent
    })
//------------------------- submit 에러 메세지 -------------------------
  const rules = reactive<FormRules> ({
    pname: [
      { required: true, 
        message: 'Please input project name', 
        trigger: 'blur' }
    ],
    pcontent: [
        { required: true,
          message: 'Please input project content',
          trigger: 'blur' }
    ]
  })
//----------------------- submit, reset btn event ------------------------
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          return addobj(ruleForm) // 여기에 plusedu 적기
        } else {
          console.log('error submit!', fields)
        }
    })
  }

  const updateForm = async (formEl: FormInstance | undefined) => {
    if(!formEl) return
      await formEl.validate((valid, fields) => {
        if(valid) {
          return updateobj(ruleForm)
        } else {
          console.log('error submit!', fields)
        }
      })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  }

  const num = update.id


    onMounted(() => { // 최초 로딩 시 실행
    if(num) { // num 값이 있으면 상세 데이터 호출한다.
      upreadprofile(update)
      console.log(num)
   }
  })
</script>

<template>
<!----------------------------------------------------------------------------------->  
    <h1>프로젝트 {{num ? '수정':'등록'}}</h1>
<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
    <el-form-item label="project name" prop="pname">
      <el-input v-model="ruleForm.pname" />
    </el-form-item>

    <el-form-item label="project content" prop="pcontent">
      <el-input v-model="ruleForm.pcontent" />
    </el-form-item>

    <el-form-item>
      <router-link to="/readproject"><el-button v-if="num" @click="updateForm(ruleFormRef)">update</el-button></router-link>
      <el-button v-if ="!num" type="primary" @click="[submitForm(ruleFormRef)]">Submit</el-button>
      <el-button v-if ="!num" @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
    </el-form>
</template>

<style>
.btn {
  width:300px;
  margin:  auto;
}

/* 프로필 icon, title style */
  .demo-basic .sub-title {
    margin-bottom: 20px;
    font-size: 40px;
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
  .item {
    margin-bottom: 18px;
  }
  .box-card {
    margin-left: 25px;
    width: 500px;
  }
</style>
