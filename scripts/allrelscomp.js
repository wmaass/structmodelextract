var links = [];
var path = [];
var circle = [];
var text = [];
var rect = [];
var force, svg;
var width = 1800,
    height = 1200;

//-----------------------

$(document).ready(function(){

/*
	var $paper = $('.paper');
	var paper = "Al-Gahtani, Said S., Geoffrey S. Hubona, and Jijie Wang.Information technology (IT) in Saudi Arabia: Culture and the acceptance and use of IT. Information & Management 44.8 (2007): 681-691.";

	var structvars = [
            { title: "USE" },
            { title: "EE" },
            { title: "BI" },
            { title: "FC" },
            { title: "SN" },
            { title: "PE" }
            ];

	var  irg = [
				[-1,	1.31,	1.32,	1.3	,	1.33,	1.24],
				[1.29,	-1	,	1.32,	1.34,	1.36,	1.32],
				[1.37,	1.4	,	-1	,	1.28,	1.39,	1.31],
				[1.31,	1.48,	1.32,	-1	,	1.36,	1.32],
				[1.29,	1.36,	1.31,	1.3	,	-1	,	1.32],
				[1.29,	1.35,	1.27,	1.28,	1.34,	-1	]
			];

	var  irgSave = [
				[-1,	1.31,	1.32,	1.3	,	1.33,	1.24],
				[1.29,	-1	,	1.32,	1.34,	1.36,	1.32],
				[1.37,	1.4	,	-1	,	1.28,	1.39,	1.31],
				[1.31,	1.48,	1.32,	-1	,	1.36,	1.32],
				[1.29,	1.36,	1.31,	1.3	,	-1	,	1.32],
				[1.29,	1.35,	1.27,	1.28,	1.34,	-1	]
			];

	var irgAfterPhase1;

	var tau = [
				[0,0,0,0,0,0],
				[0,0,1,0,0,0],
				[1,0,0,0,0,0],
				[1,0,0,0,0,0],
				[0,0,1,0,0,0],
				[0,0,1,0,0,0],
			];
*/
/*

var results = [
	[-1,	*,	-,	-,	*,	-],
	[-,	-1,	1.4,	-,	-,	-],
	[1.37,	&,	-1,	-,	&,	*],
	[*,	1.48,	*,	-1,	1.36,	*],
	[-,	1.36,	1.39,	-,	-1,	-],
	[*,	*,	-,	-,	*,	-1],
]


*/

var $paper = $('.paper');
var paper = "Meseguer Artola,  et al.: Factors that influence the teaching use of Wikipedia in Higher Education. (2014) https://archive.ics.uci.edu/ml/datasets/wiki4HE";

var structvars = [
            { title: "USE" },
            { title: "QU" },
            { title: "PU" },
            { title: "PEU" },
            { title: "ENJ" },
            { title: "BI" },
            { title: "JR" },
            { title: "PF" },
            { title: "BM" },
            { title: "SA" }       ];

var  irg = [
	[-1, 	1.41,	1.73,	1.39,	1.49,	1.95,	1.48,	1.50,	1.44,	1.32],
	[1.53,	-1,		1.55,	1.39,	1.52,	1.62,	1.44,	1.44,	1.36,	1.32],
	[1.62, 	1.41,	-1	,	1.38,	1.55,	1.70,	1.48,	1.46,	1.42,	1.32],
	[1.4, 	1.36,	1.40,	-1	,	1.58,	1.45,	1.47,	1.47,	1.38,	1.30],
	[1.43, 	1.35,	1.48,	1.45,	-1	,	1.48,	1.48,	1.43,	1.38,	1.35],
	[1.72, 	1.39,	1.58,	1.39,	1.45,	-1	,	1.37,	1.49,	1.41,	1.32],
	[1.39, 	1.28,	1.33,	1.38,	1.41,	1.43,	-1	,	1.46,	1.43,	1.33],
	[1.41, 	1.29,	1.35,	1.38,	1.42,	1.46,	1.52,	-1	,	1.38,	1.33],
	[1.46, 	1.31,	1.42,	1.38,	1.46,	1.46,	1.55,	1.43,	-1	,	1.40],
	[1.42, 	1.30,	1.36,	1.40,	1.47,	1.43,	1.46,	1.49,	1.44,	-1],
];

	var tau = [
				[0,0,0,0,0,0,0,0,0,0],
				[1,0,1,0,1,1,0,0,0,0],
				[1,0,0,0,0,1,0,0,0,0],
				[1,0,1,0,0,1,0,0,0,0],
				[1,0,1,1,0,1,0,0,0,0],
				[1,0,0,0,0,0,0,0,0,0],
				[1,1,1,1,1,1,0,1,1,1],
				[1,0,1,0,0,1,0,0,0,0],
				[1,1,1,1,1,1,0,1,0,1],
				[1,1,1,1,1,1,0,1,0,0],
			];

		
	var tabletau = makeTable(tau, tau.length, 'tau', structvars);


	document.getElementById("paper").innerHTML = paper;

	var irgSave = irg.map(function(arr) {
		return arr.slice();
	});	

	var tableirgsave = makeTable(irgSave, irgSave.length, 'irgSave', structvars);

	var $threshold = $('.threshold');
	var threshold = 0;
	
	threshold = SelectRankElement(irg, TwoDMatrixSum(tau));
	console.log("Threshold: " + threshold);
	document.getElementById("threshold").innerHTML = threshold;


		for (var i = 0;  i < irg.length; i++) {
			for (var j = 0; j < i; j++) {
				if(irg[i][j]<irg[j][i]){
				irg[i][j]="-";
			}
			else{
					irg[j][i]="-";
				};

			if(irg[i][j] < threshold){irg[i][j]="*";}
			if(irg[j][i] < threshold){irg[j][i]="*";}
		};
	};

	for (var i = 0;  i < irg.length; i++) {

		for (var j = 0; j < irg.length; j++) {
			if( (typeof irg[i][j] === 'number') && (tau[j][i])) {
				console.log("Verschiebe wegen tau: " + "[" + j + "]" + "[" + i + "]" + " nach " + "[" + i + "]" + "[" + j + "]")
				irg[j][i] = irg[i][j];
				irg[i][j] = "&";
			};
		};
	};

	var IRGresults = irg.map(function(arr) {
		return arr.slice();
	});

var lobject = new Object();

	for (var i = 0; i < irg.length; i++) {
		for (var j = 0; j < irg.length; j++) {
			if(typeof irg[i][j] === 'number'){
				if(irg[i][j] >= threshold){
					var from = structvars[i];
					var to = structvars[j];
					IRGresults[i][j] = from.title + "->" + to.title;
					console.log(from.title + "->" + to.title + " (" + irg[i][j] + ")");

					lobject.source = from.title;
					lobject.target = to.title;
					lobject.type = "link";
					console.log("Link: " + lobject.source + " to " + lobject.target);
					links.push(lobject);
					lobject = {};
				};
			};
		};
	};

	
var viz2 = visualizeNet();


	/* compute exogenous and endogenous nodes */
	var e = exogenousVars(irg);

	var pathmatrix = [];
	var p = [];

	for (var i = 0; i < e.length; i++) {
		pathmatrix.push(getPath(e[i], irg, []));
	};

	console.log("Pathmatrix: " + pathmatrix);


	var tableirg = makeTable(irg, irg.length, 'irg', structvars);

	var tableresults = makeTable(IRGresults, IRGresults.length, 'IRGresults', structvars);


});

