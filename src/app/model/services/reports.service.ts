import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Reports } from '../interfaces/reports';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private dbPathReports = 'reports';
  private reportsRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
      this.reportsRef = db.collection(this.dbPathReports);
    }

    getAll(): AngularFirestoreCollection<any> {
        return this.reportsRef;
    }

    create(report: Reports) {
        return this.reportsRef.add({ ...report });
    }

    update(id: string, data: Reports): Promise<void> {
        return this.reportsRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.reportsRef.doc(id).delete();
    }
}
