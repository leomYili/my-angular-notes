import { Component, Input, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-simple-demo5',
  templateUrl: './demo5.component.html',
  styleUrls: ['./demo5.component.css']
})
export class SimpleDemo5Component {
  async simplePrint(event: any) {
    console.info('开始打印');

    // 创建工作簿和工作表
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 添加列和行
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'D.O.B.', key: 'dob', width: 15 }
    ];
    worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });

    // 将工作簿写入缓冲区
    const buffer = await workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'example.xlsx';
      a.click();
      URL.revokeObjectURL(url);

      return buffer
    });

    // 创建 Blob 对象并生成 URL
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = URL.createObjectURL(blob);

    console.log(url);

    // 创建 iframe 并写入内容
    const iframe: any = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write('<html><head><title>Print</title></head><body>');
    doc.write(
      `<embed src="${url}" type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" width="100%" height="100%">`
    );
    doc.write('</body></html>');
    doc.close();

    // 调用打印功能
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // 清理
    URL.revokeObjectURL(url);
    document.body.removeChild(iframe);
  }
}
