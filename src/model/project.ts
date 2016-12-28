export class Project {
    // 详细描述
    public description: string;
    // 创建人
    public creatorId: string;
    public creator: string;
    // 创建时间
    public createdTime: Date;
    // 销售负责人
    public primarySellerId: string;
    public primarySeller: string;
    // 任务要求验收日期
    public requiringAcceptanceDate: Date;
    // 客户联络方式
    public customerContact: string;
    // 项目经理
    public projectManagerId: string;
    public projectManager: string;
    // 产品经理
    public productManagerId: string;
    public productManager: string;
    // 研发经理
    public developmentManagerId: string;
    public developmentManager: string;
    // 其他执行人
    public otherExecutorIds: string[];
    public otherExecutors: string;
    // 计划发布日期
    public planningReleaseDate: Date;
    // 实际发布日期
    public realReleaseDate: Date;
    // 实际验收日期
    public realAcceptanceDate: Date;
    // 状态
    public status: string;
    // 所属产品
    public parentProductId: string;
    public parentProduct: string;
    constructor(
        // 项目编号
        public id: string,
        // 项目名称
        public name: string
    ) { }
}
