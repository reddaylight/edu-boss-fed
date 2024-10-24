<template>
  <div class="contract-enterprise">
    <div class="search">
      <el-form :inline="true" :model="contractInfo" class="search-form">
        <div class="search-content">
          <el-form-item label="模板名称">
            <el-input v-model="contractInfo.name" placeholder="请输入模板名称" clearable />
          </el-form-item>
          <el-form-item label="模板编号">
            <el-input v-model="contractInfo.number" placeholder="请输入模板编号" clearable />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="contractInfo.createTime"
              type="date"
              placeholder="开始时间 至 结束时间"
              clearable
            />
          </el-form-item>
        </div>
        <div class="search-btn">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">
              <el-icon><Search /></el-icon>
              <span>查询</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="onClean">
              <el-icon><RefreshRight /></el-icon>
              <span>重置</span>
            </el-button>
          </el-form-item>
        </div>
        <el-divider />
      </el-form>
    </div>
    <div class="btns">
      <div class="core-btn">
        <el-button type="primary" @click="onCreateDiglogVisible">
          <el-icon><Plus /></el-icon>
          <span>新建</span>
        </el-button>
      </div>
      <div class="other-btn">
        <el-button>
          <el-icon><Download /></el-icon>
          <span>下载</span>
        </el-button>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column prop="name" label="模板名称" align="center" width="480" />
      <el-table-column prop="number" label="模板编号" align="center" width="480" />
      <el-table-column prop="createBy" label="创建人" align="center" width="320" />
      <el-table-column prop="createTime" label="创建时间" align="center"  />
      <el-table-column prop="operate" label="操作" align="center" width="240">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
            使用
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
            复制
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
            编辑
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 新建弹窗 -->
    <el-dialog v-model="createDiglogVisible" title="新建合同模板" close-on-press-escape=true width="50%" fullscreen=true>
      <el-form  :model="contractDto" class="create-form" label-position="top">
        <h3>模板信息</h3>
        <div class="info-area">
          <el-form-item label="模板名称">
            <el-input v-model="contractDto.name" placeholder="请输入模板名称" clearable />
          </el-form-item>
        </div>
        <h3>合同文件 <span style="color: #939393; font-weight: 400; margin-left: 16px;">{{ fileDesc }}</span></h3>
        <div class="file-area" style="margin: 56px 32px;">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button type="primary">上传合同文件</el-button>
          </el-upload>
        </div>
        <h3>添加签署方</h3>
        <div class="policy-area">
          <el-table :data="signatoryData" style="width: 100%">
            <el-table-column fixed prop="signatory" label="签署方" width="120px" align="center"/>
            <el-table-column prop="signatoryType" label="签署主体" width="480px" align="center"/>
            <el-table-column prop="processor" label="经办人" align="center"/>
            <el-table-column fixed="right" label="操作" width="120" align="center">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteRow(scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="mt-4" style="width: 100%" @click="onAddItem">
            Add Item
          </el-button>
        </div>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onCreateDiglogVisible">取消</el-button>
          <el-button type="primary" @click="onCreateDiglogVisible">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from 'vue'
import {
  Plus,
  Download,
  RefreshRight,
  Search
} from '@element-plus/icons-vue'

const font = reactive({
  color: 'rgba(0, 0, 0, .15)'
})

watch(
  () => {
    font.color = 'rgba(0, 0, 0, .15)'
  },
  {
    immediate: true
  }
)

export default {
  name: 'ContractTemplate',
  components: {
    Plus,
    Download,
    RefreshRight,
    Search
  },
  data () {
    return {
      fileDesc: '支持doc、docx、pdf、jpg、jpeg、png、xls、xlsx格式的文件；文件大小 <=10M；签约文件： 2/10份；附属文件：0/10份；',
      contractDto: {
        logo: '',
        name: '',
        number: '',
        size: '',
        address: '',
        currentAddress: '',
        contactInfo: '',
        companyProfile: '',
        partnerPolicy: ''
      },
      createDiglogVisible: false,
      contractInfo: reactive({
        name: '',
        number: '',
        createBy: '',
        createTime: ''
      }),
      orgUser: [
        { name: '张三', id: 1 },
        { name: '李四', id: 2 },
        { name: '王五', id: 3 },
        { name: '赵六', id: 4 },
        { name: '孙七', id: 5 },
        { name: '勾八', id: 6 },
        { name: '六九', id: 7 }
      ],
      tableData: [
        {
          name: '纽业态共享经济服务协议模板A',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '纽业态共享经济服务协议模板B',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '纽业态共享经济服务协议模板C',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '纽业态共享经济服务协议模板D',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '纽业态共享经济服务协议模板E',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '纽业态劳动合同模板A',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '纽业态劳动合同模板B',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '多利人力劳动合同模板A',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '多利人力劳动合同模板B',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          name: '碳业态（江苏）经济合作合同模板A',
          number: 'C202410231035001',
          createBy: '张三',
          createTime: '2024-10-19'
        }
      ],
      signatoryData: [
        {
          signatory: '甲方',
          signatoryType: '企业',
          processor: '使用模板时，指定具体经办人信息'
        },
        {
          signatory: '乙方',
          signatoryType: '个人',
          processor: '使用模板时，指定具体经办人信息'
        }
      ]
    }
  },
  methods: {
    onSubmit: () => {
      console.log('submit!')
    },
    onCreateDiglogVisible () {
      const visible = this.createDiglogVisible
      this.createDiglogVisible = !visible
    }
  }
}
</script>

<style>
.el-popup-parent--hidden {
  width: 100% !important;
}

.contract-enterprise {
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 32px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.search-form .search-content {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  padding-top: 32px;
  flex: 9;
}
.search-form .search-btn {
  height: auto;
  padding-top: 32px;
  flex: 1;
}

.search-content .el-form-item {
  flex: 0 0 30%;
  height: 42px;
}

.el-form-item__label {
  width: 120px;
  height: 42px;
  line-height: 42px;
}

.search-form .el-form-item .el-input {
  background-color: #F7F8FA;
  height: 42px;
  width: 100%;
}
.search-form .el-form-item .el-select .el-select__wrapper {
  height: 42px;
  width: 100%;
}

.search-form .search-btn {
  display: flex;
  margin-right: 0;
}

.search-btn .el-form-item {
  width: 100%;
}

.search-btn .el-form-item .el-button {
  width: 120px;
  height: 42px;
  flex: 1 1 120px;
}

.el-divider {
  margin: 16px 0;
}
.contract-enterprise .btns {
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
}

.el-table {
  padding: 24px 0;
}

.el-pagination {
  float: right;
}

.create-form .info-area {
  display: flex;
  flex-wrap: wrap;
}

.create-form .el-form-item {
  flex: 1 0 25%;
  margin: 16px 32px;
}

@media (max-width: 1080px) {
  .search-content .el-form-item {
    flex: 0 0 50%; /* 在小屏幕上，每个元素占据全部宽度 */
  }
}

</style>
