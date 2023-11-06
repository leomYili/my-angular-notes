export interface Context {
  /**
   * 数据一致性异常排除任务卡id
   */
  abnormalWorkitemId: number;
  /**
   * 代办项id
   */
  backlogId: number;
  /**
   * 活动形态类型
   */
  category: string;
  /**
   * 客户端来源
   */
  clientAgent: string;
  /**
   * 数据来源：PTM表示来源于PTM，其他表示ATMC
   */
  dataFrom: string;
  /**
   * 表格组件数据字段名称
   */
  gridSchema: string;
  /**
   * 执行者performer或者当责者charge
   */
  identity: string;
  /**
   * 是否属于被分享的页面
   */
  isShared: boolean;
  /**
   * 是否为超级管理员
   */
  isSuperAdmin: boolean;
  /**
   * 是否是流程引擎
   */
  isTaskEngine: boolean;
  /**
   * 语言类别
   */
  locale: string;
  /**
   * 页面场景
   * [project-card,project-detail,task-card,task-detail]
   */
  pageCode: string;
  /**
   * 活动形态分类
   */
  pattern: string;
  /**
   * 提交唯一键
   */
  submitId: string;
  /**
   * 任务类型
   */
  taskType: string;
  /**
   * 租户ID
   */
  tenantId: string;
  /**
   * 关卡ID
   */
  tmActivityId: string;
  /**
   * 关卡名称
   */
  tmActivityName: string;
  /**
   * 项目名称
   */
  tmProjectId: string;
  /**
   * 调用链ID
   */
  traceId: string;
}