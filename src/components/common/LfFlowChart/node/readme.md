1. 使用方法

   - 生成节点

     ```ts
     export default {
         type: string, // 唯一
         view: ...,
         model: ...
     }
     ```

   - 注册节点

     ```ts
     lf.register(node)
     ```

   - 使用节点

     ```ts
     lf.dnd.startDrag({
       type: '对应节点的 type',
     })
     ```
