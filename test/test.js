var jsdom = require('jsdom');

function ok(expected, toBe) {
  console.assert(expected === toBe, 'Expected', toBe, 'to be', expected);
}

jsdom.env({
  file: __dirname + '/testDom.html',
  scripts: [
    __dirname + '/../node_modules/jquery/dist/jquery.js',
    __dirname + '/../index.js'
  ],
  done: function (errors, window) {
    try {
      var data = window.xtract(window.jQuery('#9294884'));
      ok(data.$model.user.name, 'Fatih!');
      ok(data.$model.user.paragraph, 'Hello world!');
      ok(data.$model.user.id, '9294884');

      ok(data.$model.a.b.c.d, '1');
      ok(data.$model.x.y.z, 'some value');

      var data2 = window.xtract(window.jQuery('#hello'), 'data-y');
      ok(data2.$model.user.name, 'Fatih!');
      ok(data2.$model.user.paragraph, 'Hello world!');
      ok(data2.$model.user.id, 'hello');

      ok(data2.$model.a.b.c.d, '1');
      ok(data2.$model.x.y.z, 'some value');

      console.log('All tests passed');
    } catch (error) {
      console.error(error);
    }
  }
});
