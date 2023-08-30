
<template>
    <div>
        <h1>标记有误/取消标记有误：</h1>
        <el-button @click="() => onMarkError(['markField', 'mustAndMarkField'])">
            将第二个和最后一个标记有误
        </el-button>
        <el-button @click="() => onMarkError(['markField'])">将第二个标记有误</el-button>
        <el-button @click="() => onMarkError(['mustAndMarkField'])">将最后一个标记有误</el-button>
        <el-button @click="() => onCancelMarkError(['markField', 'mustAndMarkField'])">
            取消第二个和最后一个标记有误
        </el-button>
        <el-button @click="() => onCancelMarkError(['markField'])">
            取消第二个标记有误
        </el-button>
        <el-button @click="() => onCancelMarkError(['mustAndMarkField'])">
            取消最后一个标记有误
        </el-button>
        <el-button type="primary" @click="onSubmit">提交表单</el-button>

        <el-button-group>
            <el-button @click="() => onChangeModel('hasValuePassMarkError')">只要有值则标记有误验证通过</el-button>
            <el-button @click="() => onChangeModel('ignoreMarkError')">
                不执行标记有误验证</el-button>
        </el-button-group>
        <el-form :model="formData" ref="formDataRef">
            <el-form-item label="必填字段" prop="mustField" :rules="formDataRule.mustField">
                <el-input v-model="formData.mustField"></el-input>
            </el-form-item>
            <el-form-item label="标记有误字段" prop="markField" :rules="formDataRule.markField">
                <el-input v-model="formData.markField"></el-input>
            </el-form-item>
            <el-form-item label="普通字段" prop="normalField" :rules="formDataRule.normalField">
                <el-input v-model="formData.normalField"></el-input>
            </el-form-item>
            <el-form-item label="必填且标记有误字段" prop="mustAndMarkField" :rules="formDataRule.mustAndMarkField">
                <el-input v-model="formData.mustAndMarkField"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
export default {
    name: "StyleTextPage",
    components: {},
    data() {
        return {
            /**
             * 标记有误验证方法执行模式：
             * hasValuePassMarkError：只要有值，则通过验证，否则不通过验证
             * ignoreMarkError: 一律通过
             */
            onChangeModel: "hasValuePassMarkError",
            // 表单数据
            formData: {
                mustField: null,
                markField: null,
                normalField: null,
                mustAndMarkField: null,
            },
            // 存放标记有误数据的对象
            markErrorData: null,
            // 自定义验证规则：验证是否存在标记有误数据，如果存在，则将标记有误数据，显示为错误数据
            validateMarkError(rule, value, callback, fieldName) {
                if (this.onChangeModel === "ignoreMarkError") {
                    // 一律通过
                    return callback();
                }
                if (this.markErrorData && this.markErrorData[fieldName]) {
                    // 当前验证字段存在标记有误信息
                    if (this.onChangeModel === "hasValuePassMarkError") {
                        if (value) {
                            // 只要有值则通过
                            return callback();
                        } else {
                            // 没值，不通过
                            return callback(new Error(this.markErrorData[fieldName]));
                        }
                    }
                }
                return callback();
            },
            // 测试不同的验证规则组合情况
            formDataRule: {
                mustField: [{ required: true, message: "必填" }],
                markField: [
                    {
                        validator: (rule, value, callback) =>
                            this.validateMarkError(rule, value, callback, "markField"),
                        trigger: "blur",
                    },
                ],
                normalField: [],
                mustAndMarkField: [
                    {
                        validator: (rule, value, callback) =>
                            this.validateMarkError(rule, value, callback, "mustAndMarkField"),
                        trigger: "blur",
                    },
                    { required: true, message: "必填" },
                ],
            },
        };
    },
    created() { },
    methods: {
        onSubmit() {
            this.$refs.formDataRef.validate((ret) => {
                if (ret) {
                    this.$message({
                        message: "验证通过",
                        type: "success",
                    });
                } else {
                    this.$message({
                        message: "表单数据验证失败",
                        type: "error",
                    });
                }
            });
        },
        // 手动删除错误提示信息
        onCancelMarkError(cancelMarkErrorPropArr) {
            if (!this.markErrorData) {
                this.markErrorData = {};
            }
            cancelMarkErrorPropArr.forEach((fieldName) => {
                this.$set(this.markErrorData, fieldName, null);
            });
            this.$refs.formDataRef.clearValidate(cancelMarkErrorPropArr);
        },
        // 手动添加错误提示信息
        onMarkError(markErrorPropArr) {
            if (!this.markErrorData) {
                this.markErrorData = {};
            }
            markErrorPropArr.forEach((fieldName) => {
                this.$set(
                    this.markErrorData,
                    fieldName,
                    `对字段 ${fieldName} 标记有误`
                );
            });
            this.$refs.formDataRef.validateField(markErrorPropArr);
        },
    },
};
</script>
  
<style ></style>