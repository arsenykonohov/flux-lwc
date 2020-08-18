public without sharing class StorageController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return [
            SELECT Name, Phone, Fax, MobilePhone, Email, 
                Title, Department, AssistantName, LeadSource, Birthdate, 
                PhotoUrl, CleanStatus, Level__c, Languages__c 
            FROM Contact
        ];
    }
}
