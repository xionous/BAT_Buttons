// ==UserScript==
// @name BAT_Buttons
// @namespace all
// @include https://shawprod.service-now.com/*
// @include https://shawqa.service-now.com/*
// @include http://plantmonitoring/ModemHistory.aspx*
// @include http://bslam/squery/*
// @author Matthew Streeter
// @version 1.9.5
// @downloadURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @updateURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @require https://openuserjs.org/src/libs/sizzle/GM_config.js
// @require https://github.com/xionous/BAT_Buttons/raw/master/include.js
// @grant GM_getValue
// @grant GM_setValue
// @grant none
// ==/UserScript==

if (document.getElementById('section_form_id')){
    var formId = document.getElementById('section_form_id').value;
}

var node = '';
var cmts = '';
var nodeSysId = '';

if (formId == 'sn_customerservice_rac_escalation.do') {
    node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
    cmts = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_cmts_data').value;
    nodeSysId = g_form.getValue('current.sn_customerservice_rac_escalation.u_case.u_node');
    sessionStorage.setItem('nodeSysId', nodeSysId);
    sessionStorage.setItem('node', node);
    sessionStorage.setItem('cmts', cmts);
}

if (formId == 'incident.do' || formId == 'incident_task.do' || formId == 'sn_customerservice_rac_escalation.do' || formId == 'change_request.do'){

    (function(){
        'use strict'

        var topBarMain = document.querySelector('.navbar-header');
        var topBarRight = document.querySelector('.navbar-right');
        var topBarRightBut = document.querySelector('.navbar_ui_actions');
        var denyButton = document.getElementById('deny_escalation');
        var buttomButtons = document.querySelector('.form_action_button_container');
        var escInc = document.querySelector('form[id="incident.do"]');
        var isNewInc = 'New record';
        var compactStyle = {'margin':'0px 3px 0px 5px', 'padding':'0px 5px 0px 5px', 'min-height':'1.848em', 'z-index': '500'};
        var compactStyleInc = {'margin':'0px 5px 0px 5px', 'padding':'0px 5px 0px 5px', 'min-height':'1.848em', 'z-index': '500'};
        var normalStyle = {'margin':'0px 0px 0px 5px', 'z-index': '500'};

        if (formId == 'incident_task.do' && g_form.getValue('incident_task.state') != 3) {
            if (window.NOW.compact) {
                addButton('Close Task', closeTask, topBarRightBut, compactStyle)
            } else {
                addButton('Close Task', closeTask, topBarRightBut, normalStyle)
            }
        }

        if (formId == 'sn_customerservice_rac_escalation.do') {
            window.node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
            window.cmts = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_cmts_data').value;
            if (window.NOW.compact) {
                addButton('Check All', checkNodeNoc, topBarMain, compactStyle)
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; line-height: 2.6rem!important; }');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
                if (document.getElementById('create_incident_rac') == null && g_form.getValue('sn_customerservice_rac_escalation.state') == 2 && document.getElementById('sys_display.sn_customerservice_rac_escalation.assigned_to').value != null){
                    createInc('Create Incident', denyButton, compactStyleInc)
                }
            } else {
                addButton('Check All', checkNodeNoc, topBarMain, normalStyle)
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
                if (document.getElementById('create_incident_rac') == null){
                    createInc('Create Incident', denyButton, compactStyleInc)
                }
            }
        }

        if (document.body.innerHTML.includes(isNewInc)) {

        } else if (formId == 'incident.do' && g_form.getValue('incident.category') == 'hfc') {
            if (window.NOW.compact) {
                addButton('Check All', checkNode, topBarMain, compactStyle)
                addButton('Incident', incSearch, topBarMain, compactStyle)
                addButton('Change', chgSearch, topBarMain, compactStyle)
                addButton('sPort', sPortSearch, topBarMain, compactStyle)
                addButton('Port', portSearch, topBarMain, compactStyle)
                addButton('sMQ', smqSearch, topBarMain, compactStyle)
                addButton('BMQ', bmqSearch, topBarMain, compactStyle)
                addButton('PM', pmNodeHistory, topBarMain, compactStyle)
                addButton('Power Supply', powerSupply, topBarMain, compactStyle)
                addButton('Config', openConfig, topBarMain, compactStyle)
                addNodeDropdown(topBarMain)
                if (g_form.getValue('incident.state') != 8 && g_form.getValue('incident.state') != 6) {
                    addButton('Cancel', cancelInc, topBarRightBut, compactStyle)
                    addButton('Cancel', cancelInc, buttomButtons, compactStyle)
                }
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important;  line-height: 2.6rem!important;}');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            } else {
                addButton('Check All', checkNode, topBarMain, normalStyle)
                addButton('Incident', incSearch, topBarMain, normalStyle)
                addButton('Change', chgSearch, topBarMain, normalStyle)
                addButton('sPort', sPortSearch, topBarMain, normalStyle)
                addButton('Port', portSearch, topBarMain, normalStyle)
                addButton('sMQ', smqSearch, topBarMain, normalStyle)
                addButton('BMQ', bmqSearch, topBarMain, normalStyle)
                addButton('PM', pmNodeHistory, topBarMain, normalStyle)
                addButton('Power Supply', powerSupply, topBarMain, normalStyle)
                addNodeDropdown(topBarMain)
                if (g_form.getValue('incident.state') != 8 && g_form.getValue('incident.state') != 6) {
                    addButton('Cancel', cancelInc, topBarRightBut, normalStyle)
                    addButton('Cancel', cancelInc, buttomButtons, normalStyle)
                }
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            }
        } else if (formId == 'change_request.do') {
            if (window.NOW.compact) {
                addButton('Incident', incSearch, topBarMain, compactStyle)
                addButton('Change', chgSearch, topBarMain, compactStyle)
                addButton('sPort', sPortSearch, topBarMain, compactStyle)
                addButton('sMQ', smqSearch, topBarMain, compactStyle)
                addButton('BMQ', bmqSearch, topBarMain, compactStyle)
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; line-height: 2.6rem!important; }');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            } else {
                addButton('Incident', incSearch, topBarMain, normalStyle)
                addButton('Change', chgSearch, topBarMain, normalStyle)
                addButton('sPort', sPortSearch, topBarMain, normalStyle)
                addButton('sMQ', smqSearch, topBarMain, normalStyle)
                addButton('BMQ', bmqSearch, topBarMain, normalStyle)
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            }
        } else if (formId == 'incident.do') {
            if (window.NOW.compact) {
                if (topBarMain == null) {
                    addli('Outage', outageTemplate, escInc)
                    addli('Poor RF', poorRfTemplate, escInc)
                    addli('Plant Intermittency', piTemplate, escInc)
                    addli('Noise', noiseTemplate, escInc)
                    addli('Telco', telcoTemplate, escInc)
                }
            } else {
                if (topBarMain == null) {
                    addli('Outage', outageTemplate, escInc)
                    addli('Poor RF', poorRfTemplate, escInc)
                    addli('Plant Intermittency', piTemplate, escInc)
                    addli('Noise', noiseTemplate, escInc)
                    addli('Telco', telcoTemplate, escInc)
                }
            }
        }
    }())}

