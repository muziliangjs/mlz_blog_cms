<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">创建标签</el-button>

    <div class="table">
      <el-table :data="tableData" v-loading="loading" border style="width: 100%">
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="label" label="标签"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleClickDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
      loading: true,
      dialogVisible: false,
      tableData: []
    };
  },
  mounted() {
    this.getLebelList();
  },
  methods: {
    getLebelList() {
      service.post("/api/label", { label: this.label }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.loading = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleCreateLabelSave() {
      if (this.label == "") {
        this.$message.warning("请输入标签");
        return;
      }
      service.post("/api/label/create", { label: this.label }).then(res => {
        if (res.code == 200) {
          this.getLebelList();
          this.label = ''
          this.$message.success(`创建 ${this.label} 标签成功`);
          this.dialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleClickDel(row) {
      this.$confirm("确认删除”" + row.label + "“标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          service.post("/api/label/del", { id: row.id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.loading = true;
              this.getLebelList();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.table {
  padding-top: 20px;
}
</style>