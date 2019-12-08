import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  result = {}; // { companyName: '', stockExchange: '', total: null };
  uploader: FileUploader;
  isDropOver: boolean;

  ngOnInit(): void {
    // const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({ url: '/resource/files', autoUpload: true }); // , headers: headers});
    // this.uploader.onCompleteAll = () => {
    //   alert('File uploaded');
    // }
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.result = JSON.parse(response); //success server response
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    // let error = JSON.parse(response); //error server response
    console.log(response);
  }

  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }

  fileClicked() {
    this.fileInput.nativeElement.click();
  }

  return() {
    this.result = null;
  }
}
