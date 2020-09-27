<template>
  <div>
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      style="height:400px; margin-bottom:30px;"
      @change="onEditorChange"
    />
      <el-upload
              class="avatar-uploader"
              action="serverUrl"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload"
              multiple
      >
      </el-upload>
    <el-button
      style="margin:20px"
      type="primary"
      @click="submit"
    >
      提交
    </el-button>
    <div v-html="content"></div>
  </div>
</template>

<script>
    import { quillEditor } from "vue-quill-editor";
    export default {
        name: "Details",
        components: {
            quillEditor
        },
         data(){
             // 工具栏配置
             const toolbarOptions = [
                 ["bold", "italic", "underline", "strike"], // toggled buttons
                 ["blockquote", "code-block"],

                 [{ header: 1 }, { header: 2 }], // custom button values
                 [{ list: "ordered" }, { list: "bullet" }],
                 [{ script: "sub" }, { script: "super" }], // superscript/subscript
                 [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                 [{ direction: "rtl" }], // text direction

                 [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                 [{ header: [1, 2, 3, 4, 5, 6, false] }],

                 [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                 [{ font: [] }],
                 [{ align: [] }],
                 ["link", "image", "video"],
                 ["clean"] // remove formatting button
             ];
             return {
                 content: "",
                 editorOption: {
                     placeholder: "编辑文章内容",
                     modules: {
                         toolbar: {
                             container: toolbarOptions, // 工具栏
                             handlers: {
                                 image: function(value) {
                                     if (value) {
                                         //alert('自定义图片');
                                         document.querySelector(".avatar-uploader input").click();
                                     } else {
                                         this.quill.format("image", false);
                                     }
                                 }
                             }
                         }
                     }
                 },
             };
         },
        methods:{
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true;
            },
            uploadSuccess(res, file) {
                console.log(file);
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                console.log(quill);
                // 如果上传成功
                if (res.state === "SUCCESS" && res.url !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, "image", res.url);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    this.$message.error("图片插入失败");
                }
                // loading动画消失
                this.quillUpdateImg = false;
            },
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false;
                this.$message.error("图片插入失败");
            },
            submit(){}
        }
    };
</script>

<style scoped>

</style>