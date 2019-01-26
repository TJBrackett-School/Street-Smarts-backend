import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

export interface Cat{
	title: string;
}

@Injectable()
	export class BookService {
		constructor(private http: HttpClient) 

	getAllBooks(): Observable<Book[]> {
		return this.http.get<Book[]>('http://localhost:4200/api/books');
	}

	getBook(title: string): Observable<Book[]> {
		return this.http.get<Book>('http://localhost:4200/api/books/' + title);
	}

	insertBook(book: Book): Observable<Book> {
		return this.http.post<Book>('http://localhost:4200/api/books/' + book);
	}

	updateBook(book: Book): Observable<void> {
		return this.http.put<void>('http://localhost:4200/api/books/' + book.title, book);
	}
	
	deleteBook(title: string) {
		return this.http.delete('http://localhost:4200/api/books/' + title);
	}
}
