public without sharing class StorageController {
    private static final List<String> columnData = new List<String>{
        'Name',
        'Country__c',
        'Genre__c',
        'Director__c',
        'Cast__c',
        'YearOfProduction__c',
        'LengthOfFilm__c'
    };

    private static final List<String> fieldsForQuery = new List<String>{
        'Id',
        'Name',
        'Country__c',
        'Genre__c',
        'YearOfProduction__c',
        'Translation__c',
        'FormatOfVideo__c',
        'QualityOfVideo__c',
        'Description__c',
        'Cast__c',
        'Director__c',
        'OriginalAudio__c',
        'Subtitles__c',
        'Video__c',
        'Audio__c',
        'PosterUrl__c',
        'LengthOfFilm__c'
    };

    @AuraEnabled
    public static Response getContacts(ParamsWrapper params){
        SoqlService soql = new SoqlService('Film__c');
        soql.setFields(fieldsForQuery);
        soql.setLimit(params.pageSize);
        soql.setOffset(params.pageSize * params.currentPage);

        Response resp = new Response();
        resp.amountOfRecords = soql.getAmountOfRecords();
        resp.columnData = columnData;
        resp.cellsData = (List<Film__c>)soql.doSoql();

        return resp;
    }

    public class ParamsWrapper {
        @AuraEnabled public Integer pageSize { get; set; }
        @AuraEnabled public Integer currentPage { get; set; }
    }

    public class Response {
        @AuraEnabled public Integer amountOfRecords { get; set; }
        @AuraEnabled public List<Film__c> cellsData { get; set; }
        @AuraEnabled public List<String> columnData { get; set; }
    }
}
