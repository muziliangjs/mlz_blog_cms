<template>
  <div>
    <div class="row">
      <el-select v-model="selectValue" placeholder="选择标签">
        <el-option v-for="item in labelOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="row">
      <el-input placeholder="文章标题" v-model="title"></el-input>
    </div>
    <div class="row">
      <el-input type="textarea" :rows="4" placeholder="文章介绍" v-model="textarea"></el-input>
    </div>
    <v-md-editor
      v-model="articleContent" 
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      height="500px"
    ></v-md-editor>
    <!-- <markdown-pro
      ref="md"
      :uploadImage="true"
      :on-upload-image="handlePaste"
      :initialValue="initialValue"
      :placeholderValue="placeholderValue"
      @on-save="markdownSave"
      :theme="theme"
    />-->
    <div class="foot">
      <el-button style="width:200px" type="primary" @click="handleSave()">保存文章</el-button>
    </div>
  </div>
</template>

<script>
// https://gitee.com/wanglinyong/vue-meditors
import service from "@/utils/request";
// import MarkdownPro from "vue-meditor";
export default {
  name: "markdown",
  data() {
    return {
      labelOptions: [],
      textarea: "",
      title: "",
      articleContent: "",
      selectValue: "",
      theme: "OneDark", //主题
      articleId: null
    };
  },
  components: {
    // MarkdownPro
  },
  mounted() {
    this.getLebelList();
    this.articleId = this.$route.params.id || null;
    if (this.articleId != null) {
      this.getInitData();
    }
  },
  methods: {
    handleUploadImage(event, insertImage, files) {
      if (files.length > 1) {
        this.$message.error("仅支持上传一张图片");
        return;
      }
      let param = new FormData(); // 创建form对象
      param.append("file", files[0]);
      service.post("/api/upload", param).then(res => {
        if (res.code == 200) {
          insertImage({
            url: res.data.url,
            desc: ""
          }); 
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getInitData() {
      service.post("/api/article/find", { id: this.articleId }).then(res => {
        if (res.code == 200) {
          this.title = res.data.title;
          this.textarea = res.data.description;
          this.selectValue = res.data.label_id;
          this.articleContent = res.data.content;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getLebelList() {
      service.post("/api/label", { label: this.label }).then(res => {
        if (res.code == 200) {
          this.labelOptions = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleSave() {
      if (this.selectValue == "") {
        this.$message.warning("选择标签");
        return;
      }
      if (this.title == "") {
        this.$message.warning("输入标题");
        return;
      }
      if (this.textarea == "") {
        this.$message.warning("输入简介");
        return;
      }
      if (this.selectValue == "") {
        this.$message.warning("选择标签");
        return;
      }
      let label = this.labelOptions.filter(item => {
        if (item.id == this.selectValue) {
          return item;
        }
      });
      service
        .post(
          this.articleId != null
            ? "/api/article/modify"
            : "/api/article/create",
          {
            title: this.title,
            description: this.textarea,
            content: this.articleContent,
            label_id: this.selectValue,
            label: label[0].label,
            article_id: this.articleId
          }
        )
        .then(res => {
          if (res.code == 200) {
            window.history.go(-1);
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
    }
  }
};
</script>

<style scoped>
.foot {
  width: 100%;
  text-align: center;
  padding: 30px 0;
}
.row {
  padding-bottom: 20px;
}
</style>