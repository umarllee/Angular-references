import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { param } from 'jquery';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// INTERFACELER

// import { ReceiptElement } from '../models/receiptElement';
// import { Route } from '../models/route';
// import { LoadByRouteResult } from '../models/routeLoadByRoute';
// import { SaveRoute, SaveRouteResult } from '../models/saveRoute';
// import { SaveRouteLine } from '../models/saveRouteLine';
// import { SaveRouteOperation } from '../models/saveRouteOperation';
// import { LoadDatas, SearchData } from '../models/load-datas'
// import { RouteData } from '../models/routeData';
// import { FilterLoad } from '../models/filter-load';

@Injectable({
    providedIn: 'root'
})

export class ShipmentService {
    private readonly baseUrl = environment.localApi;

    constructor(private http: HttpClient) { }

    // saveRoute(saveRouteData: SaveRoute): Observable<SaveRouteResult> {
    //     return this.http.post<SaveRouteResult>(this.baseUrl + '/Route/SaveRoute', saveRouteData);
    // }

    // saveLoads(loads: RouteData | undefined): Observable<any> {
    //     return this.http.post<any>(this.baseUrl + '/Route/SaveRoute', loads);
    // }


    // saveRouteLines(routeLines: SaveRouteLine[]) {
    //     return this.http.post(this.baseUrl + '/Route/SaveRouteLine', routeLines);
    // }

    // saveOperation(routeOperation: SaveRouteOperation) {
    //     return this.http.post(this.baseUrl + '/Route/SaveRouteOperation', routeOperation);
    // }

    // // getRoutes(): Observable<Route[]> {
    // //   return this.http.get<Route[]>(this.baseUrl + '/Route/GetRoutes');
    // // }

    // getRoutes(filters: FilterLoad | undefined): Observable<any> {
    //     return this.http.post<any>(this.baseUrl + '/Route/GetRoutes', filters);
    // }

    // getOverheadDocuments(routeId: number): Observable<ReceiptElement[]> {
    //     let params = new HttpParams();
    //     params = params.append('routeId', routeId);
    //     return this.http.get<LoadByRouteResult[]>(this.baseUrl + '/RouteOperation/GetRouteLoadByRoute', { params }).pipe(
    //         map(res => res.map(lbrr => {
    //             return {
    //                 qaimeNo: lbrr.Overhead,
    //                 vaqonNo: lbrr.WagonNo,
    //                 containerNo: lbrr.ContainerNo,
    //                 qnq: lbrr.Qnq,
    //                 tonaj: lbrr.Weight,
    //                 fileName: lbrr.FileName,
    //                 filePath: lbrr.FilePath,
    //                 routeLineId: lbrr.RouteLineId
    //             }
    //         }))
    //     )
    // }

    // deleteRouteLoad(routeLineId: number) {
    //     return this.http.put<any>(this.baseUrl + `/Route/DeleteRouteLoad/${routeLineId}`, {});
    // }

    // deleteRoute(routeId: number) {
    //     return this.http.put<any>(this.baseUrl + `/Route/DeleteRoute/${routeId}`, {});
    // }

    // getCountriesByRouteId(routeId: number): Observable<[string, string]> {
    //     return this.http.get(this.baseUrl + '/Route/GetRouteById/' + routeId).pipe(
    //         map((res: any) => {
    //             return [res[0].LoadCountryName, res[0].DestCountryName];
    //         })
    //     );
    // }

    // // getCurrentRoutes(data: SearchData): Observable<any[]> {
    // //     return this.http.post<any[]>(this.baseUrl + '/Route/GetCurrentRoute', data);
    // // }

    // getHints(id: number): Observable<any[]> {
    //     return this.http.get<any[]>(this.baseUrl + '/Route/GetRouteSummary/' + id);
    // }

    private data = new BehaviorSubject({ username: '', password: '' });
    data$ = this.data.asObservable();
    
    // getData(model: any){
    //     this.data.next(model)
    // }

}
