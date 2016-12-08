// 任务 类型
export class Task {
    // 任务详细描述
    public description: string;
    // 客户联系方式
    public customerContact: string;
    // 任务创建人
    public creatorId: string;
    public creator: string;
    // 任务创建时间
    public createdTime: Date;
    // 销售负责人
    public primarySellerId: string;
    public primarySeller: string;
    // OC负责人
    public primaryOCId: string;
    public primaryOC: string;
    // 执行负责人
    public primaryExecutorId: string;
    public primaryExecutor: string;
    // 其他执行人
    public otherExecutors: string;
    // 任务要求执行周期
    public requiringEndDate: Date;
    // 任务计划执行周期
    public planningBeginDate: Date;
    public planningEndDate: Date;
    // 任务实际执行周期
    public realBeginDate: Date;
    public realEndDate: Date;
    // 当前进度
    public percent: number;
    // 任务状态
    public status: string;
    // 拒绝状态
    public refuseStatus: string;
    // 拒绝原因
    public refuseReason: string;
    // 所属产品
    public parentProductId: string;
    public parentProduct: string;
    // 所属项目
    public parentProjectId: string;
    public parentProject: string;
    constructor(
        // 任务编号
        public id: string,
        // 任务名称
        public name: string
    ) { }
}
