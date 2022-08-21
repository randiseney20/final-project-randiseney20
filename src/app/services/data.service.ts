import { Injectable } from '@angular/core';
import {collectionData, Firestore, collection, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { notEqual } from 'assert';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  name: string;
  rank: string;
  cell: string;
  observation: string;
  createdBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore
  ) { }

  getNotes(): Observable<Note []> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, {idField: 'id'}) as Observable<Note[]>;
  }

  getNoteByID(id): Observable<Note> {
    const noteDocref = doc(this.firestore, `notes/${id}`);
    return docData(noteDocref, { idField: 'id'}) as Observable<Note>;
  }

  addNote(note: Note){
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note){
    const noteDocref = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocref);
  }

  updateNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, {name: note.name, rank: note.rank, cell: note.cell, observation: note.observation});
  }
}
