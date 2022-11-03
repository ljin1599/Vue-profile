<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import type { FormInstance } from 'element-plus'
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
//------------------------------------------------------------------------------
 const ruleFormRef = ref<FormInstance>() 

   interface Props {
      id: any,
      front: any,
      back: any,
      db: any,       
    }

    const update = defineProps<Props>()

    const ruleForm = reactive({ // 반응형 상태 선언
      id: update.id,
      front: update.front,
      back: update.back,
      db: update.db
    })
//----------------------- submit, reset btn event ------------------------
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate((valid, fields) => {
      if (valid) {
        return addobj(ruleForm)
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
    if(num) { // num 값이 있으면  데이터 호출한다.
      upreadprofile(update)
      console.log(num)
    }
  })

</script>

<template>
  <h1>기술사항 {{num ? '수정':'등록'}}</h1>
  
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px">
    <!-- Front-end -->
    <el-form-item label="Front-end" prop="front">
      <el-input v-model="ruleForm.front" />
    </el-form-item>
    <!-- Back-end -->
    <el-form-item label="Back-end" prop="back">
      <el-input v-model="ruleForm.back" />
    </el-form-item>
    <!-- Database -->
    <el-form-item label="Database" prop="db">
      <el-input v-model="ruleForm.db" />
    </el-form-item>
    <!-- btn -->
    <el-form-item>
      <router-link to="/readskill"><el-button id="btn" v-if="num" @click="updateForm(ruleFormRef)">Update</el-button></router-link>
      <router-link to="/readskill"><el-button id="btn" v-if ="!num" type="primary" @click="submitForm(ruleFormRef)">Submit</el-button></router-link>
      <el-button id="btn" v-if ="!num" @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
  #btn {
    width:80px;
    margin-right: 10px;
  }
</style>
