// ==UserScript==
// @name BAT_Buttons
// @namespace all
// @include https://shawprod.service-now.com/*
// @author Matthew Streeter
// @version 1.2
// @downloadURL https://github.com/xionous/BAT_Buttons/blob/master/BAT_Buttons.user.js
// @updateURL https://github.com/xionous/BAT_Buttons/blob/master/BAT_Buttons.user.js
// @grant none
// ==/UserScript==

if (document.getElementById('sys_display.incident.cmdb_ci')){

    (function(){
        'use strict'
        //window.addEventListener('load', () => {
            addButton('Check All', checkNode, {position: 'fixed', top: '8px', left:'160px', 'min-width':'5.3em', 'z-index': '500'})
            addButton('Incident', incSearch, {position: 'fixed', top: '8px', left:'235px', 'min-width':'5.3em', 'z-index': '500'})
            addButton('Change', chgSearch, {position: 'fixed', top: '8px', left:'310px', 'min-width':'5.3em', 'z-index': '500'})
            addButton('sPort', sPortSearch, {position: 'fixed', top: '8px', left:'385px', 'min-width':'5.3em', 'z-index': '500'})
            addButton('Port', portSearch, {position: 'fixed', top: '8px', left:'460px', 'min-width':'5.3em', 'z-index': '500'})
            addButton('sMQ', smqSearch, {position: 'fixed', top: '8px', left:'535px', 'min-width':'5.3em', 'z-index': '500'})
            addButton('BMQ', bmqSearch, {position: 'fixed', top: '8px', left:'610px', 'min-width':'5.3em', 'z-index': '500'})
            addButton('PM', pmNodeHistory, {position: 'fixed', top: '8px', left:'685px', 'min-width':'5.3em', 'z-index': '500'})
       // })

        function wait(ms){
            var start = new Date().getTime();
            var end = start;
            while(end < start + ms) {
                end = new Date().getTime();
            }
        }

        function addButton(text, onclick, cssVal, cssObj) {
            cssObj = cssObj || cssVal
            let button = document.createElement('button'), btnStyle = button.style
            document.body.appendChild(button)
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
            var NODE = document.getElementById('sys_display.incident.cmdb_ci').value;
            var type = prompt('What Type of device is it? e.g. modem is dx and DPT is dt', 'dx');
            var the_URL = "http://plantmonitoring/NodeHistory.aspx?opticalReceiver=" + NODE + "&type=" + type + "&daysBack=28";
            if (NODE != '' && NODE != null) window.open(the_URL,'popout','status=no,directories=no,location=no,resizable=no,menubar=no,width=720,height=500,toolbar=no');
        }

    }())}
