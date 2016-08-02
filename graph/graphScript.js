var charmElements = [];
$(document).ready(function(){
	getArcheryCharmsAndSetGraph();
});

function getArcheryCharmsAndSetGraph() {
	$.ajax({
	  dataType: "json",
	  url: "./archery.json",
	  cache: false,
	  success: function(json) {
	  	$.each(json.data, function(i, jsonCharm) {
	  		var charmParent = jsonCharm.prerequisite_charm ? jsonCharm.prerequisite_charm.split(" ").join("_") : undefined;
	  		var charmNode = { 
	  			group: 'nodes',
	  			data: {
	  				id: jsonCharm.name.split(" ").join("_"),
	  				name: jsonCharm.name,
	  				prerequisite_charm: charmParent
	  			} 
	  		};
	  		charmElements.push(charmNode);
	  	});
	  	$.each(charmElements, function(i, charm) {
	  		if(charm.data.prerequisite_charm) {
	  			var charmEdge = { 
	  				group: 'edges',
	  				data: {
	  					id: charm.data.prerequisite_charm + "_" + charm.data.id,
	  					source: charm.data.prerequisite_charm,
	  					target: charm.data.id
	  				} 
	  			};
	  			charmElements.push(charmEdge);
	  		}
	  	});
	  	console.log(charmElements);
	  	setGraph();
	  },
	  error: function (xhr, status, err) {
	  	console.log(status + " " + err);
	  }
	});
}

function setGraph() {
	var graph = cytoscape({
	  container: document.getElementById('graph-container'),

	  elements: charmElements,

	  style: [
			{
				selector: 'node',
				style: {
					'content': 'data(name)',
					'text-opacity': 0.5,
					'text-valign': 'center',
					'text-halign': 'right',
					'background-color': '#11479e'
				}
			},

			{
				selector: 'edge',
				style: {
					'width': 4,
					'target-arrow-shape': 'triangle',
					'line-color': '#9dbaea',
					'target-arrow-color': '#9dbaea',
					'curve-style': 'bezier'
				}
			}
		],

	  layout: {
	    name: 'dagre'
	  },
	  textureOnViewport: true
	});
}