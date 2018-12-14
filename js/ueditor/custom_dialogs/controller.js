UE.custom_url = 'custom_dialogs';
/**
自定义--讨论
 */
UE.registerUI('button_new',function(editor,uiName){

})
UE.registerUI('button_discussion',function(editor,uiName){
    console.log(this.options)
    if(!this.options.toolleipi)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                leipiFormDesign.exec('discussion');
                //leipiFormDesign.fnCheckForm('save');
            } catch ( e ) {
                alert('打开讨论异常');
            }

        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"创建讨论",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -642px -40px;',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});

UE.plugins['discussion'] = function () {
	var me = this,thePlugins = 'discussion';
	me.commands[thePlugins] = {
		execCommand:function () {
			var dialog = new UE.ui.Dialog({
				iframeUrl:this.options.UEDITOR_HOME_URL + UE.custom_url+'/discussion/discussion.html',
				name:thePlugins,
				editor:this,
				title: '讨论框',
				cssRules:"width:400px;height:200px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'确定',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'取消',
					onclick:function () {
						dialog.close(false);
					}
				}]
			});
			dialog.render();
			dialog.open();
		}
	};
	var popup = new baidu.editor.ui.Popup( {
		editor:this,
		content: '',
		className: 'edui-bubble',
		_edittext: function () {
			  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
			  me.execCommand(thePlugins);
			  this.hide();
		},
		_delete:function(){
			if( window.confirm('确认删除该控件吗？') ) {
				baidu.editor.dom.domUtils.remove(this.anchorEl,false);
			}
			this.hide();
		}
	} );
	popup.render();
	me.addListener( 'mouseover', function( t, evt ) {
	    return false;
		evt = evt || window.event;
		var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('leipiplugins');
		if ( /iframe/ig.test( el.tagName ) && leipiPlugins==thePlugins) {
			var html = popup.formatHtml(
				'<nobr>文本框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
			if ( html ) {
				popup.getDom( 'content' ).innerHTML = html;
				popup.anchorEl = el;
				popup.showAnchor( popup.anchorEl );
			} else {
				popup.hide();
			}
		}
	});
};


/**
自定义--更多
 */

UE.registerUI('更多',function(editor,uiName){

     var val = editor.options.more_tools || ["link","spechars","wordimage"];
     var valObj=[
         {
             "text":"超链接",
             "isEditor":true,
             "value":"link"
         },
         {
             "text":"特殊字符",
             "isEditor":true,
             "value":"spechars"
         },
         {
             "text":"图片转存",
             "isEditor":true,
             "value":"wordimage"
         },
         {
             "text":"课程讨论",
             "isEditor":false,
             "value":"discussion"
         }
     ]
        if (!valObj.length)return;
        for (var i = 0, ci, items = []; ci = valObj[i++];) {
            items.push({
                //todo:写死了
                label:ci.text,
                value:ci.value,
                theme:editor.options.theme,
                is_editor:ci.isEditor,
                onclick:function () {
                  //  editor.execCommand("lineheight", this.value);
                    if(this.is_editor){
                        editor.ui._dialogs[this.value+"Dialog"].render();
                        editor.ui._dialogs[this.value+"Dialog"].open();
                    }else{
                        editor.execCommand(this.value);
                    }


                }
            })
        }
        var ui = new baidu.editor.ui.MenuButton({
            editor:editor,
            className:'edui-for-more-tools',
            title:'更多',
            items:items,
            onbuttonclick:function () {
                return false;
                var value = editor.queryCommandValue('LineHeight') || this.value;
                editor.execCommand("LineHeight", value);
            }
        });
        return ui;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);
/*自定义更多-2*/
UE.registerUI('button_more',function(editor,uiName){
    if(!this.options.toolleipi)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
               // leipiFormDesign.exec('discussion');
                //leipiFormDesign.fnCheckForm('save');

            } catch ( e ) {
                alert('打开讨论异常');
            }

        }
    });
    //创建一个button

     function offset(elem){
                var obj={
                    left:elem.offsetLeft,
                    top:elem.offsetTop,
                    width:elem.offsetWidth,
                    height:elem.offsetHeight
                }
               while(elem != document.body){
                    elem = elem.offsetParent ;
                    obj.left += elem.offsetLeft ;
                    obj.top += elem.offsetTop ;
                }
             return obj;

            }
     var options=[
         {
             "text":"超链接",
             "isEditor":true,
             "value":"link"
         },
         {
             "text":"特殊字符",
             "isEditor":true,
             "value":"spechars"
         },
         {
             "text":"图片转存",
             "isEditor":true,
             "value":"wordimage"
         },
         {
             "text":"课程讨论",
             "isEditor":false,
             "value":"discussion"
         }
     ];
      //弹出更多的框
    var str="<div><ul>";
    for(var i=0;i<options.length;i++){
        str+='<li style="cursor: pointer;height: 24px;padding-left: 4px" data-iseditor="'+options[i].isEditor+'" data-value="'+options[i].value+'">'+options[i].text+'</li>'
    }
    str+="</ul></div>";
    var more_tools=document.getElementById("more_tools");
    more_tools.innerHTML=str;
    var aLi=more_tools.getElementsByTagName("li");
    for(var i=0;i<aLi.length;i++){
                    aLi[i].addEventListener('click',function(e){

                        var is_editor=this.dataset.iseditor;
                        var value=this.dataset.value;
                        more_tools.style.display='none';
                        if(is_editor=='true'){
                            editor.ui._dialogs[value+"Dialog"].render();
                            editor.ui._dialogs[value+"Dialog"].open();
                        }else{
                            editor.execCommand(value);
                        }
                        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                    })
                }
     document.onclick = function (e) {
         more_tools.style.display='none';
    }
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"更多",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -458px -40px;',
        //点击时执行的命令
        onclick:function (a,e) {
            var that=this;
            //这里可以不用执行命令,做你自己的操作也可
          // editor.execCommand(uiName);
            var eleObj=offset(this.target);
            if(more_tools.style.display=='block'){
                more_tools.style.display='none';
            }else{
                more_tools.style.display='block';
                more_tools.style.left=eleObj.left+"px";
                more_tools.style.top=eleObj.top-16+"px";
            };
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});