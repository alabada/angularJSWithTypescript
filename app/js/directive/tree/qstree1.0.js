/**
 * Created by zhiheng.li on 2016/4/18.
 */
/*
 <div
 data-angular-treeview="true"
 data-tree-checkbox="true"	 //是否启用复选框
 data-parent-node="true"		//父节点是否作为可选的节点
 data-tree-id="tree"			//树ID
 data-tree-model="roleList"	//树集合
 data-node-id="roleId"		//节点代码
 data-node-label="roleName"	//节点名称
 data-node-children="children" >  //子节点
 </div>
 必须在controller里面定义$scope.selectedNodes数组来接收树形所选的节点对象
 */

define([
	"app"
],function (app) {
	app.directive( 'treeModel', ['$compile', function( $compile ) {
		return {
			restrict: 'EA',
			link: function ( scope, element, attrs ) {
				//tree id
				var treeId = attrs.treeId;

				//tree model
				var treeModel = attrs.treeModel;

				//node id
				var nodeId = attrs.nodeId || 'id';

				//node label
				var nodeLabel = attrs.nodeLabel || 'label';

				//children
				var nodeChildren = attrs.nodeChildren || 'children';

				var angularTreeview = attrs.angularTreeview||'true';

				//复选框选择属性
				var treeChecked = attrs.checked||false;
				//是否启用复选框
				var treeCheckbox = attrs.treeCheckbox||"false";

				var parentNode = attrs.parentNode||"false";
				//tree template
				var template ='<ul><li data-ng-repeat="node in ' + treeModel + '">'+
					'<i class="fa fa-sort-up" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
					'<i class="fa fa-sort-desc" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
					'<i class="fa fa-angle-right" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
					'<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
					'<div data-angular-treeview="'+angularTreeview+'" data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + ' ' +
					'></div>' +
					'</li>' +
					'</ul>';
				if(treeCheckbox=="true"){
					template = '<ul><li data-ng-repeat="node in ' + treeModel + '">'+
						'<input type ="checkbox" ng-checked="node.checked" ng-click="checkBefore(node)" data-node-id="'+nodeId+'" />'+
						'<i class="fa fa-sort-up" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
						'<i class="fa fa-sort-desc" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
						'<i class="fa fa-angle-right" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
						'<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
						'<div data-angular-treeview="'+angularTreeview+'" data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + ' ' +
						'+ data-tree-checkbox="'+treeCheckbox+'" data-parent-node="'+parentNode+'"></div>' +
						'</li>' +
						'</ul>';
				}
				//选择的时候把treeId放进去到 selectNodes
				scope.checkBefore=function(node){
					node.checked =!node.checked;
					var flag =  attrs.parentNode;
					scope.checkNode(node,node.checked);
				}
				scope.checkNode = function(node,flag){
					//判断是否已经存在被选择的节点数组里
					var index = exitNode(node);

					if(node.children.length>0) {
						if(parentNode=="true"){
							if(flag){
								if(index==-1) {
									scope.selectedNodes.push(node);
								}
							}else if(index>-1){
								scope.selectedNodes.splice(index, 1);
							}
						}
						for (var i = 0; i < node.children.length; i++) {
							//判断是否有子节点
							if(node.children.length>0){
								scope.checkNode(node.children[i],flag);
							}
							node.children[i].checked = flag;
						}
					}else {
						if (flag) {
							if (index==-1) {
								scope.selectedNodes.push(node);
							}
						} else if(index>-1){
							scope.selectedNodes.splice(index, 1);
						}
					}


				}

				//遍历节点数组是否有存在对应的主键
				function  exitNode(node) {
					for (var i = 0; i < scope.selectedNodes.length; i++) {
						if (scope.selectedNodes[i] === node) {
							return i;
						}
					}
					return -1;
				}
				//check tree id, tree model
				if( treeId && treeModel ) {

					//root node
					if( attrs.angularTreeview=="true") {


						//create tree object if not exists
						scope[treeId] = scope[treeId] || {};

						//if node head clicks,
						scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function( selectedNode ){

								//Collapse or Expand
								selectedNode.collapsed = !selectedNode.collapsed;
							};

						//if node label clicks,
						scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function( selectedNode ){

								//remove highlight from previous node
								if( scope[treeId].currentNode && scope[treeId].currentNode.selected ) {
									scope[treeId].currentNode.selected = undefined;
								}

								//set highlight to selected node
								selectedNode.selected = 'selected';
								//selectedNode.checked = 'true';
								//set currentNode
								scope[treeId].currentNode = selectedNode;
							};
					}

					//Rendering template.
					element.html('').append( $compile( template )( scope ) );
				}
			}
		};
	}]);
});
