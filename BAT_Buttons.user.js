// ==UserScript==
// @name BAT_Buttons
// @namespace all
// @include https://shawprod.service-now.com/*
// @author Matthew Streeter
// @version 1.5.0
// @downloadURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @updateURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @grant none
// ==/UserScript==

var formId = document.getElementById('section_form_id').value;

if (formId == 'incident.do' || formId == 'incident_task.do' || formId == 'sn_customerservice_rac_escalation.do'){

    (function(){
        'use strict'

        var topBarMain = document.querySelector('.navbar-header');
        var topBarRight = document.querySelector('.navbar-right');
        var escInc = document.querySelector('form[id="incident.do"]');
        var isNewInc = 'New record';
        var compactStyle = {'margin':'0px 0px 0px 5px', 'padding':'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'};
        var normalStyle = {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'};

        //var node = '';

        if (formId == 'incident_task.do') {
            if (window.NOW.compact) {
                addButton('Close Task', closeTask, topBarRight, compactStyle)
            } else {
                addButton('Close Task', closeTask, topBarRight, normalStyle)
            }
        }

        //if (formId == 'sn_customerservice_rac_escalation.do') {
        //   node = g_form.getReference('sys_display.sn_customerservice_rac_escalation.u_case.u_node')
        //   window.alert(node);           
        //}        

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
                }
            } else {
                addButton('Check All', checkNode, topBarMain, normalStyle)
                addButton('Incident', incSearch, topBarMain, normalStyle)
                addButton('Change', chgSearch, topBarMain, normalStyle)
                addButton('sPort', sPortSearch, topBarMain, normalStyle)
                addButton('Port', portSearch, topBarMain, normalStyle)
                addButton('sMQ', smqSearch, topBarMain, normalStyle)
                addButton('BMQ', bmqSearch, topBarMain, normalStyle)
                addButton('PM', pmNodeHistory, topBarMain, normalStyle)
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

        function sPortSearch() {
            var node = document.getElementById('sys_display.incident.cmdb_ci').value;
            var the_URL = "http://bslam/squery/?direct=sPort&query=" + node;
            if (node != '' && node != null) window.open(the_URL);
        }

        function incSearch() {
            var node = document.getElementById('sys_display.incident.cmdb_ci').value;
            var the_URL = "https://shawprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
            if (node != '' && node != null) window.open(the_URL);
        }

        function chgSearch() {
            var node = document.getElementById('sys_display.incident.cmdb_ci').value;
            var the_URL = "https://shawprod.service-now.com/nav_to.do?uri=%2Fchange_request_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
            if (node != '' && node != null)	window.open(the_URL);
        }

        function portSearch() {
            var node = document.getElementById('sys_display.incident.cmdb_ci').value;
            var the_URL = "http://port.shaw.ca/port/?orx=" + node;
            if (node != '' && node != null) window.open(the_URL);
        }

        function smqSearch() {
            if(window.event.shiftKey) {
                var node = prompt('sMQ Search');
                var the_URL = "http://bslam/squery/?direct=sMQ&query=" + node;
                if (node != '' && node != null) window.open(the_URL);
            } else {
                var node2 = document.getElementById('sys_display.incident.cmdb_ci').value;
                var the_URL2 = "http://bslam/squery/?direct=sMQ&query=" + node2;
                if (node2 != '' && node2 != null) window.open(the_URL2);
            }
        }

        function bmqSearch() {
            if(window.event.shiftKey) {
                var node = prompt('BMQ Search');
                var the_URL = "https://bmq.sjrb.ca/?s=" + node + "&c";
                if (node != '' && node != null) window.open(the_URL);
            } else {
                var node2 = document.getElementById('sys_display.incident.cmdb_ci').value;
                var the_URL2 = "https://bmq.sjrb.ca/?s=" + node2 + "&c";
                if (node2 != '' && node2 != null) window.open(the_URL2);
            }
        }

        function checkNode() {
            var node = document.getElementById('sys_display.incident.cmdb_ci').value;
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
            if(window.event.shiftKey) {
                var MAC = prompt('Modem MAC Address').replace(/:/g, "");
                var type = prompt('What Type of device is it? e.g. modem is dx and DPT is dt', 'dx');
                var the_URL = "http://plantmonitoring/ModemHistory.aspx?modemMac=" + MAC + "&type=" + type + "&daysBack=28";
                if (MAC != '' && MAC != null) window.open(the_URL,'popout','status=no,directories=no,location=no,resizable=no,menubar=no,width=720,height=500,toolbar=no');
            } else {
                var NODE = document.getElementById('sys_display.incident.cmdb_ci').value;
                var type2 = prompt('What Type of device is it? e.g. modem is dx and DPT is dt', 'dx');
                var the_URL2 = "http://plantmonitoring/NodeHistory.aspx?opticalReceiver=" + NODE + "&type=" + type2 + "&daysBack=28";
                if (NODE != '' && NODE != null) window.open(the_URL2,'popout','status=no,directories=no,location=no,resizable=no,menubar=no,width=720,height=500,toolbar=no');
            }
        }

        function outageTemplate() {
            var userID = g_user.userID;
            g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Outage - Pending');
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
            g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Poor RF - [MODIFIER] [Poor TX / Poor RX / Poor CV / Low dSNR] - Pending');
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
            g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Noise - Telco - Pending');
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
            g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Noise - [MODIFIER] [Low SNR / Unc||rectables / Rogue Modem] - Pending');
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
            g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Plant Intermittency - Pending');
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