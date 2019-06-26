import { Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit  {
  constructor(private modalService: NzModalService) { }
  ngOnInit() {
  }

  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;
  defaultCheckedKeys = ['10020'];


  nodes: NzTreeNodeOptions[] = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf', key: '10010', isLeaf: true },
            { title: 'leaf', key: '10011', isLeaf: true },
            { title: 'leaf', key: '10012', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf', key: '10020', isLeaf: true }]
        },
        {
          title: 'parent 1-2',
          key: '1003',
          children: [{ title: 'leaf', key: '10030', isLeaf: true }, { title: 'leaf', key: '10031', isLeaf: true }]
        }
      ]
    }
  ];

  nzClick(event: NzFormatEmitEvent): void {
    this.modalService.warning({
      nzTitle: '提示',
      nzContent: 'key: ' + event.node.key + ' <br>title: ' + event.node.title
    });
  }

  nzCheck(event: NzFormatEmitEvent): void {
    this.modalService.warning({
      nzTitle: '提示',
      nzContent: 'key: ' + event.node.key + ' <br>title: ' + event.node.title
    });
  }

  save(): void {
    let nodes = this.getCheckedNodes(this.nzTreeComponent.getTreeNodes());
    let allNodes = this.getCheckedAllNodes(this.nzTreeComponent.getTreeNodes());
    if(nodes.length > 0) {
      nodes = nodes.substr(0, nodes.length - 1);
      allNodes = allNodes.substr(0, allNodes.length - 1);

      this.modalService.warning({
        nzTitle: '提示',
        nzContent: '只有子节点: ' + nodes + '<br>全部节点: ' + allNodes
      });
    } else {
      this.modalService.warning({
        nzTitle: '提示',
        nzContent: '请选择节点'
      });
    }
  }

  getCheckedNodes(parent: NzTreeNode[]): String {
    let res: String = "";
    parent.forEach(node => {
      if(node.isChecked && node.isLeaf) {
        res += node.key + ",";
      } else {
        res += "" + this.getCheckedNodes(node.children);
      }
    });
    return res;
  }
  getCheckedAllNodes(parent: NzTreeNode[]): String {
    let res: String = "";
    parent.forEach(node => {
      if(node.isChecked || node.isHalfChecked) {
        res += node.key + ",";
      }
      res += "" + this.getCheckedAllNodes(node.children);
    });
    return res;
  }
}
