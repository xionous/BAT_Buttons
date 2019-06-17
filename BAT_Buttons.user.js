// ==UserScript==
// @name BAT_Buttons
// @namespace all
// @include https://shawprod.service-now.com/*
// @include https://shawqa.service-now.com/*
// @include http://plantmonitoring/ModemHistory.aspx*
// @include http://bslam/squery/*
// @author Matthew Streeter
// @version 2.0.0
// @downloadURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @updateURL https://github.com/xionous/BAT_Buttons/raw/master/BAT_Buttons.user.js
// @require https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant GM_getValue
// @grant GM_setValue
// @grant none
// ==/UserScript==

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

function addButton2(text, onclick, node, cssVal, pos, classIn, arlabel, cssObj) {
    cssObj = cssObj || cssVal
    let button = document.createElement('button'), btnStyle = button.style
    node.insertAdjacentElement(pos, button)
    button.onclick = onclick
    button.className = classIn
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

function addNodeDropdown(node) {
    var getShortDesc = document.getElementById('incident.short_description').value
    if (getShortDesc != null) {
        var getNodes = getShortDesc.split('-')
        var splitNodes = getNodes[2].split(';')
        var index
        let select = document.createElement('select')
        node.appendChild(select)
        if (splitNodes.length == 1) {
            select.style.display = 'none'
        }
        select.id = 'nodesListbox'
        for (index = 0; index < splitNodes.length; ++index) {
            var nodesList = document.getElementById('nodesListbox')
            let option = document.createElement('option')
            option.text = splitNodes[index].trim()
            nodesList.add(option)
        }
        return select
    }
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
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text
        if (node == null) {
            node = document.getElementById('sys_display.incident.cmdb_ci').value;
        }
    }
    var the_URL = "http://bslam/squery/?direct=sPort&query=" + node;
    if (node != '' && node != null) window.open(the_URL);
}

function powerSupply() {
    var node = '';
    if (formId == 'change_request.do') {
        node = document.getElementById('sys_display.change_request.cmdb_ci').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text
        if (node == null) {
            node = document.getElementById('sys_display.incident.cmdb_ci').value;
        }
    }
    var the_URL = "https://kenny:9156/psm/query?node=" + node;
    if (node != '' && node != null) window.open(the_URL);
}

function incSearch() {
    var node = '';
    if (formId == 'change_request.do') {
        node = document.getElementById('sys_display.change_request.cmdb_ci').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text
        if (node == null) {
            node = document.getElementById('sys_display.incident.cmdb_ci').value;
        }
    }
    var the_URL = "https://shawprod.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
    if (node != '' && node != null) window.open(the_URL);
}

function chgSearch() {
    var node = '';
    if (formId == 'change_request.do') {
        node = document.getElementById('sys_display.change_request.cmdb_ci').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text
        if (node == null) {
            node = document.getElementById('sys_display.incident.cmdb_ci').value;
        }
    }
    var the_URL = "https://shawprod.service-now.com/nav_to.do?uri=%2Fchange_request_list.do%3Fsysparm_query%3D123TEXTQUERY321%253D" + node;
    if (node != '' && node != null)	window.open(the_URL);
}

