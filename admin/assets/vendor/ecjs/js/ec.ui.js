/*! EC.js - v0.1.0 - 2013-05-16
* Copyright (c) 2013 Emilio Cobos Álvarez; Licensed MIT */
(function(){"use strict";EC.UI=EC.UI||{};var e=!1,t=function(){EC.UI.modal=EC.modal.create({title:"",content:"",footer:"",customClose:!0}),EC.UI.modal.elements.modal.addClass("ec-ui-modal"),e=!0};EC.core.extend(EC.UI,{language:"en_EN",messages:{en_EN:{ok:"Ok",accept:"Ok",cancel:"Cancel",yes:"Yes",no:"No",alert:"Alert",confirm:"Confirm your action",prompt:"Prompt dialog"},es_ES:{ok:"Ok",accept:"Aceptar",cancel:"Cancelar",yes:"Sí",no:"No",alert:"Alerta",confirm:"Confirma tu acción",prompt:"Diálogo para ingresar información"}},modal:null,getLanguage:function(){return EC.UI.messages[EC.UI.language]},alert:function(n,o,i){var r,s=EC.UI.getLanguage();e||t(),i||(i=s.alert),EC.UI.modal.elements.modal_title.get(0).innerHTML=i,EC.UI.modal.elements.modal_content.get(0).innerHTML=n,EC.UI.modal.elements.modal_footer.get(0).innerHTML="",EC.UI.modal.elements.modal_footer.append(r=EC.DOM.create("button",{className:"ec-ui-btn ec-ui-btn-ok",innerHTML:s.ok,onclick:function(){EC.UI.modal.close(),o&&"function"==typeof o&&o()}})),EC.UI.modal.show(function(){r.get(0).focus()})},confirm:function(n,o,i){var r,s=EC.UI.getLanguage();e||t(),i||(i=s.confirm),EC.UI.modal.elements.modal_title.get(0).innerHTML=i,EC.UI.modal.elements.modal_content.get(0).innerHTML=n,EC.UI.modal.elements.modal_footer.get(0).innerHTML="",EC.UI.modal.elements.modal_footer.append(EC.DOM.create("button",{className:"ec-ui-btn ec-ui-btn-cancel",innerHTML:s.cancel,onclick:function(){EC.UI.modal.close(),o(!1)}})).append(r=EC.DOM.create("button",{className:"ec-ui-btn ec-ui-btn-ok",innerHTML:s.accept,onclick:function(){EC.UI.modal.close(),o(!0)}})),EC.UI.modal.show(function(){r.get(0).focus()})},prompt:function(n,o,i,r){var s=EC.UI.getLanguage(),a=EC.DOM.create("input",{className:"ec-ui-input",type:"text",value:o||""});e||t(),r||(r=s.prompt),EC.UI.modal.elements.modal_title.get(0).innerHTML=r,EC.UI.modal.elements.modal_content.get(0).innerHTML=n,EC.UI.modal.elements.modal_content.append(EC.DOM.create("div",{className:"ec-ui-input-wrapper"}).append(a)),EC.UI.modal.elements.modal_footer.get(0).innerHTML="",EC.UI.modal.elements.modal_footer.append(EC.DOM.create("button",{className:"ec-ui-btn ec-ui-btn-ok",innerHTML:s.ok,onclick:function(){EC.UI.modal.close(),i&&"function"==typeof i&&i(a.get(0).value)}})),EC.UI.modal.show(function(){a.get(0).focus(),a.get(0).select()})}})})(window);