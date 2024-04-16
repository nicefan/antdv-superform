# Upload
## 描述
  可通过'vModelFields'属性配置同步绑定'fileList'的字段。  
  可通过'slots' 配置'default' slot作为自定义上传主体。  

## 补充属性
*    **apis**: Object *新增*  
     上传、删除、下载接口方法配置  
     上传：接收需要上传的FormData对象及带有上传进度的勾子方法，成功返回文件信息。  
      `upload(data:FormData, config: {onUploadProgress: (e:Event)=>void})}): Promise<Object>`  
      删除：接收file信息对象（infoNames配置），实现远程删除  
      `delete(file:Object): Promise<void>`  
      下载：接收file信息对象（infoNames配置），返回文件二进制流，实现二进制流下载  
      `download(file:Object): Promise<BlobPart>`  
      ```js
      // 使用axios为例：
      apis: {
        upload: (data, config) => axios.post('/file/upload', data, config).then(res => res.data),
        delete: (file) => axios.delete(`/file/delete/${file.id}`),
        download: (file) => axios.post(`/file/download/${file.id}`, { responseType: 'blob' })
            .then(res => res.data),
      }
      ```

     //TODO apis 可从全局配置， 当前配置为字符串时，作为url参数传到全局api方法

*    **infoNames**: Object *数据*  
     文件信息属性名称配置，将默认的文件对象进行转换后同步到`fileList`。  
     默认保留属性：`uid`, `name`, `url`, `status`；  
      ```js
     {
        uid: 'id', // 'uid' 转换成 'id'
     }
     ``` 

*   **valueKey**：String *数据*  
    指定文件对象中的属性作为绑定值，默认为文件对象。   

*    **title**: String | Function *新增*  
    上传按钮标题信息  

*   **minSize**: Number *新增*  
    文件最小寸尺，单位：MB  

*   **maxSize**: Number *新增*  
    文件最大寸尺，单位：MB  

*   **maxCount**: Number *补充*  
    最大文件数量  

*   **isSingle**: Boolean *新增*  
    是否为单文件上传，绑定值为单个文件对象或字符串，否则为数组。  

*   **outHide**: Boolean *新增*  
    超出上传数量隐藏上传按钮。  

*   **uploadMode**: String as PropType<'auto' | 'submit' | 'custom'> *新增*  
    上传模式：  
    `auto`: （默认）自动上传，选择文件后立即开始上传；  
    `submit`: 表单提交时触发上传；  
    `custom`: 自行上传，文件信息中将添加`originFileObj`属性，保存选择的文件对象；  
  
*   **tip**: String *新增*  
    提示消息，默认通过maxCount,maxSize,accept配置自动生成；  
    
*   **title**: String | VNode *新增*  
    `listType`为`picture-card`类型时，卡片上的标题；  

*   **repeatable**: Boolean *新增*  
    是否允许选取重名文件。（默认：否）  

*   **isView**: Boolean *新增*  
    查看模式只显示文件列表，不允许删除；  

*   **disabled**: Boolean *覆盖*  
    禁用模式只显示文件列表，不允许删除、下载；  

*   **isImageUrl**: Function *实现*  
    类型使用内置默认图片预览时，判断文件是否为图片，`listType`为`picture-card`时是否显示缩略图；  

*   **beforeUpload**: Function *实现*  
    自定义文件拦截，返回undefined时继续内置校验，默认通过maxCount,minSize,maxSize,accept, repeatable配置进行校验。  

*   **onPreview**: Function *实现*   
    自定义预览，返回一个url时，默认使用内置图片预览此url。默认内置全屏图片预览。    

*   **onRemove**: Function *实现*  
    移除文件时回调返回false时取消删除，否则将调用apis中配置的删除接口远程删除。  

*   **onDownload**: Function  *实现*  
    自定义文件下载，默认调用apis中配置的下载接口进行下载。  

### 其它补充
* 可使用'default' 插槽来自定上传主体, 同时传递的'effectData' 参数中附加了'fileList' 数组。  
  
* 当`listType`配置为 'picture' 或 'picture-card'时，'fileList'中的文件对象中增加`objectUrl`属性，可用于查看预览。

### 官方Api
  https://3x.antdv.com/components/upload-cn#API