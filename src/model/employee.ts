export class Employee {
    public empId: string;
    public dept: string;
    public pre: string;
    public name: string;
    public permissions: Array<number>;

    constructor(
    ) { }

    public isSysAdmin(): boolean {
        let ret = (this.permissions.findIndex(value => (value == 1)) >= 0);
        return ret;
    }
    public isProductAdmin(): boolean {
        let ret = (this.permissions.findIndex(value => (value == 1 || value == 11)) >= 0);
        return ret;
    }
    public isProjectManager(): boolean {
        let ret = (this.permissions.findIndex(value => (value == 1 || value == 21)) >= 0);
        return ret;
    }
    public isProductManager(): boolean {
        let ret = (this.permissions.findIndex(value => (value == 1 || value == 11 || value == 19))) >= 0;
        return ret;
    }
    public isProjectAdmin(): boolean {
        let ret = (this.permissions.findIndex(value => (value == 1 || value == 21 || value == 29))) >= 0;
        return ret;
    }
    public isSeller(): boolean {
        let ret = (this.permissions.findIndex(value => (value == 1 || value == 98)) >= 0);
        return ret;
    }
    public isOC(): boolean {
        let ret = (this.permissions.findIndex(value => (value == 1 || value == 99)) >= 0);
        return ret;
    }
    public isDeveloper(): boolean {
        let ret = (this.permissions.findIndex(value => (value == 1 || value == 39)) >= 0);
        return ret;
    }
}


// 权限设定
// 1        系统管理员
// 11       产品经理管理员
// 19       产品经理
// 21       项目经理管理员
// 29       项目经理
// 39       研发
// 98       销售
// 99       OC
// 100      测试用户
