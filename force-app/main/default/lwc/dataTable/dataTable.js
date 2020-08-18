import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/StorageController.getContacts';

const columns = [
    {label: 'Opportunity name', fieldName: 'Name', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone'},
    {label: 'Fax', fieldName: 'Fax', type: 'phone'},
    {label: 'Email', fieldName: 'Email', type: 'email'},
    {label: 'Department', fieldName: 'Department', type: 'text'},
    {label: 'Birthdate', fieldName: 'Birthdate', type: 'date'},
]

export default class DataTable extends LightningElement {
    columns = columns;

    @wire(getContacts)
    data
}