import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CoingeckoService } from '../../services/coingecko.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() emitAsset = new EventEmitter<string>();

  asset: string = '';

  assets!: any;

  @ViewChild('myModal', {static: false}) modal!: ElementRef;

  constructor(private coingeckoService: CoingeckoService) {}

  ngOnInit(): void {
    this.coingeckoService.getAssets().subscribe({
      next: as => {
        this.assets = as
      },
    })
  }

  setAsset(a: any) {
    this.emitAsset.emit(a.id);
  }

  open() {
    this.modal.nativeElement.style.display = 'block';
    this.modal.nativeElement.removeAttribute('hidden');
  }

  resetElements() {
    let input = document.getElementById('input') as HTMLInputElement;
    input!.value = '';

    let td = document.getElementsByClassName('td') as HTMLCollectionOf<HTMLTableDataCellElement>;
    for (let i = 0; i < td.length; i++) {
      td[i].innerHTML = '';
    }
  }

  close(a: any) {
    this.setAsset(a);
    this.modal.nativeElement.style.display = 'none';
    this.resetElements();
  }
  
  closeModal() { 
    this.modal.nativeElement.style.display = 'none';
    this.resetElements();
  }
}
