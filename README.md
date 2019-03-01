# jasmine 学习笔记

###	jasmine 基础知识
	https://yq.aliyun.com/articles/53426
	http://www.cnblogs.com/zhcncn/p/4330112.html

### 在 npm 中使用 jasmine 测试框架用 karma 完成单元测试
	https://www.jianshu.com/p/a8ee7fb47512?utm_campaign=maleskine&utm_content=note&utm_medium=reader_share

### TDD 和 BDD
	TDD 测试驱动开发(Test-Driven development)
	BDD 行为驱动开发(Behavior-Driven development)

### 测试工具 相关概念
```
	1）Jasmine 是一个单元测试框架，类似的还有mocha。
	2）Karma 是测试的执行者，使用Karma.conf.js配置文件来设置启动文件、报告、测试框架、浏览器等，自动化完成单元测试。
	3）Grunt 启动Karma统一项目管理。
	4）Yeoman 最后封装成一个项目原型模板。
	5）npm 做nodejs的包依赖管理。
	6）bower 做javascript的包依赖管理，更新管理第三方引用库和依赖包。
	7）istanbul 是一个单元测试代码覆盖率检查工具，可以很直观地告诉我们，单元测试对代码的控制程度。
	8）Protractor 类似于Karma,通过程序模拟用户在浏览器中操作来做自动化测试。
```

### jasmine 相关文件
```
	lib：存放了运行测试案例所必须的文件，其内包含jasmine-x.x.0文件夹。可
	以将不同版本的Jasmine放在lib下，以便使用时切换。
		jasmine.js：整个框架的核心代码。
		jasmine-html.js：用来展示测试结果的js文件。
		boot.js：jasmine框架的的启动脚本。需要注意的是，这个脚本应该放在jasmine.js之后，自己的js测试代码之前加载。
		jasmine.css：用来美化测试结果。
```

### jasmine 基础知识
```
	1) Suite 表示一个测试集，以函数describe(string, function)封装;
	   	一个Suite(describe)包含多个Specs(it)，一个Specs(it)包含多个断言（expect）
	
	2) Spec 表示测试用例，用函数it(string, function)封装

	3）Expectation就是一个断言，以expect语句表示，返回true或false。
		只有当一个Spec中的所有Expectations全为ture时，这个Spec才通过，否则失败

	4）Matchers 表示比较操作，将 Expectation 传入的实际值和 Matcher 传入的期望值比较。
		任何 Matcher 都能通过在 expect 调用 Matcher 前加上not来实现一个否定的断言 expect(a).not().toBe(false);

		toBe()：相当于===比较。	
		toBeDefined()：检查变量或属性是否已声明且赋值。		
		toBeNull()：是否是null。
		toBeTruthy()：如果转换为布尔值，是否为true。
		toBeFalsy()
		toBeLessThan()：数值比较，小于。
		toBeGreaterThan()：数值比较，大于。
		toEqual()：相当于==，注意与toBe()的区别。		
		toContain()：数组中是否包含元素（值）。只能用于数组，不能用于对象。
		toBeCloseTo()：数值比较时定义精度，先四舍五入后再比较。
		toHaveBeenCalled()：方法是否被调用
		toHaveBeenCalledWith()：方法是否被调用且参数匹配一致
		toMatch()：按正则表达式匹配。		
		toThrow()：检验一个函数是否会抛出一个错误
```

###	测试前后注入
```	
	beforeAll(function)
	beforeEach(function)
	afterEach(function)
	afterAll(function)
```

### this关键字
	describe里的每个beforeEach,it,afterEach的this都是相同的。

### 禁用describe与it
```	
	1. 当在describe和it前面加上x前缀时,可以禁掉当前describe和it测试。
		xdescribe(string,function(){
			xit(string,function(){
				// todo
			});
		});	

	2. 当it里不包含函数体时,测试结果会显示挂起spec字样。 
		it(string);

	3. 在方法内执行pending 方法
		it("test pending",function(){
			pending('this is reason');	
		});
```		

