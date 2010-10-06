dojo.provide("dojox.table.TextEdit");
dojo.require("dojo.Stateful");

dojox.table.TextEdit = function(settings){
	// summary:
	// 		Add text-box based editing to a column
	var originalRenderCell = settings.renderCell || function(data, td){
		td.appendChild(document.createTextNode(data));
	};
	settings.renderCell = function(data, td){
		originalRenderCell(data, td);
		dojo.connect(td, "dblclick", function(){
			td.removeChild(td.firstChild);
			var input = dojo.create("input",{
				type:"text",
				value: data
			}, td);
			input.focus();
			var grid = settings.grid;
			input.onblur = input.onchange = function(){
				var object = grid.getObject(td);
				data = object[settings.field] = input.value;
				if(grid.store){
					grid.store.put(object);
				}
				td.removeChild(input);
				originalRenderCell(data, td);
			}
		});
	};
	return settings;
};