if (document.body.innerHTML.includes('Modem History For')) {
    addGlobalStyle('.alertblue { padding: 20px; background-color: #2196F3; color: white; margin-bottom: 15px; }');
    addGlobalStyle('.alertgreen { padding: 20px; background-color: #4CAF50; color: white; margin-bottom: 15px; }');
    addGlobalStyle('.closebtn { margin-left: 15px; color: white; font-weight: bold; float: right; font-size: 22px; line-height: 20px; cursor: pointer; transition: 0.3s;}');
    addGlobalStyle('.closebtn:hover { color: black; }');
    var timeList = [];
    var getTable = document.querySelectorAll('table');
    getTable[0].style.position = 'static';
    getTable[1].style.position = 'static';
    var getDiv = document.querySelectorAll('div');
    getDiv[3].setAttribute('id', 'flaplist');
    document.getElementById("flaplist").insertAdjacentElement('afterbegin', getTable[0]);
    var getTableBody = document.querySelectorAll('tbody');
    var getform = document.querySelector('form');
    var getTime = getTableBody[1].querySelectorAll('td'), i;
    var getTzOfs = new Date().getTimezoneOffset();
    popupMessage('Double click on any time field to copy the time and date', 'alertblue', getform, 'beforebegin')
    for (i = 0; i < getTime.length; ++i) {
        var getYear = new Date().getFullYear();
        if (getTime[i].innerHTML.startsWith(getYear)) {
            getTime[i].id = 'time'+i
            var time = getTime[i].innerHTML
            timeList[i] = time;
            getTime[i].ondblclick = (function(i) {return function() {
                var tmLsSpl = timeList[i].split(' ');
                var dateSpl = tmLsSpl[0].split('-');
                var dateNew = dateSpl[2]+'/'+dateSpl[1]+'/'+dateSpl[0];
                var timeNew = tmLsSpl[1].split(':');
                var newHour = timeNew[0];
                if (getTzOfs == 300) {
                    newHour++;
                    copyStringToClipboard(dateNew+' '+newHour+':'+timeNew[1]+':'+timeNew[2]);
                } else if (getTzOfs == 420) {
                    newHour--;
                    copyStringToClipboard(dateNew+' '+newHour+':'+timeNew[1]+':'+timeNew[2]);
                } else if (getTzOfs == 360) {
                    copyStringToClipboard(dateNew+' '+timeNew[0]+':'+timeNew[1]+':'+timeNew[2]);
                }
                popupMessage('Copied Date & Time to clipboard in the Service-Now Format', 'alertgreen', getform, 'beforebegin')
            };})(i);
        }
    }

}

