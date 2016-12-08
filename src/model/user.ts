export class User {
    public uid: string;
    public token: string;
    public empId: string;
    public dept: string;
    public pre: string;
    public name: string;
    public permissions: Array<number>;

    constructor(
    ) { }

    get isAdmin(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 1)) >= 0);
        return ret;
    }
    get isProductAdmin(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 11)) >= 0);
        return ret;
    }
    get isProductManager(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 19))) >= 0;
        return ret;
    }
    get isProjectManager(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 21)) >= 0);
        return ret;
    }
    get isProjectAdmin(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 29))) >= 0;
        return ret;
    }
    get isTaskManager(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 19 || value === 29))) >= 0;
        return ret;
    }
    get isTaskAdmin(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 11 || value === 21))) >= 0;
        return ret;
    }
    get isSeller(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 98)) >= 0);
        return ret;
    }
    get isOC(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 99)) >= 0);
        return ret;
    }
    get isDeveloper(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 39)) >= 0);
        return ret;
    }
    get isTester(): boolean {
        let ret = (this.permissions.findIndex(value => (value === 100)) >= 0);
        return ret;
    }
}


// 权限设定
// 1        系统管理员
// 11       产品经理管理员
// 17       市场经理
// 18       技术支持
// 19       产品经理
// 21       项目经理管理员
// 29       项目经理

// 38       技术经理
// 39       研发工程师

// 98       销售
// 99       OC
// 100      测试
