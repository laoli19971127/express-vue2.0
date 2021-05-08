export const JeecgListMixin = {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total:0,
        }
    },
    created() {
        if (!this.disableMixinCreated) {
            console.log(' -- mixin created -- ')
            this.loadData()
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize=val;
            this.loadData();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
            this.loadData();
        }
    },
}