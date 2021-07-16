<template>
  <div>

    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="changeFile"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :http-request="upload"
      :limit="1"
      :class="{disabled: fileComputed}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDc2B3ez3qNedLmwjFVTBcldFZcNs63i6D',
  SecretKey: 'rRkmX0C8m9F3brqYz92dz3qMbZGgofFX'
})
export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      currentFileUid: null
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 添加文件
    changeFile(file, fileList) {
      // console.log(file, fileList)
      this.fileList = fileList.map(item => item)
    },
    // 删除文件
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传文件前钩子函数方法
    beforeUpload(file) {
      // 检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      return true
    },
    // 上传文件
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'shadaheicu-1306553344', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file,
          StorageClass: 'STANDARD'
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            console.log(data)
            // 上传状态为成功
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
          } else {
            console.log(err)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card{
  display: none;
}
</style>
