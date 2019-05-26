// ==UserScript==
// @name BAT_Buttons
// @namespace all
// @include https://shawprod.service-now.com/*
// @author Matthew Streeter
// @version 1.4.2
// @downloadURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @updateURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @grant none
// ==/UserScript==

if (document.getElementById('sys_display.incident.cmdb_ci')){

    (function(){
        'use strict'

        var topBarMain = document.querySelector('.navbar-header');
        var getBody = document.getElementsByTagName('body').innerHTML.toString();
 var isNewInc = 'New record';
        if (getBody.includes(isNewInc)) {

        } else {
            if (window.NOW.compact){
                addButton('Check All', checkNode, topBarMain, {'margin':'0px 0px 0px 5px', padding:'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('Incident', incSearch, topBarMain, {'margin':'0px 0px 0px 5px', padding:'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('Change', chgSearch, topBarMain, {'margin':'0px 0px 0px 5px', padding:'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('sPort', sPortSearch, topBarMain, {'margin':'0px 0px 0px 5px', padding:'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('Port', portSearch, topBarMain, {'margin':'0px 0px 0px 5px', padding:'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('sMQ', smqSearch, topBarMain, {'margin':'0px 0px 0px 5px', padding:'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('BMQ', bmqSearch, topBarMain, {'margin':'0px 0px 0px 5px', padding:'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('PM', pmNodeHistory, topBarMain, {'margin':'0px 0px 0px 5px', padding:'0px 5px 0px 5px', 'min-height':'1.8em', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
            } else {
                addButton('Check All', checkNode, topBarMain, {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('Incident', incSearch, topBarMain, {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('Change', chgSearch, topBarMain, {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('sPort', sPortSearch, topBarMain, {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('Port', portSearch, topBarMain, {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('sMQ', smqSearch, topBarMain, {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('BMQ', bmqSearch, topBarMain, {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
                addButton('PM', pmNodeHistory, topBarMain, {'margin':'0px 0px 0px 5px', 'z-index': '500', 'background-color': 'rgb(241, 242, 243)'})
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

    }())}
