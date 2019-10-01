// ==UserScript==
// @name BAT_Buttons
// @namespace all
// @include https://shawprod.service-now.com/*
// @include https://shawqa.service-now.com/*
// @include http://plantmonitoring/ModemHistory.aspx*
// @include http://bslam/squery/*
// @include https://bmq.sjrb.ca/*
// @include https://vsure.nms.shaw.ca/*
// @author Matthew Streeter
// @version 2.4.1
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
    cssObj = cssObj || cssVal;
    let button = document.createElement('button'), btnStyle = button.style;
    node.appendChild(button);
    button.innerHTML = text;
    button.onclick = onclick;
    Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key]);
    return button;
}

function addButton2(onclick, node, cssVal, pos, classIn, cssObj) {
    cssObj = cssObj || cssVal;
    let button = document.createElement('button'), btnStyle = button.style;
    node.insertAdjacentElement(pos, button);
    button.onclick = onclick;
    button.className = classIn;
    Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key]);
    return button;
}

function createInc(text, node, cssVal, cssObj) {
    cssObj = cssObj || cssVal;
    let newButton = document.createElement ('button'), btnStyle = newButton.style;
    newButton.innerHTML = text;
    newButton.setAttribute("class", "form_action_button header action_context btn btn-default");
    newButton.setAttribute("type", "submit");
    newButton.setAttribute("value", "13db290edb9d360064aefa38bf9619b8");
    newButton.setAttribute("onclick", "var create_incident_rac=window.create_incident_rac;launchIncidentModal();return false;");
    newButton.setAttribute("id", "create_incident_rac");
    newButton.setAttribute("data-action-name", "create_incident_rac");
    newButton.setAttribute("gsft_id", "13db290edb9d360064aefa38bf9619b8");
    topBarRightBut.insertBefore(newButton, node);
    Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key]);
    return newButton;
}

function addli(text, onclick, node) {
    let li = document.createElement('a');
    node.appendChild(li);
    li.innerHTML = text;
    li.onclick = onclick;
    li.style.padding = '5px';
    return li;
}

function addDiv(id, loc, anchor, margnLeft, margnBottom) {
    let div = document.createElement('div');
    div.id = id;
    div.style.marginLeft = margnLeft;
    div.style.marginBottom = margnBottom;
    anchor.insertAdjacentElement(loc, div);
    return div;
}

