<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">创建标签</el-button>
    <el-dialog
      title="创建标签"
      :visible.sync="dialogVisible"
      width="400px"
      :modal-append-to-body="false"
    >
      <el-input v-model="label" placeholder="请输入标签"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateLabelSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import service from "@/utils/request";
export default {
  data() {
    return {
      label: "",
      dialogVisible: false
    };
  },
  methods: {
    handleCreateLabelSave() {
      if (this.label == "") {
        this.$message.warning("请输入标签");
        return;
      }
      service.post("/api/label", { label: this.label }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("创建成功");
          this.dialogVisible = false;
        }
      });
    }
  }
};
</script>

<style>
</style>