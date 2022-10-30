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
        name: any,
        date: any,       
        phnum: any,
        gender: any,
        address: any,
        edu: any,
        email: any,
    }

    const update = defineProps<Props>()

    const ruleForm = reactive({ // 반응형 상태 선언
      id: update.id,
      name: update.name,
      date: update.date,
      phnum: update.phnum,
      gender: update.gender,
      address: update.address,
      edu: update.edu,
      email: update.email
    })

//------------------------- submit 에러 메세지 -------------------------
  const rules = reactive<FormRules> ({
    name: [
      { required: true, 
        message: 'Please input name', 
        trigger: 'blur' },
      { min: 3, 
        max: 15, 
        message: 'Length should be 3 to 15', 
        trigger: 'blur' }],
    date: [
      { type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change' },
    ],
    gender: [
      { required: true,
        message: 'Please select gender',
        trigger: 'change' },
    ],
    phnum: [
      { required: true,
        message: 'Please input PhoneNumber' },
    ],
    address: [
      { required: true, 
        message: 'Please input Address', 
        trigger: 'blur' },
    ],
    edu: [
    { required: true, 
      message: 'Please input Education', 
      trigger: 'blur' },
    ],
    email: [
        { required: true,
          message: 'Please input Email',
          trigger: 'blur' },
    ],
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
    if(num) { // num 값이 있으면 상세 데이터 호출한다.
      upreadprofile(update)
      console.log(num)
   }
  })

//--------------------------------------------------------------------------
</script>

<template>
<h1>프로필 {{num ? '수정':'등록'}}</h1>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
<!-- 이름 -->
    <el-form-item label="Name" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
<!-- 생년월일 -->
    <el-form-item label="Date of birth" required>
      <el-col :span="24">
        <el-form-item prop="date">
          <el-date-picker v-model="ruleForm.date" type="date" label="date of birth" placeholder="date of birth" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-form-item>
<!-- 성별 -->
    <el-form-item label="Gender" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="Male" /> 
        <el-radio label="Female" />
      </el-radio-group>
    </el-form-item>
<!-- 주소 -->
    <el-form-item label="Address" prop="address">
      <el-input v-model="ruleForm.address" />
    </el-form-item>
<!-- 전화번호 -->
    <el-form-item label="Phone number" prop="phnum">
          <el-input v-model="ruleForm.phnum" placeholder="Please input">
    </el-input>
    </el-form-item>
<!-- 이메일 -->
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" />
    </el-form-item>    
<!-- 학력사항 -->
    <el-form-item label="Education" prop="edu">
      <el-input v-model="ruleForm.edu" />
    </el-form-item>
<!-- 버튼 -->
    <el-form-item>
      <router-link to="/readabout"><el-button v-if="num" @click="updateForm(ruleFormRef)">update</el-button></router-link>
      <el-button v-if ="!num" type="primary" @click="[submitForm(ruleFormRef)]">Submit</el-button>
      <el-button v-if ="!num" @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style></style>