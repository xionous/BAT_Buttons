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

function addButton2(text, onclick, node, cssVal, pos, cssObj) {
    cssObj = cssObj || cssVal
    let button = document.createElement('button'), btnStyle = button.style
    node.insertAdjacentElement(pos, button)
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
