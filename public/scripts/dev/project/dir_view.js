var dirController = {
  _cacheElement : {
    directory_file : null,
    code_file : null
  },

  _data : {
    codePath : null,
    dirPath : null
  },

  init: function(){
    this.setElement();
    this.setData();
    this.setEventHandler();
  },

  setValue : function(key, value){
    this._data[key] = value;
  },

  getValue : function(key){
    return this._data[key];
  },

  setElement : function(){
    this._cacheElement.directory_file = $('.directory_file');
    this._cacheElement.code_file = $('.code_file');
  },

  setData : function(){
    var codePath = (location.pathname).split("/").filter(function(a){return a});
    codePath[2]='code';
    codePath='/'+codePath.join('/')+'/'

    this.setValue('codePath', codePath);
    this._data.dirPath = '/'+ (location.pathname).split("/").filter(function(a){return a}).join('/') +'/'
  },

  setEventHandler : function(){
    this.setFileEvent();
  },

  setFileEvent: function(){
    var _dirFile = this._cacheElement.directory_file;
    var _codeFile = this._cacheElement.code_file;
    var dirPath = this.getValue('dirPath');
    var codePath = this.getValue('codePath');

    _dirFile.on('click', function(){
      location=location.origin+dirPath+$(this).text().trim();
    });

    _codeFile.on('click', function(){
      location=location.origin+codePath+$(this).text().trim();
    });
  }
}
