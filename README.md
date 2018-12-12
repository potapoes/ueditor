### �Զ��尴ť
��custom_dialogs��������Ӧģ�飬��controller.js��ע�ᰴť��ҳ�档
```
/**
�Զ���--����
 */

UE.registerUI('button_discussion',function(editor,uiName){
    if(!this.options.toolleipi)
    {
        return false;
    }
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                leipiFormDesign.exec('discussion');
                //leipiFormDesign.fnCheckForm('save');
            } catch ( e ) {
                alert('��ģ���쳣');
            }

        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name:uiName,
        //��ʾ
        title:"��������",
        //��Ҫ��ӵĶ�����ʽ��ָ��iconͼ�꣬����Ĭ��ʹ��һ���ظ���icon
        cssRules :'background-position: -642px -40px;',
        //���ʱִ�е�����
        onclick:function () {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
           editor.execCommand(uiName);
        }
    });

    //��Ϊ�������button,������Ҫ�������button
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
				title: '���ۿ�',
				cssRules:"width:400px;height:200px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'ȷ��',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'ȡ��',
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
			if( window.confirm('ȷ��ɾ���ÿؼ���') ) {
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
				'<nobr>�ı���: <span onclick=$$._edittext() class="edui-clickable">�༭</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">ɾ��</span></nobr>' );
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
```
### ��iframe�б༭�Զ����(p���������window,b����༭��iframe)
```
 // �༭�¼�
        editPlugin.addEventListener('click', function (t, evt) {
            var p = window.parent.parent;
            var b = window.parent;
            p.baidu.editor.plugins[thePlugins].editdom = window.frameElement;
            b.editor.execCommand(thePlugins);
        })
        //�༭ɾ���¼�
        deletePlugin.addEventListener('click', function (t, evt) {
            var p = window.parent.parent;
            var b = window.parent;
            /* p.baidu.editor.plugins[thePlugins].editdom = window.frameElement;
             b.editor.execCommand(thePlugins);*/

            if (window.confirm('ȷ��ɾ���ÿؼ���')) {
                p.baidu.editor.dom.domUtils.remove(window.frameElement, false);
            }
        })
```
### �༭������
1.ajax�������ĵ����ݣ��ĵ�˳��Ԥ���õ���