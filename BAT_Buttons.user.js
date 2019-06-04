// ==UserScript==
// @name BAT_Buttons
// @namespace all
// @include https://shawprod.service-now.com/*
// @include https://shawqa.service-now.com/*
// @author Matthew Streeter
// @version 1.7.6
// @downloadURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @updateURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @grant none
// ==/UserScript==

var formId = document.getElementById('section_form_id').value;
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
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
                if (document.getElementById('create_incident_rac') == null){
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

        } else if (formId == 'incident.do') {
            if (window.NOW.compact) {
                if (topBarMain == null) {
                    addli('Outage', outageTemplate, escInc)
                    addli('Poor RF', poorRfTemplate, escInc)
                    addli('Plant Intermittency', piTemplate, escInc)
                    addli('Noise', noiseTemplate, escInc)
                    addli('Telco', telcoTemplate, escInc)
                } else {
                addButton('Check All', checkNode, topBarMain, compactStyle)
                addButton('Incident', incSearch, topBarMain, compactStyle)
                addButton('Change', chgSearch, topBarMain, compactStyle)
                addButton('sPort', sPortSearch, topBarMain, compactStyle)
                addButton('Port', portSearch, topBarMain, compactStyle)
                addButton('sMQ', smqSearch, topBarMain, compactStyle)
                addButton('BMQ', bmqSearch, topBarMain, compactStyle)
                addButton('PM', pmNodeHistory, topBarMain, compactStyle)
                addButton('Power Supply', powerSupply, topBarMain, compactStyle)
                if (g_form.getValue('incident.state') != 8 && g_form.getValue('incident.state') != 6) {
                    addButton('Cancel', cancelInc, topBarRightBut, compactStyle)
                    addButton('Cancel', cancelInc, buttomButtons, compactStyle)
                }
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
                }
            } else {
                if (topBarMain == null) {
                    addli('Outage', outageTemplate, escInc)
                    addli('Poor RF', poorRfTemplate, escInc)
                    addli('Plant Intermittency', piTemplate, escInc)
                    addli('Noise', noiseTemplate, escInc)
                    addli('Telco', telcoTemplate, escInc)
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
                if (g_form.getValue('incident.state') != 8 && g_form.getValue('incident.state') != 6) {
                    addButton('Cancel', cancelInc, topBarRightBut, normalStyle)
                    addButton('Cancel', cancelInc, buttomButtons, normalStyle)
                }
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
                }
            }
        } else if (formId == 'change_request.do') {
            if (window.NOW.compact) {
                addButton('Incident', incSearch, topBarMain, compactStyle)
                addButton('Change', chgSearch, topBarMain, compactStyle)
                addButton('sPort', sPortSearch, topBarMain, compactStyle)
                addButton('sMQ', smqSearch, topBarMain, compactStyle)
                addButton('BMQ', bmqSearch, topBarMain, compactStyle)
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; }');
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
        }

        function addGlobalStyle(css) {
            var head, style;
            head = document.getElementsByTagName('head')[0];
           if (!head) { return; }
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            head.appendChild(style);
        }

        function wait(ms){
            var start = new Date().getTime();
            var end = start;
            while(end < start + ms) {
                end = new Date().getTime();
            }
        }

        function addButton(text, onclick, node, cssVal, cssObj) {
            cssObj = cssObj || cssVal
            let button = document.createElement('button'), btnStyle = button.style
            node.appendChild(button)
            button.innerHTML = text
            button.onclick = onclick
            Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key])
            return button
        }

        function createInc(text, node, cssVal, cssObj) {
            cssObj = cssObj || cssVal
            let newButton = document.createElement ('button'), btnStyle = newButton.style
            newButton.innerHTML = text
            newButton.setAttribute("class", "form_action_button header action_context btn btn-default")

            newButton.setAttribute("type", "submit")
            newButton.setAttribute("value", "13db290edb9d360064aefa38bf9619b8")
            newButton.setAttribute("onclick", "var create_incident_rac=window.create_incident_rac;launchIncidentModal();return false;")
            newButton.setAttribute("id", "create_incident_rac")
            newButton.setAttribute("data-action-name", "create_incident_rac")
            newButton.setAttribute("gsft_id", "13db290edb9d360064aefa38bf9619b8")
            topBarRightBut.insertBefore(newButton, node)
            Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key])
            return newButton
        }

        function addli(text, onclick, node) {
            let li = document.createElement('a')
            node.appendChild(li)
            li.innerHTML = text
            li.onclick = onclick
            li.style.padding = '5px'
            return li
        }

        function closeTask() {
            g_form.setValue('incident_task.state', '3');
            g_form.save();
        }

        function cancelInc() {
            g_form.setValue('incident.state', '8');
            g_form.save();
        }

        function sPortSearch() {
            var node = '';
            if (formId == 'change_request.do') {
                node = document.getElementById('sys_display.change_request.cmdb_ci').value;
            } else {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
            var the_URL = "http://bslam/squery/?direct=sPort&query=" + node;
            if (node != '' && node != null) window.open(the_URL);
        }

        function powerSupply() {
            var node = '';
            if (formId == 'change_request.do') {
                node = document.getElementById('sys_display.change_request.cmdb_ci').value;
            } else {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
            var the_URL = "https://kenny:9156/psm/query?node=" + node;
            if (node != '' && node != null) window.open(the_URL);
        }

        function incSearch() {
            var node = '';
            if (formId == 'change_request.do') {
                node = document.getElementById('sys_display.change_request.cmdb_ci').value;
            } else {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
            var the_URL = "https://shawprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
            if (node != '' && node != null) window.open(the_URL);
        }

        function chgSearch() {
            var node = '';
            if (formId == 'change_request.do') {
                node = document.getElementById('sys_display.change_request.cmdb_ci').value;
            } else {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
            var the_URL = "https://shawprod.service-now.com/nav_to.do?uri=%2Fchange_request_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
            if (node != '' && node != null)	window.open(the_URL);
        }

        function portSearch() {
            var node = '';
            if (formId == 'change_request.do') {
                node = document.getElementById('sys_display.change_request.cmdb_ci').value;
            } else {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
            var the_URL = "http://port.shaw.ca/port/?orx=" + node;
            if (node != '' && node != null) window.open(the_URL);
        }

        function smqSearch() {
            var node = '';
            if(window.event.shiftKey) {
                node = prompt('sMQ Search');
                var the_URL = "http://bslam/squery/?direct=sMQ&query=" + node;
                if (node != '' && node != null) window.open(the_URL);
            } else {
                if (formId == 'change_request.do') {
                    node = document.getElementById('sys_display.change_request.cmdb_ci').value;
                } else {
                    node = document.getElementById('sys_display.incident.cmdb_ci').value;
                }
                var the_URL2 = "http://bslam/squery/?direct=sMQ&query=" + node;
                if (node != '' && node != null) window.open(the_URL2);
            }
        }

        function bmqSearch() {
            var node = '';
            if(window.event.shiftKey) {
                node = prompt('BMQ Search');
                var the_URL = "https://bmq.sjrb.ca/?s=" + node + "&c";
                if (node != '' && node != null) window.open(the_URL);
            } else {
                if (formId == 'change_request.do') {
                    node = document.getElementById('sys_display.change_request.cmdb_ci').value;
                } else {
                    node = document.getElementById('sys_display.incident.cmdb_ci').value;
                }
                var the_URL2 = "https://bmq.sjrb.ca/?s=" + node + "&c";
                if (node != '' && node != null) window.open(the_URL2);
            }
        }

        function checkNode() {
            var node = '';
            if (formId == 'change_request.do') {
                node = document.getElementById('sys_display.change_request.cmdb_ci').value;
            } else {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
            var the_URL = "http://bslam/squery/?direct=sPort&query=" + node;
            var the_URL2 = "https://bmq.sjrb.ca/?s=" + node + "&c";
            var the_URL3 = "http://bslam/squery/?direct=sMQ&query=" + node;
            var the_URL4 = "https://shawprod.service-now.com/nav_to.do?uri=%2Fchange_request_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
            var the_URL5 = "https://shawprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
            function open_tabs() {
                window.open(the_URL);
                window.open(the_URL2);
                window.open(the_URL3);
                window.open(the_URL4);
                wait(200);
                window.open(the_URL5);
            }
            if (node != '' && node != null) open_tabs();
        }

        function checkNodeNoc() {
            var node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
            var the_URL = "http://bslam/squery/?direct=sPort&query=" + node;
            var the_URL2 = "https://bmq.sjrb.ca/?s=" + node + "&c";
            var the_URL3 = "http://bslam/squery/?direct=sMQ&query=" + node;
            var the_URL4 = "https://shawprod.service-now.com/nav_to.do?uri=%2Fchange_request_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
            var the_URL5 = "https://shawprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
            function open_tabs() {
                window.open(the_URL);
                window.open(the_URL2);
                window.open(the_URL3);
                window.open(the_URL4);
                wait(200);
                window.open(the_URL5);
            }
            if (node != '' && node != null) open_tabs();
        }

        function pmNodeHistory() {
            var node = '';
            if(window.event.shiftKey) {
                var MAC = prompt('Modem MAC Address').replace(/:/g, "");
                var type = prompt('What Type of device is it? e.g. modem is dx and DPT is dt', 'dx');
                var the_URL = "http://plantmonitoring/ModemHistory.aspx?modemMac=" + MAC + "&type=" + type + "&daysBack=28";
                if (MAC != '' && MAC != null) window.open(the_URL,'popout','status=no,directories=no,location=no,resizable=no,menubar=no,width=720,height=500,toolbar=no');
            } else {
                if (formId == 'change_request.do') {
                    node = document.getElementById('sys_display.change_request.cmdb_ci').value;
                } else {
                    node = document.getElementById('sys_display.incident.cmdb_ci').value;
                }
                var type2 = prompt('What Type of device is it? e.g. modem is dx and DPT is dt', 'dx');
                var the_URL2 = "http://plantmonitoring/NodeHistory.aspx?opticalReceiver=" + node + "&type=" + type2 + "&daysBack=28";
                if (node != '' && node != null) window.open(the_URL2,'popout','status=no,directories=no,location=no,resizable=no,menubar=no,width=720,height=500,toolbar=no');
            }
        }

        function outageTemplate() {
            var userID = g_user.userID;
            var node = sessionStorage.getItem('node');
            var cmts = sessionStorage.getItem('cmts');
            var nodeSysId = sessionStorage.getItem('nodeSysId');
            var prov = '';
            var getHub = '';
            var h1 = '';
            var h2 = '';
            var hub = '';

            if (cmts.length == 9) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(4)
                h2 = getHub[1]
                hub = h2+h1
            } else if (cmts.length == 8) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(3)
                h2 = getHub[1]
                hub = h2+h1
            }

            if (node.startsWith("CG") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("FM")) {
                prov = "F||t Mcmurray"
            } else if  (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
                prov = "SK"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
                prov = "MB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            }

            g_form.setValue('incident.cmdb_ci', nodeSysId)
            g_form.setValue('incident.contact_type', 'self-service')
            g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Outage - Pending');
            g_form.setValue('incident.category', 'hfc');
            g_form.setValue('incident.subcategory', 'network_connectivity');
            g_form.setValue('incident.u_incident_type', '');
            g_form.setValue('incident.impact', '4');
            g_form.setValue('incident.urgency', '3');
            g_form.setValue('incident.caller_id', userID);
            g_form.setValue('incident.assigned_to', userID);
            g_form.setValue('incident.state', '2');
        }

        function poorRfTemplate() {
            var userID = g_user.userID;
            var node = sessionStorage.getItem('node');
            var cmts = sessionStorage.getItem('cmts');
            var nodeSysId = sessionStorage.getItem('nodeSysId');
            var prov = '';
            var getHub = '';
            var h1 = '';
            var h2 = '';
            var hub = '';

            if (cmts.length == 9) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(4)
                h2 = getHub[1]
                hub = h2+h1
            } else if (cmts.length == 8) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(3)
                h2 = getHub[1]
                hub = h2+h1
            }

            if (node.startsWith("CG") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("FM")) {
                prov = "F||t Mcmurray"
            } else if  (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
                prov = "SK"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
                prov = "MB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            }

            g_form.setValue('incident.cmdb_ci', nodeSysId)
            g_form.setValue('incident.contact_type', 'self-service')
            g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Poor RF - [MODIFIER] [Poor TX / Poor RX / Poor CV / Low dSNR] - Pending');
            g_form.setValue('incident.category', 'hfc');
            g_form.setValue('incident.subcategory', 'network_connectivity');
            g_form.setValue('incident.u_incident_type', '');
            g_form.setValue('incident.impact', '4');
            g_form.setValue('incident.urgency', '4');
            g_form.setValue('incident.caller_id', userID);
            g_form.setValue('incident.assigned_to', userID);
            g_form.setValue('incident.state', '2');
        }

        function telcoTemplate() {
            var userID = g_user.userID;
            var node = sessionStorage.getItem('node');
            var cmts = sessionStorage.getItem('cmts');
            var nodeSysId = sessionStorage.getItem('nodeSysId');
            var prov = '';
            var getHub = '';
            var h1 = '';
            var h2 = '';
            var hub = '';

            if (cmts.length == 9) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(4)
                h2 = getHub[1]
                hub = h2+h1
            } else if (cmts.length == 8) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(3)
                h2 = getHub[1]
                hub = h2+h1
            }

            if (node.startsWith("CG") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("FM")) {
                prov = "F||t Mcmurray"
            } else if  (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
                prov = "SK"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
                prov = "MB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            }

            g_form.setValue('incident.cmdb_ci', nodeSysId)
            g_form.setValue('incident.contact_type', 'self-service')
            g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Noise - Telco - Pending');
            g_form.setValue('incident.category', 'hfc');
            g_form.setValue('incident.subcategory', 'telco_ingress');
            g_form.setValue('incident.u_incident_type', 'Customer Gear');
            g_form.setValue('incident.impact', '4');
            g_form.setValue('incident.urgency', '4');
            g_form.setValue('incident.caller_id', userID);
            g_form.setValue('incident.assigned_to', userID);
            g_form.setValue('incident.state', '2');
        }

        function noiseTemplate() {
            var userID = g_user.userID;
            var node = sessionStorage.getItem('node');
            var cmts = sessionStorage.getItem('cmts');
            var nodeSysId = sessionStorage.getItem('nodeSysId');
            var prov = '';
            var getHub = '';
            var h1 = '';
            var h2 = '';
            var hub = '';

            if (cmts.length == 9) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(4)
                h2 = getHub[1]
                hub = h2+h1
            } else if (cmts.length == 8) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(3)
                h2 = getHub[1]
                hub = h2+h1
            }

            if (node.startsWith("CG") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("FM")) {
                prov = "F||t Mcmurray"
            } else if  (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
                prov = "SK"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
                prov = "MB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            }

            g_form.setValue('incident.cmdb_ci', nodeSysId)
            g_form.setValue('incident.contact_type', 'self-service')
            g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Noise - [MODIFIER] [Low SNR / Unc||rectables / Rogue Modem] - Pending');
            g_form.setValue('incident.category', 'hfc');
            g_form.setValue('incident.subcategory', 'noise_ingress');
            g_form.setValue('incident.u_incident_type', '');
            g_form.setValue('incident.impact', '4');
            g_form.setValue('incident.urgency', '4');
            g_form.setValue('incident.caller_id', userID);
            g_form.setValue('incident.assigned_to', userID);
            g_form.setValue('incident.state', '2');
        }

        function piTemplate() {
            var userID = g_user.userID;
            var node = sessionStorage.getItem('node');
            var cmts = sessionStorage.getItem('cmts');
            var nodeSysId = sessionStorage.getItem('nodeSysId');
            var prov = '';
            var getHub = '';
            var h1 = '';
            var h2 = '';
            var hub = '';

            if (cmts.length == 9) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(4)
                h2 = getHub[1]
                hub = h2+h1
            } else if (cmts.length == 8) {
                getHub = cmts.split('.');
                h1 = getHub[0].substr(3)
                h2 = getHub[1]
                hub = h2+h1
            }

            if (node.startsWith("CG") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
                prov = "AB"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("FM")) {
                prov = "F||t Mcmurray"
            } else if  (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if  (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
                prov = "SK"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
                prov = "MB"
				g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if  (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
                prov = "BC"
				g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            }

            g_form.setValue('incident.cmdb_ci', nodeSysId)
            g_form.setValue('incident.contact_type', 'self-service')
            g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Plant Intermittency - Pending');
            g_form.setValue('incident.category', 'hfc');
            g_form.setValue('incident.subcategory', 'network_connectivity');
            g_form.setValue('incident.u_incident_type', '');
            g_form.setValue('incident.impact', '4');
            g_form.setValue('incident.urgency', '4');
            g_form.setValue('incident.caller_id', userID);
            g_form.setValue('incident.assigned_to', userID);
            g_form.setValue('incident.state', '2');
        }

    }())}
