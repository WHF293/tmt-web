/*
 * @Author: hfWang
 * @Date: 2022-11-23 21:14:04
 * @LastEditTime: 2022-11-23 23:00:03
 * @Description: file content
 * @FilePath: \tmt-web\src\service\api.ts
 */
/**
 * @desc 文档库相关接口
 */
export const home = {
  _getUserRecentInfo: '/home/getUserRecentInfo',
}

/**
 * @desc 用户相关接口
 */
export const user = {
  _login: '/user/login', // 登录
  _register: '/user/register', // 注册
  _logout: '/user/logout', // 退出登录
  _userList: '/user/userList', // 获取系统用户列表
  _userPrivCode: '/user/privCode', // 获取用户权限
  _getUserInfoById: '/user/userInfo'
}

/**
 * @desc 任务相关接口
 */
export const task = {
  _createTaskClassify: '/task/createTaskClassify', // 创建任务分类
  _delTaskClassify: '/task/delTaskClassify', // 删除任务分类
  _editTaskClassify: '/task/editTaskClassify', // 编辑任务分类
  _getTaskList: '/task/getTaskList', // 获取任务列表
  _getTaskDetail: '/task/getTaskDetail', // 获取任务详情
  _updateTaskDetail: '/task/updateTaskDetail', // 更新任务详情
  _createTask: '/task/createTask', // 新增任务
  _editFileTask: '/task/editFileTask', // 新增/删除附件
  _getTaskLogs: '/task/getTaskLogs', // 获取任务日志
  _addTaskMemo: '/task/addTaskMemo', // 添加备注
  _delTaskMemo: '/task/delTaskMemo', // 删除备注
}

/**
 * @desc 文档库相关接口
 */
export const docs = {
  _getDocsDetailById: '/docs/detail',
  _getAllDocsListByType: '/docs/docsList',
  _createNewDocs: '/docs/createNewDocs',
}

/**
 * @desc 性能监控相关接口
 */
export const common = {
  _recordInfo: '/common/recordInfo',
  _privRoutes: '/common/privRoutes', // 获取路由权限
  _getCaptcha: 'captcha/image', // 获取验证码
  _checkCaptcha: '/captcha/validate', // 校验验证码是否正确
}
