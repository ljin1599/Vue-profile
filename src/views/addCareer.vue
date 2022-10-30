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
        front: any,
        back: any,
        db: any, 
        pname: any,
        pcontent: any,
        company: any,
        period: any,
        remark: any
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
      email: update.email,
      front: update.front,
      back: update.back,
      db: update.db,
      pname: update.pname,
      pcontent: update.pcontent,
      company: update.company,
      period: update.period,
      remark: update.remark
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
     front: [
      { required: true, 
        message: 'Please input front-end', 
        trigger: 'blur' }
    ],
    back: [
        { required: true,
          message: 'Please input back-end',
          trigger: 'blur' }
    ],
    db: [
        { required: true,
          message: 'Please input database',
          trigger: 'blur'}
    ],
    pname: [
        { required: true,
          message: 'Please input project name',
          trigger: 'blur'}
    ],
    pcontent: [
        { required: true,
          message: 'Please input project content',
          trigger: 'blur'}
    ],
    company: [
      { required: true,
          message: 'Please input company',
          trigger: 'blur'}
    ],
    period: [
      { required: true,
          message: 'Please input period',
          trigger: 'blur'}
    ],
    remark: [
      { required: false }
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

//--------------------------------------------------------------------------
</script>

<template>

  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">

<h1>경력 사항 {{num ? '수정':'등록'}}</h1>

<el-form-item label="Company" prop="company">
      <el-input v-model="ruleForm.company" />
    </el-form-item>
    <el-form-item label="Period" prop="period">
      <el-input v-model="ruleForm.period" />
    </el-form-item>
        <el-form-item label="Remark" prop="remark">
      <el-input v-model="ruleForm.remark" />
    </el-form-item>

<!-- 버튼 -->
    <el-form-item>
      <router-link to="/"><el-button v-if="num" @click="updateForm(ruleFormRef)">update</el-button></router-link>
      <router-link to="/"><el-button v-if ="!num" type="primary" @click="[submitForm(ruleFormRef)]">Submit</el-button></router-link>
      <div style="margin-right: 20px;"></div>
      <el-button v-if ="!num" @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style></style>