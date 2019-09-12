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
  
  constructor(private entryService: EntryService,
              private toastr: ToastrService) { }
  
  ngOnInit() 
  {
    this.entryService.getAll().subscribe(
      (_entries: Entry[]) => {
         this.entries = _entries;
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
      
}
      