### Spy能监测任何function的调用和方法参数的调用痕迹
```		
	1. spyOn方法可以添加对某个对象下的函数执行情况的监控
		spyOn(dog,'eat');

	2. .and.callThrough 方法可以让监听的方法返回值保留下来
		spyOn(dog,"setName").and.callThrough();

	3. and.returnValue 方法可以指定监听的方法返回值
		spyOn(dog,"getName").returnValue("旺财");

	4. and.callFake 方法可以伪造监听的方法返回值，通过一个自定义函数
		spyOn(dog,'getName').and.callFake(function(){
			return "帅哥";
		});

	5.	and.throwError 方法可以让监听方法执行之后返回一个错误信息,可以通过 toThrowError 来适配
		describe("test spy throwError",function(){
			beforeEach(function(){
		        spyobj = {
		            setBar: function(val){
		                bar = val;
		            }		            
		        }
		        spyOn(spyobj, "setBar").and.throwError('error');	// throwError 方法抛出错误
		    });
			spyOn(dog,"setAge").and.throwError('error');
			it('check spyobj invoke track', function(){
		        expect(function(){
		            spyobj.setBar();
		        }).toThrowError('error');							// toThrowError 方法来适配错误信息
		    });
		});

	6. and.stub 方法可以还原监听方法的返回值

	7. jasmine.any 方法检验变量是否匹配相关类型

	8. jasmine.objectContaining	检验对象是否包含某个`key/value`
```

### jasmine.clock 时间控制
```	
	1. jasmine.clock().install(), 启动时钟控制
		常写在 beforeAll 和 beforeEach 中
	
	2. jasmine.clock().uninstall(), 停止时钟控制
		常写在 afterAll 和 afterEach 中
	
	3. jasmine.clock().tick, 让时钟往前走多少秒，
		jasmine.clock().tick(100); 前进100毫秒 
	
	4. jasmine.clock().mockDate, 可以根据传入的date来设置当前时间		
		jasmine.clock().mockDate( new Date(2013, 9, 23) );	//设置当前时间为 2013-09-23
```

### jasmine异步支持
```
	beforeEach, it,包装的函数传入done参数,只有当done函数执行完成之后,beforeEach, it才算执行完成。
	describe('test asynchonous ', function(){
	    var value = 0, originalTimeout;

	    beforeEach(function(done){
	        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        // 设置jasmine超时时间为10秒	        
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

	        setTimeout(function(){
	            value += 1;
	            // 只有执行done函数,后面的it才会执行
	            done();
	        }, 200);
	    });

	    afterEach(function(){
	        // 还原jasmine超时时间
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	    });

	    it('expect value toEqual 1', function(done){
	        setTimeout(function(){
	            expect(value).toEqual(1);
	            // 只有执行这个,后面的it才会执行
	            done();
	        }, 9000);
	    });

	    it('until above spec complete ', function(){
	        expect(value).toBe(2);
	    });
	})
```

### 使用 karma 自动完成单元测试
```	
	1)  初始化package.json，安装 karma + jasmine 相关包
		npm init
		npm install -g karma-cli
		npm install karma karma-jasmine karma-chrome-launcher jasmine-core --save-dev

	2) 	karma init 初始化karma配置文件并配置 karma.conf.js

	3) 	在src/index.js中编写函数
		在spec/test.js 编写测试用例
		
	4)	karma start 启动单元测试
```	

### 启动 karma 执行器后
	点击图中的 debug 按钮，进入 debug.html 并按 F12 打开开发者工具，选择 Console 窗口，我们将能看到 jasmine 的执行日志

### 添加代码覆盖率 报告工具
```
	1. npm install karma-coverage --save-dev
	2. 修改karma.conf.js,增加覆盖率的配置
		preprocessors: {
	    	'src/**/*.js': ['coverage']
		}

		reporters: ['progress', 'coverage']

		// add
		coverageReporter: {
		    type: 'html',
		    dir: 'coverage/'
		}
		<1> 在 reporters 中增加 coverage
		<2> preprocessors 中指定 js 文件
		<3> 添加 coverageReporter 节点，将覆盖率报告类型 type 设置为 html，输入目录 dir 指定到你希望的目录中

	3. 启动Karma，npm run test（在package.json的script中配置 "test":"karma start" ）
		或者直接在命令行中输入 karma start		
```