var sportCheck = document.getElementById('optionSelect');

if (sportCheck) {
    if (sportCheck.selectedIndex == 6) {
        var sPortTime = '';
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
            if (!mutation.addedNodes) return
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var textNodes = document.querySelectorAll('text')
                    if (textNodes[4] != null) {
                        if (textNodes[4].firstChild.innerHTML.length > 26 ) {
                        textNodes[4].firstChild.setAttribute('id', 'graphtitle')
                        var graphtitle = document.getElementById('graphtitle');
                        graphtitle.ondblclick = getTime;
                        }
                    }
                    var node = mutation.addedNodes[i]
                }
            })
        })

        observer.observe(document.body, {
            childList: true
            , subtree: true
            , attributes: false
            , characterData: false
        })
    }
}

var fieldDefs = {
    'checkallinc': {
        'section': [GM_config.create('Incident Buttons'), 'Select the buttons that show on Incidents'],
        'label': 'Check All:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'incinc': {
        'label': 'Incident:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'chginc': {
        'label': 'Change:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'sportinc': {
        'label': 'sPort:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'portinc': {
        'label': 'Port:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'smqinc': {
        'label': 'sMQ:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'bmqinc': {
        'label': 'BMQ:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'pminc': {
        'label': 'PM:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'psinc': {
        'label': 'Power Supply:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'checkallchg': {
        'section': [GM_config.create('Change Control Buttons'), 'Select the buttons that show on Change Control'],
        'label': 'Check All:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'incchg': {
        'label': 'Incident:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'chgchg': {
        'label': 'Change:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'sportchg': {
        'label': 'sPort:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'portchg': {
        'label': 'Port:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'smqchg': {
        'label': 'sMQ:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'bmqchg': {
        'label': 'BMQ:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'pmchg': {
        'label': 'PM:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'pschg': {
        'label': 'Power Supply:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'checkallchg': {
        'section': [GM_config.create('NOC Ticket Buttons'), 'Select the buttons that show on NOC Tickets'],
        'label': 'Check All:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'incchg': {
        'label': 'Incident:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'chgchg': {
        'label': 'Change:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'sportchg': {
        'label': 'sPort:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'portchg': {
        'label': 'Port:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'smqchg': {
        'label': 'sMQ:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'bmqchg': {
        'label': 'BMQ:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'pmchg': {
        'label': 'PM:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'pschg': {
        'label': 'Power Supply:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
};

GM_config.init(
    {
      id: 'GM_config',
      title: 'mTools Buttons Config',
      fields: fieldDefs,
    }
);

