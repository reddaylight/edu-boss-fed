<template>
  <div class="client-enterprise">
    <div class="search">
      <el-form :inline="true" :model="enterpriseInfo" class="search-form">
        <div class="search-content">
          <el-form-item label="企业名称">
            <el-input v-model="enterpriseInfo.name" placeholder="请输入企业名称" clearable />
          </el-form-item>
          <el-form-item label="所属行业">
            <el-select
              v-model="enterpriseInfo.industry"
              placeholder="请选择"
              clearable
            >
              <el-option label="生产制造" value="1" />
              <el-option label="物流配送" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="企业规模">
            <el-select
              v-model="enterpriseInfo.size"
              placeholder="请选择"
              clearable
            >
              <el-option label="20人以下" value="1" />
              <el-option label="100人以上" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建人">
            <el-select
              v-model="enterpriseInfo.createBy"
              placeholder="请选择"
              clearable
            >
              <el-option v-for="(item, index) in orgUser" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="enterpriseInfo.createTime"
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
        <el-button>
          <el-icon><Upload /></el-icon>
          <span>批量导入</span>
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
      <el-table-column prop="logo" label="Logo" align="center" width="180" >
        <template #default="scope">
          <el-avatar fit="fill"
            :src="scope.row.logo"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="企业名称" align="center" width="320" />
      <el-table-column prop="industry" label="所属行业" align="center" width="240" />
      <el-table-column prop="size" label="企业规模" align="center" width="180" />
      <el-table-column prop="createBy" label="创建人" align="center" width="180" />
      <el-table-column prop="createTime" label="创建时间" align="center"  />
      <el-table-column prop="operate" label="操作" align="center" width="240">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            编辑
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
    <el-dialog v-model="createDiglogVisible" title="创建用工企业" close-on-press-escape=true width="50%" draggable>
      <el-form  :model="companyDto" class="create-form" label-position="top">
        <h3>企业logo</h3>
        <div class="logo-area">
          <el-form-item label="">
            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
        <h3>基本信息</h3>
        <div class="info-area">
          <el-form-item label="企业名称">
            <el-input v-model="companyDto.name" placeholder="请输入企业名称" clearable />
          </el-form-item>
          <el-form-item label="所属行业">
            <el-select
              v-model="companyDto.industry"
              placeholder="请选择"
              clearable
            >
              <el-option label="生产制造" value="1" />
              <el-option label="物流配送" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="行业规模">
            <el-select
                v-model="companyDto.size"
                placeholder="请选择"
                clearable
              >
                <el-option label="20人以下" value="1" />
                <el-option label="100人以上" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="注册地址">
            <el-input v-model="companyDto.address" placeholder="请输入注册地址" clearable />
          </el-form-item>
          <el-form-item label="办公地址">
            <el-input v-model="companyDto.currentAddress" placeholder="请输入办公地址" clearable />
          </el-form-item>
          <el-form-item label="联系信息">
            <el-input v-model="companyDto.contactInfo" placeholder="请输入联系信息" clearable />
          </el-form-item>
          <el-form-item label="注册地址">
            <el-input :autosize="{ minRows: 4, maxRows: 10 }" type="textarea" v-model="companyDto.contactInfo" placeholder="请输入联系信息" clearable />
          </el-form-item>
        </div>
        <h3>合伙人政策</h3>
        <div class="policy-area">
          <el-form-item label="合伙人政策">
            <el-input :autosize="{ minRows: 4, maxRows: 10 }" type="textarea" v-model="companyDto.partnerPolicy" placeholder="请输入联系信息" clearable />
          </el-form-item>
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
  Upload,
  Download,
  Search,
  RefreshRight
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
  name: 'ClientEnterprise',
  components: {
    Plus,
    Download,
    Search,
    RefreshRight,
    Upload
  },
  data () {
    return {
      companyDto: {
        logo: '',
        name: '',
        industry: '',
        size: '',
        address: '',
        currentAddress: '',
        contactInfo: '',
        companyProfile: '',
        partnerPolicy: ''
      },
      createDiglogVisible: false,
      enterpriseInfo: reactive({
        name: '',
        industry: '',
        size: '',
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
          logo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://img1.baidu.com/it/u=986411600,1684396432&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://img0.baidu.com/it/u=916079108,3222535849&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=392',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://img.phb123.com/uploads/allimg/211019/800-211019111J2-52.jpg',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://img1.baidu.com/it/u=1240958149,1900363411&fm=253&fmt=auto&app=138&f=JPEG?w=579&h=500',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://img1.baidu.com/it/u=3443541875,1620116974&fm=253&fmt=auto&app=138&f=PNG?w=400&h=889',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://pic.rmb.bdstatic.com/bjh/3ea39b5783a/240715/5c2a982c7408a4cd5e84e2fc926d8148.jpeg',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://img2.baidu.com/it/u=2100552751,858145710&fm=253&fmt=auto?w=800&h=800',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://pic.rmb.bdstatic.com/bjh/7f02b4f53c4bcf8ca7b937c2ae57d0de135.jpeg@h_1280',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
        },
        {
          logo: 'https://inews.gtimg.com/news_bt/OWfNw9Y7L-TnbD6OetEg6w7HrBcCI5LCAq6L14ZB8yx98AA/641',
          name: '上海安岁成信息技术有限公司',
          industry: '互联网',
          size: '20-99人',
          createBy: '张三',
          createTime: '2024-10-19'
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

<style scoped>
.el-popup-parent--hidden {
  width: 100% !important;
}

.client-enterprise {
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
  padding-left: 16px;
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
  flex-wrap: wrap;
}

.search-btn .el-form-item {
  width: 100%;
  margin-right: 0;
}

.search-btn .el-form-item .el-button {
  width: 120px;
  height: 42px;
  flex: 1 1 120px;
}

.el-divider {
  margin: 16px 0;
}
.client-enterprise .btns {
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
