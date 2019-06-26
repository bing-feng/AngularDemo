import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-admin-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  constructor(private modalService: NzModalService) {
  }
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: Data[] = [];
  listOfAllData: Data[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  // 搜索内容
  searchValue = "";

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.modalService.warning({
      nzTitle: '提示',
      nzContent: '添加成功！'
    });
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  currentPageDataChange($event: Data[]): void {
    this.listOfDisplayData = $event;
    this.operateData();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  operateData(): void {
    this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false));
    this.refreshStatus();
  }

  delAll(): void {
    let ids = "0";
    this.listOfDisplayData.forEach(item => {
      if(this.mapOfCheckedId[item.id]) {
        ids = ids + "," + item.id;
      }
    });
    ids = ids.replace("0,", "");

    if(ids !== "0") {
      this.modalService.confirm({
        nzTitle: '提示',
        nzContent: '确定要删除[' + ids + ']吗？',
        nzOnOk: () => {
          this.modalService.success({
            nzTitle: '提示',
            nzContent: '删除成功！'
          });
        }
      });
    } else {
      this.modalService.warning({
        nzTitle: '提示',
        nzContent: '请选择要删除的内容！'
      });
    }
  }

  del(id: String): void {
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '确定要删除[' + id + ']吗？',
      nzOnOk: () => {
        this.modalService.success({
          nzTitle: '提示',
          nzContent: '删除成功！'
        });
      }
    });
  }

  getData(): void {
    this.listOfAllData = [];
    let count = Math.random()*100;

    for (let i = 0; i < count; i++) {
      this.listOfAllData.push({
        id: i + 1,
        name: this.searchValue == "" ? `Edward King ${i}` : `${this.searchValue} ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        disabled: false
      });
    }
  }
  search(): void {
    this.getData();
  }
  ngOnInit(): void {
    this.getData();
  }
}


