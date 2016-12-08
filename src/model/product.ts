export class Product {
    // 产品详细描述
    public description: string;
    // 创建人
    public creatorId: string;
    public creator: string;
    // 创建时间
    public createdTime: Date;
    // 产品经理
    public productManagerId: string;
    public productManager: string;
    // 市场经理
    public marketingManagerId: string;
    public marketingManager: string;
    // 研发经理
    public developmentManagerId: string;
    public developmentManager: string;
    // 其他执行人
    public otherExecutors: string;
    // 计划发布日期
    public planningReleaseDate: Date;
    // 实际发布日期
    public realReleaseDate: Date;
    // 状态
    public status: string;
    constructor(
        // 产品编号
        public id: string,
        // 产品名称
        public name: string
    ) { }
}
