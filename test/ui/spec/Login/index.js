describe('登录页检查', function() {
    it('全局检测', function(done) {
        browser
            .url('http://www.jiayoua-lzh.com/login')
            .webdrivercss('login-body', {
                name: 'body',
                elem: 'body'

            }, function(err,res) {
                expect(res.body[0].isExactSameImage).toBe(true);
            })
            .call(done) .end();
    });

});
