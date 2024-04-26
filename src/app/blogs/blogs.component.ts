import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlogService } from '../services/blogs/blog.service';
import { BlogFormsComponent } from '../blog-forms/blog-forms.component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
 
  displayedColumns: string[] = [
    'srno',
    'date',
    'title',
    'content',
    'imageUrl'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private blog: BlogService) { }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(BlogFormsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCuriotoryBlog();
        }
      },
    });
  }

  ngOnInit(): void {

  }

  getCuriotoryBlog() {
    this.blog.getAllCuriotroyBlogs().subscribe({
      next: (res:any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
        const dialogRef = this._dialog.open(BlogFormsComponent, {
          data,
        });
    
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getCuriotoryBlog();
            }
          },
        });
      }

}
