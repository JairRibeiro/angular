import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  
  entries: Entry[] = [];
  entry: Entry;
  bodyDeletarCategoria = '';

  array = [];
  sum = 7;
  throttle = 30;
  scrollDistance = 1;
  scrollUpDistance = 2;
  
  constructor(private entryService: EntryService,
              private toastr: ToastrService) { }
  
  ngOnInit() 
  {     
    this.entryService.getAll().subscribe(
      (_entries: Entry[]) => {
         this.entries = _entries.sort((a,b) => b.id - a.id);
         this.appendItems(0, this.sum); 
      },     
      error => {
        this.toastr.error(`Erro ao carregar a lista de lançamentos: ${error}`);
      }
    );
  } 
    
  deleteEntry(entry: Entry, template: any) 
  {    
    this.bodyDeletarCategoria = `Tem certeza que deseja excluir o Lançamento: ${entry.name} ?`;
    this.entry = entry;
    template.show();    
  }
    
  confirmeDelete(template: any) 
  {
    this.entryService.delete(this.entry.id).subscribe(
      () => {
        template.hide();
        this.entries = this.entries.filter(element => element != this.entry);
        this.toastr.success('Lançamento excluído com sucesso!');
      }, 
      error => {
        this.toastr.error(`Erro ao excluir o lançamento: ${error}`);
      } 
    );
  }

  addItems(startIndex, endIndex, _method) {
    for (let i = startIndex; i < endIndex; ++i) {
      this.array[_method](this.entries[i]);
    }
  }
  
  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'push');
  }
  
  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown () {
    const start = this.sum;
    this.sum += 4 < this.entries.length - this.sum ? 4 : this.entries.length - this.sum;
    this.appendItems(start, this.sum);
  }
  
  onScrollUp() {
    debugger;
    const start = this.sum;
    this.sum += 4;
    this.prependItems(start, this.sum);
  } 
      
}
      