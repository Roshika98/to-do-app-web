import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RequestService } from './request.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

describe('RequestService', () => {
  let service: RequestService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequestService],
    });

    service = TestBed.inject(RequestService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    // Ensure that no outstanding HTTP requests are still pending.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login method and return expected result', () => {
    const mockResponse = { token: 'mockToken' };
    const body = { email: 'test@example.com', password: 'password123' };

    service.login(body).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseURI}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call getData method and return expected result', () => {
    const mockResponse = { data: 'test data' };
    const endpoint = '/test-endpoint';
    const params = new HttpParams().set('param1', 'value1');

    service.getData(endpoint, params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseURI}${endpoint}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('param1')).toBe('value1');
    req.flush(mockResponse);
  });

  it('should call postData method and return expected result', () => {
    const mockResponse = { message: 'Success' };
    const endpoint = '/test-endpoint';
    const body = { key: 'value' };

    service.postData(endpoint, body).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseURI}${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('should call patchData method and return expected result', () => {
    const mockResponse = { message: 'Updated' };
    const endpoint = '/test-endpoint';
    const body = { key: 'newValue' };

    service.patchData(endpoint, body).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseURI}${endpoint}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('should call deleteData method and return expected result', () => {
    const mockResponse = { message: 'Deleted' };
    const endpoint = '/test-endpoint';

    service.deleteData(endpoint).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseURI}${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
