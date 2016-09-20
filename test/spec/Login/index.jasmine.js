describe('Login/index', function() {
    
    beforeEach(function*() {
        yield browser.url('/pages');
    });

    /*describe('网页标题', function() {
        it('应该 包含登录关键字', function*(){
            yield browser.pause(3000);
            var title = yield browser.getTitle();
            expect(title).toContain('启尚WEB3.0-登录');
        })
    });*/
    describe('网页标题', function () {
        it('应该 包含登录关键字', function*() {
            //noinspection JSAnnotator
            yield browser.pause(3000);
            //noinspection JSAnnotator
            var title = yield browser.getTitle();
            expect(title).toContain('启尚WEB3.0-登录');
        })
    })
    
    describe('功能、链接检测', function() {
        it('1、应该 在输入正确的用户名密码后 能登录', function*() {
            yield browser.setValue('#login_username', 'lizhiheng@jiayoua.com');
            yield browser.setValue('#login_password', 'asd123456');
            yield browser.click('button=登录');
            yield browser.pause(3000);
            var url = yield browser.url();
            yield browser.url('/');
            var baseUrl = yield browser.url();
            expect(url.value).toBe(baseUrl.value);
            yield browser.url('/logout');
        });

        it('2、应该 在输入错误的用户名密码后不能登录 并提示帐号或密码不正确', function*() {
            yield browser.setValue('#login_username', 'test2');
            yield browser.setValue('#login_password', 'testtest');
            yield browser.click('button=登录');
            var alertText = yield browser.getText('//div[@class=\'alert alert-danger\']');
            expect(alertText).toBe('帐号或密码不正确');
        });
        it('3、应该 点击忘记登录密码 跳转到 重设密码', function*() {
            yield browser.click('=忘记登录密码？');
            var title = yield browser.getTitle();
            expect(title).toContain('重设密码');
        });

        it('4、应该 点击立即注册 跳转到 注册页', function*() {
            yield browser.click('=立即注册');
            var title = yield browser.getTitle();
            expect(title).toContain('注册');
        });
    });

});