function addNodeDropdown(node) {
    var getShortDesc = document.getElementById('incident.short_description').value
    if (getShortDesc != null) {
        var getNodes = getShortDesc.split('-');
        var splitNodes;
        if (getNodes[2].includes('/')) {
            splitNodes = getNodes[2].split('/');
        } else if (getNodes[2].includes('\\')) {
            splitNodes = getNodes[2].split('\\');
        } else if (getNodes[2].includes('&')) {
            splitNodes = getNodes[2].split('&');
        } else {
            splitNodes = getNodes[2].split(';');
        }
        var index;
        let select = document.createElement('select');
        node.appendChild(select);
        if (splitNodes.length == 1) {
            select.style.display = 'none';
        }
        select.id = 'nodesListbox'
        for (index = 0; index < splitNodes.length; ++index) {
            var nodesList = document.getElementById('nodesListbox');
            let option = document.createElement('option');
            option.text = splitNodes[index].trim();
            nodesList.add(option);
        }
        return select;
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

function aTM() {
    var userID = g_user.userID;
    if (formId == 'sn_customerservice_rac_escalation.do') {
        var node = sessionStorage.getItem('node');
        if (node == null) {
            var nodesListBox = document.getElementById('nodesListbox');
            node = nodesListBox.options[nodesListBox.selectedIndex].text;
            if (node == null && document.getElementById('sys_display.incident.cmdb_ci').includes('PR') == false) {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
        }
        if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
            g_form.setValue('current.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
        } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
            g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
        } else if (node.startsWith("FM")) {
            g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
        } else if (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
            g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
        } else if (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
            g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
        } else if (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
            g_form.setValue('current.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
        } else if (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
            g_form.setValue('current.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
        } else if (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
            g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
        }
    }
    if (formId == 'incident.do'){
        if (document.getElementById('sys_display.incident.assignment_group').value.includes('Maintenance -') == true) {
            var nodesListBox = document.getElementById('nodesListbox');
            var node = nodesListBox.options[nodesListBox.selectedIndex].text;
            if (node == null && document.getElementById('sys_display.incident.cmdb_ci').includes('PR') == false) {
                node = document.getElementById('sys_display.incident.cmdb_ci').value;
            }
            if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
                g_form.setValue('current.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
                g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if (node.startsWith("FM")) {
                g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if (node.startsWith("CA") || node.startsWith("EK") || node.startsWith("LL") || node.startsWith("NB") || node.startsWith("OK") || node.startsWith("VA") || node.startsWith("WK")) {
                g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if (node.startsWith("SS0") || node.startsWith("NH") || node.startsWith("NV") || node.startsWith("PA") || node.startsWith("PS") || node.startsWith("PV") || node.startsWith("SA") || node.startsWith("SF") || node.startsWith("SV") || node.startsWith("UF") || node.startsWith("UV") || node.startsWith("VC") || node.startsWith("VF") || node.startsWith("VN") || node.startsWith("VS") || node.startsWith("VW")) {
                g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            } else if (node.startsWith("MJ") || node.startsWith("PR") || node.startsWith("SC") || node.startsWith("SS")) {
                g_form.setValue('current.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if (node.startsWith("AS") || node.startsWith("DR") || node.startsWith("DT") || node.startsWith("FG") || node.startsWith("FR") || node.startsWith("HY") || node.startsWith("KN") || node.startsWith("LS") || node.startsWith("OS") || node.startsWith("PP") || node.startsWith("RH") || node.startsWith("SE") || node.startsWith("SJ") || node.startsWith("SN") || node.startsWith("SU") || node.startsWith("TB") || node.startsWith("TH") || node.startsWith("WE") || node.startsWith("WP") || node.startsWith("WR")) {
                g_form.setValue('current.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
            } else if (node.startsWith("CC") || node.startsWith("DU") || node.startsWith("GV") || node.startsWith("NO") || node.startsWith("PK")) {
                g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
            }
        }
    }
    g_form.setValue('current.assigned_to', userID);
    g_form.save();
}

function pTM() {
    var hub;
    var getShortDesc = document.getElementById('incident.short_description').value
    var getHub = getShortDesc.split('-');
    hub = getHub[1].trim()
    if (hub.startsWith("CG") || hub.startsWith("DH") || hub.startsWith("CN")) {
        g_form.setValue('current.assignment_group', 'b691e02fdbf026403dc77bec0f961941');
        g_form.save();
    } else if (hub.startsWith("LB")) {
        g_form.setValue('current.assignment_group', '7a91e02fdbf026403dc77bec0f96194d');
        g_form.save();
    } else if (hub.startsWith("MH") || hub.startsWith("BR")) {
        g_form.setValue('current.assignment_group', 'b691e02fdbf026403dc77bec0f96194e');
        g_form.save();
    } else if (hub.startsWith("RD")) {
        g_form.setValue('current.assignment_group', 'b691e02fdbf026403dc77bec0f961957');
        g_form.save();
    } else if (hub.startsWith("MJ")) {
        g_form.setValue('current.assignment_group', 'f291e02fdbf026403dc77bec0f96194f');
        g_form.save();
    } else if (hub.startsWith("PR")) {
        g_form.setValue('current.assignment_group', 'be91e02fdbf026403dc77bec0f961954');
        g_form.save();
    } else if (hub.startsWith("SC")) {
        g_form.setValue('current.assignment_group', '3691e02fdbf026403dc77bec0f96195c');
        g_form.save();
    } else if (hub.startsWith("SS")) {
        g_form.setValue('current.assignment_group', '3291e02fdbf026403dc77bec0f961959');
        g_form.save();
    } else if (hub == "DRQU") {
        g_form.setValue('current.assignment_group', 'a4868f04db2ffa80f369f25bbf9619b5');
        g_form.save();
    } else if (hub == "DRRL" || hub == "DRER") {
        g_form.setValue('current.assignment_group', '63189b0d1b0e7f84a34b64a7bc4bcb51');
        g_form.save();
    } else if (hub == "DRSL") {
        g_form.setValue('current.assignment_group', '1c7797411b0e7f84a34b64a7bc4bcbc9');
        g_form.save();
    } else if (hub.startsWith("LS")) {
        g_form.setValue('current.assignment_group', 'fe91e02fdbf026403dc77bec0f96194b');
        g_form.save();
    } else if (hub.startsWith("SU")) {
        g_form.setValue('current.assignment_group', '7e91e02fdbf026403dc77bec0f961959');
        g_form.save();
    } else if (hub == "TBTB" || hub == "TBBW" || hub == "TBBM") {
        g_form.setValue('current.assignment_group', '43ceff40db7d66c0fb9772fc0f96197e');
        g_form.save();
    } else if (hub == "TBAT") {
        g_form.setValue('current.assignment_group', '1ef7d7891b0e7f84a34b64a7bc4bcb06');
        g_form.save();
    } else if (hub == "TBFF") {
        g_form.setValue('current.assignment_group', '19c793091b0e7f84a34b64a7bc4bcb94');
        g_form.save();
    } else if (hub.startsWith("KN")) {
        g_form.setValue('current.assignment_group', '46e58700db2ffa80f369f25bbf9619c8');
        g_form.save();
    } else if (hub.startsWith("FF") || hub.startsWith("PP") || hub.startsWith("TH") || hub.startsWith("WP")) {
        g_form.setValue('current.assignment_group', 'fe91e02fdbf026403dc77bec0f961961');
        g_form.save();
    } else if (hub.startsWith("FM")) {
        g_form.setValue('current.assignment_group', 'be91e02fdbf026403dc77bec0f961947');
        g_form.save();
    } else if (hub == 'CAMH') {
        g_form.setValue('current.assignment_group', '3e91e02fdbf026403dc77bec0f96193f');
        g_form.save();
    } else if (hub == 'CAPG') {
        g_form.setValue('current.assignment_group', '3e91e02fdbf026403dc77bec0f961955');
        g_form.save();
    } else if (hub == 'CAQU') {
        g_form.setValue('current.assignment_group', '7a91e02fdbf026403dc77bec0f961956');
        g_form.save();
    } else if (hub == 'CAWL') {
        g_form.setValue('current.assignment_group', 'b291e02fdbf026403dc77bec0f961961');
        g_form.save();
    } else if (hub == 'CCCR') {
        g_form.setValue('current.assignment_group', 'f291e02fdbf026403dc77bec0f961942');
        g_form.save();
    } else if (hub == 'CCDT') {
        g_form.setValue('current.assignment_group', '7e91e02fdbf026403dc77bec0f961943');
        g_form.save();
    } else if (hub == 'CCPO') {
        g_form.setValue('current.assignment_group', '7291e02fdbf026403dc77bec0f961954');
        g_form.save();
    } else if (hub == 'CQHO') {
        g_form.setValue('current.assignment_group', '3291e02fdbf026403dc77bec0f961943');
        g_form.save();
    } else if (hub == 'CQMT') {
        g_form.setValue('current.assignment_group', 'f3b01f9edb927a00fe647749af9619a9');
        g_form.save();
    } else if (hub == 'DUDU') {
        g_form.setValue('current.assignment_group', 'f691e02fdbf026403dc77bec0f961945');
        g_form.save();
    } else if (hub == 'EDBA' || hub == 'EDDR' || hub == 'EDWL' || hub == 'ESED' || hub == 'HNWN') {
        g_form.setValue('current.assignment_group', 'f8c1756edb3ecf88bf5f9e26db9619c7');
        g_form.save();
    } else if (hub == 'EDBF' || hub == 'EDCD' || hub == 'EDCH' || hub == 'EDCW' || hub == 'EDGI' || hub == 'EDKN' || hub == 'EDLD' || hub == 'EDLO' || hub == 'EDMW' || hub == 'EDNI' || hub == 'EDSA' || hub == 'EDSG' || hub == 'EDSH' || hub == 'EDTW' || hub == 'EDWE' || hub == 'EDBD') {
        g_form.setValue('current.assignment_group', '7291e02fdbf026403dc77bec0f961947');
        g_form.save();
    } else if (hub == 'EKCB') {
        g_form.setValue('current.assignment_group', 'e26d52dedbc6a3445b3c69c3ca961988');
        g_form.save();
    } else if (hub == 'EKCS') {
        g_form.setValue('current.assignment_group', '751e9a96db0aa3445b3c69c3ca9619cc');
        g_form.save();
    } else if (hub == 'EKFH') {
        g_form.setValue('current.assignment_group', '48fad6dedb46a3445b3c69c3ca9619cd');
        g_form.save();
    } else if (hub == 'EKFN') {
        g_form.setValue('current.assignment_group', '6ccd56d2db0aa3445b3c69c3ca961987');
        g_form.save();
    } else if (hub == 'GVCV' || hub == 'GVDT' || hub == 'GVEQ' || hub == 'GVLP' || hub == 'GVMT' || hub == 'GVOB' || hub == 'GVSO') {
        g_form.setValue('current.assignment_group', 'fa91e02fdbf026403dc77bec0f96195e');
        g_form.save();
    } else if (hub == 'GVPN') {
        g_form.setValue('current.assignment_group', '3a91e02fdbf026403dc77bec0f961949');
        g_form.save();
    } else if (hub == 'GVSA') {
        g_form.setValue('current.assignment_group', '7240b485dbaeb24059cf776baf9619d3');
        g_form.save();
    } else if (hub == 'LLMA') {
        g_form.setValue('current.assignment_group', '45676c45dbeab24059cf776baf9619b4');
        g_form.save();
    } else if (hub == 'LMAB' || hub == 'LMLM') {
        g_form.setValue('current.assignment_group', 'a93ee562db7acf88bf5f9e26db9619de');
        g_form.save();
    } else if (hub == 'NBDC') {
        g_form.setValue('current.assignment_group', 'ba91e02fdbf026403dc77bec0f961944');
        g_form.save();
    } else if (hub == 'NBFS') {
        g_form.setValue('current.assignment_group', 'fa91e02fdbf026403dc77bec0f961948');
        g_form.save();
    } else if (hub == 'NIPI') {
        g_form.setValue('current.assignment_group', '21ebd44a1b16ff802eb48444cc4bcbc3');
        g_form.save();
    } else if (hub == 'NOBB' || hub == 'PKPK') {
        g_form.setValue('current.assignment_group', '3291e02fdbf026403dc77bec0f961950');
        g_form.save();
    } else if (hub == 'OKCS' || hub == 'OKKA' || hub == 'OKLV' || hub == 'OKPN') {
        g_form.setValue('current.assignment_group', '7691e02fdbf026403dc77bec0f96194a');
        g_form.save();
    } else if (hub == 'OKDT' || hub == 'OKHT' || hub == 'OKWB' || hub == 'OKWF') {
        g_form.setValue('current.assignment_group', 'b291e02fdbf026403dc77bec0f96194b');
        g_form.save();
    } else if (hub == 'OKSM') {
        g_form.setValue('current.assignment_group', 'f6cfcf92db927a00fe647749af961908');
        g_form.save();
    } else if (hub == 'OKVN') {
        g_form.setValue('current.assignment_group', 'be91e02fdbf026403dc77bec0f96195d');
        g_form.save();
    } else if (hub == 'PIPI') {
        g_form.setValue('current.assignment_group', 'f691e02fdbf026403dc77bec0f961952');
        g_form.save();
    } else if (hub == 'VAAB' || hub == 'VADL') {
        g_form.setValue('current.assignment_group', '7a91e02fdbf026403dc77bec0f961940');
        g_form.save();
    } else if (hub == 'VAAG' || hub == 'VACH') {
        g_form.setValue('current.assignment_group', '3291e02fdbf026403dc77bec0f961943');
        g_form.save();
    } else if (hub == 'VCAN' || hub == 'VCBB' || hub == 'VCBW' || hub == 'VCCA' || hub == 'VCCD' || hub == 'VCHH' || hub == 'VCHS' || hub == 'VCRH' || hub == 'VCST' || hub == 'VCVT') {
        g_form.setValue('current.assignment_group', '7291e02fdbf026403dc77bec0f96195d');
        g_form.save();
    } else if (hub == 'VCIW' || hub == 'RI') {
        g_form.setValue('current.assignment_group', 'f291e02fdbf026403dc77bec0f961958');
        g_form.save();
    } else if (hub == 'VFAU' || hub == 'VFMA' || hub == 'VFPC' || hub == 'VFSS') {
        g_form.setValue('current.assignment_group', '3691e02fdbf026403dc77bec0f961953');
        g_form.save();
    } else if (hub == 'VNBI') {
        g_form.setValue('current.assignment_group', '27baecc9db2eb24059cf776baf961925');
        g_form.save();
    } else if (hub == 'VNDN' || hub == 'VNNV') {
        g_form.setValue('current.assignment_group', '7e91e02fdbf026403dc77bec0f961950');
        g_form.save();
    } else if (hub == 'VNSQ') {
        g_form.setValue('current.assignment_group', 'e17e9041dbe6b24059cf776baf9619a5');
        g_form.save();
    } else if (hub == 'VNWS') {
        g_form.setValue('current.assignment_group', '2f426841db6ab24059cf776baf9619d6');
        g_form.save();
    } else if (hub == 'VSFL' || hub == 'VSNE' || hub == 'VSNW' || hub == 'VSWY') {
        g_form.setValue('current.assignment_group', 'f691e02fdbf026403dc77bec0f96195b');
        g_form.save();
    } else if (hub == 'VSLA' || hub == 'VSWB') {
        g_form.setValue('current.assignment_group', '3e91e02fdbf026403dc77bec0f96194c');
        g_form.save();
    } else if (hub == 'VWSU') {
        g_form.setValue('current.assignment_group', '7691e02fdbf026403dc77bec0f961960');
        g_form.save();
    } else if (hub == 'WKCA') {
        g_form.setValue('current.assignment_group', '7691e02fdbf026403dc77bec0f961960');
        g_form.save();
    } else if (hub == 'WKGR') {
        g_form.setValue('current.assignment_group', '693cde52dbc6a3445b3c69c3ca961904');
        g_form.save();
    } else if (hub == 'WKNL') {
        g_form.setValue('current.assignment_group', '0fac561adbc6a3445b3c69c3ca961967');
        g_form.save();
    } else if (hub == 'WKTL') {
        g_form.setValue('current.assignment_group', '460dd6dadbc6a3445b3c69c3ca96190c');
        g_form.save();
    } else {
        window.alert(hub + ' is not supported by this button at this time. Please manually set the assignment group for this ticket');
    }
}

function sPortSearch() {
    var node = '';
    if (formId == 'change_request.do') {
        node = document.getElementById('sys_display.change_request.cmdb_ci').value;
    } else if (formId == 'sn_customerservice_rac_escalation.do') {
        node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text;
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
    } else if (formId == 'sn_customerservice_rac_escalation.do') {
        node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text;
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
    } else if (formId == 'sn_customerservice_rac_escalation.do') {
        node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text;
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
    } else if (formId == 'sn_customerservice_rac_escalation.do') {
        node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text;
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
    } else if (formId == 'sn_customerservice_rac_escalation.do') {
        node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
    } else {
        var nodesListBox = document.getElementById('nodesListbox');
        node = nodesListBox.options[nodesListBox.selectedIndex].text;
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
        } else if (formId == 'sn_customerservice_rac_escalation.do') {
            node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
        } else {
            var nodesListBox = document.getElementById('nodesListbox');
            node = nodesListBox.options[nodesListBox.selectedIndex].text;
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
        } else if (formId == 'sn_customerservice_rac_escalation.do') {
            node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
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
    } else if (formId == 'sn_customerservice_rac_escalation.do') {
        node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
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

function pmNodeHistory() {
    var node = '';
    if(window.event.shiftKey) {
        if (formId == 'change_request.do') {
            node = document.getElementById('sys_display.change_request.cmdb_ci').value;
        } else if (formId == 'sn_customerservice_rac_escalation.do') {
            node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
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
        h1 = getHub[0].substr(4);
        h2 = getHub[1];
        hub = h2+h1;
    } else if (cmts.length == 8) {
        getHub = cmts.split('.');
        h1 = getHub[0].substr(3);
        h2 = getHub[1];
        hub = h2+h1;
    }

    if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "AB"
        g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
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

    g_form.setValue('incident.cmdb_ci', nodeSysId);
    g_form.setValue('incident.contact_type', 'self-service');
    if (prov == '' && hub == '' && node == '' && cmts == '') {
        g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Outage - [ISSUE]');
    } else {
        g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Outage - [ISSUE]');
    }
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
        h1 = getHub[0].substr(4);
        h2 = getHub[1];
        hub = h2+h1;
    } else if (cmts.length == 8) {
        getHub = cmts.split('.');
        h1 = getHub[0].substr(3);
        h2 = getHub[1];
        hub = h2+h1;
    }

    if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "AB"
        g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
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

    g_form.setValue('incident.cmdb_ci', nodeSysId);
    g_form.setValue('incident.contact_type', 'self-service');
    if (prov == '' && hub == '' && node == '' && cmts == '') {
        g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Poor RF - [ISSUE]');
    } else {
        g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Poor RF - [ISSUE]');
    }
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
        h1 = getHub[0].substr(4);
        h2 = getHub[1];
        hub = h2+h1;
    } else if (cmts.length == 8) {
        getHub = cmts.split('.');
        h1 = getHub[0].substr(3);
        h2 = getHub[1];
        hub = h2+h1;
    }

    if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "AB"
        g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
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

    g_form.setValue('incident.cmdb_ci', nodeSysId);
    g_form.setValue('incident.contact_type', 'self-service');
    if (prov == '' && hub == '' && node == '' && cmts == '') {
        g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Noise - Telco');
    } else {
        g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Noise - Telco');
    }
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
        h1 = getHub[0].substr(4);
        h2 = getHub[1];
        hub = h2+h1;
    } else if (cmts.length == 8) {
        getHub = cmts.split('.');
        h1 = getHub[0].substr(3);
        h2 = getHub[1];
        hub = h2+h1;
    }

    if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "AB"
        g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
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

    g_form.setValue('incident.cmdb_ci', nodeSysId);
    g_form.setValue('incident.contact_type', 'self-service');
    if (prov == '' && hub == '' && node == '' && cmts == '') {
        g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Noise - [ISSUE]');
    } else {
        g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Noise - [ISSUE]');
    }
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
        h1 = getHub[0].substr(4);
        h2 = getHub[1];
        hub = h2+h1;
    } else if (cmts.length == 8) {
        getHub = cmts.split('.');
        h1 = getHub[0].substr(3);
        h2 = getHub[1];
        hub = h2+h1;
    }

    if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "AB"
        g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
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

    g_form.setValue('incident.cmdb_ci', nodeSysId);
    g_form.setValue('incident.contact_type', 'self-service');
    if (prov == '' && hub == '' && node == '' && cmts == '') {
        g_form.setValue('incident.short_description', 'PROV - HUB - NODE - CMTS - Plant Intermittency - [ISSUE]');
    } else {
        g_form.setValue('incident.short_description', ''+prov+' - '+hub+' - '+node+' - '+cmts+' - Plant Intermittency - [ISSUE]');
    }
    g_form.setValue('incident.category', 'hfc');
    g_form.setValue('incident.subcategory', 'network_connectivity');
    g_form.setValue('incident.u_incident_type', '');
    g_form.setValue('incident.impact', '4');
    g_form.setValue('incident.urgency', '4');
    g_form.setValue('incident.caller_id', userID);
    g_form.setValue('incident.assigned_to', userID);
    g_form.setValue('incident.state', '2');
}

function channelTemplate() {
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
        h1 = getHub[0].substr(4);
        h2 = getHub[1];
        hub = h2+h1;
    } else if (cmts.length == 8) {
        getHub = cmts.split('.');
        h1 = getHub[0].substr(3);
        h2 = getHub[1];
        hub = h2+h1;
    }

    if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "AB"
        g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
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

    g_form.setValue('incident.cmdb_ci', nodeSysId);
    g_form.setValue('incident.contact_type', 'self-service');
    if (prov == '' && hub == '' && node == '' && cmts == '') {
        g_form.setValue('incident.short_description', '<Prov>-V - TV - channel(s) – Issue - <City/system>');
    } else {
        g_form.setValue('incident.short_description', ''+prov+'-V - TV - channel(s) – Issue - <City/system>');
    }
    g_form.setValue('incident.category', 'video');
    g_form.setValue('incident.subcategory', 'broadcast');
    g_form.setValue('incident.u_incident_type', '');
    g_form.setValue('incident.impact', '4');
    g_form.setValue('incident.urgency', '4');
    g_form.setValue('incident.caller_id', userID);
    g_form.setValue('incident.assigned_to', userID);
    g_form.setValue('incident.state', '2');
}

function vodTemplate() {
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
        h1 = getHub[0].substr(4);
        h2 = getHub[1];
        hub = h2+h1;
    } else if (cmts.length == 8) {
        getHub = cmts.split('.');
        h1 = getHub[0].substr(3);
        h2 = getHub[1];
        hub = h2+h1;
    }

    if (node.startsWith("CG") || node.startsWith("RD") || node.startsWith("DH") || node.startsWith("CN") || node.startsWith("BR") || node.startsWith("LB") || node.startsWith("MH")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '5791e02fdbf026403dc77bec0f9619a1');
    } else if (node.startsWith("ED") || node.startsWith("ES") || node.startsWith("HN") || node.startsWith("LM")) {
        prov = "AB"
        g_form.setValue('incident.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
    } else if (node.startsWith("FM")) {
        prov = "AB"
        g_form.setValue('current.assignment_group', '9f91e02fdbf026403dc77bec0f96199e');
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

    g_form.setValue('incident.cmdb_ci', nodeSysId);
    g_form.setValue('incident.contact_type', 'self-service');
    if (prov == '' && hub == '' && node == '' && cmts == '') {
        g_form.setValue('incident.short_description', '<Prov>-V - VOD - error # - issue - <City/system>');
    } else {
        g_form.setValue('incident.short_description', ''+prov+'-V - VOD - error # - issue - <City/system>');
    }
    g_form.setValue('incident.category', 'video');
    g_form.setValue('incident.subcategory', 'vod');
    g_form.setValue('incident.u_incident_type', '');
    g_form.setValue('incident.impact', '4');
    g_form.setValue('incident.urgency', '4');
    g_form.setValue('incident.caller_id', userID);
    g_form.setValue('incident.assigned_to', userID);
    g_form.setValue('incident.state', '2');
}

function incTempTelco() {
    var getShortDesc = document.getElementById('incident.short_description').value
    if (getShortDesc != null) {
        var sdItems = getShortDesc.split(' - ');
        g_form.setValue('incident.short_description', sdItems[0]+' - '+sdItems[1]+' - '+sdItems[2]+' - '+sdItems[3]+' - '+sdItems[4]+' - Telco');
        g_form.setValue('incident.subcategory', 'telco_ingress');
        g_form.setValue('incident.u_incident_type', 'Customer Gear');
    }
}

function incTempRaised() {
    var getShortDesc = document.getElementById('incident.short_description').value
    if (getShortDesc != null) {
        var sdItems = getShortDesc.split(' - ');
        g_form.setValue('incident.short_description', sdItems[0]+' - '+sdItems[1]+' - '+sdItems[2]+' - '+sdItems[3]+' - '+sdItems[4]+' - Raised Floor');
        g_form.setValue('incident.subcategory', 'noise_ingress');
        g_form.setValue('incident.u_incident_type', '');
    }
}

function incTempHump() {
    var getShortDesc = document.getElementById('incident.short_description').value
    if (getShortDesc != null) {
        var sdItems = getShortDesc.split(' - ');
        g_form.setValue('incident.short_description', sdItems[0]+' - '+sdItems[1]+' - '+sdItems[2]+' - '+sdItems[3]+' - '+sdItems[4]+' - Humps');
        g_form.setValue('incident.subcategory', 'noise_ingress');
        g_form.setValue('incident.u_incident_type', '');
    }
}

function incTempSpikes() {
    var getShortDesc = document.getElementById('incident.short_description').value
    if (getShortDesc != null) {
        var sdItems = getShortDesc.split(' - ');
        g_form.setValue('incident.short_description', sdItems[0]+' - '+sdItems[1]+' - '+sdItems[2]+' - '+sdItems[3]+' - '+sdItems[4]+' - Spikes');
        g_form.setValue('incident.subcategory', 'noise_ingress');
        g_form.setValue('incident.u_incident_type', '');
    }
}

function incTempRolling() {
    var getShortDesc = document.getElementById('incident.short_description').value
    if (getShortDesc != null) {
        var sdItems = getShortDesc.split(' - ');
        g_form.setValue('incident.short_description', sdItems[0]+' - '+sdItems[1]+' - '+sdItems[2]+' - '+sdItems[3]+' - '+sdItems[4]+' - Rolling Spikes');
        g_form.setValue('incident.subcategory', 'noise_ingress');
        g_form.setValue('incident.u_incident_type', '');
    }
}

function incTempImpulse() {
    var getShortDesc = document.getElementById('incident.short_description').value
    if (getShortDesc != null) {
        var sdItems = getShortDesc.split(' - ');
        g_form.setValue('incident.short_description', sdItems[0]+' - '+sdItems[1]+' - '+sdItems[2]+' - '+sdItems[3]+' - '+sdItems[4]+' - Impulse');
        g_form.setValue('incident.subcategory', 'noise_ingress');
        g_form.setValue('incident.u_incident_type', '');
    }
}

function copyStringToClipboard(str) {
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
        var dayConv = ''+timeSecDate[2];
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
            timeResult = '10';
        } else if (timeConv == '11' && timeSecYrTm[3] == 'AM') {
            timeResult = '11';
        } else if (timeConv == '12' && timeSecYrTm[3] == 'PM') {
            timeResult = '12';
        } else if (timeConv == '1' && timeSecYrTm[3] == 'PM') {
            timeResult = '13';
        } else if (timeConv == '2' && timeSecYrTm[3] == 'PM') {
            timeResult = '14';
        } else if (timeConv == '3' && timeSecYrTm[3] == 'PM') {
            timeResult = '15';
        } else if (timeConv == '4' && timeSecYrTm[3] == 'PM') {
            timeResult = '16';
        } else if (timeConv == '5' && timeSecYrTm[3] == 'PM') {
            timeResult = '17';
        } else if (timeConv == '6' && timeSecYrTm[3] == 'PM') {
            timeResult = '18';
        } else if (timeConv == '7' && timeSecYrTm[3] == 'PM') {
            timeResult = '19';
        } else if (timeConv == '8' && timeSecYrTm[3] == 'PM') {
            timeResult = '20';
        } else if (timeConv == '9' && timeSecYrTm[3] == 'PM') {
            timeResult = '21';
        } else if (timeConv == '0' && timeSecYrTm[3] == 'PM') {
            timeResult = '22';
        } else if (timeConv == '11' && timeSecYrTm[3] == 'PM') {
            timeResult = '23';
        } else if (timeConv == '12' && timeSecYrTm[3] == 'AM') {
            timeResult = '00';
        } else {
            timeResult = timeSpl[0];
        }

        if (dayConv.length == 1) {
            dayConv = '0'+dayConv;
        }

        var timeDateFin = dayConv+'/'+monthConv+'/'+timeSecYrTm[1]+' '+timeResult+':'+timeSpl[1]+':00'

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
    'atminc': {
        'label': 'Assign to me:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'ptminc': {
        'label': 'Maintenance:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
    'iqtinc': {
        'label': 'Incident Quick templates:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': false
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
    'atmnoc': {
        'label': 'Assign to me:',
        'labelPos': 'left',
        'type': 'checkbox',
        'default': true
    },
};

GM_config.init(
    {
      id: 'GM_config',
      title: 'mTools Buttons Config',
      fields: fieldDefs,
      css: '#GM_config .config_var { margin: 0 0 4px !important; float: left !important; }'+'#GM_config_section_0 { margin-top: 10px !important;}'+'#GM_config_section_1 { margin-top: 60px !important;}'+'#GM_config_section_2 { margin-top: 60px !important;}'+'#GM_config_buttons_holder { margin-top: 55px !important; }'+'#GM_config { background: #e6e8ea !important; }'+'#GM_config .saveclose_buttons { margin: 10px 5px 10px !important; border-radius: 5px !important;  }',
      events:
        {
            close: function() {
                location.reload();
            }
        }
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
var atminc = GM_config.get('atminc');
var ptminc = GM_config.get('ptminc');
var atmnoc = GM_config.get('atmnoc');
var iqtinc = GM_config.get('iqtinc');

if (document.getElementById('section_form_id')){
    var formId = document.getElementById('section_form_id').value;
}

var node = '';
var cmts = '';
var nodeSysId = '';

if (formId == 'sn_customerservice_rac_escalation.do') {
    var userID = g_user.userID;
    var topBarRight = document.querySelector('.navbar-right');
    var buttomButtons = document.querySelector('.form_action_button_container');
    var compactStyle = {'margin':'0px 3px 0px 5px', 'padding':'0px 5px 0px 5px', 'min-height':'1.848em', 'z-index': '500'};
    var normalStyle = {'margin':'0px 0px 0px 5px', 'z-index': '500'};
    node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
    cmts = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_cmts_data').value;
    nodeSysId = g_form.getValue('current.sn_customerservice_rac_escalation.u_case.u_node');
    sessionStorage.setItem('nodeSysId', nodeSysId);
    sessionStorage.setItem('node', node);
    sessionStorage.setItem('cmts', cmts);
    if (atmnoc == true) {
        if (window.NOW.compact) {
            if (g_form.getValue('current.assigned_to') == '' || g_form.getValue('current.assigned_to') != userID && g_form.getValue('current.state') != '1006') {
                addButton('Assign to me', aTM, topBarRight, compactStyle);
                addButton('Assign to me', aTM, buttomButtons, compactStyle);
            }
        } else {
            if (g_form.getValue('current.assigned_to') == '' || g_form.getValue('current.assigned_to') != userID && g_form.getValue('current.state') != '1006') {
                addButton('Assign to me', aTM, topBarRight, normalStyle);
                addButton('Assign to me', aTM, buttomButtons, normalStyle);
            }
        }
    }
}

if (formId == 'incident.do' || formId == 'incident_task.do' || formId == 'sn_customerservice_rac_escalation.do' || formId == 'change_request.do'){

    (function(){
        'use strict'

        var topBarMain = document.querySelector('.navbar-header');
        var topBarRight = document.querySelector('.navbar-right');
        var topBarRightIn = document.querySelector('.sn-form-presence-container');
        var topBarRightBut = document.querySelector('.navbar_ui_actions');
        var incDesc = document.getElementById('element.incident.short_description');
        var denyButton = document.getElementById('deny_escalation');
        var buttomButtons = document.querySelector('.form_action_button_container');
        var escInc = document.querySelector('form[id="incident.do"]');
        var userID = g_user.userID;
        var isNewInc = 'New record';
        var compactStyleCog = {'z-index': '500'};
        var compactStyle = {'margin':'0px 3px 0px 5px', 'padding':'0px 5px 0px 5px', 'min-height':'1.848em', 'z-index': '500'};
        var compactStyleInc = {'margin':'0px 5px 0px 5px', 'padding':'0px 5px 0px 5px', 'min-height':'1.848em', 'z-index': '500'};
        var normalStyle = {'margin':'0px 0px 0px 5px', 'z-index': '500'};
        var normalStyleCog = {'z-index': '500'};

        if (formId == 'incident_task.do' && g_form.getValue('incident_task.state') != 3) {
            if (window.NOW.compact) {
                addButton('Close Task', closeTask, topBarRightBut, compactStyle);
            } else {
                addButton('Close Task', closeTask, topBarRightBut, normalStyle);
            }
        }

        if (formId == 'sn_customerservice_rac_escalation.do') {
            addGlobalStyle('#GM_config { border-radius: 10px !important; border-width: thick !important; right: 25% !important; left: 25% !important; height: 435px !important; width: 710px !important; }');
            window.node = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_node').value;
            window.cmts = document.getElementById('sys_display.sn_customerservice_rac_escalation.u_case.u_cmts_data').value;
            var findFormHeader = document.querySelectorAll('h1');
            findFormHeader[0].style.display = 'none';
            document.getElementById('more_information').style.display = 'none';
            if (document.getElementById('show_dashboard')) {
                document.getElementById('show_dashboard').style.display = 'none';
            }
            if (window.NOW.compact) {
                if (checkallnoc == true) {
                    addButton('Check All', checkNode, topBarMain, compactStyle);
                }
                if (incnoc == true) {
                    addButton('Incident', incSearch, topBarMain, compactStyle);
                }
                if (chgnoc == true) {
                    addButton('Change', chgSearch, topBarMain, compactStyle);
                }
                if (sportnoc == true) {
                    addButton('sPort', sPortSearch, topBarMain, compactStyle);
                }
                if (portnoc == true) {
                    addButton('Port', portSearch, topBarMain, compactStyle);
                }
                if (smqnoc == true) {
                    addButton('sMQ', smqSearch, topBarMain, compactStyle);
                }
                if (bmqnoc == true) {
                    addButton('BMQ', bmqSearch, topBarMain, compactStyle);
                }
                if (pmnoc == true) {
                    addButton('PM', pmNodeHistory, topBarMain, compactStyle);
                }
                if (psnoc == true) {
                    addButton('Power Supply', powerSupply, topBarMain, compactStyle);
                }
                addButton2(openConfig, topBarRightIn, compactStyleCog, 'afterend', 'icon-cog btn btn-icon')
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; line-height: 2.6rem!important; }');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
                if (document.getElementById('create_incident_rac') == null && g_form.getValue('sn_customerservice_rac_escalation.state') == 2 && document.getElementById('sys_display.sn_customerservice_rac_escalation.assigned_to').value != null){
                    createInc('Create Incident', denyButton, compactStyleInc);
                }
            } else {
                if (checkallnoc == true) {
                    addButton('Check All', checkNode, topBarMain, normalStyle);
                }
                if (incnoc == true) {
                    addButton('Incident', incSearch, topBarMain, normalStyle);
                }
                if (chgnoc == true) {
                    addButton('Change', chgSearch, topBarMain, normalStyle);
                }
                if (sportnoc == true) {
                    addButton('sPort', sPortSearch, topBarMain, normalStyle);
                }
                if (portnoc == true) {
                    addButton('Port', portSearch, topBarMain, normalStyle);
                }
                if (smqnoc == true) {
                    addButton('sMQ', smqSearch, topBarMain, normalStyle);
                }
                if (bmqnoc == true) {
                    addButton('BMQ', bmqSearch, topBarMain, normalStyle);
                }
                if (pmnoc == true) {
                    addButton('PM', pmNodeHistory, topBarMain, normalStyle);
                }
                if (psnoc == true) {
                    addButton('Power Supply', powerSupply, topBarMain, normalStyle);
                }
                addButton2(openConfig, topBarRightIn, normalStyleCog, 'afterend', 'icon-cog btn btn-icon')
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
                if (document.getElementById('create_incident_rac') == null){
                    createInc('Create Incident', denyButton, compactStyleInc);
                }
            }
        }

        if (document.body.innerHTML.includes(isNewInc)) {

        } else if (formId == 'incident.do' && g_form.getValue('incident.category') == 'hfc') {
            addGlobalStyle('#GM_config { border-radius: 10px !important; border-width: thick !important; right: 25% !important; left: 25% !important; height: 435px !important; width: 710px !important; }');
            addDiv('inctemp', 'afterend', incDesc, '17%', '2px');
            var incTemp = document.getElementById('inctemp');
            var getShortDesc = document.getElementById('incident.short_description').value;
            var checkNoise;
            if (getShortDesc != null) {
                var sdItems = getShortDesc.split('-');
                 checkNoise = sdItems[4].trim();
            }
            if (iqtinc == true && checkNoise == 'Noise') {
                addli('Telco', incTempTelco, incTemp);
                addli('Raised Floor', incTempRaised, incTemp);
                addli('Humps', incTempHump, incTemp);
                addli('Spikes', incTempSpikes, incTemp);
                addli('Rolling Spikes', incTempRolling, incTemp);
                addli('Impulse', incTempImpulse, incTemp);
            }
            if (window.NOW.compact) {
                if (checkallinc == true) {
                    addButton('Check All', checkNode, topBarMain, compactStyle);
                }
                if (incinc == true) {
                    addButton('Incident', incSearch, topBarMain, compactStyle);
                }
                if (incchg == true) {
                    addButton('Change', chgSearch, topBarMain, compactStyle);
                }
                if (sportinc == true) {
                    addButton('sPort', sPortSearch, topBarMain, compactStyle);
                }
                if (portinc == true) {
                    addButton('Port', portSearch, topBarMain, compactStyle);
                }
                if (smqinc == true) {
                    addButton('sMQ', smqSearch, topBarMain, compactStyle);
                }
                if (bmqinc == true) {
                    addButton('BMQ', bmqSearch, topBarMain, compactStyle);
                }
                if (pminc == true) {
                    addButton('PM', pmNodeHistory, topBarMain, compactStyle);
                }
                if (psinc == true) {
                    addButton('Power Supply', powerSupply, topBarMain, compactStyle);
                }
                addButton2(openConfig, topBarRightIn, compactStyleCog, 'afterend', 'icon-cog btn btn-icon')
                addNodeDropdown(topBarMain)
                if (g_form.getValue('incident.state') != 8 && g_form.getValue('incident.state') != 6) {
                    addButton('Cancel', cancelInc, topBarRightBut, compactStyle);
                    addButton('Cancel', cancelInc, buttomButtons, compactStyle);
                    if (g_form.getValue('current.assigned_to') == '' || g_form.getValue('current.assigned_to') != userID) {
                        if (atminc == true) {
                            addButton('Assign to me', aTM, topBarRight, compactStyle);
                            addButton('Assign to me', aTM, buttomButtons, compactStyle);
                        }
                    }
                    if (ptminc == true) {
                        if (document.getElementById('sys_display.incident.assignment_group').value.includes('Maintenance -') == false) {
                            addButton('Maintenance', pTM, topBarRight, compactStyle);
                            addButton('Maintenance', pTM, buttomButtons, compactStyle);
                        }
                    }
                }
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important;  line-height: 2.6rem!important;}');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            } else {
                if (checkallinc == true) {
                    addButton('Check All', checkNode, topBarMain, normalStyle);
                }
                if (incinc == true) {
                    addButton('Incident', incSearch, topBarMain, normalStyle);
                }
                if (incchg == true) {
                    addButton('Change', chgSearch, topBarMain, normalStyle);
                }
                if (sportinc == true) {
                    addButton('sPort', sPortSearch, topBarMain, normalStyle);
                }
                if (portinc == true) {
                    addButton('Port', portSearch, topBarMain, normalStyle);
                }
                if (smqinc == true) {
                    addButton('sMQ', smqSearch, topBarMain, normalStyle);
                }
                if (bmqinc == true) {
                    addButton('BMQ', bmqSearch, topBarMain, normalStyle);
                }
                if (pminc == true) {
                    addButton('PM', pmNodeHistory, topBarMain, normalStyle);
                }
                if (psinc == true) {
                    addButton('Power Supply', powerSupply, topBarMain, normalStyle);
                }
                addButton2(openConfig, topBarRightIn, normalStyleCog, 'afterend', 'icon-cog btn btn-icon')
                addNodeDropdown(topBarMain)
                if (g_form.getValue('incident.state') != 8 && g_form.getValue('incident.state') != 6) {
                    addButton('Cancel', cancelInc, topBarRightBut, normalStyle);
                    addButton('Cancel', cancelInc, buttomButtons, normalStyle);
                    if (g_form.getValue('current.assigned_to') == '' || g_form.getValue('current.assigned_to') != userID) {
                        if (atminc == true) {
                            addButton('Assign to me', aTM, topBarRight, normalStyle);
                            addButton('Assign to me', aTM, buttomButtons, normalStyle);
                        }
                    }
                    if (ptminc == true) {
                        if (document.getElementById('sys_display.incident.assignment_group').value.includes('Maintenance -') == false) {
                            addButton('Maintenance', pTM, topBarRight, normalStyle);
                            addButton('Maintenance', pTM, buttomButtons, normalStyle);
                        }
                    }
                }
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            }
        } else if (formId == 'change_request.do') {
            addGlobalStyle('#GM_config { border-radius: 10px !important; border-width: thick !important; right: 25% !important; left: 25% !important; height: 435px !important; width: 710px !important; }');
            if (window.NOW.compact) {
                if (checkallchg == true) {
                    addButton('Check All', checkNode, topBarMain, compactStyle);
                }
                if (chginc == true) {
                    addButton('Incident', chgSearch, topBarMain, compactStyle);
                }
                if (chgchg == true) {
                    addButton('Change', chgSearch, topBarMain, compactStyle);
                }
                if (sportchg == true) {
                    addButton('sPort', sPortSearch, topBarMain, compactStyle);
                }
                if (portchg == true) {
                    addButton('Port', portSearch, topBarMain, compactStyle);
                }
                if (smqchg == true) {
                    addButton('sMQ', smqSearch, topBarMain, compactStyle);
                }
                if (bmqchg == true) {
                    addButton('BMQ', bmqSearch, topBarMain, compactStyle);
                }
                if (pmchg == true) {
                    addButton('PM', pmNodeHistory, topBarMain, compactStyle);
                }
                if (pschg == true) {
                    addButton('Power Supply', powerSupply, topBarMain, compactStyle);
                }
                addButton2(openConfig, topBarRightIn, compactStyleCog, 'afterend', 'icon-cog btn btn-icon')
                addGlobalStyle('.avatar-container { height: 2.6rem !important; width: 2.6rem!important; }');
                addGlobalStyle('.avatar { height: 2.6rem !important; width: 2.6rem!important; line-height: 2.6rem!important; }');
                addGlobalStyle('.form-presence-users-multiple { height: 2.6rem !important; }');
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            } else {
                if (checkallchg == true) {
                    addButton('Check All', checkNode, topBarMain, normalStyle);
                }
                if (chginc == true) {
                    addButton('Incident', chgSearch, topBarMain, normalStyle);
                }
                if (chgchg == true) {
                    addButton('Change', chgSearch, topBarMain, normalStyle);
                }
                if (sportchg == true) {
                    addButton('sPort', sPortSearch, topBarMain, normalStyle);
                }
                if (portchg == true) {
                    addButton('Port', portSearch, topBarMain, normalStyle);
                }
                if (smqchg == true) {
                    addButton('sMQ', smqSearch, topBarMain, normalStyle);
                }
                if (bmqchg == true) {
                    addButton('BMQ', bmqSearch, topBarMain, normalStyle);
                }
                if (pmchg == true) {
                    addButton('PM', pmNodeHistory, topBarMain, normalStyle);
                }
                if (pschg == true) {
                    addButton('Power Supply', powerSupply, topBarMain, normalStyle);
                }
                addButton2(openConfig, topBarRightIn, normalStyleCog, 'afterend', 'icon-cog btn btn-icon')
                addGlobalStyle('.section_view { display:none !important; }');
                addGlobalStyle('.record-paging-nowrap { display:none !important; }');
            }
        } else if (formId == 'incident.do') {
            if (window.NOW.compact) {
                if (topBarMain == null) {
                    addli('Outage', outageTemplate, escInc);
                    addli('Poor RF', poorRfTemplate, escInc);
                    addli('Plant Intermittency', piTemplate, escInc);
                    addli('Noise', noiseTemplate, escInc);
                    addli('Telco', telcoTemplate, escInc);
                    addli('V-Channel Issue', channelTemplate, escInc);
                    addli('V-VOD', vodTemplate, escInc);
                }
            } else {
                if (topBarMain == null) {
                    addli('Outage', outageTemplate, escInc);
                    addli('Poor RF', poorRfTemplate, escInc);
                    addli('Plant Intermittency', piTemplate, escInc);
                    addli('Noise', noiseTemplate, escInc);
                    addli('Telco', telcoTemplate, escInc);
                    addli('V-Channel Issue', channelTemplate, escInc);
                    addli('V-VOD', vodTemplate, escInc);
                }
            }
        }
    }())}

if (window.location.href.indexOf("ModemHistory") != -1) {
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
    var getTimePm = getTableBody[1].querySelectorAll('td'), i;
    var getTzOfs = new Date().getTimezoneOffset();
    popupMessage('Double click on any time field to copy the time and date', 'alertblue', getform, 'beforebegin')
    for (i = 0; i < getTimePm.length; ++i) {
        var getYear = new Date().getFullYear();
        if (getTimePm[i].innerHTML.startsWith(getYear)) {
            getTimePm[i].id = 'time'+i;
            var time = getTimePm[i].innerHTML;
            timeList[i] = time;
            getTimePm[i].ondblclick = (function(i) {return function() {
                var tmLsSpl = timeList[i].split(' ');
                var dateSpl = tmLsSpl[0].split('-');
                var dateNew = dateSpl[2]+'/'+dateSpl[1]+'/'+dateSpl[0];
                var timeNew = tmLsSpl[1].split(':');
                var newHour = timeNew[0];
                if (getTzOfs == 300) {
                    newHour++;
                    if (newHour.toString().length == 1){
                        copyStringToClipboard(dateNew+' 0'+newHour+':'+timeNew[1]+':'+timeNew[2]);
                    } else {
                        if (newHour == 24) {
                            copyStringToClipboard(dateNew+' 00:'+timeNew[1]+':'+timeNew[2]);
                        } else {
                            copyStringToClipboard(dateNew+' '+newHour+':'+timeNew[1]+':'+timeNew[2]);
                        }
                    }
                } else if (getTzOfs == 420) {
                    newHour--;
                    if (newHour.toString().length == 1){
                        copyStringToClipboard(dateNew+' 0'+newHour+':'+timeNew[1]+':'+timeNew[2]);
                    } else {
                        if (newHour == 24) {
                            copyStringToClipboard(dateNew+' 00:'+timeNew[1]+':'+timeNew[2]);
                        } else {
                            copyStringToClipboard(dateNew+' '+newHour+':'+timeNew[1]+':'+timeNew[2]);
                        }
                    }
                } else if (getTzOfs == 360) {
                    copyStringToClipboard(dateNew+' '+timeNew[0]+':'+timeNew[1]+':'+timeNew[2]);
                }
                popupMessage('Copied Date & Time to clipboard in the Service-Now Format', 'alertgreen', getform, 'beforebegin');
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
                    var textNodes = document.querySelectorAll('text');
                    if (textNodes[4] != null) {
                        if (textNodes[4].firstChild.innerHTML.length > 26 ) {
                        textNodes[4].firstChild.setAttribute('id', 'graphtitle');
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
        });
    }
}

if (window.location.href.indexOf("bmq") != -1) {
    var getTableBmq = document.querySelector('tbody');
    var getMacs = getTableBmq.querySelectorAll('.mac');
    var head = document.getElementsByTagName('head')[0];
    var anchor = document.getElementById('tabs');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = 'function pmSearch(MAC, type) { var the_URL = "http://plantmonitoring/ModemHistory.aspx?modemMac=" + MAC + "&type=" + type + "&daysBack=28"; if (MAC != \'\' && MAC != null) window.open(the_URL,\'popout\',\'status=no,directories=no,location=no,resizable=no,menubar=no,width=720,height=500,toolbar=no\'); };';
    script.text += '\nfunction batterySearch(MAC) { var the_URL = "http://bslam/battery/?action=query&mac=" + MAC; if (MAC != \'\' && MAC != null) window.open(the_URL, \'popout\',\'status=no,directories=no,location=no,resizable=no,menubar=no,width=600,height=150,toolbar=no\'); };';
    script.text += '\nvar getTableBmq = document.querySelector(\'tbody\');';
    script.text += '\nvar getMacs = getTableBmq.querySelectorAll(\'.mac\');';
    var deployed = 0;
    head.appendChild(script);

    function loadButtons() {
        if (deployed == 1) {
            var buttons1 = document.querySelectorAll('#button');
            var buttons2 = document.querySelectorAll('#buttonbt');
            for (i = 0; i < buttons1.length; ++i) {
                document.getElementById('button').remove();
            }
            for (i = 0; i < buttons2.length; ++i) {
                document.getElementById('buttonbt').remove();
            }
            deployed = 0;
        } else {
            deployed = 1;
            for (var ii = 0, row1; row1 = getTableBmq.rows[ii]; ii++) {
                var col = row1.cells;
                if (getTableBmq.rows[0].innerText != 'No data available in table') {
                    var MAC = col[3].innerHTML;
                    var type = col[2].innerHTML.toLowerCase();
                    if (type == 'dcx') {
                        type = 'dx';
                    }
                    if (type == 'dt') {
                        let buttonBt = document.createElement('button');
                        buttonBt.innerHTML = 'Battery';
                        buttonBt.id = 'buttonbt';
                        buttonBt.style.height = '18px';
                        buttonBt.style.fontSize = '12';
                        buttonBt.style.backgroundColor = '#dddddd';
                        buttonBt.style.borderRadius = '4px';
                        buttonBt.style.padding = '1px';
                        buttonBt.style.lineHeight = '0';
                        buttonBt.style.marginLeft = '2px';
                        buttonBt.setAttribute('onclick', 'javascript: batterySearch("'+MAC+'");');
                        col[3].insertAdjacentElement('beforeend', buttonBt);
                    }
                    let button = document.createElement('button');
                    button.innerHTML = 'PM';
                    button.id = 'button';
                    button.style.height = '18px';
                    button.style.fontSize = '12';
                    button.style.backgroundColor = '#dddddd';
                    button.style.borderRadius = '4px';
                    button.style.padding = '1px';
                    button.style.lineHeight = '0';
                    button.style.marginLeft = '2px';
                    button.setAttribute('onclick', 'javascript: pmSearch("'+MAC+'", "'+type+'");');
                    col[3].insertAdjacentElement('beforeend', button);
                } else {
                    window.alert('Load a Node First.')
                }
            }
        }
    }

    var button1 = document.createElement('button');
    button1.onclick = loadButtons;
    button1.innerHTML = 'Load/Unload PM Buttons';
    button1.style.marginTop = '8px';
    button1.style.borderRadius = '6px';
    button1.style.backgroundColor = '#555555';
    button1.style.color = '#FFFFFF';
    button1.style.border = '1px solid #626262';
    anchor.insertAdjacentElement('afterend', button1);
}

if (window.location.href.indexOf("vSure") != -1) {
    addGlobalStyle('li.ng-binding { cursor: pointer !important; } li.ng-binding:hover { background-color: #ccc !important; }');
}