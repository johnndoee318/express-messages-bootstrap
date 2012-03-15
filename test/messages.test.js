
/**
 * Module dependencies.
 */

var express = require('express')
  , messages = require('../')
  , assert = require('assert');

module.exports = {
  'test messages dynamic helper': function(){
    var app = express.createServer(
      express.cookieParser(),
      express.session({ secret: 'wahoo' })
    );
    app.set('views', __dirname + '/fixtures');
    app.dynamicHelpers({ messages: messages });
    
    app.get('/', function(req, res, next){
      req.flash('error', '<p>This is an error.</p>');
      req.flash('info', '<p>This is an info.</p>');
      req.flash('warning', '<p>This is a warning.</p>');
      req.flash('success', '<p>This is success.</p>');

      res.render('messages.ejs', {
        layout: false
      });
    });
    
    app.get('/none', function(req, res, next){
      res.render('messages.ejs', {
        layout: false
      });
    });

    var html = [
    '<div id="messages">'
    ,'<div class="alert alert-error" data-alert="alert">'
    ,'<a class="close" href="#" data-dismiss="alert">×</a>'
    ,'<p>This is an error.</p>'
    ,'</div>'
    ,'<div class="alert alert-info" data-alert="alert">'
    ,'<a class="close" href="#" data-dismiss="alert">×</a>'
    ,'<p>This is an info.</p>'
    ,'</div>'
    ,'<div class="alert alert-warning" data-alert="alert">'
    ,'<a class="close" href="#" data-dismiss="alert">×</a>'
    ,'<p>This is a warning.</p>'
    ,'</div>'
    ,'<div class="alert alert-success" data-alert="alert">'
    ,'<a class="close" href="#" data-dismiss="alert">×</a>'
    ,'<p>This is success.</p>'
    ,'</div>'
    ,'</div>'
    ].join('\n');

    assert.response(app,
      { url: '/' },
      { body: html });
    assert.response(app,
      { url: '/none' },
      { body: '' });
  }
};