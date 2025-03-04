import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable ,Subject} from 'rxjs';
import { Complaint } from '../_models/contact.model';
import { tap} from 'rxjs/operators';
import { AuthServiceService } from '../_services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5000/complaint';
  private complaintUpdated = new Subject<Complaint>();
    constructor(private http: HttpClient) { }
  
    getAllComplaints(): Observable<Complaint[]> {
      return this.http.get<Complaint[]>(`${this.apiUrl}/`);
    }
    getComplaintsByUser(id: string): Observable<Complaint[]> {
      return this.http.get<Complaint[]>(`${this.apiUrl}/user/${id}`);
    }

    getComplaintById(id: string): Observable<Complaint> {
      return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
    }

    createComplaint(complaint: Complaint): Observable<Complaint> {
      const complaintData = JSON.parse(JSON.stringify(complaint));
      delete complaintData._id;
        console.log('Adding Complaint:', complaintData);
        return this.http.post<Complaint>(`${this.apiUrl}/`, complaintData).pipe(
            tap(createdComplaint => {
                console.log('Complaint added successfully:', createdComplaint);
            })
        );
      }
  
    updateComplaint(id: string, complaint: Complaint): Observable<Complaint> {
      console.log('Updating Complaint at:', `${this.apiUrl}/${id}`);
        return this.http.put<Complaint>(`${this.apiUrl}/${id}`, complaint).pipe(
          tap(updateComplaint => {
            console.log('Update successful:', updateComplaint);
            this.complaintUpdated.next(updateComplaint);
          })
        );
    }
    changeComplaintStatus(id: string, status: string): Observable<Complaint> {
        return this.http.put<Complaint>(`${this.apiUrl}/status/${id}`, {status}).pipe(
          tap(updateComplaint => {
            console.log('Update successful:', updateComplaint);
            this.complaintUpdated.next(updateComplaint);
          })
        );
    }

    deleteComplaint(id: string): Observable<void> {
        console.log('Deleting Complaint at:', `${this.apiUrl}/${id}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
          tap(() => console.log('Delete successful'))
        );
      }
      onComplaintUpdate(): Observable<Complaint> {
          return this.complaintUpdated.asObservable();
      }
}

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {
  private apiUrl = 'http://localhost:5000/prodReq';

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private cookieService: CookieService
  ) {}

  getProductRequestsBySeller(sellerId: string): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.apiUrl}/getProdReqForSeller/${sellerId}`, { headers });
  }

  updateRequestStatus(id: string, status: string, message: string): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}/updateProdReqStatusAndMsg/${id}`, 
      { status, message }, 
      { headers }
    );
  }
}