/*
Test whether paths in the original moodel are found in the derived model 
*/


/* UTAUT */
/*
var originalModel = [
	[5,2,0],
	[1,2,0],
	[4,2,0],
	[3,0],
]

var derivedModel = [
	[3,1,2,0],
	[3,4,1,2,0],
	[3,4,2,0],
	[5]
]
*/

var originalModel = [
	[5,2,0],
	[1,2,0],
	[4,2,0],
	[3,0],
]

var originalModel = [
	[0, 1, 8, 9],
	[0, 1, 3, 6, 8, 9],
	[0, 2, 1, 8, 9],
	[0, 2, 1, 3, 6, 8, 9],
	[0, 2, 6, 8, 9],
	[0, 2, 4, 6, 8, 9],
	[0, 2, 4, 6, 8, 9],
	[0, 2, 4, 5, 7, 6, 8, 9],
	[0, 2, 8, 9]
]

var derivedModel = [
	[0, 3, 8, 9],
	[0, 1, 3, 8, 9],
	[0, 1, 3, 7, 6, 8, 9],
	[0, 2, 1, 3, 8, 9],
	[0, 2, 1, 3, 7, 6, 8, 9],
	[0, 2, 6, 8, 9],
	[0, 4, 6, 8, 9],
	[0, 4, 8, 9],
	[0, 8, 9],
	[5, 7, 6, 8, 9]
]

function isPartOf(op, dp){
	var j = 0;

	for(i=0; i<dp.length; i++){
		if(dp[i] == op[j]){
			if(j+1 == op.length){
			return true;
			}
			else{
				j++;				
			}
		}
	}	
//	console.log("Original path not recognized: " + op);
	return false;
}

var isPath = function(path){
	var i = 0;
	while(i<derivedModel.length){
		if (isPartOf(path, derivedModel[i])){
			return(true)
		}
		else{
			i++;
		}
	}
	return false;
}

var isNotPath = function(path){
	var i = 0;
	while(i<derivedModel.length){
		if (isPartOf(path, derivedModel[i])){
			return(false)
		}
		else{
			i++;
		}
	}
	return true;
}

function makeTable(array,numXelem, name, header) {

    var table = document.getElementById(name);
    table.setAttribute("style", "background-color: AliceBlue;")

    var row = document.createElement("TR");

    if(!header){
		for (var i = 0; i < numXelem; i++) {
			var cell = document.createElement('th');
			cell.setAttribute("style", "background-color: PowderBlue;");
			cell.style.textAlign = 'center';
			cell.textContent = "Node: " + i;
			row.appendChild(cell);
	    }
    }
    else{
    	for (var i = 0; i < header.length; i++) {
			cell = document.createElement('th');
			cell.setAttribute("style", "background-color: PowderBlue;");
			cell.style.textAlign = 'center';
			cell.textContent = header[i].title;
			row.appendChild(cell);
	    }
    }
	table.appendChild(row);
    
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < array[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = array[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

var verifiedPaths = originalModel.filter(isPath);
var maxPositivePath = verifiedPaths.reduce(function (a, b) { return a.length > b.length ? a : b; });

var falsifiedPaths = originalModel.filter(isNotPath);
var maxFalsePath = falsifiedPaths.reduce(function (a, b) { return a.length > b.length ? a : b; });

verifiedPaths.forEach(function(vp){console.log("vp: " + vp)});

var tp = makeTable(verifiedPaths, maxPositivePath.length, 'verifiedPathsTable');
//document.getElementById("verifiedPathsTable").innerHTML = t;

var percent = verifiedPaths.length / originalModel.length;

var tf = makeTable(falsifiedPaths, maxFalsePath.length, 'falsifiedPathsTable');

var $PercentVerfiedPaths = $('.PercentVerfiedPaths');
console.log("Percentage of verfied paths = " + percent);
document.getElementById("PercentVerfiedPaths").innerHTML = percent;
