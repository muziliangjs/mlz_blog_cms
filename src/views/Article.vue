<template>
  <div>
    <div class="row">
      <router-link to="/articleCreate">
        <el-button type="primary">新建文章</el-button>
      </router-link>
      <div style="float:right">
        <el-select style="margin-left: 30px" v-model="selectValue" placeholder="选择标签">
          <el-option
            v-for="item in labelOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button style="margin-left: 10px" @click="searchArticle()">搜索</el-button>
      </div>
      <!-- <el-dropdown style="float:right">
        <el-button>
          批量操作
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>

    <div class="table">
      <el-table
        :data="articleList"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="description" label="介绍"></el-table-column>
        <el-table-column prop="label" label="标签"></el-table-column>
        <el-table-column prop="create_time" label="时间" width="130"></el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="total != 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]" 
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/utils/request";
export default {
  data() {
    return {
      labelOptions: [],
      selectValue: "",
      loading: true,
      articleList: [],
      total:0,
      currentPage: 1,
      currentLimit: 10
    };
  },
  mounted() {
    this.getArticleList();
    this.getLebelList();
  },
  methods: {
    getLebelList() {
      service.post("/api/label").then(res => {
        if (res.code == 200) {
          this.labelOptions = [{ id: 0, label: "全部" }, ...res.data];
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleEdit(index, row) {
      this.$router.push({ name: "CreateArticle", params: { id: row.id } });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除”" + row.title + "“文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        service.post("/api/article/del", { id: row.id }).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getArticleList();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getArticleList() {
      service
        .post("/api/article", {
          label_id: this.selectValue,
          page: this.currentPage,
          limit: this.currentLimit
        })
        .then(res => {
          if (res.code == 200) {
            this.total = res.data.count
            this.articleList = res.data.list;
            this.loading = false;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    searchArticle() {
      this.getArticleList();
    },
    handleSizeChange(val) {
      this.currentLimit = val;
      this.getArticleList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getArticleList();
    }
  }
};
</script>

<style scoped>
.row {
  padding-bottom: 20px;
}
.pagination {
  width: 100%;
  text-align: right;
  padding: 10px 0;
}
</style>