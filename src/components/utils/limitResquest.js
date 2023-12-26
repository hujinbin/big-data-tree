class LimitResquest {
    constructor(limit) {
        this.limit = limit || 1; // 默认1个进程请求
        this.currentSum = 0; // 当前请求数
        this.requests = []; // 请求队列
    }
    // 如需更改进程数可重新初始化实例
    // let limitResquest = new LimitResquest(2)

    // 调用请求
    // reqFn 请求方法
    request(reqFn) {
        if (!reqFn || !(reqFn instanceof Function)) {
            console.error('当前请求不是一个Function', reqFn);
            return;
        }
        this.requests.push(reqFn);
        if (this.currentSum < this.limit) {
            this.run();
        }
    }

    async run() {
        try {
            ++this.currentSum;
            const fn = this.requests.shift();
            await fn();
        } catch (err) {
            console.log('Error', err);
        } finally {
            if (this.currentSum >= 0) {
                --this.currentSum;
                if (this.requests.length > 0) {
                    this.run();
                }
            }
        }
    }

    // 清除未进行的作业队列
    clear() {
        this.requests = [];
        this.currentSum = 0;
    }
}

export default LimitResquest;