function portSearch() {
    var node = '';
    if (formId == 'change_request.do') {
        node = document.getElementById('sys_display.change_request.cmdb_ci').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text
        if (node == null) {
            node = document.getElementById('sys_display.incident.cmdb_ci').value;
        }
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
            var nodesListBox = document.getElementById('nodesListbox');
            node = nodesListBox.options[nodesListBox.selectedIndex].text
            if (node == null) {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
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
            var nodesListBox = document.getElementById('nodesListbox');
            node = nodesListBox.options[nodesListBox.selectedIndex].text
            if (node == null) {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
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
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text
        if (node == null) {
            node = document.getElementById('sys_display.incident.cmdb_ci').value;
        }
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
        wait(300);
        window.open(the_URL5);
    }
    if (node != '' && node != null) open_tabs();
}

function pmNodeHistory() {
    var node = '';
    if(window.event.shiftKey) {
        if (formId == 'change_request.do') {
            node = document.getElementById('sys_display.change_request.cmdb_ci').value;
        } else {
            var nodesListBox = document.getElementById('nodesListbox');
            node = nodesListBox.options[nodesListBox.selectedIndex].text
        }
        var type2 = prompt('What Type of device is it? e.g. modem is dx and DPT is dt', 'dx');
        var the_URL2 = "http://plantmonitoring/NodeHistory.aspx?opticalReceiver=" + node + "&type=" + type2 + "&daysBack=28";
        if (node != '' && node != null) window.open(the_URL2,'popout','status=no,directories=no,location=no,resizable=no,menubar=no,width=720,height=500,toolbar=no');
    } else {
        var MAC = prompt('Modem MAC Address').replace(/:/g, "");
        var type = prompt('What Type of device is it? e.g. modem is dx and DPT is dt', 'dx');
        var the_URL = "http://plantmonitoring/ModemHistory.aspx?modemMac=" + MAC + "&type=" + type + "&daysBack=28";
        if (MAC != '' && MAC != null) window.open(the_URL,'popout','status=no,directories=no,location=no,resizable=no,menubar=no,width=720,height=500,toolbar=no');
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
    } else if (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "F||t Mcmurray"
    } else if (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
        prov = "SK"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
        prov = "MB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    }

    g_form.setValue('incident.cmdb_ci', nodeSysId)
    g_form.setValue('incident.contact_type', 'self-service')
    g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Outage - [ISSUE] - Pending');
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
    } else if (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "F||t Mcmurray"
    } else if (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
        prov = "SK"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
        prov = "MB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
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
    } else if (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "F||t Mcmurray"
    } else if (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
        prov = "SK"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
        prov = "MB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
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
    } else if (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "F||t Mcmurray"
    } else if (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
        prov = "SK"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
        prov = "MB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
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
    } else if (node.startsWith("ED") || node.startsWith("RD") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "F||t Mcmurray"
    } else if (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
        prov = "BC"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
        prov = "SK"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
        prov = "MB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
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

function copyStringToClipboard (str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px', display: 'none'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 }

 function popupMessage(text, cls, node, pos) {
    var popCon = document.createElement('div');
    popCon.setAttribute('class', cls);
    popCon.setAttribute('id', 'popupmessage');
    popCon.innerHTML = text+'<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>';
    node.insertAdjacentElement(pos ,popCon);
}

function getTime() {
    var small = document.querySelectorAll('small');
    if (small.length > 1) {
        sPortTime = small[small.length - 1].innerHTML;
        var timeSec = sPortTime.split(',');
        var timeSecDate = timeSec[1].split(' ');
        var timeSecYrTm = timeSec[2].split(' ');
        var timeSpl = timeSecYrTm[2].split(':');
        var monthConv = '';
        var timeConv = timeSpl[0];
        var timeResult = 0;
        if (timeSecDate[1] == 'Jan') {
            monthConv = '01';
        } else if (timeSecDate[1] == 'Feb') {
            monthConv = '02';
        } else if (timeSecDate[1] == 'Mar') {
            monthConv = '03';
        } else if (timeSecDate[1] == 'Apr') {
            monthConv = '04';
        } else if (timeSecDate[1] == 'May') {
            monthConv = '05';
        } else if (timeSecDate[1] == 'Jun') {
            monthConv = '06';
        } else if (timeSecDate[1] == 'Jul') {
            monthConv = '07';
        } else if (timeSecDate[1] == 'Aug') {
            monthConv = '08';
        } else if (timeSecDate[1] == 'Sep') {
            monthConv = '09';
        } else if (timeSecDate[1] == 'Oct') {
            monthConv = '10';
        } else if (timeSecDate[1] == 'Nov') {
            monthConv = '11';
        } else if (timeSecDate[1] == 'Dec') {
            monthConv = '12';
        }
        if (timeConv == '1' && timeSecYrTm[3] == 'AM') {
            timeResult = '01';
        } else if (timeConv == '2' && timeSecYrTm[3] == 'AM') {
            timeResult = '02';
        } else if (timeConv == '3' && timeSecYrTm[3] == 'AM') {
            timeResult = '03';
        } else if (timeConv == '4' && timeSecYrTm[3] == 'AM') {
            timeResult = '04';
        } else if (timeConv == '5' && timeSecYrTm[3] == 'AM') {
            timeResult = '05';
        } else if (timeConv == '6' && timeSecYrTm[3] == 'AM') {
            timeResult = '06';
        } else if (timeConv == '7' && timeSecYrTm[3] == 'AM') {
            timeResult = '07';
        } else if (timeConv == '8' && timeSecYrTm[3] == 'AM') {
            timeResult = '08';
        } else if (timeConv == '9' && timeSecYrTm[3] == 'AM') {
            timeResult = '09';
        } else if (timeConv == '10' && timeSecYrTm[3] == 'AM') {
            timeResult = 10;
        } else if (timeConv == '11' && timeSecYrTm[3] == 'AM') {
            timeResult = 11;
        } else if (timeConv == '12' && timeSecYrTm[3] == 'PM') {
            timeResult = 12;
        } else if (timeConv == '1' && timeSecYrTm[3] == 'PM') {
            timeResult = 13;
        } else if (timeConv == '2' && timeSecYrTm[3] == 'PM') {
            timeResult = 14;
        } else if (timeConv == '3' && timeSecYrTm[3] == 'PM') {
            timeResult = 15;
        } else if (timeConv == '4' && timeSecYrTm[3] == 'PM') {
            timeResult = 16;
        } else if (timeConv == '5' && timeSecYrTm[3] == 'PM') {
            timeResult = 17;
        } else if (timeConv == '6' && timeSecYrTm[3] == 'PM') {
            timeResult = 18;
        } else if (timeConv == '7' && timeSecYrTm[3] == 'PM') {
            timeResult = 19;
        } else if (timeConv == '8' && timeSecYrTm[3] == 'PM') {
            timeResult = 20;
        } else if (timeConv == '9' && timeSecYrTm[3] == 'PM') {
            timeResult = 21;
        } else if (timeConv == '0' && timeSecYrTm[3] == 'PM') {
            timeResult = 22;
        } else if (timeConv == '11' && timeSecYrTm[3] == 'PM') {
            timeResult = 23;
        } else if (timeConv == '12' && timeSecYrTm[3] == 'AM') {
            timeResult = '00';
        } else {
            timeResult = timeSpl[0];
        }

        var timeDateFin = timeSecDate[2]+'/'+monthConv+'/'+timeSecYrTm[1]+' '+timeResult+':'+timeSpl[1]+':00'

        copyStringToClipboard(timeDateFin)

        $.toaster({ priority : 'info', title : 'sPort', message : "Time of selected point copied to clipboard"});

        function copyStringToClipboard (str) {
            var el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style = {position: 'absolute', left: '-9999px', display: 'none'};
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }
}

function openConfig() {
    GM_config.open();
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
        'default': false
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
        'default': false
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
        'default': false
    },
    'pschg': {
        'label': 'Power Supply:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'checkallnoc': {
        'section': [GM_config.create('NOC Ticket Buttons'), 'Select the buttons that show on NOC Tickets'],
        'label': 'Check All:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'incnoc': {
        'label': 'Incident:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'chgnoc': {
        'label': 'Change:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'sportnoc': {
        'label': 'sPort:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'portnoc': {
        'label': 'Port:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'smqnoc': {
        'label': 'sMQ:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'bmqnoc': {
        'label': 'BMQ:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'pmnoc': {
        'label': 'PM:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
    },
    'psnoc': {
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

var checkallinc = GM_config.get('checkallinc');
var incinc = GM_config.get('incinc');
var chginc = GM_config.get('chginc');
var sportinc = GM_config.get('sportinc');
var portinc = GM_config.get('portinc');
var smqinc = GM_config.get('smqinc');
var bmqinc = GM_config.get('bmqinc');
var pminc = GM_config.get('pminc');
var psinc = GM_config.get('psinc');
var checkallchg = GM_config.get('checkallchg');
var incchg = GM_config.get('incchg');
var chgchg = GM_config.get('chgchg');
var sportchg = GM_config.get('sportchg');
var portchg = GM_config.get('portchg');
var smqchg = GM_config.get('smqchg');
var bmqchg = GM_config.get('bmqchg');
var pmchg = GM_config.get('pmchg');
var pschg = GM_config.get('pschg');
var checkallnoc = GM_config.get('checkallnoc');
var incnoc = GM_config.get('incnoc');
var chgnoc = GM_config.get('chgnoc');
var sportnoc = GM_config.get('sportnoc');
var portnoc = GM_config.get('portnoc');
var smqnoc = GM_config.get('smqnoc');
var bmqnoc = GM_config.get('bmqnoc');
var pmnoc = GM_config.get('pmnoc');
var psnoc = GM_config.get('psnoc');

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
        var topBarRightIn = document.querySelector('.sn-form-presence-container');
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
                if (checkallnoc == true) {
                    addButton('Check All', checkNode, topBarMain, compactStyle)
                }
                if (nocinc == true) {
                    addButton('nocident', nocSearch, topBarMain, compactStyle)
                }
                if (nocchg == true) {
                    addButton('Change', chgSearch, topBarMain, compactStyle)
                }
                if (sportnoc == true) {
                    addButton('sPort', sPortSearch, topBarMain, compactStyle)
                }
                if (portnoc == true) {
                    addButton('Port', portSearch, topBarMain, compactStyle)
                }
                if (smqnoc == true) {
                    addButton('sMQ', smqSearch, topBarMain, compactStyle)
                }
                if (bmqnoc == true) {
                    addButton('BMQ', bmqSearch, topBarMain, compactStyle)
                }
                if (pmnoc == true) {
                    addButton('PM', pmNodeHistory, topBarMain, compactStyle)
                }
                if (psnoc == true) {
                    addButton('Power Supply', powerSupply, topBarMain, compactStyle)
                }
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; line-height: 2.6rem!important; }');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
                if (document.getElementById('create_incident_rac') == null && g_form.getValue('sn_customerservice_rac_escalation.state') == 2 && document.getElementById('sys_display.sn_customerservice_rac_escalation.assigned_to').value != null){
                    createInc('Create Incident', denyButton, compactStyleInc)
                }
            } else {
                if (checkallnoc == true) {
                    addButton('Check All', checkNode, topBarMain, compactStyle)
                }
                if (nocinc == true) {
                    addButton('nocident', nocSearch, topBarMain, compactStyle)
                }
                if (nocchg == true) {
                    addButton('Change', chgSearch, topBarMain, compactStyle)
                }
                if (sportnoc == true) {
                    addButton('sPort', sPortSearch, topBarMain, compactStyle)
                }
                if (portnoc == true) {
                    addButton('Port', portSearch, topBarMain, compactStyle)
                }
                if (smqnoc == true) {
                    addButton('sMQ', smqSearch, topBarMain, compactStyle)
                }
                if (bmqnoc == true) {
                    addButton('BMQ', bmqSearch, topBarMain, compactStyle)
                }
                if (pmnoc == true) {
                    addButton('PM', pmNodeHistory, topBarMain, compactStyle)
                }
                if (psnoc == true) {
                    addButton('Power Supply', powerSupply, topBarMain, compactStyle)
                }
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
                if (checkallinc == true) {
                    addButton('Check All', checkNode, topBarMain, compactStyle)
                }
                if (incinc == true) {
                    addButton('Incident', incSearch, topBarMain, compactStyle)
                }
                if (incchg == true) {
                    addButton('Change', chgSearch, topBarMain, compactStyle)
                }
                if (sportinc == true) {
                    addButton('sPort', sPortSearch, topBarMain, compactStyle)
                }
                if (portinc == true) {
                    addButton('Port', portSearch, topBarMain, compactStyle)
                }
                if (smqinc == true) {
                    addButton('sMQ', smqSearch, topBarMain, compactStyle)
                }
                if (bmqinc == true) {
                    addButton('BMQ', bmqSearch, topBarMain, compactStyle)
                }
                if (pminc == true) {
                    addButton('PM', pmNodeHistory, topBarMain, compactStyle)
                }
                if (psinc == true) {
                    addButton('Power Supply', powerSupply, topBarMain, compactStyle)
                }
                addButton2('S', openConfig, topBarRightIn, compactStyle, 'afterend', 'icon-cog btn btn-icon')
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
                if (checkallinc == true) {
                    addButton('Check All', checkNode, topBarMain, normalStyle)
                }
                if (incinc == true) {
                    addButton('Incident', incSearch, topBarMain, normalStyle)
                }
                if (incchg == true) {
                    addButton('Change', chgSearch, topBarMain, normalStyle)
                }
                if (sportinc == true) {
                    addButton('sPort', sPortSearch, topBarMain, normalStyle)
                }
                if (portinc == true) {
                    addButton('Port', portSearch, topBarMain, normalStyle)
                }
                if (smqinc == true) {
                    addButton('sMQ', smqSearch, topBarMain, normalStyle)
                }
                if (bmqinc == true) {
                    addButton('BMQ', bmqSearch, topBarMain, normalStyle)
                }
                if (pminc == true) {
                    addButton('PM', pmNodeHistory, topBarMain, normalStyle)
                }
                if (psinc == true) {
                    addButton('Power Supply', powerSupply, topBarMain, normalStyle)
                }
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
                if (checkallchg == true) {
                    addButton('Check All', checkNode, topBarMain, compactStyle)
                }
                if (chginc == true) {
                    addButton('chgident', chgSearch, topBarMain, compactStyle)
                }
                if (chgchg == true) {
                    addButton('Change', chgSearch, topBarMain, compactStyle)
                }
                if (sportchg == true) {
                    addButton('sPort', sPortSearch, topBarMain, compactStyle)
                }
                if (portchg == true) {
                    addButton('Port', portSearch, topBarMain, compactStyle)
                }
                if (smqchg == true) {
                    addButton('sMQ', smqSearch, topBarMain, compactStyle)
                }
                if (bmqchg == true) {
                    addButton('BMQ', bmqSearch, topBarMain, compactStyle)
                }
                if (pmchg == true) {
                    addButton('PM', pmNodeHistory, topBarMain, compactStyle)
                }
                if (pschg == true) {
                    addButton('Power Supply', powerSupply, topBarMain, compactStyle)
                }
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; line-height: 2.6rem!important; }');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            } else {
                if (checkallchg == true) {
                    addButton('Check All', checkNode, topBarMain, normalStyle)
                }
                if (chginc == true) {
                    addButton('chgident', chgSearch, topBarMain, normalStyle)
                }
                if (chgchg == true) {
                    addButton('Change', chgSearch, topBarMain, normalStyle)
                }
                if (sportchg == true) {
                    addButton('sPort', sPortSearch, topBarMain, normalStyle)
                }
                if (portchg == true) {
                    addButton('Port', portSearch, topBarMain, normalStyle)
                }
                if (smqchg == true) {
                    addButton('sMQ', smqSearch, topBarMain, normalStyle)
                }
                if (bmqchg == true) {
                    addButton('BMQ', bmqSearch, topBarMain, normalStyle)
                }
                if (pmchg == true) {
                    addButton('PM', pmNodeHistory, topBarMain, normalStyle)
                }
                if (pschg == true) {
                    addButton('Power Supply', powerSupply, topBarMain, normalStyle)
                }
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