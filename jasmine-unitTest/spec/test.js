// Suites 表示测试集，describe()
// spec 表示测试用例 it()
// Spy能监测任何function的调用和方法参数的调用痕迹

describe("learn unit test",function(){
	
	var day,foo,bar;

	beforeAll(function(){ // 在Sepc之间并不会被执行。
		day=5;
		spyOn(dog,"eat");

		// spyOn(dog,"setName");// 执行后不保存结果
		spyOn(dog,"setName").and.callThrough();  // 执行后保存修改结果

		spyOn(dog,'getAge').and.returnValue(10);
		spyOn(dog,'getName').and.callFake(function(){
			return "帅哥";
		});

		spyOn(dog,"setAge").and.throwError('error');

		// dog.eat("water");
		// dog.eat("bone");

		dog.setName("旺财");
		foo=dog.getAge();
		bar=dog.getName();
	});

	beforeEach(function(){
		
	});

	afterEach(function(){
		
	});

	afterAll(function(){
		day=0;
	});

	it("getDayTest",function(){
		expect(day).toBe(getDay());
	});

	it("HaveBeenCalled",function(){
		dog.eat("bone");					// 可以卸载测试用例中，也可以写在beforeAll，beforeEach中

		// 不带参数验证
		expect(dog.eat).toHaveBeenCalled();  // 范围大，只判断是否执行

		// 带参数验证
		expect(dog.eat).toHaveBeenCalledWith("bone");	// 同事判断参数是否一致

		expect(dog.setName).toHaveBeenCalledWith("旺财");
		expect(dog.getAge).toHaveBeenCalled();		
	});

	// 三种方式实现禁用: xit ,未定义函数, pending()方法
	it("test case pending",function(){
		expect(6).toEqual(getDay());
		console.log("pending");
		pending('learn use pending');
	});

	it("callThrough",function(){
		expect(dog.name).toBe("旺财");
	});

	it("returnValue",function(){
		expect(foo).toBe(10);
	});

	it("callFake",function(){
		expect(bar).toBe("帅哥");
	});

	it("throwErrot",function(){
		expect(function(){
			dog.setAge();
		}).toThrowError("error");
	});
});

// -------------------- 全局匹配谓词 ----------------------------
describe("learn jasmine API",function(){
	var foo,bar;

  	beforeEach(function() {
    	foo = [1, 2, 3, 4];
    	bar = {
	    	a: 1,
	      	b: 2,
	      	bar: "baz"
	    };
  	});

  	// arrayContaining 用于检测实际Array值中是否存在特定值
  	it("arrayContaining", function() {
    	expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
    	expect(foo).not.toEqual(jasmine.arrayContaining([6]));
  	});

	// asmine.objectContaining 用于检测实际Object值中是否存在特定key/value对
	it("objectContaining",function(){
		expect(bar).toEqual(jasmine.objectContaining({
			bar:"baz"
		}));
		expect(bar).not.toEqual(jasmine.objectContaining({
			c:37
		}));
	});

	xit("any",function(){

	});

	// 用于检测实际值是否为null或undefined，如果不为null或undefined，则返回true
	it("anything",function(){
		expect(1).toEqual(jasmine.anything());
	});
});

// 用于检测该参数是否与实际值所对应的构造函数(类型)相匹配
describe("jasmine.any", function() {
	it("matches any value", function() {
	    expect({}).toEqual(jasmine.any(Object));
	    expect(12).toEqual(jasmine.any(Number));
	});

	describe("when used with a spy", function() {
	    it("is useful for comparing arguments", function() {
	    	var foo = jasmine.createSpy('foo');

	    	// 第一个参数：Number；第二个参数：回调函数
	      	foo(12, function() {
		        return true;
		    });

	      	// 判断是否执行，且参数类型一致
	      	expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
	    });
	});
});

// --------------------- 分割线 ----------------------------
// clock API接口:
// 	install()
// 	tick()
// 	mockDate()
// 	uninstall()

describe("test jasmine.clock",function(){
	var timecallback;

    beforeEach(function(){
        timecallback = jasmine.createSpy('timecallback');
        jasmine.clock().install();		// 启动时钟控制
    });

    afterEach(function(){
        jasmine.clock().uninstall();	// 停止时钟控制
    });

    it('mock setTimeout clock ', function(){
        setTimeout(function(){
            timecallback();
        }, 100);
        expect(timecallback).not.toHaveBeenCalled();
        jasmine.clock().tick(101);  	// .tick(), 让时钟往前走多少毫秒
        expect(timecallback).toHaveBeenCalled();
    });

    it('mock setInterval clock ', function(){
        setInterval(function(){
            timecallback();
        }, 100);
        expect(timecallback).not.toHaveBeenCalled();
        jasmine.clock().tick(101);
        expect(timecallback.calls.count()).toEqual(1);
        jasmine.clock().tick(50);
        expect(timecallback.calls.count()).toEqual(1);
        jasmine.clock().tick(50);
        expect(timecallback.calls.count()).toEqual(2);
    });

    it('mock date clock ', function(){
        var baseTime = new Date(2013, 9, 23);
        jasmine.clock().mockDate(baseTime);	// mockDate, 可以根据传入的date来设置当前时间
        jasmine.clock().tick(50);
        expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
    });
});

// ---------------------------------- 分隔线 ----------------------
describe("Async Support ",function(){
	var value;

	jasmine.DEFAULT_TIMEOUT_INTERVAL=5; 	// 设置回调的超时时间

	// setTimeout代表一个异步操作。
	beforeEach(function(done) {
	  	setTimeout(function() {
	    	value = 0;
	    	// 调用done表示回调成功，否则超时
	    	done();
	  	}, 2);
	});

	it("async execution",function(done){
		value++;
		expect(value).toBeGreaterThan(0);
		done();
	});
});